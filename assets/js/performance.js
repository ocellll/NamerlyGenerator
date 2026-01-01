// 🚀 NAMERLY PERFORMANCE OPTIMIZER V2.0
// Advanced performance monitoring and optimization

class NamerlPerformance {
  constructor() {
    this.metrics = {
      startTime: performance.now(),
      loadTime: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      firstInputDelay: 0
    };
    
    this.init();
  }

  init() {
    // Performance monitoring
    this.trackCoreWebVitals();
    this.implementLazyLoading();
    this.optimizeImages();
    this.preloadCriticalResources();
    this.setupIntersectionObserver();
    
    console.log('🚀 Namerly Performance Optimizer loaded');
  }

  // 📊 CORE WEB VITALS TRACKING
  trackCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.largestContentfulPaint = lastEntry.startTime;
      console.log('📊 LCP:', this.metrics.largestContentfulPaint);
    }).observe({entryTypes: ['largest-contentful-paint']});

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const firstInput = entryList.getEntries()[0];
      if (firstInput) {
        this.metrics.firstInputDelay = firstInput.processingStart - firstInput.startTime;
        console.log('⚡ FID:', this.metrics.firstInputDelay);
      }
    }).observe({entryTypes: ['first-input']});

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.cumulativeLayoutShift = clsValue;
      console.log('📐 CLS:', this.metrics.cumulativeLayoutShift);
    }).observe({entryTypes: ['layout-shift']});

    // Track page load completion
    window.addEventListener('load', () => {
      this.metrics.loadTime = performance.now() - this.metrics.startTime;
      console.log('⏱️ Total Load Time:', this.metrics.loadTime);
      this.reportMetrics();
    });
  }

  // 🖼️ LAZY LOADING IMPLEMENTATION
  implementLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Apply lazy loading to images
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // 🎨 IMAGE OPTIMIZATION
  optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add loading="lazy" for native lazy loading
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add decoding="async" for better performance
      img.setAttribute('decoding', 'async');
      
      // Progressive enhancement for WebP
      if (this.supportsWebP()) {
        const src = img.src || img.dataset.src;
        if (src && !src.includes('.webp')) {
          const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');
          img.dataset.webpSrc = webpSrc;
        }
      }
    });
  }

  // 🔧 CHECK WEBP SUPPORT
  supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  // 📦 PRELOAD CRITICAL RESOURCES
  preloadCriticalResources() {
    const criticalPaths = [
      '/bios/',
      '/usernames/',
      '/pickup/',
      '/youtube/'
    ];

    // Preload on mouse hover or after 3 seconds
    let preloaded = false;
    
    const preloadResources = () => {
      if (preloaded) return;
      preloaded = true;
      
      criticalPaths.forEach(path => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = path;
        document.head.appendChild(link);
      });
      
      console.log('📦 Critical resources preloaded');
    };

    // Preload on first user interaction
    document.addEventListener('mouseover', preloadResources, { once: true });
    document.addEventListener('touchstart', preloadResources, { once: true });
    
    // Fallback: preload after 3 seconds
    setTimeout(preloadResources, 3000);
  }

  // 👁️ INTERSECTION OBSERVER FOR ANIMATIONS
  setupIntersectionObserver() {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    // Observe elements for animation
    document.querySelectorAll('.category-card, .feature-card').forEach(el => {
      animationObserver.observe(el);
    });
  }

  // 📊 REPORT METRICS TO ANALYTICS
  reportMetrics() {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        custom_parameter_1: this.metrics.largestContentfulPaint,
        custom_parameter_2: this.metrics.firstInputDelay,
        custom_parameter_3: this.metrics.cumulativeLayoutShift,
        custom_parameter_4: this.metrics.loadTime
      });
    }

    // Send to service worker for analysis
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'PERFORMANCE_METRICS',
        metrics: this.metrics
      });
    }
  }

  // 🎯 GET PERFORMANCE SCORE
  getPerformanceScore() {
    let score = 100;
    
    // LCP scoring (under 2.5s is good)
    if (this.metrics.largestContentfulPaint > 4000) score -= 30;
    else if (this.metrics.largestContentfulPaint > 2500) score -= 15;
    
    // FID scoring (under 100ms is good)
    if (this.metrics.firstInputDelay > 300) score -= 25;
    else if (this.metrics.firstInputDelay > 100) score -= 10;
    
    // CLS scoring (under 0.1 is good)
    if (this.metrics.cumulativeLayoutShift > 0.25) score -= 25;
    else if (this.metrics.cumulativeLayoutShift > 0.1) score -= 10;
    
    // Load time scoring
    if (this.metrics.loadTime > 3000) score -= 20;
    else if (this.metrics.loadTime > 1500) score -= 10;
    
    return Math.max(0, score);
  }
}

// 🚀 ADVANCED LOADING STRATEGIES
class ResourceLoader {
  static preloadFont(fontFamily, fontWeight = '400') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = `https://fonts.gstatic.com/s/${fontFamily.toLowerCase()}/v${Math.floor(Math.random() * 20) + 1}/${fontFamily.toLowerCase()}-${fontWeight}.woff2`;
    document.head.appendChild(link);
  }

  static loadScriptAsync(src, onLoad = null) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    if (onLoad) script.onload = onLoad;
    document.head.appendChild(script);
    return script;
  }

  static loadStyleAsync(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = function() { this.media = 'all'; };
    document.head.appendChild(link);
    return link;
  }
}

// 📱 MOBILE PERFORMANCE OPTIMIZATIONS
class MobileOptimizer {
  static optimize() {
    if (this.isMobile()) {
      // Reduce animation complexity on mobile
      document.documentElement.style.setProperty('--animation-duration', '0.2s');
      
      // Enable hardware acceleration
      document.body.style.transform = 'translateZ(0)';
      
      // Optimize scroll performance
      document.addEventListener('touchstart', function() {}, { passive: true });
      document.addEventListener('touchmove', function() {}, { passive: true });
      
      console.log('📱 Mobile optimizations applied');
    }
  }

  static isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}

// 🔄 SERVICE WORKER COMMUNICATION
class SWManager {
  static init() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('✅ SW registered:', registration.scope);
          
          // Check for updates
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
        })
        .catch(error => {
          console.error('❌ SW registration failed:', error);
        });

      // Listen for SW messages
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data.type === 'CACHE_UPDATED') {
          this.showUpdateNotification();
        }
      });
    }
  }

  static showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
      <div class="update-content">
        <span>🚀 New version available!</span>
        <button onclick="location.reload()">Update</button>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 5000);
  }
}

// 🎯 INITIALIZE EVERYTHING
document.addEventListener('DOMContentLoaded', () => {
  new NamerlPerformance();
  MobileOptimizer.optimize();
  SWManager.init();
});

// Export for global use
window.NamerlPerformance = NamerlPerformance;
window.ResourceLoader = ResourceLoader;

console.log('🚀 Namerly Performance Suite loaded successfully!');
