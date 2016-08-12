var inject = require('./inject')


var jQueryFallbackProvider = function(resolveCallback, rejectCallback, fallbackUrl) {
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
		function() {
			resolveCallback(window.jQuery)
		},
		rejectCallback
	)

}

module.exports = jQueryFallbackProvider
