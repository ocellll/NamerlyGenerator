// 📊 NAMERLY GOOGLE ANALYTICS 4 ENHANCED
// Advanced GA4 implementation with custom events and e-commerce tracking

class NamelyGA4 {
  constructor() {
    this.isLoaded = false;
    this.measurementId = 'G-ZCBGMRHJ21';
    this.debugMode = window.location.hostname === 'localhost';
    this.conversionEvents = [];
    this.init();
  }

  init() {
    // Only initialize if consent is given
    if (this.hasAnalyticsConsent()) {
      this.loadGA4();
      this.setupEnhancedEvents();
      this.setupEcommerce();
      console.log('📊 GA4 Enhanced Analytics loaded');
    }
  }

  hasAnalyticsConsent() {
    return this.getCookie('namerly_analytics_consent') === 'accepted';
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  loadGA4() {
    if (this.isLoaded) return;

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', this.measurementId, {
        cookie_domain: 'namerlygenerator.netlify.app',
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        debug_mode: this.debugMode,
        custom_map: {
          'custom_parameter_1': 'generator_category',
          'custom_parameter_2': 'user_type',
          'custom_parameter_3': 'content_language',
          'custom_parameter_4': 'session_depth'
        }
      });

      this.isLoaded = true;
      this.trackPageView();
    };
  }

  // 📄 ENHANCED PAGE VIEW TRACKING
  trackPageView() {
    if (!window.gtag) return;

    const category = this.getGeneratorCategory();
    const userType = this.getUserType();
    
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      generator_category: category,
      user_type: userType,
      content_language: this.getContentLanguage(),
      session_depth: this.getSessionDepth()
    });
  }

  // 🎯 GENERATOR USAGE TRACKING
  trackGeneratorUsage(category, options = {}) {
    if (!window.gtag) return;

    gtag('event', 'generator_used', {
      generator_category: category,
      generator_type: options.type || 'standard',
      result_count: options.resultCount || 1,
      custom_parameter_1: category,
      custom_parameter_2: this.getUserType(),
      value: 1
    });

    // Track as conversion for popular generators
    if (['bios', 'usernames', 'pickup', 'youtube'].includes(category)) {
      this.trackConversion('generator_engagement', category);
    }
  }

  // 📋 CONTENT INTERACTION TRACKING
  trackContentInteraction(action, category, content = '') {
    if (!window.gtag) return;

    gtag('event', 'content_interaction', {
      interaction_type: action, // 'copy', 'share', 'like', 'save'
      generator_category: category,
      content_snippet: content.substring(0, 50),
      custom_parameter_1: category,
      custom_parameter_2: action,
      value: action === 'copy' ? 2 : action === 'share' ? 3 : 1
    });
  }

  // 🛒 E-COMMERCE TRACKING (for future premium features)
  setupEcommerce() {
    // Track virtual purchases/upgrades
    window.trackPurchase = (itemId, itemName, category, value) => {
      if (!window.gtag) return;

      gtag('event', 'purchase', {
        transaction_id: 'namerly_' + Date.now(),
        value: value,
        currency: 'USD',
        items: [{
          item_id: itemId,
          item_name: itemName,
          item_category: category,
          quantity: 1,
          price: value
        }]
      });
    };

    // Track add to cart (for premium generators)
    window.trackAddToCart = (itemId, itemName, value) => {
      if (!window.gtag) return;

      gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: value,
        items: [{
          item_id: itemId,
          item_name: itemName,
          item_category: 'premium_generator',
          quantity: 1,
          price: value
        }]
      });
    };
  }

  // 🎯 CONVERSION TRACKING
  trackConversion(conversionType, category = null) {
    if (!window.gtag) return;

    const conversionValue = this.getConversionValue(conversionType);
    
    gtag('event', 'conversion', {
      conversion_type: conversionType,
      generator_category: category,
      conversion_value: conversionValue,
      custom_parameter_1: category || 'general',
      custom_parameter_2: conversionType,
      value: conversionValue
    });

    // Store conversion for session analysis
    this.conversionEvents.push({
      type: conversionType,
      category: category,
      timestamp: Date.now()
    });
  }

  // 📱 USER ENGAGEMENT TRACKING
  trackEngagement(engagementType, duration = 0) {
    if (!window.gtag) return;

    gtag('event', 'user_engagement', {
      engagement_type: engagementType,
      engagement_time_msec: duration,
      generator_category: this.getGeneratorCategory(),
      session_conversions: this.conversionEvents.length,
      custom_parameter_1: this.getGeneratorCategory(),
      custom_parameter_2: engagementType
    });
  }

  // 🔍 SEARCH TRACKING (if search feature is added)
  trackSearch(searchTerm, category = null, resultsCount = 0) {
    if (!window.gtag) return;

    gtag('event', 'search', {
      search_term: searchTerm,
      generator_category: category,
      results_count: resultsCount,
      custom_parameter_1: category || 'global',
      custom_parameter_2: 'search'
    });
  }

  // 🚨 ERROR TRACKING
  trackError(errorType, errorMessage, category = null) {
    if (!window.gtag) return;

    gtag('event', 'exception', {
      description: `${errorType}: ${errorMessage}`,
      fatal: false,
      generator_category: category,
      custom_parameter_1: category || 'system',
      custom_parameter_2: errorType
    });
  }

  // 📊 PERFORMANCE TRACKING
  trackPerformance(metric, value, category = null) {
    if (!window.gtag) return;

    gtag('event', 'performance_metric', {
      metric_name: metric,
      metric_value: Math.round(value),
      generator_category: category,
      custom_parameter_1: category || 'general',
      custom_parameter_2: metric
    });
  }

  // 🎨 A/B TEST TRACKING
  trackABTest(testName, variant, category = null) {
    if (!window.gtag) return;

    gtag('event', 'ab_test_view', {
      test_name: testName,
      test_variant: variant,
      generator_category: category,
      custom_parameter_1: category || 'general',
      custom_parameter_2: testName + '_' + variant
    });
  }

  // 🔧 UTILITY METHODS
  getGeneratorCategory() {
    const path = window.location.pathname;
    const categories = {
      '/bios/': 'bios',
      '/usernames/': 'usernames', 
      '/pickup/': 'pickup',
      '/roasts/': 'roasts',
      '/youtube/': 'youtube',
      '/tiktok/': 'tiktok',
      '/whatsapp/': 'whatsapp',
      '/pets/': 'pets',
      '/gamers/': 'gamers',
      '/wifi/': 'wifi',
      '/sarcastic/': 'sarcastic',
      '/phrases/': 'phrases',
      '/pranks/': 'pranks',
      '/icebreakers/': 'icebreakers',
      '/nicknames/': 'nicknames',
      '/excuses/': 'excuses',
      '/gym-excuses/': 'gym_excuses',
      '/social-excuses/': 'social_excuses',
      '/crush/': 'crush'
    };
    return categories[path] || 'homepage';
  }

  getUserType() {
    const visits = parseInt(localStorage.getItem('namerly_visit_count') || '0') + 1;
    localStorage.setItem('namerly_visit_count', visits.toString());
    
    if (visits === 1) return 'new_user';
    if (visits <= 5) return 'returning_user';
    return 'loyal_user';
  }

  getContentLanguage() {
    const html = document.documentElement;
    return html.lang || 'en';
  }

  getSessionDepth() {
    return parseInt(sessionStorage.getItem('namerly_page_depth') || '0') + 1;
  }

  getConversionValue(type) {
    const values = {
      'generator_engagement': 1,
      'content_copy': 2,
      'content_share': 3,
      'premium_interest': 5,
      'contact_form': 10
    };
    return values[type] || 1;
  }

  // 📊 SESSION SUMMARY
  getSessionSummary() {
    return {
      conversions: this.conversionEvents.length,
      userType: this.getUserType(),
      category: this.getGeneratorCategory(),
      conversionTypes: [...new Set(this.conversionEvents.map(e => e.type))]
    };
  }

  // 🎯 ENHANCED EVENT SETUP
  setupEnhancedEvents() {
    // Auto-track outbound links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.hostname !== window.location.hostname) {
        this.trackEvent('outbound_click', {
          link_url: link.href,
          link_text: link.textContent.trim()
        });
      }
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form.tagName === 'FORM') {
        this.trackEvent('form_submit', {
          form_id: form.id || 'unknown',
          generator_category: this.getGeneratorCategory()
        });
      }
    });

    // Track scroll milestones
    let scrollMilestones = [25, 50, 75, 90];
    let triggeredMilestones = new Set();
    
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      scrollMilestones.forEach(milestone => {
        if (scrollPercent >= milestone && !triggeredMilestones.has(milestone)) {
          triggeredMilestones.add(milestone);
          this.trackEvent('scroll_milestone', {
            scroll_depth: milestone,
            generator_category: this.getGeneratorCategory()
          });
        }
      });
    });
  }

  trackEvent(eventName, parameters = {}) {
    if (!window.gtag) return;
    gtag('event', eventName, parameters);
  }
}

// 🚀 GLOBAL FUNCTIONS FOR EASY ACCESS
window.trackGenerator = function(category, options = {}) {
  if (window.namelyGA4) {
    window.namelyGA4.trackGeneratorUsage(category, options);
  }
};

window.trackCopy = function(category, content = '') {
  if (window.namelyGA4) {
    window.namelyGA4.trackContentInteraction('copy', category, content);
  }
};

window.trackShare = function(category, content = '') {
  if (window.namelyGA4) {
    window.namelyGA4.trackContentInteraction('share', category, content);
  }
};

// 🚀 INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
  window.namelyGA4 = new NamelyGA4();
});

console.log('📊 Namerly GA4 Enhanced Analytics Suite loaded!');
