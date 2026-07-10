import { combineRgb } from '@companion-module/base'
import { BlankScreenStatus, LoStatus, PresentationStatus} from './types.js'
export function getPresetStructure(self) {
    return [
        {
            id: 'control',
            name: 'Presentation Control',
            definitions: ['StartPresentation', 'NextStep', 'PreviousStep', 'GotoSlide','Blank'],
        },
        {
            id: 'status',
            name: 'Status',
            definitions: ['Progress', 'Notes'],
        },
    ]
}
export function getPresetDefinitions(self) {
    return {
		StartPresentation: {
            type: 'simple',
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
            type: 'simple',
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
            type: 'simple',
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
            type: 'simple',
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
            type: 'simple',
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
            type: 'simple',
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
            type: 'simple',
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
