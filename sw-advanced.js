// 🚀 NAMERLY ADVANCED SERVICE WORKER V2.0
// High-performance caching with intelligent strategies

const CACHE_VERSION = '2.0.1';
const STATIC_CACHE = `namerly-static-v${CACHE_VERSION}`;
const DYNAMIC_CACHE = `namerly-dynamic-v${CACHE_VERSION}`;
const IMAGE_CACHE = `namerly-images-v${CACHE_VERSION}`;
const API_CACHE = `namerly-api-v${CACHE_VERSION}`;

// Cache strategies configuration
const CACHE_STRATEGIES = {
  // Critical resources - Cache First
  static: [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/css/ai-pages.css',
    '/assets/js/app.js',
    '/assets/js/ai-common.js',
    '/assets/manifest.json'
  ],
  
  // Generator pages - Stale While Revalidate
  pages: [
    '/crush/index.html', '/pets/index.html', '/whatsapp/index.html', 
    '/social-excuses/index.html', '/pickup/index.html', '/usernames/index.html', 
    '/bios/index.html', '/roasts/index.html', '/excuses/index.html', 
    '/tiktok/index.html', '/gamers/index.html', '/gym-excuses/index.html',
    '/wifi/index.html', '/youtube/index.html', '/sarcastic/index.html', 
    '/pranks/index.html', '/nicknames/index.html', '/icebreakers/index.html', 
    '/phrases/index.html', '/ai-pickup.html', '/ai-roasts.html', '/ai-captions.html'
  ],
  
  // Legal & Info - Network First
  legal: [
    '/privacy-policy.html', '/terms-of-service.html',
    '/disclaimer.html', '/cookie-policy.html', '/contact.html'
  ]
};

// Performance metrics tracking
let performanceMetrics = {
  cacheHits: 0,
  networkRequests: 0,
  totalRequests: 0
};

// 📦 INTELLIGENT INSTALL EVENT
self.addEventListener('install', event => {
  console.log('🚀 Namerly SW v2.0: Installing with advanced caching...');
  
  event.waitUntil(
    Promise.all([
      // Pre-cache critical static resources
      caches.open(STATIC_CACHE).then(cache => {
        console.log('📦 Caching critical static resources');
        return cache.addAll(CACHE_STRATEGIES.static);
      }),
      
      // Pre-cache essential pages
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('📄 Pre-caching essential pages');
        return cache.addAll(CACHE_STRATEGIES.pages.slice(0, 8)); // First 8 pages
      })
    ]).then(() => {
      console.log('✅ Namerly SW v2.0: Installation complete');
      return self.skipWaiting();
    }).catch(err => {
      console.error('❌ Installation failed:', err);
    })
  );
});

// 🧹 ADVANCED ACTIVATE EVENT
self.addEventListener('activate', event => {
  console.log('🔄 Namerly SW v2.0: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        const validCaches = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE, API_CACHE];
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!validCaches.includes(cacheName)) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Take control of all pages immediately
      self.clients.claim()
    ]).then(() => {
      console.log('✅ Namerly SW v2.0: Activation complete');
    })
  );
});

// 🌐 INTELLIGENT FETCH EVENT WITH MULTIPLE STRATEGIES
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip cross-origin requests and specific files
  if (!request.url.startsWith(self.location.origin) || 
      request.url.includes('/sitemap.xml') ||
      request.url.includes('/robots.txt')) {
    return;
  }
  
  // Route to appropriate cache strategy
  if (isStaticResource(url.pathname)) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
  } else if (isGeneratorPage(url.pathname)) {
    event.respondWith(staleWhileRevalidateStrategy(request, DYNAMIC_CACHE));
  } else if (isLegalPage(url.pathname)) {
    event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
  } else if (isImageResource(url.pathname)) {
    event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request, DYNAMIC_CACHE));
  }
});

