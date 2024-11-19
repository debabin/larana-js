import { HomePage } from './pages/home-page.js'
import { BarPage } from './pages/bar-page.js'
import { TodoPage } from './pages/todo-page.js'

import { NotFoundPage } from './pages/404-page.js'

export const routes = [
	{ path: '/', name: 'home', page: HomePage },
	{ path: '/bar', name: 'bar-chart', page: BarPage },
	{ path: '/todo', name: 'todo-list', page: TodoPage },

	{ path: '404', name: 'not-found', page: NotFoundPage },
]
