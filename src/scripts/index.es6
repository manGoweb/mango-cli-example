var jQueryFallbackProvider = require('./utils/jQueryFallbackProvider')
var components = require('./utils/components')


function jQueryAvailable($) {
	require('./plugins')
	components({
		'example': require('./utils/components/example'),
		'shapes': require('./utils/components/shapes')
	})
}

function jQueryMissing() {
	alert('jQuery dependency is missing. This page might not work correctly. Please try again later.')
}


jQueryFallbackProvider(
	jQueryAvailable,
	jQueryMissing,
	'/node_modules/jquery/dist/jquery.min.js'
)
