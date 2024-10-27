const {
	Page,
	LayoutComponent,
	TextComponent,
	CheckboxComponent,
	RadioComponent,
} = require('larana-js')

const { HeaderComponent, CircleComponent } = require('../components')

class HomePage extends Page {
	title = 'Home'

	prepareMeta() {
		return [
			'<meta name="description" content="Larana-js example home page"/>',
		].join('\n')
	}

	init() {
		this.state = {
			radius: 30,
			d: 1,
			checkboxValue1: true,
			checkboxValue2: true,
			checkboxValue3: true,
			radioValue: 'item_1',
		}
	}

	prepareRoot({ w, h }) {
		return new LayoutComponent({
			style: [
				'body',
				{
					gap: 'var:u2',
					direction: 'column',
				},
			],
			children: [
				new HeaderComponent({}),
				new LayoutComponent({
					style: ['gap_2', { size: 9 }],
					children: [
						new LayoutComponent({
							style: ['col', 'gap_2'],
							children: [
								new RadioComponent({ model: 'radioValue', name: 'item_1' }),
								new RadioComponent({ model: 'radioValue', name: 'item_2' }),
								new RadioComponent({ model: 'radioValue', name: 'item_3' }),
							],
						}),
						new LayoutComponent({
							style: ['col', 'gap_2'],
							children: [
								new CheckboxComponent({ model: 'checkboxValue1' }),
								new CheckboxComponent({ model: 'checkboxValue2' }),
								new CheckboxComponent({ model: 'checkboxValue3' }),
							],
						}),
						new TextComponent({ text: 'Home' }),
						new CircleComponent({
							style: { size: 1, bg: 'var:accent', borderColor: '#f00' },
							radius: this.state.radius,
							onAnimate: () => {
								let d = this.state.d
								if (this.state.radius >= 100 || this.state.radius <= 3) {
									d *= -1
								}
								this.setState({
									radius: this.state.radius + 1 * d,
									d,
								})
							},
						}),
					],
				}),
			],
		})
	}
}

module.exports = {
	HomePage,
}
