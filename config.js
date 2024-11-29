import { Regex } from '@companion-module/base'

const REGEX_IP_OR_HOST =
	'/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})$|^((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]))$/'

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
		width: 8,
		regex: REGEX_IP_OR_HOST,
	},
	{
		type: 'number',
		id: 'port',
		label: 'Target Port',
		width: 4,
		default: 1599,
		regex: Regex.PORT,
	},
]
