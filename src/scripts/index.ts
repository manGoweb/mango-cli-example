import { initializeComponents } from '@mangoweb/scripts-base'

import './plugins'

import Example from './components/Example'
import { InView } from '@mangoweb/in-view'
import Shapes from './components/Shapes'


// Sort the components alphabetically…
initializeComponents([
	Example,
	InView,
	Shapes,
], 'initComponents')
