if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('serviceWorker.js').then((registration) => {
		console.log(registration)
	}).catch((error) => {
		console.log('SW registration failed ', error)
	})
}
