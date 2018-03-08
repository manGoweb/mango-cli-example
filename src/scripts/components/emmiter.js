import Component from './component'

/**
 * Emmiter component class
 *
 * 	- emits given events on an element click
 *
 * Expects data = {
 * 		events: [ 'event', 'names', 'to', 'trigger' ] - array of events or just single string
 * }
 */
export default class Emmiter extends Component {

	constructor(el, data) {
		super(el, data)

		if (Array.isArray(data.event)) {
			this.events = data.event
		} else {
			this.events = [ data.event ]
		}
	}

	get listeners() {
		return {
			'click': 'handleClick',
		}
	}

	handleClick(e) {
		e.preventDefault()
		this.events.map(eventName => this.$el.trigger(eventName))
	}

}
