var inject = require('./inject')


module.exports = function (fallbackUrl, resolveCallback, rejectCallback) {
	var $ = window.jQuery

	// jQuery is defined
	if ($) {
		resolveCallback($)
		return
	}

	// jQuery is undefined and without fallback
	if (!fallbackUrl) {
		rejectCallback()
		return
	}

	//jQuery is undefined with fallback available
	inject(
		fallbackUrl,
		() => {
			resolveCallback(window.jQuery)
		},
		rejectCallback
	)

}
