const { BaseComponent } = require('../base')
const { figure } = require('../figure')
const { line, point, arcPoint } = require('../../shapes')
const { layout } = require('../layout')
const { list } = require('../list')
const { text } = require('../text')

class PieChart extends BaseComponent {
	root() {
		const { modelValue } = this.useModel()

		const total = modelValue.reduce((acc, curr) => acc + curr.value, 0)

		return layout({
			children: [
				layout({}),
				figure({
					style: { size: 3 },
					template: (fig, queue) => {
						const { x, y, w, h } = fig.computeDimensions()
						const radius = fig.computeMaxRadius()

						const centerX = x + w * 0.5
						const centerY = y + h * 0.5

						const offset = Math.PI * 0.003
						const totalAngle = (Math.PI * 2) - offset * modelValue.length

						let start = 0

						modelValue.forEach((item) => {
							const value = item.value / total * totalAngle
							const end = start + value

							line({
								points: [
									point({ x: centerX, y: centerY }),
									arcPoint({ x: centerX, y: centerY, radius, start, end }),
								],
								bg: item.color,
								borderColor: item.color,
							}).to(queue)

							start = end + offset
						})
					},
				}),
				layout({
					style: 'column',
					children: [
						layout({}),
						list({
							style: ['column', 'size_5'],
							value: modelValue,
							template: (item) => {
								const p = String((item.value / total * 100).toFixed(2))

								return layout({
									style: ['hug', 'gap_2'],
									children: [
										layout({
											style: {
												height: 'var:componentHeight',
												aspectRatio: 1,
												bg: item.color,
												radius: 'var:radius',
											},
										}),
										text({
											value: `${p}% ${item.label}`,
											style: 'ta_start',
										}),
									],
								})
							},
						}),
						layout({}),
					],
				}),
			],
		})
	}
}

const pieChart = (options) => {
	return new PieChart(options)
}

module.exports = { PieChart, pieChart }