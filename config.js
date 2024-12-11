import { Regex } from '@companion-module/base'

export const ConfigFields = [
	{
		type: 'static-text',
		id: 'info',
		label: 'Information',
		width: 12,
		value: `
				<div>
					<h3>Connect</h3>
					
					<ul>
						<li>Open <strong>Slide Show &#62; Slide Show Settings...</strong></li>
						<li>Activate <strong>Enable Remote Control</strong> and <strong>Enable insecure Wifi Connections</strong></li>
						<li>Restart Libre Office Impress and allow Firewall pass-through if it pops up</li>
						<li>In Companion: Enter IP below and save settings</li>
						<li>Open <strong>Slide Show &#62; Impress Remote...</strong></li>
						<li>Enter the pin 9876 into the Companion Connection and click <strong>Connect</strong></li>
					</ul>

				</div>
			`,
	},
	{
		type: 'textinput',
		id: 'host',
		label: 'Target Host name or IP',
		default: '127.0.0.1',
		width: 8,
		regex: Regex.HOSTNAME,
	},
	{
		type: 'number',
		id: 'port',
		label: 'Target Port',
		tooltip: 'Should be 1599. Only change if you know why.',
		width: 4,
		default: 1599,
		min: 1,
		max: 65535,
		regex: Regex.PORT,
	},
]
