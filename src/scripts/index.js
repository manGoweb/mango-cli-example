//import './utils/swRegister'
import './plugins'
import 'bootstrap'
import jQueryFallbackProvider from './utils/jQueryFallbackProvider'
import componentsHandler from './componentsHandler'

// Components
import emmiter from './components/emmiter'
import example from './components/example'
import shapes from './components/shapes'

const onJQueryAvailable = ($) => {
	// Init components
	componentsHandler({
		emmiter,
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