// 🎯 CACHE FIRST STRATEGY (for static resources)
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      performanceMetrics.cacheHits++;
      console.log('💾 Cache hit:', request.url);
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    performanceMetrics.networkRequests++;
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      console.log('📥 Cached from network:', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ Cache first failed:', error);
    return getFallbackResponse(request);
  }
}

// 🔄 STALE WHILE REVALIDATE STRATEGY (for dynamic content)
async function staleWhileRevalidateStrategy(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    
    // Always fetch in background to update cache
    const fetchPromise = fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        const cache = caches.open(cacheName);
        cache.then(c => c.put(request, networkResponse.clone()));
        console.log('🔄 Background update:', request.url);
      }
      return networkResponse;
    }).catch(err => {
      console.error('🌐 Network update failed:', err);
      return null;
    });
    
    if (cachedResponse) {
      performanceMetrics.cacheHits++;
      console.log('⚡ Stale cache hit:', request.url);
      return cachedResponse;
    }
    
    performanceMetrics.networkRequests++;
    return await fetchPromise || getFallbackResponse(request);
  } catch (error) {
    console.error('❌ Stale while revalidate failed:', error);
    return getFallbackResponse(request);
  }
}

// 🌐 NETWORK FIRST STRATEGY (for legal pages)
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    performanceMetrics.networkRequests++;
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      console.log('🌐 Network first success:', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('🔄 Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      performanceMetrics.cacheHits++;
      return cachedResponse;
    }
    return getFallbackResponse(request);
  }
}

// 🆘 FALLBACK RESPONSES
function getFallbackResponse(request) {
  if (request.headers.get('accept').includes('text/html')) {
    return caches.match('/index.html') || 
           new Response('Offline - Please check your connection', {
             status: 503,
             headers: { 'Content-Type': 'text/html' }
           });
  }
  
  if (request.headers.get('accept').includes('image/')) {
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em">📱</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
  
  return new Response('Resource not available offline', { status: 503 });
}

// 🔍 RESOURCE TYPE DETECTION
function isStaticResource(pathname) {
  return CACHE_STRATEGIES.static.some(path => pathname === path || pathname.endsWith(path));
}

function isGeneratorPage(pathname) {
  return CACHE_STRATEGIES.pages.some(path => pathname.includes(path.replace('/index.html', '')));
}

function isLegalPage(pathname) {
  return CACHE_STRATEGIES.legal.some(path => pathname.includes(path));
}

function isImageResource(pathname) {
  return /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(pathname);
}

// 📊 PERFORMANCE MONITORING
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'GET_PERFORMANCE_METRICS') {
    performanceMetrics.totalRequests = performanceMetrics.cacheHits + performanceMetrics.networkRequests;
    const cacheHitRate = performanceMetrics.totalRequests > 0 ? 
      (performanceMetrics.cacheHits / performanceMetrics.totalRequests * 100).toFixed(1) : 0;
    
    event.ports[0].postMessage({
      ...performanceMetrics,
      cacheHitRate: `${cacheHitRate}%`
    });
  }
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 🔄 BACKGROUND SYNC for offline analytics
self.addEventListener('sync', event => {
  if (event.tag === 'background-analytics') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  try {
    // Send queued analytics when online
    const cache = await caches.open(API_CACHE);
    // Implementation for analytics sync
    console.log('📊 Analytics sync completed');
  } catch (error) {
    console.error('📊 Analytics sync failed:', error);
  }
}

// 🔔 PUSH NOTIFICATIONS (Future feature)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : '🎯 New Namerly features available!',
    icon: '/assets/images/icon-192x192.png',
    badge: '/assets/images/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: { dateOfArrival: Date.now(), primaryKey: 1 },
    actions: [
      { action: 'explore', title: '🚀 Explore', icon: '/assets/images/checkmark.png' },
      { action: 'close', title: '❌ Close', icon: '/assets/images/xmark.png' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Namerly Generator', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  }
});

console.log('🚀 Namerly Advanced Service Worker v2.0 loaded successfully!');
