import { Component } from '@mangoweb/scripts-base'

interface ShapesIEData {
	url: string
}

/**
 * ShapesIE component class (Internet Explorer fallback)
 *
 * - injects SVG sprite into body
 */
export default class ShapesIE extends Component<ShapesIEData> {

	static componentName = 'ShapesIE'

	init() {
		if (window.navigator.userAgent.indexOf('MSIE ') < 0 && !navigator.userAgent.match(/Trident.*rv\:11\./)) {
			return
		}

		document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1') && this.injectSprite()
	}

	injectSprite(): void {
		fetch(this.data.url).then((response: Response) => {
			if (!response.ok) {
				throw new Error(response.statusText)
			}
			return response.text()
		}).then((shapes: string) => {
			const wrapper = document.createElement('div')
			const body = document.body

			wrapper.innerHTML = shapes

			const el = wrapper.children.item(0)

			if (el) {
				body.insertBefore(el, body.firstChild)
			}
		}).catch((error) => {
			console.error(error)
			setTimeout(() => this.injectSprite(), 1e4)
		})
	}

}
