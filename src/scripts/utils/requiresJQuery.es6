var requiresJQuery = function(resolveCallback, rejectCallback, fallbackUrl) {
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
	var loadedCallback = function() {
		resolveCallback(window.jQuery)
	}

	var script = document.createElement('script')
	var loaded = false
	script.src = fallbackUrl

	script.onerror = function() {
		rejectCallback()
	}
	script.onreadystatechange = script.onload = function() {
		if (loaded) {
			return
		}
		loadedCallback()
		loaded = true
	}

	document.getElementsByTagName('head')[0].appendChild(script)

}

module.exports = requiresJQuery
