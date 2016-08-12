var jQueryFallbackProvider = require('./utils/jQueryFallbackProvider')
var componentsHandler = require('./utils/componentsHandler')


var onJQueryAvailable = function($) {
	require('./plugins')
	componentsHandler({
		'example': require('./utils/components/example'),
		'shapes': require('./utils/components/shapes')
	})
}

var onJQueryMissing = function() {
	console.log('jQuery dependency is missing. This page might not work correctly. Please try again later.')
}


jQueryFallbackProvider(
	'/node_modules/jquery/dist/jquery.min.js',
	onJQueryAvailable,
	onJQueryMissing
)
