//import './utils/swRegister'
import './plugins'
import jQueryFallbackProvider from './utils/jQueryFallbackProvider'
import componentsHandler from './componentsHandler'

import example from './components/example'
import shapes from './components/shapes'

const onJQueryAvailable = ($) => {
	componentsHandler({
		example,
		shapes,
	})
}

const onJQueryMissing = () => {
	console.log('jQuery dependency is missing. This page might not work correctly. Please try again later.')
}


jQueryFallbackProvider(
	'/node_modules/jquery/dist/jquery.min.js',
	onJQueryAvailable,
	onJQueryMissing
)
