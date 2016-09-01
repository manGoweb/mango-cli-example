module.exports = function (components) {
	DEBUG && console.log('Initializing components...')
	DEBUG && console.time('Components initialization')

	//
	// Lazy components initialization from initComponents queue
	//
	var instances = []

	// Init function
	var init = (component) => {
		if (component.name in components) {
			DEBUG && console.time(`\tcomponent: ${component.name}`)

			var Component = components[component.name] // class
			var placement = (typeof component.place == 'string') ? document.querySelector(component.place) : component.place // DOM element
			var instance = new Component(placement, component.data || {}) // new instance

			instances.push(instance)

			DEBUG && console.timeEnd(`\tcomponent: ${component.name}`)
		} else if (DEBUG) {
			console.warn(`Component with name ${component.name} was not found!`)
		}
	}
	// Instance only required components
	initComponents.map(init)

	// Allow lazy init of components after page load
	initComponents = {
		push: init
	}

	DEBUG && console.timeEnd('Components initialization')
	DEBUG && console.log('Instances', instances)

	//
	// Print timing data on page load
	//
	if (DEBUG) {
		function printPerfStats() {
			var timing = window.performance.timing
			console.log('Performance:\n' +
				`\tdns: \t\t ${timing.domainLookupEnd - timing.domainLookupStart} ms\n` +
				`\tconnect: \t ${timing.connectEnd - timing.connectStart} ms\n` +
				`\tttfb: \t\t ${timing.responseStart - timing.connectEnd} ms\n` +
				`\tbasePage: \t ${timing.responseEnd - timing.responseStart} ms\n` +
				`\tfrontEnd: \t ${timing.loadEventStart - timing.responseEnd} ms\n`
			)
		}

		window.addEventListener('load', () => setTimeout(printPerfStats, 1000))
	}
}
