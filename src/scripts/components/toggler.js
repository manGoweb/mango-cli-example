import Component from './component'

/**
 * Toggler component class
 *
 * Expects data = {
 * 		event: 'click' - event type,
 * 		trigger: 'selector to trigger element/s',
 * 		class: 'class to toggle with',
 * 		prevent: false - bool flag to enable prevention of default browser action on toggler
 * 		removeTrigger: false - bool flag to remove trigger element from DOM
 * }
 */
export default class Toggler extends Component {

	constructor(el, data) {
		super(el, data)

		$(document).on(data.event || 'click', data.trigger, this.handleClick.bind(this))
	}

	handleClick(e) {
		if(this.data.prevent) e.preventDefault()
		this.$el.toggleClass(this.data.class)

		if(this.data.removeTrigger) {
			$(e.currentTarget).remove()
		}
	}

}
