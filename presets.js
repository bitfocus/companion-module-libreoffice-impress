import { LoStatus, PresentationStatus} from './types.js'
import { combineRgb } from '@companion-module/base'

export function getPresetDefinitions(self) {
    return {
		StartPresentation: {
            type: 'button',
            category: 'Presentation Control',
            name: 'Start',
            style: {
                text: 'Start Present',
                color: 16777215,
            },
            feedbacks: [
                {
                    feedbackId: 'running',
                    options: {},
                    style: {
                        bgcolor: combineRgb(0, 255, 0),
				        color: combineRgb(0, 0, 0),
                    },
                }
            ],
            steps: [
                {
                    down: [
                        {
                            actionId: 'start',
                            options: {
                                'slide': 1
                            },
                        },
                    ],
                    up: [],
                },
            ],
        },
        NextStep: {
            type: 'button',
            category: 'Presentation Control',
            name: 'Next',
            style: {
                text: 'Next',
                color: 16777215,
            },
            feedbacks: [],
            steps: [
                {
                    down: [
                        {
                            actionId: 'next',
                            options: {},
                        },
                    ],
                    up: [],
                },
            ],
        },
        PreviousStep: {
            type: 'button',
            category: 'Presentation Control',
            name: 'Prev',
            style: {
                text: 'Prev',
                color: 16777215,
            },
            feedbacks: [],
            steps: [
                {
                    down: [
                        {
                            actionId: 'previous',
                            options: {},
                        },
                    ],
                    up: [],
                },
            ],
        },
        Black: {
            type: 'button',
            category: 'Presentation Control',
            name: 'Black Screen',
            style: {
                text: 'Black',
                color: 16777215,
            },
            feedbacks: [],
            steps: [
                {
                    down: [
                        {
                            actionId: 'black',
                            options: {},
                        },
                    ],
                    up: [],
                },
            ],
        },
        Continue: {
            type: 'button',
            category: 'Presentation Control',
            name: 'Reset Black Screen',
            style: {
                text: 'Reset Black',
                color: 16777215,
            },
            feedbacks: [],
            steps: [
                {
                    down: [
                        {
                            actionId: 'continue',
                            options: {},
                        },
                    ],
                    up: [],
                },
            ],
        },

        Progress: {
            type: 'button',
            category: 'Status',
            name: 'Slide Progress',
            style: {
                text: '$(libreoffice-impress:slide)/$(libreoffice-impress:total_slides)',
                color: 16777215,
            },
            feedbacks: [
                {
                    feedbackId: 'running',
                    options: {},
                    style: {
                        bgcolor: combineRgb(0, 255, 0),
				        color: combineRgb(0, 0, 0),
                    },
                }
            ],
            steps: [
                {
                    down: [],
                    up: [],
                },
            ],
        },
        Notes: {
            type: 'button',
            category: 'Status',
            name: 'Slide Notes',
            style: {
                text: '$(libreoffice-impress:notes)',
                color: 16777215,
            },
            feedbacks: [],
            steps: [
                {
                    down: [],
                    up: [],
                },
            ],
        },
	}
}
