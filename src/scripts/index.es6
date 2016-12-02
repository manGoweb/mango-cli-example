require('./utils/swRegister')

let jQueryFallbackProvider = require('./utils/jQueryFallbackProvider')
let componentsHandler = require('./componentsHandler')


let onJQueryAvailable = ($) => {
	require('./plugins')
	componentsHandler({
		'example': require('./components/example'),
		'shapes': require('./components/shapes')
	})
}

let onJQueryMissing = () => {
	console.log('jQuery dependency is missing. This page might not work correctly. Please try again later.')
}


jQueryFallbackProvider(
	'/node_modules/jquery/dist/jquery.min.js',
	onJQueryAvailable,
	onJQueryMissing
)
