import {
	Page,
	Style,
	LayoutComponent,
	TextComponent,
	LinkComponent,
} from 'larana-js'

import { styles } from '../styles'
import { HeaderComponent, CircleComponent } from '../components'

export class HomePage extends Page {
	title = 'Home'

	init() {
		this.state = {
			radius: 2,
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
					style: new Style({ size: 1, minHeight: 80, maxHeight: 100 }),
				}),
				new LayoutComponent({
					style: new Style({ size: 9 }),
					children: [
						new TextComponent({ text: 'Home' }),
						new CircleComponent({
							style: new Style({ size: 1 }),
							radius: this.state.radius,
							onAnimate: (radius) => {
								this.setState({ radius })
							},
						}),
					],
				}),
			],
		})
	}
}
