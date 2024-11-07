class BaseRouter {
	debug = false
	routes = []

	constructor({ debug, routes }) {
		this.debug = debug
		this.routes = routes
	}

	resolve(url) {
		throw new Error('Not implemented')
	}
}

module.exports = {
	BaseRouter,
}
