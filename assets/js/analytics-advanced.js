// 🎯 NAMERLY ADVANCED ANALYTICS V2.0
// Enhanced tracking for performance and user behavior

class NamerlAnalytics {
  constructor() {
    this.events = [];
    this.sessionData = {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      pageViews: 0,
      generators: [],
      timeSpent: 0
    };
    this.init();
  }

  init() {
    // Enhanced event tracking
    this.trackPageView();
    this.trackUserInteractions();
    this.trackPerformanceMetrics();
    this.trackGeneratorUsage();
    this.trackScrollDepth();
    
    console.log('🎯 Namerly Advanced Analytics loaded');
  }

  // 📊 PAGE VIEW TRACKING
  trackPageView() {
    this.sessionData.pageViews++;
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        session_id: this.sessionData.sessionId,
        custom_map: {
          'custom_parameter_1': 'generator_category',
          'custom_parameter_2': 'user_language'
        }
      });
    }
    
    // Track generator category
    const category = this.getGeneratorCategory();
    if (category) {
      this.trackEvent('generator_visit', {
        category: category,
        page_url: window.location.pathname
      });
    }
  }

  // 🎮 GENERATOR USAGE TRACKING
  trackGeneratorUsage() {
    document.addEventListener('click', (e) => {
      // Track generate button clicks
      if (e.target.matches('#generateBtn, .generate-btn, [onclick*="generate"]')) {
        const category = this.getGeneratorCategory();
        this.trackEvent('generator_used', {
          category: category,
          timestamp: Date.now(),
          session_id: this.sessionData.sessionId
        });
        
        if (!this.sessionData.generators.includes(category)) {
          this.sessionData.generators.push(category);
        }
      }
      
      // Track copy actions
      if (e.target.matches('[onclick*="copyToClipboard"], .copy-btn')) {
        this.trackEvent('content_copied', {
          category: this.getGeneratorCategory(),
          action: 'copy_to_clipboard'
        });
      }
      
      // Track share actions
      if (e.target.matches('.share-btn, [onclick*="share"]')) {
        this.trackEvent('content_shared', {
          category: this.getGeneratorCategory(),
          action: 'share_content'
        });
      }
    });
  }

  // 📱 USER INTERACTION TRACKING
  trackUserInteractions() {
    // Track form interactions
    document.addEventListener('input', (e) => {
      if (e.target.matches('input, textarea, select')) {
        this.trackEvent('form_interaction', {
          field_type: e.target.type || 'text',
          field_name: e.target.name || 'unnamed',
          category: this.getGeneratorCategory()
        });
      }
    });

    // Track navigation
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="/"]')) {
        this.trackEvent('internal_navigation', {
          from_page: window.location.pathname,
          to_page: e.target.getAttribute('href'),
          link_text: e.target.textContent.trim()
        });
      }
    });

    // Track scroll behavior
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.trackScrollPosition();
      }, 1000);
    });
  }

  // 📊 PERFORMANCE METRICS TRACKING
  trackPerformanceMetrics() {
    // Track load time
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.trackEvent('page_performance', {
        load_time: Math.round(loadTime),
        dom_ready: Math.round(performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart),
        first_paint: this.getFirstPaint()
      });
    });

    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.trackEvent('core_web_vitals', {
          metric: 'lcp',
          value: Math.round(lastEntry.startTime),
          rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs_improvement' : 'poor'
        });
      }).observe({entryTypes: ['largest-contentful-paint']});

      // First Input Delay
      new PerformanceObserver((entryList) => {
        const firstInput = entryList.getEntries()[0];
        if (firstInput) {
          const fid = firstInput.processingStart - firstInput.startTime;
          this.trackEvent('core_web_vitals', {
            metric: 'fid',
            value: Math.round(fid),
            rating: fid < 100 ? 'good' : fid < 300 ? 'needs_improvement' : 'poor'
          });
        }
      }).observe({entryTypes: ['first-input']});
    }
  }

  // 📏 SCROLL DEPTH TRACKING
  trackScrollDepth() {
    const milestones = [25, 50, 75, 90, 100];
    const triggered = new Set();

    const checkScrollDepth = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !triggered.has(milestone)) {
          triggered.add(milestone);
          this.trackEvent('scroll_depth', {
            depth_percent: milestone,
            category: this.getGeneratorCategory()
          });
        }
      });
    };

    window.addEventListener('scroll', checkScrollDepth);
  }

  // 🏷️ UTILITY METHODS
  getGeneratorCategory() {
    const path = window.location.pathname;
    const categories = {
      '/bios/': 'instagram_bios',
      '/usernames/': 'usernames',
      '/pickup/': 'pickup_lines',
      '/roasts/': 'roasts',
      '/youtube/': 'youtube_titles',
      '/tiktok/': 'tiktok_content',
      '/whatsapp/': 'whatsapp_names',
      '/pets/': 'pet_names',
      '/gamers/': 'gamer_names',
      '/wifi/': 'wifi_names',
      '/sarcastic/': 'sarcastic_comments',
      '/phrases/': 'phrases',
      '/pranks/': 'pranks',
      '/icebreakers/': 'icebreakers',
      '/nicknames/': 'nicknames',
      '/excuses/': 'excuses',
      '/gym-excuses/': 'gym_excuses',
      '/social-excuses/': 'social_excuses',
      '/crush/': 'crush_names'
    };
    
    return categories[path] || 'homepage';
  }

  getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return firstPaint ? Math.round(firstPaint.startTime) : null;
  }

  trackScrollPosition() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);
    
    this.trackEvent('scroll_position', {
      scroll_percent: scrollPercent,
      category: this.getGeneratorCategory()
    });
  }

  // 📤 EVENT TRACKING
  trackEvent(eventName, parameters = {}) {
    const event = {
      event: eventName,
      timestamp: Date.now(),
      session_id: this.sessionData.sessionId,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      ...parameters
    };

    this.events.push(event);

    // Send to Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
    }

    // Send to custom analytics endpoint (if available)
    this.sendToCustomAnalytics(event);
  }

  // 🚀 CUSTOM ANALYTICS
  sendToCustomAnalytics(event) {
    // Store in localStorage for offline analysis
    try {
      const storedEvents = JSON.parse(localStorage.getItem('namerly_analytics') || '[]');
      storedEvents.push(event);
      
      // Keep only last 100 events
      if (storedEvents.length > 100) {
        storedEvents.splice(0, storedEvents.length - 100);
      }
      
      localStorage.setItem('namerly_analytics', JSON.stringify(storedEvents));
    } catch (e) {
      console.warn('Failed to store analytics event:', e);
    }
  }

  // 🆔 SESSION MANAGEMENT
  generateSessionId() {
    return 'namerly_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // 📊 GET SESSION SUMMARY
  getSessionSummary() {
    const currentTime = Date.now();
    this.sessionData.timeSpent = Math.round((currentTime - this.sessionData.startTime) / 1000);
    
    return {
      ...this.sessionData,
      totalEvents: this.events.length,
      generatorsUsed: this.sessionData.generators.length,
      timeSpentMinutes: Math.round(this.sessionData.timeSpent / 60)
    };
  }

  // 🎯 TRACK CONVERSION EVENTS
  trackConversion(type, value = null) {
    this.trackEvent('conversion', {
      conversion_type: type,
      conversion_value: value,
      category: this.getGeneratorCategory(),
      session_generators: this.sessionData.generators.join(',')
    });
  }

  // 📱 TRACK MOBILE/DESKTOP USAGE
  trackDeviceInfo() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?=.*Mobile)/i.test(navigator.userAgent);
    
    this.trackEvent('device_info', {
      device_type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight
    });
  }
}

// 🔄 SESSION END TRACKING
window.addEventListener('beforeunload', () => {
  if (window.namelyAnalytics) {
    const summary = window.namelyAnalytics.getSessionSummary();
    
    // Send session summary
    if (typeof gtag !== 'undefined') {
      gtag('event', 'session_end', {
        session_duration: summary.timeSpent,
        pages_viewed: summary.pageViews,
        generators_used: summary.generatorsUsed,
        total_events: summary.totalEvents
      });
    }
  }
});

// 🚀 INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
  if (getCookie('namerly_analytics_consent') === 'accepted') {
    window.namelyAnalytics = new NamerlAnalytics();
    window.namelyAnalytics.trackDeviceInfo();
  }
});

console.log('🎯 Namerly Advanced Analytics Suite loaded!');
