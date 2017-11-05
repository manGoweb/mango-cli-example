const Component = require('./component')
const IsInView = require('isinview')

const TOP_THRESHOLD_CLASS    = 'view-topThreshold'
const BOTTOM_THRESHOLD_CLASS = 'view-bottomThreshold'

/**
 * InView component class
 */
class InView extends Component {

	/**
	 * @param {HTMLElement} element
	 * @param {Object} data
	 */
	constructor(element, data) {
		super(element, data)

		this.targets = data.targets ? this.el.querySelectorAll(data.targets) : [this.el]
		this.threshold = data.threshold || 0
		this.detectOnce = typeof data.detectOnce === 'undefined' ? true : data.detectOnce

		this._in = this._in.bind(this)
		this._inTop = this._inTop.bind(this)
		this._inBottom = this._inBottom.bind(this)
		this._out = this._out.bind(this)
		this._outTop = this._outTop.bind(this)
		this._outBottom = this._outBottom.bind(this)

		if ('IntersectionObserver' in window) {
			this._init()
		} else {
			//this._onScrollInit()
		}
	}


	_init() {
		new IsInView(this.targets, {
			thresholds: [
				{
					threshold: this.threshold,
					once: this.detectOnce,
					in: this._in,
					out: this._out,
				},
				{
					threshold: 0.1,
					inTop: this._inTop,
					inBottom: this._inBottom,
					outTop: this._outTop,
					outBottom: this._outBottom,
				},
			],
		})
	}


	_in(element, entry) {
		element.classList.remove('is-out')
		element.classList.add('is-in')
	}


	_inTop(element, entry) {
		this._outTop(element, entry)
	}


	_inBottom(element, entry) {
		this._outBottom(element, entry)
	}


	_out(element, entry) {
		element.classList.remove('is-in')
		element.classList.add('is-out')
	}


	_outTop(element, entry) {
		element.classList.remove('is-top')
		element.classList.add('is-bottom')
	}


	_outBottom(element, entry) {
		element.classList.remove('is-bottom')
		element.classList.add('is-top')
	}


}

module.exports = InView
