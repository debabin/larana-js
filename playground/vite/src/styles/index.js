import { Style, hex, rgb, rgba, useStyleVar } from 'larana-js'

export * from './vars.js'

export const styles = new Map()

export const initStyles = () => {
	const text = new Style({
		fontWeight: useStyleVar('fontWeight'),
		fg: useStyleVar('fg'),
		fontSize: useStyleVar('fontSize'),
		fontFamily: useStyleVar('fontFamily'),
	})

	styles.set('text', text)
	styles.set('h1Text', new Style({
		...text.json(),
		fontSize: useStyleVar('h1FontSize'),
	}))
	styles.set('body', new Style({
		bg: useStyleVar('bg'),
	}))
	styles.set('link', new Style({
		...text.json(),
		fg: useStyleVar('accent'),
		borderColor: useStyleVar('accent'),
	}))
}
