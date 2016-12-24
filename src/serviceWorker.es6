const CACHE_NAME = 'v1'

// Url not added to cache
const CACHE_BLACKLIST = [
	'^https?:\/\/[^\/.*]+(:\d+)?\/browser-sync\/.*$'
]

self.addEventListener('install', (e) => {
	console.log('Installing service worker')
})

self.addEventListener('fetch', (e) => {
	const fetchPromise = caches.match(e.request)
		.then(response => response || Promise.reject())
		.catch(() => fetch(e.request.clone()))

	e.respondWith(fetchPromise)

	// Cache response
	fetchPromise.then((response) => {
		if (e.request.method === 'GET' && response && response.status === 200 && response.type === 'basic') {
			// Check if url is not blacklisted
			let blacklisted = false
			for(const rule of CACHE_BLACKLIST) {
				if(response.url.match(rule)) {
					blacklisted = true
					break
				}
			}
			if(!blacklisted) {
				let responseToCache = response.clone()
				caches.open(CACHE_NAME).then((cache) => {
					cache.put(e.request, responseToCache)
				})
			}
		}
	})



});
