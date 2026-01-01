# Namerly - Technical SEO Configuration

## .htaccess Configuration (For Apache Servers)

```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/ico "access plus 1 year"
    ExpiresByType image/icon "access plus 1 year"
    ExpiresByType text/html "access plus 1 day"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

# URL redirects (Clean URLs)
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^/]+)/?$ $1/index.html [L]

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove trailing slashes
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [R=301,L]
```

## Nginx Configuration

```nginx
# Compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

# Cache control
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(html)$ {
    expires 1d;
    add_header Cache-Control "public";
}

# Security headers
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header X-XSS-Protection "1; mode=block";

# Clean URLs
location / {
    try_files $uri $uri/ $uri/index.html =404;
}
```

## Service Worker (For PWA)

```javascript
// sw.js
const CACHE_NAME = 'namerly-v1.0.0';
const urlsToCache = [
  '/',
  '/assets/css/style.css',
  '/assets/js/app.js',
  '/crush/',
  '/usernames/',
  '/pickup/',
  '/bios/',
  '/youtube/',
  '/tiktok/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

## Performance Optimization

### Critical CSS Inline
```html
<style>
/* Critical above-the-fold CSS */
body{font-family:Arial,sans-serif;margin:0;padding:0}
header{background:#007acc;color:white;padding:1rem;text-align:center}
.category-card{display:inline-block;margin:10px;padding:20px;border:1px solid #ddd;border-radius:8px;cursor:pointer;text-align:center;min-width:150px}
</style>
```

### Lazy Loading Images
```html
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy" alt="Description">
```

### Preload Critical Resources
```html
<link rel="preload" href="/assets/css/style.css" as="style">
<link rel="preload" href="/assets/js/app.js" as="script">
```

## Structured Data Templates

### WebApplication Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Namerly",
  "url": "https://namerly.app",
  "description": "Free viral content and name generator",
  "applicationCategory": "EntertainmentApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### SoftwareApplication Schema (Per Category)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Username Generator by Namerly",
  "description": "Generate unique social media usernames",
  "url": "https://namerly.app/usernames/",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web"
}
```

## Core Web Vitals Optimization

### Largest Contentful Paint (LCP)
- Optimize hero image loading
- Use proper image formats (WebP)
- Implement critical CSS
- Use CDN for static assets

### First Input Delay (FID)
- Minimize JavaScript execution
- Use requestIdleCallback for non-critical tasks
- Implement code splitting

### Cumulative Layout Shift (CLS)
- Set explicit dimensions for images
- Avoid inserting content above existing content
- Use CSS aspect-ratio for responsive elements

## Mobile Optimization

### Viewport Configuration
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

### Touch-friendly Design
```css
.category-card {
    min-height: 44px; /* Minimum touch target */
    touch-action: manipulation;
}
```

### Responsive Images
```html
<picture>
  <source media="(max-width: 768px)" srcset="mobile-image.webp">
  <source media="(min-width: 769px)" srcset="desktop-image.webp">
  <img src="fallback-image.jpg" alt="Description">
</picture>
```

## International SEO

### Hreflang Implementation
```html
<link rel="alternate" hreflang="en" href="https://namerly.app/">
<link rel="alternate" hreflang="es" href="https://namerly.app/es/">
<link rel="alternate" hreflang="x-default" href="https://namerly.app/">
```

### Language Detection
```javascript
const userLang = navigator.language || navigator.userLanguage;
const supportedLangs = ['en', 'es'];
const defaultLang = supportedLangs.includes(userLang.substr(0, 2)) ? 
                   userLang.substr(0, 2) : 'en';
```

## Monitoring & Analytics

### Custom Events Tracking
```javascript
// Track category engagement
gtag('event', 'category_view', {
  'category': categoryName,
  'engagement_time_msec': timeSpent
});

// Track content generation
gtag('event', 'content_generated', {
  'category': categoryName,
  'content_type': contentType,
  'language': currentLanguage
});

// Track sharing
gtag('event', 'content_shared', {
  'platform': platform,
  'category': categoryName,
  'content_type': contentType
});
```

### Error Tracking
```javascript
window.addEventListener('error', function(e) {
  gtag('event', 'exception', {
    'description': e.error.toString(),
    'fatal': false,
    'category': 'JavaScript Error'
  });
});
```
