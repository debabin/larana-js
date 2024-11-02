const { RenderQueue } = require('../ui/rendering')
const { layout } = require('../ui/components')
const { Request } = require('../network')
const { point } = require('../ui/shapes')
const { DebuggedPage } = require('./debug.js')

class Page extends DebuggedPage {
	session = null
	config = {}

	state = {}
	componentsState = new Map()

	root = null
	initialRoot = null

	focused = ''

	lastW = 0
	lastH = 0
	lastRender = 0

	currMouse = point({ x: 0, y: 0 })
	lastMouse = point({ x: 0, y: 0 })

	rerenderDelay = 1
	rerenderTimeout = null

	previousRender = null
	previousRequest = {}

	title = ''
	meta = ''
	scripts = ''
	styles = ''

	constructor(options) {
		super(options)

		const { state, meta, config, appConfig } = options
		if (state !== undefined) {
			this.state = state
		}
		if (meta !== undefined) {
			this.meta = meta
		}

		this.config = appConfig
		this.rerenderDelay = config.rerenderDelay
	}

	init() {
		this.root = layout({})
	}

	pushQueryParams(params) {}

	// State

	setSession(session) {
		this.session = session
	}

	setState(newState, options = { needsRerender: true }) {
		this.state = { ...this.state, ...newState }

		const { needsRerender } = options

		if (needsRerender) {
			this.rerender()
		}
	}

	get state() {
		return Object.freeze(this.state)
	}

	initState(state) {
		this.state = state
	}

	getState() {
		return {
			state: this.state,
			setState: (newState, options = { needsRerender: true }) => {
				this.setState(newState, options)
			},
		}
	}

	getMouse() {
		return {
			currMouse: this.currMouse,
			lastMouse: this.lastMouse,
		}
	}

	focus(id) {
		this.focused = id
	}

	rerender() {
		if (!this.send) {
			throw new Error('Page must have `send()` method')
		}

		clearTimeout(this.rerenderTimeout)

		this.rerenderTimeout = setTimeout(() => {
			this.send({ w: this.lastW, h: this.lastH })
		}, this.rerenderDelay)
	}

	// Meta info

	prepareTitle() {
		return this.title
	}

	prepareMeta() {
		return this.meta
	}

	prepareScripts() {
		return this.scripts
	}

	prepareStyles() {
		return this.styles
	}

	//

	send() {}

	// Markup

	prepareRoot({ w, h, request }) {
		return this.root
	}

	prepareInitialRoot({ w, h, request }) {
		if (this.initialRoot) {
			return this.initialRoot
		}
		return this.prepareFirstRoot({ w, h, request })
	}

	prepareFirstRoot({ w, h, request }) {
		return this.prepareRoot({ w, h, request })
	}

	_patchRoot(root, payload) {
		root.setPayload(payload)
	}

	// Rendering

	/**
	 * @param {Request} request
	 * @returns {RenderQueue}
	 */
	renderInitialDraw(request) {
		const { w, h } = request

		return this.r({
			w,
			h,
			request,
			root: this.prepareInitialRoot({ w, h, request }),
		})
	}

	/**
	 * @param {Request} request
	 * @returns {RenderQueue}
	 */
	renderFirstDraw(request) {
		const { w, h } = request

		return this.r({
			w,
			h,
			request,
			root: this.prepareFirstRoot({ w, h, request }),
		})
	}

	/**
	 * @param {Request} request
	 * @returns {RenderQueue}
	 */
	render(request) {
		const { w, h } = request

		return this.r({
			w,
			h,
			request,
			root: this.prepareRoot({ w, h, request }),
		})
	}

	r({ w, h, request, root }) {
		this.lastW = w
		this.lastH = h
		this.lastRender = Date.now()

		const queue = new RenderQueue()

		const dimensions = new Map()

		const payload = {
			state: this.state,
			x: 0,
			y: 0,
			w,
			h,
			dimensions,
			request,
			session: this.session,
		}

		this._patchRoot(root, payload)

		root._render(queue)

		this._renderDebug(queue)

		return queue
	}

	// Handling events

	/**
	 * @param {Request} request
	 * @returns
	 */
	update(request) {
		const { w, h } = request

		if (request.event.type === 'mousemove') {
			this.lastMouse = this.currMouse
			this.currMouse = point({
				x: request.event.x,
				y: request.event.y,
			})
		}

		const root = this.prepareRoot({ w, h, request })

		const dimensions = new Map()

		const payload = {
			w,
			h,
			x: 0,
			y: 0,
			request,
			dimensions,
			state: this.state,
			session: this.session,
		}

		this._patchRoot(root, payload)

		return root.update(payload)
	}
}

module.exports = {
	Page,
}
