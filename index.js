import { InstanceBase, InstanceStatus, runEntrypoint, TCPHelper } from '@companion-module/base'
import { ConfigFields } from './config.js'
import { getActionDefinitions } from './actions.js'
import { getFeedbackDefinitions  } from './feedbacks.js'
import { getPresetDefinitions  } from './presets.js'
import { LoStatus, PresentationStatus} from './types.js'


class LibreofficeImpress extends InstanceBase {
	
	async init(config) {
		this.log('debug', 'Init')
		this.config = config
		this.slides = []
		this.connectionStatus = LoStatus.Unconnected
		this.presentationStatus = PresentationStatus.Unconnected
		this.current_slide_id = 0

		this.debug_log_commands = false

		this.setActionDefinitions(getActionDefinitions(this))
		this.setFeedbackDefinitions(getFeedbackDefinitions(this))
		this.setPresetDefinitions(getPresetDefinitions(this))

		await this.configUpdated(config)
	}

	async configUpdated(config) {
		if (this.socket) {
			this.socket.destroy()
			delete this.socket
		}

		this.config = config

		this.init_tcp()

		this.init_variables()
	}

	async destroy() {
		if (this.socket) {
			this.socket.destroy()
		} else {
			this.updateStatus(InstanceStatus.Disconnected)
		}
	}

	// Return config fields for web config
	getConfigFields() {
		return ConfigFields
	}

	init_tcp() {
		if (this.socket) {
			this.socket.destroy()
			delete this.socket
		}

		this.slides = []
		this.connectionStatus = LoStatus.Unconnected
		this.presentationStatus = PresentationStatus.Unconnected
		this.current_slide_id = 0

		this.updateStatus(InstanceStatus.Connecting)

		if (this.config.host) {
			this.socket = new TCPHelper(this.config.host, this.config.port)

			this.socket.on('status_change', (status, message) => {
				if ( status == InstanceStatus.Ok ) {
					const sendBuf = Buffer.from('LO_SERVER_CLIENT_PAIR\nCompanion\n9876\n\n', 'latin1')
					this.log('debug', 'Sending Connection request ')
					this.socket.send(sendBuf)
				} else {
					this.updateStatus(status, message)
				}
			})

			this.socket.on('error', (err) => {
				if (this.connectionStatus != LoStatus.Unconnected) {
					this.log('error', 'Network error: ' + err.message)
				}
				this.connectionStatus = LoStatus.Unconnected
				this.PresentationStatus = PresentationStatus.Unconnected
				this.checkFeedbacks('running')
				this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
			})

			this.socket.on('data', (data) => {
				this.update_connection(data.toString())
			})
		} else {
			this.updateStatus(InstanceStatus.BadConfig)
		}
	}

	check_data(count, length, cmd) {
		if ( count >= length) {
			this.log("error", "Data missing for command:"+count+" "+length + cmd)
			return false
		}
		return true
	}

	update_connection(data) {
		data = data.split('\n')
		if (this.debug_log_commands) this.log('debug', '<-'+ data)
		let i = 0
		const DataType = {
			Default: 0,
			Image: 1,
			Notes: 2,
		}
		let dataStatus = DataType.Default

		while (i < data.length) {
			let cmd = data[i]
			switch (cmd) {
				case "":
					break
				case 'LO_SERVER_VALIDATING_PIN':
					this.connectionStatus = LoStatus.WaitingForPairing
					this.updateStatus(InstanceStatus.Connecting, "Waiting for Pairing")
					break;
				case "LO_SERVER_SERVER_PAIRED":
					this.connectionStatus = LoStatus.Paired
					this.updateStatus(InstanceStatus.Ok)
					this.log('debug', 'Connected')
					break;
				case "LO_SERVER_INFO":
					if (this.check_data(i+1, data.length, cmd)) {
						this.setVariableValues({ lo_version: data[i+1] })
						i++
					}
					break;
				case "slideshow_finished":
					this.presentationStatus = PresentationStatus.Stopped
					this.checkFeedbacks('running')
					this.current_slide_id = 0
					this.setVariableValues({
						slide: 0,
						notes: ""
					})
					break
				case "slideshow_started":
					this.presentationStatus = PresentationStatus.Running
					this.checkFeedbacks('running')
					if (this.check_data(i+2, data.length, cmd)) {
						this.current_slide_id = Number(data[i+2])
						this.setVariableValues({
							total_slides: Number(data[i+1]),
							slide: this.current_slide_id +1,
						})
						i += 2
					}
					break
				case "slideshow_info":
					if (this.check_data(i+1, data.length, cmd)) {
						this.setVariableValues({presentation_name: data[i+1]})
						i++
					}
					break
				case "slide_preview":
					if (this.check_data(i+1, data.length, cmd)) {
						let img = ""
						i++
						while (i < data.length) {
							if (data[i] == "") {
								break
							}
							img += data[i]
							i++
						}
					}
					break
				case "slide_notes":
					if (this.check_data(i+2, data.length, cmd)) {
						let slideNotes = ""
						i++
						const slideId = Number(data[i])
						i++
						while (i < data.length) {
							if (data[i] == "") {
								break
							}
							slideNotes += data[i]
							i++
						}
						slideNotes = slideNotes.replaceAll("<html>","")
						slideNotes = slideNotes.replaceAll("</html>","")
						slideNotes = slideNotes.replaceAll("<body>","")
						slideNotes = slideNotes.replaceAll("</body>","")
						slideNotes = slideNotes.replaceAll("<br/>","\n")
						this.slides[slideId] = {id: slideId, notes: slideNotes}
						if (this.current_slide_id == slideId) {
							this.setVariableValues({
								notes: slideNotes
							})
						}
					}
					break
				case "slide_updated":
					if (this.check_data(i+1, data.length, cmd)) {
						this.current_slide_id = Number(data[i+1])
						this.setVariableValues({
							slide: this.current_slide_id +1
						})
						if (this.current_slide_id < this.slides.length) {
							this.setVariableValues({
								notes: this.slides[this.current_slide_id]["notes"]
							})
						} else {
							this.setVariableValues({
								notes: ""
							})
						}

						i++
					}
					break
				default:
					this.log('warning', 'Unknown Data: ' + data)
			}
			i++
		}
	}

	send_command(cmd, ...args) {
		if (this.socket == undefined || !this.socket.isConnected) {
			this.log('error', 'Socket not connected :(')
			return false
		}

		let data = cmd
		for (let arg of args) data += "\n" + arg;
		if (this.debug_log_commands) this.log('debug', "-> " + data)
		let sendBuf = Buffer.from(data + "\n\n", 'latin1')
		this.socket.send(sendBuf)
	}



	init_variables() {
		this.setVariableDefinitions([
			{name: 'Libre Office Version', variableId: 'lo_version'},
			{name: 'Presentation Name', variableId: 'presentation_name'},
			{name: 'Total Slides', variableId: 'total_slides'},
			{name: 'Current Slide', variableId: 'slide'},
			{name: 'Current Notes', variableId: 'notes'},
		])
		
		this.setVariableValues({ lo_version: '' })
		this.setVariableValues({ presentation_name: '' })
		this.setVariableValues({ total_slides: 0})
		this.setVariableValues({ slide: 0 })
		this.setVariableValues({ notes: '' })
	}

	updateFeedbacks() {
		return
	}
}

runEntrypoint(LibreofficeImpress, [])
