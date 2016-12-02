if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('scripts/serviceWorker.js').then((registration) => {
		console.log(registration)
	})
}
