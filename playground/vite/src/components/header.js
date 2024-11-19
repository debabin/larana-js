import { Style, BaseComponent, LayoutComponent, TextComponent, useStyleVar } from 'larana-js'

import { styles } from '../styles'

export class HeaderComponent extends BaseComponent {
	items = [
		{ label: 'Home', name: 'home' },
		{ label: 'Bar chart', name: 'home' },
		{ label: 'Todo list', name: 'todo-list' },
	]

	getChildren(state) {
		return [
			new LayoutComponent({
				parent: this,
				style: new Style({
					direction: 'row',
					gap: 8,
					bg: '#333',
				}),
				children: [
					new TextComponent({
						text: 'LaranaJS',
						style: new Style({
							...styles.get('h1Text'),
							fg: useStyleVar('accent'),
						})
					}),
				],
			})
		]
	}
}
