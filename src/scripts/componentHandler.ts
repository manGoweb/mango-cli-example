import Component, { ComponentConstructor } from 'components/Component'


export default (components: Array<ComponentConstructor<any>>, initializerName: ComponentInitializerName = 'initComponents') => {
	const componentsByName: {
		[name: string]: typeof Component
	} = {}

	for (let i = 0, length = components.length; i < length; i++) {
		const constructor = components[i]
		const name = constructor.componentName || constructor.name

		componentsByName[name] = constructor
	}

	let componentStartTime: number

	// Init function
	const init = (component: ComponentDefinition) => {
		if (component.name in componentsByName) {
			if (DEBUG) {
				componentStartTime = performance.now()
			}

			const Component = componentsByName[component.name] // class

			const placement =
				typeof component.place === 'string'
					? document.querySelector(component.place)
					: (component.place || document.body)

			if (placement) {
				const instance = new Component(placement, component.data || {})

				instance.setup()
			} else if (DEBUG) {
				console.warn(
					`Trying to initialize component '${component.name}' but its selector '${component.place}' was not found`
				)
			}

			if (DEBUG) {
				const componentEndTime = performance.now()
				console.log(`\tComponent: ${component.name}: ${Math.round(componentEndTime - componentStartTime)}ms`)
			}
		} else if (DEBUG) {
			console.warn(`Component with name ${component.name} was not found!`)
		}
	}

	const componentInitializer: ComponentInitializer = window[initializerName]

	// Instance only required components
	if (Array.isArray(componentInitializer)) {
		componentInitializer.map(init)
	}

	// Allow lazy init of components after page load
	window[initializerName] = {
		push: init,
	}
}
