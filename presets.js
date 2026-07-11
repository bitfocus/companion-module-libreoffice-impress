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
            definitions: ['Progress', 'ProgressPercentage', 'Notes', 'Preview'],
        },
        {
            id: 'jump',
            name: 'Jump to Slide',
            definitions: ['ScrollLeft', 'Goto1', 'Goto2', 'Goto3', 'Goto4', 'Goto5', 'ScrollRight', 'ScrollTurn'],
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
        ProgressPercentage: {
            type: 'simple',
            name: 'Slide Progress Percentage',
            style: {
                text: `concat(round($(${self.label}:slide)*100/max($(${self.label}:total_slides),1)),"%")`,
                textExpression:	true,
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
        Preview: {
            type: 'simple',
            name: 'Slide Preview',
            style: {
                "color": "#6E6E6E"
            },
            feedbacks: [{
                    feedbackId: 'preview',
                    options: { 'slide': 0, "show_number": false },
                }],
            steps: [
                {
                    down: [],
                    up: [],
                },
            ],
        },

        ScrollLeft: {
            type: 'simple',
            name: 'ScrollLeft',
            style: {
                "text":"◀"
            },
            feedbacks: [],
            steps: [
                {
                    down: [ {
                            actionId: 'jump_scroll',
                            options: {
                                'amount': -5
                            },
                        },],
                    up: [],
                },
            ],
        },
        Goto1: {
            type: 'simple',
            name: 'Slide 1',
            style: {
                "color": "#9e0000"
            },
            feedbacks: [{
                    feedbackId: 'preview',
                    options: { 'slide': { isExpression: true, value: `$(${self.label}:jump_offset)+1`}, "show_number": true },
                }],
            steps: [
                {
                    down: [ {
                            actionId: 'goto',
                            options: {
                                'slide':  { isExpression: true, value: `$(${self.label}:jump_offset)+1`}
                            },
                        },],
                    up: [],
                },
            ],
        },
        Goto2: {
            type: 'simple',
            name: 'Slide 2',
            style: {
                "color": "#9e0000"
            },
            feedbacks: [{
                    feedbackId: 'preview',
                    options: { 'slide': { isExpression: true, value: `$(${self.label}:jump_offset)+2`}, "show_number": true },
                }],
            steps: [
                {
                    down: [ {
                            actionId: 'goto',
                            options: {
                                'slide': { isExpression: true, value: `$(${self.label}:jump_offset)+2`}
                            },
                        },],
                    up: [],
                },
            ],
        },
        Goto3: {
            type: 'simple',
            name: 'Slide 3',
            style: {
                "color": "#9e0000"
            },
            feedbacks: [{
                    feedbackId: 'preview',
                    options: { 'slide': { isExpression: true, value: `$(${self.label}:jump_offset)+3`}, "show_number": true },
                }],
            steps: [
                {
                    down: [ {
                            actionId: 'goto',
                            options: {
                                'slide': { isExpression: true, value: `$(${self.label}:jump_offset)+3`}
                            },
                        },],
                    up: [],
                },
            ],
        },
        Goto4: {
            type: 'simple',
            name: 'Slide 4',
            style: {
                "color": "#9e0000"
            },
            feedbacks: [{
                    feedbackId: 'preview',
                    options: { 'slide': { isExpression: true, value: `$(${self.label}:jump_offset)+4`}, "show_number": true },
                }],
            steps: [
                {
                    down: [ {
                            actionId: 'goto',
                            options: {
                                'slide': { isExpression: true, value: `$(${self.label}:jump_offset)+4`}
                            },
                        },],
                    up: [],
                },
            ],
        },
        Goto5: {
            type: 'simple',
            name: 'Slide 5',
            style: {
                "color": "#9e0000"
            },
            feedbacks: [{
                    feedbackId: 'preview',
                    options: { 'slide': { isExpression: true, value: `$(${self.label}:jump_offset)+5`}, "show_number": true },
                }],
            steps: [
                {
                    down: [ {
                            actionId: 'goto',
                            options: {
                                'slide': { isExpression: true, value: `$(${self.label}:jump_offset)+5`}
                            },
                        },],
                    up: [],
                },
            ],
        },
        ScrollRight: {
            type: 'simple',
            name: 'ScrollRight',
            style: {
                "text":"▶"
            },
            feedbacks: [],
            steps: [
                {
                    down: [ {
                            actionId: 'jump_scroll',
                            options: {
                                'amount': 5
                            },
                        },],
                    up: [],
                },
            ],
        },
        ScrollTurn: {
            type: 'simple',
            name: 'Scroll with Turn Knob',
            style: {
                "text":"⥁"
            },
            feedbacks: [],
            steps: [
                {
                    rotate_left: [{
                            actionId: 'jump_scroll',
                            options: {
                                'amount': -1
                            },
                        },],
                    rotate_right: [
                        {
                            actionId: 'jump_scroll',
                            options: {
                                'amount': 1
                            },
                        }
                    ],
                },
            ],
        },
	}
}
