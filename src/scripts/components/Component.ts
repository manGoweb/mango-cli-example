

export type ComponentConstructor<D> = new (element: HTMLElement, data: D) => Component<D>


export default class Component<D> {

	protected readonly el: HTMLElement
	protected readonly data: D


	constructor(element: HTMLElement, data: D) {
		this.el = element
		this.data = data
		this.attachListeners()

		this.initialize()
	}


	get listeners(): EventListeners {
		return []
	}


	initialize() {

	}


	private attachListeners() {
		const listeners = this.listeners

		for (let i = 0, listenersCount = listeners.length; i < listenersCount; i++) {
			const listenersSpec = listeners[i]

			if (listenersSpec.length === 2) { // EventListenerSpec
				const [type, callback] = listenersSpec

				this.el.addEventListener(type, callback.bind(this), false)
			} else { // DelegateEventListenerSpec
				const [type, delegateSelector, callback] = listenersSpec

				this.el.addEventListener(type, (e: Event) => {
					let target = e.target

					while (target && target instanceof HTMLElement && target !== this.el) {
						if (target.matches(delegateSelector)) {
							const delegateEvent = Object.create(e)
							delegateEvent.delegateTarget = target

							return callback.call(this, delegateEvent)
						}

						target = target.parentElement
					}
				}, false)
			}
		}
	}

}
