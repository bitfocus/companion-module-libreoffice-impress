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
	}
}
