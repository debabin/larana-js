import { MemoryStateManager, ServerRenderer, LaranaApp, DefaultRouter } from 'larana-js'

import { config } from './config.js'
import { routes } from './routes.js'
import { initStyleVars, initStyles } from './styles'

initStyleVars()
initStyles()

const router = new DefaultRouter({
	debug: config.debug,
	routes,
})

const renderer = new ServerRenderer({
	debug: config.debug,
	DRM: false,
	maxFPS: config.maxFPS,
})

const stateManager = new MemoryStateManager({
	debug: config.debug,
})

const app = new LaranaApp({
	config,
	renderer,
	stateManager,
	router,
})

app.run()

console.log('test')