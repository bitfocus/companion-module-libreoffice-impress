import { LoStatus, PresentationStatus} from './types.js'

export function getActionDefinitions(self) {
	return {
		start: {
			name: 'Start Presentation',
			options: [
				{
					type: 'number',
					id: 'slide',
					label: 'Slide:',
					tooltip: 'Slide to start the presentation (0 for current Slide)',
					default: 0,
					useVariables: true,
				}
			],
			callback: async (action) => {
				if (self.socket == undefined || !self.socket.isConnected) {
					self.log('debug', 'Socket not connected :(')
					return
				}
				if (self.connectionStatus != LoStatus.Paired) {
					self.log('debug', 'Libre Office Impress not paired')
					return
				} else if (self.presentationStatus == PresentationStatus.Stopped) {
					const sendBuf = Buffer.from("presentation_start\n\n\n", 'latin1')
					self.socket.send(sendBuf)
					self.log('debug', '-> presentation_start')
				}
				let slide = Number(await self.parseVariablesInString(action.options.slide))
				if (slide != 0) {
					const sendBuf = Buffer.from("goto_slide\n" + (slide-1) + "\n\n", 'latin1')
					self.log('debug', "-> " + sendBuf)
					self.socket.send(sendBuf)
				}
			},
		},
		goto: {
			name: 'Goto Slide',
			options: [
				{
					type: 'number',
					id: 'slide',
					label: 'Slide:',
					tooltip: 'Slide to go to',
					default: 1,
					useVariables: true,
				}
			],
			callback: async (action) => {
				if (self.socket == undefined || !self.socket.isConnected) {
					self.log('debug', 'Socket not connected :(')
					return
				}
				if (self.connectionStatus != LoStatus.Paired) {
					self.log('debug', 'Libre Office Impress not paired')
					return
				} else if (self.presentationStatus == PresentationStatus.Stopped) {
					self.log('debug', 'Presentation not running')
					return
				}
				let slide = Number(await self.parseVariablesInString(action.options.slide))
				if (slide != 0) {
					const sendBuf = Buffer.from("goto_slide\n" + (slide-1) + "\n\n", 'latin1')
					self.log('debug', "-> " + sendBuf)
					self.socket.send(sendBuf)
				}
			},
		},
		next: {
			name: 'Next Step',
			options: [],
			callback: async (action) => {
				if (self.socket == undefined || !self.socket.isConnected) {
					self.log('debug', 'Socket not connected :(')
					return
				}
				if (self.connectionStatus != LoStatus.Paired) {
					self.log('debug', 'Libre Office Impress not paired')
					return
				} else if (self.presentationStatus == PresentationStatus.Stopped) {
					self.log('debug', 'Impress Presentation not running')
					return
				}
				const sendBuf = Buffer.from("transition_next\n\n", 'latin1')
					self.log('debug', "-> " + sendBuf)
					self.socket.send(sendBuf)
			},
		},
		previous: {
			name: 'Previous Step',
			options: [],
			callback: async (action) => {
				if (self.socket == undefined || !self.socket.isConnected) {
					self.log('debug', 'Socket not connected :(')
					return
				}
				if (self.connectionStatus != LoStatus.Paired) {
					self.log('debug', 'Libre Office Impress not paired '+self.connectionStatus)
					return
				} else if (self.presentationStatus == PresentationStatus.Stopped) {
					self.log('debug', 'Impress Presentation not running')
					return
				}
				const sendBuf = Buffer.from("transition_previous\n\n", 'latin1')
					self.log('debug', "-> " + sendBuf)
					self.socket.send(sendBuf)
			},
		},
		black: {
			name: 'Black Screen',
			options: [],
			callback: async (action) => {
				if (self.socket == undefined || !self.socket.isConnected) {
					self.log('debug', 'Socket not connected :(')
					return
				}
				if (self.connectionStatus != LoStatus.Paired) {
					self.log('debug', 'Libre Office Impress not paired '+self.connectionStatus)
					return
				} else if (self.presentationStatus == PresentationStatus.Stopped) {
					self.log('debug', 'Impress Presentation not running')
					return
				}
				const sendBuf = Buffer.from("presentation_blank_screen\n\n", 'latin1')
				self.log('debug', "-> " + sendBuf)
				self.socket.send(sendBuf)
			},
		},
		continue: {
			name: 'Reset Black Screen',
			options: [],
			callback: async (action) => {
				if (self.socket == undefined || !self.socket.isConnected) {
					self.log('debug', 'Socket not connected :(')
					return
				}
				if (self.connectionStatus != LoStatus.Paired) {
					self.log('debug', 'Libre Office Impress not paired '+self.connectionStatus)
					return
				} else if (self.presentationStatus == PresentationStatus.Stopped) {
					self.log('debug', 'Impress Presentation not running')
					return
				}
				const sendBuf = Buffer.from("presentation_resume\n\n", 'latin1')
				self.log('debug', "-> " + sendBuf)
				self.socket.send(sendBuf)
			},
		},
	}
}
