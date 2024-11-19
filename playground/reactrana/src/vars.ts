import { setStyleVars, hex } from 'larana-js'

export const initStyleVars = () => {
	setStyleVars({
		fg: hex('#000'),
		bg: hex('#eee'),
		accent: hex('#3caa3c'),
		componentBg: hex('#fff'),
		fontWeight: 500,
		fontFamily: 'monospace',
		h1FontSize: 32,
		h2FontSize: 28,
		h3FontSize: 24,
		fontSize: 16,
	}, 'main')

	setStyleVars({
		fg: hex('#fff'),
		bg: hex('#444'),
		componentBg: hex('#333'),
	}, 'dark')
}
