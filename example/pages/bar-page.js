const {
	Page,
	LayoutComponent,
	TextComponent,
	BarChartComponent,
} = require('larana-js')

const { HeaderComponent } = require('../components')

class BarPage extends Page {
	loadingTextTimeout = null

	title = 'Bar chart page'

	init() {
		this.state = {
			items: [],
			loaded: false,
			loadingTick: 0,
			loadingText: 'Loading',
		}

		this.initialRoot = new LayoutComponent({
			children: [
				new TextComponent({ text: 'Loading...', style: 'text' }),
			],
		})

		this.fetchData()
	}

	prepareRoot() {
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
					style: { size: 1, borderColor: '#f00' },
					children: [
						new TextComponent({
							text: 'Loading data for chart',
							style: 'h1Text',
						}),
					],
				}),
				new LayoutComponent({
					style: { size: 9 },
					children: [
						this.state.loaded
							? new BarChartComponent({
								model: 'items',
								style: {
									fg: 'var:fg',
									bg: '#3caa3c',
								},
							})
							: new TextComponent({
								text: `Loading: ${this.state.loadingTick}`,
								style: 'text',
							}),
					],
				}),
			],
		})
	}

	fetchData() {
		clearTimeout(this.loadingTextTimeout)
		const tickLoading = () => {
				if (this.state.loaded) {
					return
				}
				this.setState({
					loadingTick: this.state.loadingTick + 1,
					loadingText: 'Loading',
				})
	
				this.loadingTextTimeout = setTimeout(tickLoading, 100)
		}

		this.loadingTextTimeout = setTimeout(tickLoading, 100)

		setTimeout(() => {
			this.setState({
				items: [
					{ value: 100, label: '01' },
					{ value: 90, label: '02' },
					{ value: 60, label: '03' },
					{ value: 190, label: '04' },
					{ value: 60, label: '05' },
					{ value: 100, label: '06' },
					{ value: 120, label: '07' },
					{ value: 300, label: '08' },
					{ value: 500, label: '09' },
					{ value: 150, label: '10' },
					{ value: 100, label: '11' },
					{ value: 70, label: '12' },
				],
				loaded: true,
			})

			clearTimeout(this.loadingTextTimeout)
		}, 2000)
	}
}

module.exports = {
	BarPage,
}
