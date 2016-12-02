const CACHE_NAME = 'v1'

self.addEventListener('install', (e) => {
	console.log('Installing service worker')
})

self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request)
			.then((response) => {
				if (response) {
					return response;
				}

				let fetchRequest = e.request.clone()

				return fetch(fetchRequest).then((response) => {
					if (fetchRequest.method === 'GET' && response && response.status === 200 && response.type === 'basic') {
						let responseToCache = response.clone()
						caches.open(CACHE_NAME).then((cache) => {
							cache.put(e.request, responseToCache)
						})
					}

					return response
				})
			}
		)
	);
});
