import {
	Page,
	Style,
	LayoutComponent,
	TextComponent,
} from 'larana-js'

import { styles } from '../styles'
import { HeaderComponent } from '../components'

export class TodoPage extends Page {
	title = 'Todo'

	init() {
		this.state = {
			items: [],
		}
	}

	prepareRoot({ w, h }) {
		return new LayoutComponent({
			style: new Style({
				...styles.get('body').json(),
				gap: 8,
				direction: 'column',
			}),
			children: [
				new HeaderComponent({
					style: new Style({ size: 1 }),
				}),
				new LayoutComponent({
					style: new Style({ size: 9 }),
					children: [
						new TextComponent({ text: 'Todo' }),
					],
				}),
			],
		})
	}
}
