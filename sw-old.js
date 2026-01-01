const CACHE_NAME = 'namerly-v1.0.5';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/css/ai-pages.css',
  '/assets/js/app.js',
  '/assets/js/ai-common.js',
  '/assets/manifest.json',
  
  // AI Generators (Premium) - Solo cache básico
  '/ai-pickup.html',
  '/ai-roasts.html', 
  '/ai-captions.html',
  
  // Categorías gratuitas (cache completo para ads)
  '/crush/index.html',
  '/usernames/index.html',
  '/pickup/index.html',
  '/bios/index.html',
  '/youtube/index.html',
  '/tiktok/index.html',
  '/whatsapp/index.html',
  '/wifi/index.html',
  '/pets/index.html',
  '/gamers/index.html',
  '/nicknames/index.html',
  '/sarcastic/index.html',
  '/roasts/index.html',
  '/icebreakers/index.html',
  '/pranks/index.html',
  '/phrases/index.html',
  '/excuses/index.html',
  '/gym-excuses/index.html',
  '/social-excuses/index.html',
  
  // Páginas legales (para ads compliance)
  '/privacy-policy.html',
  '/terms-of-service.html',
  '/cookie-policy.html'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('Namerly SW: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Namerly SW: Caching files...');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Namerly SW: All files cached successfully');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('Namerly SW: Cache failed:', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Namerly SW: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Namerly SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Namerly SW: Activated successfully');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  if (event.request.url.endsWith('/sitemap.xml')) {
  return fetch(event.request); // no usar caché para sitemap
}

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Namerly SW: Serving from cache:', event.request.url);
          return response;
        }

        console.log('Namerly SW: Fetching from network:', event.request.url);
        return fetch(event.request).then(response => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Add to cache for future use
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(err => {
          console.error('Namerly SW: Network fetch failed:', err);
          
          // Return offline page for HTML requests
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html');
          }
          
          throw err;
        });
      })
  );
});

// Background sync for analytics
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Namerly SW: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Send queued analytics events when online
  return Promise.resolve();
}

// Push notification support (for future features)
self.addEventListener('push', event => {
  console.log('Namerly SW: Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'New content available!',
    icon: '/assets/images/icon-192x192.png',
    badge: '/assets/images/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/assets/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/images/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Namerly', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('Namerly SW: Notification clicked');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
  console.log('Namerly SW: Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(event.data.payload);
      })
    );
  }
});

console.log('Namerly Service Worker loaded successfully!');
