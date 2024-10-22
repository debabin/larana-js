const { Page, LayoutComponent, TextComponent } = require('larana-js')

const { HeaderComponent } = require('../components')

class NotFoundPage extends Page {
	title = '404 | Page not found'

	prepareRoot({ w, h }) {
		return new LayoutComponent({
			style: [
				'body',
				{ direction: 'column' },
			],
			children: [
				new HeaderComponent({}),
				new LayoutComponent({
					style: {
						direction: w > 1028 ? 'row' : 'column',
						size: 9,
					},
					children: [
						new TextComponent({
							text: '404',
							style: 'h1Text',
						}),
						new TextComponent({
							text: 'Go back to home',
							style: 'text',
						}),
					],
				})
			],
		})
	}
}

module.exports = { NotFoundPage }
