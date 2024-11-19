import { Page, LayoutComponent, TextComponent, Style } from 'larana-js'

import { styles } from '../styles'

export class NotFoundPage extends Page {
	prepareRoot({ w, h }) {
		return new LayoutComponent({
			style: new Style({
				...styles.get('body').json(),
				direction: w > 1028 ? 'row' : 'column',
			}),
			children: [
				new TextComponent({
					text: '404',
					style: styles.get('h1Text'),
				}),
				new TextComponent({
					text: 'Go back to home',
					style: styles.get('text'),
				})
			],
		})
	}
}
