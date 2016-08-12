var jQueryFallbackProvider = require('./utils/jQueryFallbackProvider')
var components = require('./utils/components')


var onJQueryAvailable = function($) {
	require('./plugins')
	components({
		'example': require('./utils/components/example'),
		'shapes': require('./utils/components/shapes')
	})
}

var onJQueryMissing = function() {
	console.log('jQuery dependency is missing. This page might not work correctly. Please try again later.')
}


jQueryFallbackProvider(
	onJQueryAvailable,
	onJQueryMissing,
	'/node_modules/jquery/dist/jquery.min.js'
)
