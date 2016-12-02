module.exports = function (components) {
	if (DEBUG) {
		var componentsStartTime = performance.now()
		var colorLog = (message, color) => {
			console.log(`%c${message}`, `color: ${color}`)
		}
		colorLog('Initializing components...', 'brown')
	}

	//
	// Lazy components initialization from initComponents queue
	//
	var instances = []

	// Init function
	var init = (component) => {
		if (component.name in components) {
			if (DEBUG) {
				var componentStartTime = performance.now()
			}

			var Component = components[component.name] // class
			var placement = (typeof component.place == 'string') ? document.querySelector(component.place) : component.place // DOM element
			var instance = new Component(placement, component.data || {}) // new instance

			instances.push(instance)

			if (DEBUG) {
				var componentEndTime = performance.now()
				colorLog(`\tcomponent: ${component.name}: ${Math.round(componentEndTime-componentStartTime)}ms`, 'blue')
			}
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

	if (DEBUG) {
		var componentsEndTime = performance.now()
		colorLog(`Components initialization: ${Math.round(componentsEndTime-componentsStartTime)}ms`, 'blue')
		colorLog('Instances:', 'brown')
		console.log(instances)
	}

	//
	// Print timing data on page load
	//
	if (DEBUG) {
		function printPerfStats() {
			var timing = window.performance.timing
			colorLog('Performance:', 'brown')
			colorLog(
				`\tdns: \t\t ${timing.domainLookupEnd - timing.domainLookupStart} ms\n` +
				`\tconnect: \t ${timing.connectEnd - timing.connectStart} ms\n` +
				`\tttfb: \t\t ${timing.responseStart - timing.connectEnd} ms\n` +
				`\tbasePage: \t ${timing.responseEnd - timing.responseStart} ms\n` +
				`\tfrontEnd: \t ${timing.loadEventStart - timing.responseEnd} ms\n`,
				'blue'
			)
		}

		window.addEventListener('load', () => setTimeout(printPerfStats, 1000))
	}
}
