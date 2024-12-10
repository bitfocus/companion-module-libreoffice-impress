import { LoStatus, PresentationStatus, BlankScreenStatus} from './types.js'

function checkStatus(self, check_running=false) {
	if (self.connectionStatus != LoStatus.Paired) {
		self.log('error', 'Libre Office Impress not paired')
		return false
	}
	if (check_running && self.presentationStatus == PresentationStatus.Stopped) {
		self.log('error', 'Presentation not running')
		return false
	}
	return true
}

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
					default: 1,
					min: 0,
					useVariables: true,
				}
			],
			callback: async (action) => {
				if (!checkStatus(self)) {
					return
				}
				if (self.presentationStatus == PresentationStatus.Stopped) {
					self.send_command("presentation_start")
				}
				let slide = Number(await self.parseVariablesInString(action.options.slide))
				if (slide != 0) {
					self.send_command("goto_slide", slide-1)
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
					min: 1,
					useVariables: true,
				}
			],
			callback: async (action) => {
				if (!checkStatus(self, true)) {
					return
				}
				let slide = Number(await self.parseVariablesInString(action.options.slide))
				
				self.send_command("goto_slide", slide-1)
			},
		},
		next: {
			name: 'Next Step',
			options: [],
			callback: async (action) => {
				if (!checkStatus(self, true)) {
					return
				}
				self.send_command("transition_next")
			},
		},
		previous: {
			name: 'Previous Step',
			options: [],
			callback: async (action) => {
				if (!checkStatus(self, true)) {
					return
				}
				self.send_command("transition_previous")
			},
		},
		blank: {
			name: 'Blank Screen',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					tooltip: 'Toggle does not work the first Time if Blank Screen got triggered outside Companion',
					choices: [
						{ id: 'on', label: 'On' },
						{ id: 'off', label: 'Off' },
						{ id: 'toggle', label: 'Toggle [!]' },
					],
					default: 'toggle',
				}
			],
			callback: async (action) => {
				if (!checkStatus(self, true)) {
					return
				}
				switch (action.options.action) {
					case 'on':
						if (self.send_command("presentation_blank_screen")) {
							self.blankScreenStatus = BlankScreenStatus.On
							self.checkFeedbacks('blankScreen')
						}
						break
					case 'off':
						self.send_command("presentation_resume")
						break
					case 'toggle':
						if (self.blankScreenStatus == BlankScreenStatus.On) {
							self.send_command("presentation_resume")
						} else {
							if (self.send_command("presentation_blank_screen")) {
								self.blankScreenStatus = BlankScreenStatus.On
								self.checkFeedbacks('blankScreen')
							}
						}
						break
				}
			},
		},
	}
}
