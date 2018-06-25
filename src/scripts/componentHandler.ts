import Component, { ComponentConstructor } from 'components/Component'

interface ComponentDefinition {
	name: string
	place?: keyof HTMLElementTagNameMap | HTMLElement
	data?: any
}

declare let initComponents: Array<ComponentDefinition> | {
	push: (definition: ComponentDefinition) => void
}


export default (components: Array<ComponentConstructor<any>>) => {
	const componentsByName: {
		[name: string]: typeof Component
	} = {}

	for (let i = 0, length = components.length; i < length; i++) {
		const constructor = components[i]
		const name = constructor.name

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

	// Instance only required components
	if (Array.isArray(initComponents)) {
		initComponents.map(init)
	}

	// Allow lazy init of components after page load
	initComponents = {
		push: init,
	}
}