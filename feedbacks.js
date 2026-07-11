import { BlankScreenStatus, LoStatus, PresentationStatus} from './types.js'
import { combineRgb } from '@companion-module/base'

export function getFeedbackDefinitions(self) {
    return {
		running: {
			name: 'Presentation State',
			type: 'boolean',
			label: 'Presentation State',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'observe_state',
					type: 'dropdown',
					label: 'Status',
					choices: [
						{ id: PresentationStatus.Running, label: 'Running' },
						{ id: PresentationStatus.Stopped, label: 'Stopped' },
						{ id: PresentationStatus.Unconnected, label: 'Unconnected' },
					],
					default: PresentationStatus.Running
				}
			],
			callback: (feedback) => {
				return (self.presentationStatus == feedback.options.observe_state)
			},
		},
		blankScreen: {
			name: 'Blank Screen',
			type: 'boolean',
			label: 'Blank Screen State',
			defaultStyle: {
				bgcolor: combineRgb(255, 128, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'observe_state',
					type: 'dropdown',
					label: 'Status',
					choices: [
						{ id: BlankScreenStatus.On, label: 'On' },
						{ id: BlankScreenStatus.Off, label: 'Off' },
					],
					default: BlankScreenStatus.On
				}
			],
			callback: (feedback) => {
				return (self.blankScreenStatus == feedback.options.observe_state)
			},
		},
		preview: {
			name: 'Slide Preview',
			type: 'advanced',
			label: 'Slide Preview',
			affectedProperties: ["png64", "text", "color"],
			options: [
				{
					id: 'slide',
					type: 'number',
					label: 'Slide',
					tooltip: 'Slide to show the preview (0 for current Slide)',
					default: 0,
					min: 0,
				},
				{
					id: 'show_number',
					type: 'checkbox',
					label: 'Show Slide Number',
					default: false,
				}

			],
			callback: async (feedback) => {
				if (self.presentationStatus != PresentationStatus.Running || 
					!(self.current_slide_id in self.slides)
				) {
					return { "png64": "none" }
				}
				let slide_id = Number(feedback.options.slide)
				if (slide_id == 0) {
					slide_id = self.current_slide_id
				} else {
					slide_id -= 1
				}
				if (!(slide_id in self.slides) ||
					(self.current_slide_id > self.total_slides)
				) {
					return { "png64": "none" }
				}

				if (self.slides[slide_id].img) {
					const png = 'data:image/png;base64,'+self.slides[slide_id].img
					if (feedback.options.show_number) {
						return (slide_id == self.current_slide_id) ? 
							{ "png64":  png , "text": slide_id+1, color: "#6E6E6E"} :
							{ "png64":  png , "text": slide_id+1}
					} else {
						return { "png64":  png}
					}
				} else {
					return { "png64": "none" }
				}
			}
		},
	}
}
