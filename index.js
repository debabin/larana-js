module.exports = {
	...require('./src/app.js'),
	config: require('./src/config.js'),
	...require('./src/config.js'),
	state: require('./src/state'),
	...require('./src/state'),
	routing: require('./src/routing'),
	...require('./src/routing'),
	ui: require('./src/ui'),
	...require('./src/ui'),
	pages: require('./src/pages'),
	...require('./src/pages'),
	shared: require('./src/shared'),
	...require('./src/shared'),
	resources: require('./src/resources'),
	...require('./src/resources'),
	static: require('./src/static'),
	...require('./src/static'),
}
