import { LoStatus, PresentationStatus} from './types.js'
import { combineRgb } from '@companion-module/base'

export function getFeedbackDefinitions(self) {
    return {
		running: {
			name: 'Presentation running',
			type: 'boolean',
			label: 'Presentation State',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
			],
			callback: (feedback) => {
				return (self.presentationStatus == PresentationStatus.Running)
			},
		},
	}
}
