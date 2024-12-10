import { combineRgb } from '@companion-module/base'
import { BlankScreenStatus, LoStatus, PresentationStatus} from './types.js'

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
                    options: { 'observe_state': PresentationStatus.Running },
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
        GotoSlide: {
            type: 'button',
            category: 'Presentation Control',
            name: 'Goto Slide',
            style: {
                text: 'Goto Slide',
                color: 16777215,
            },
            feedbacks: [],
            steps: [
                {
                    down: [
                        {
                            actionId: 'goto',
                            options: {
                                'slide': 1
                            },
                        },
                    ],
                    up: [],
                },
            ],
        },
        Blank: {
            type: 'button',
            category: 'Presentation Control',
            name: 'Blank Screen',
            style: {
                text: 'Blank',
                color: 16777215,
            },
            feedbacks: [
                {
                    feedbackId: 'blankScreen',
                    options: { 'observe_state': BlankScreenStatus.On },
                    style: {
                        bgcolor: combineRgb(255, 128, 0),
				        color: combineRgb(0, 0, 0),
                    },
                }
            ],
            steps: [
                {
                    down: [
                        {
                            actionId: 'blank',
                            options: { 'action': 'toggle'},
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
                text: `$(${self.label}:slide)/$(${self.label}:total_slides)`,
                color: 16777215,
            },
            feedbacks: [
                {
                    feedbackId: 'running',
                    options: { 'observe_state': PresentationStatus.Running },
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
                text: `$(${self.label}:notes)`,
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
