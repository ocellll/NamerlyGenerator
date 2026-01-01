/**
 * NAMERLY ANALYTICS SYSTEM
 * Google Analytics + Microsoft Clarity + Custom Events
 */

class AnalyticsManager {
  constructor() {
    this.config = {
      // Replace with your actual IDs after creating accounts
      googleAnalytics: 'G-ZCBGMRHJ21', 
      microsoftClarity: 'slkofqd3y3',
      
      // Custom events we'll track
      events: {
        generation: 'content_generation',
        social_share: 'social_share', 
        ai_limit_reached: 'ai_limit_reached',
        unlock_attempt: 'unlock_attempt',
        affiliate_click: 'affiliate_click'
      }
    };
    
    this.sessionData = {
      startTime: Date.now(),
      pageViews: 0,
      generations: 0,
      category: this.detectCategory()
    };
    
    this.init();
  }

  async init() {
    // Only load analytics in production
    if (this.isProduction()) {
      await this.loadGoogleAnalytics();
      await this.loadMicrosoftClarity();
    }
    
    this.setupCustomTracking();
    this.trackPageView();
    
    console.log('📊 Analytics loaded for:', window.location.hostname);
  }

  isProduction() {
    return !window.location.hostname.includes('localhost') && 
           !window.location.hostname.includes('127.0.0.1');
  }

  // 📈 Google Analytics 4
  async loadGoogleAnalytics() {
    try {
      // Check if gtag is already loaded (from HTML)
      if (window.gtag) {
        console.log('✅ Google Analytics already loaded from HTML');
        return;
      }
      
      // Load gtag script (fallback)
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalytics}`;
      document.head.appendChild(script1);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      
      gtag('js', new Date());
      gtag('config', this.config.googleAnalytics, {
        // Enhanced measurement
        enhanced_measurements: true,
        // Cookie settings for privacy
        anonymize_ip: true,
        cookie_expires: 63072000, // 2 years
        cookie_domain: 'namerlygenerator.netlify.app',
        // Custom parameters
        custom_map: {
          custom_parameter_1: 'page_category',
          custom_parameter_2: 'ai_usage'
        }
      });

      console.log('✅ Google Analytics loaded via JavaScript');
    } catch (error) {
      console.error('❌ Google Analytics failed to load:', error);
    }
  }

  // 🔍 Microsoft Clarity (Heatmaps & User Recordings)
async loadMicrosoftClarity() {
  try {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/slkofqd3y3";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "slkofqd3y3");
    `;
    document.head.appendChild(script);

    console.log('✅ Microsoft Clarity loaded');
  } catch (error) {
    console.error('❌ Microsoft Clarity failed to load:', error);
  }
}


  // 🎯 Custom Event Tracking
  setupCustomTracking() {
    // Track AI generations
    this.interceptAIUsage();
    
    // Track social sharing
    this.trackSocialSharing();
    
    // Track category usage
    this.trackCategoryUsage();
    
    // Track user engagement
    this.trackEngagement();
    
    // Track affiliate clicks
    this.trackAffiliateClicks();
  }

  interceptAIUsage() {
    // Hook into AI generation functions
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const url = args[0];
      
      if (typeof url === 'string' && (
        url.includes('huggingface.co') || 
        url.includes('openai.com') || 
        url.includes('ai-api')
      )) {
        this.trackEvent('ai_generation_attempt', {
          category: this.sessionData.category,
          usage_count: this.sessionData.generations++
        });
      }
      
      return originalFetch.apply(this, args);
    };
  }

  trackSocialSharing() {
    // Track share button clicks
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('share-btn') || 
          e.target.closest('.share-btn')) {
        
        const platform = this.detectSocialPlatform(e.target);
        this.trackEvent('social_share', {
          platform: platform,
          category: this.sessionData.category,
          content_type: 'generated_content'
        });
      }
    });
  }

  trackCategoryUsage() {
    // Track which generators are most popular
    const category = this.detectCategory();
    if (category) {
      this.trackEvent('category_visit', {
        category: category,
        is_ai: category.includes('ai-'),
        timestamp: Date.now()
      });
    }
  }

  trackEngagement() {
    let engagementScore = 0;
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (scrollPercent >= 75) {
          engagementScore += 10;
          this.trackEvent('high_engagement', { scroll_depth: scrollPercent });
        }
      }
    });

    // Track time on page
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - this.sessionData.startTime;
      this.trackEvent('session_end', {
        time_on_page: timeOnPage,
        page_views: this.sessionData.pageViews,
        generations: this.sessionData.generations,
        engagement_score: engagementScore
      });
    });
  }

  trackAffiliateClicks() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && (
        link.href.includes('tinder.com') ||
        link.href.includes('bumble.com') ||
        link.href.includes('grammarly.com') ||
        link.href.includes('ko-fi.com')
      )) {
        this.trackEvent('affiliate_click', {
          platform: this.extractDomain(link.href),
          category: this.sessionData.category,
          link_text: link.textContent.trim()
        });
      }
    });
  }

  // 📊 Event Tracking Methods
  trackEvent(eventName, parameters = {}) {
    // Add common parameters
    const enrichedParams = {
      ...parameters,
      page_category: this.sessionData.category,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      session_id: this.getSessionId()
    };

    // Send to Google Analytics
    if (window.gtag) {
      gtag('event', eventName, enrichedParams);
    }

    // Send to Microsoft Clarity
    if (window.clarity) {
      clarity('event', eventName, enrichedParams);
    }

    // Store locally for debugging
    this.storeLocalEvent(eventName, enrichedParams);
    
    console.log('📊 Event tracked:', eventName, enrichedParams);
  }

  trackPageView() {
    this.sessionData.pageViews++;
    
    const pageData = {
      page_title: document.title,
      page_location: window.location.href,
      page_category: this.sessionData.category,
      referrer: document.referrer,
      user_language: navigator.language
    };

    this.trackEvent('page_view', pageData);
  }

  // 🛠️ Utility Methods
  detectCategory() {
    const path = window.location.pathname;
    
    if (path.includes('ai-pickup')) return 'ai-pickup';
    if (path.includes('ai-roasts')) return 'ai-roasts';
    if (path.includes('ai-captions')) return 'ai-captions';
    if (path.includes('crush')) return 'crush';
    if (path.includes('pickup')) return 'pickup';
    if (path.includes('roasts')) return 'roasts';
    if (path.includes('usernames')) return 'usernames';
    if (path.includes('bios')) return 'bios';
    
    return 'home';
  }

  detectSocialPlatform(element) {
    const className = element.className;
    const text = element.textContent.toLowerCase();
    
    if (className.includes('twitter') || text.includes('twitter')) return 'twitter';
    if (className.includes('instagram') || text.includes('instagram')) return 'instagram';
    if (className.includes('tiktok') || text.includes('tiktok')) return 'tiktok';
    if (className.includes('whatsapp') || text.includes('whatsapp')) return 'whatsapp';
    if (className.includes('facebook') || text.includes('facebook')) return 'facebook';
    
    return 'unknown';
  }

  extractDomain(url) {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'unknown';
    }
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('namerly-session-id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('namerly-session-id', sessionId);
    }
    return sessionId;
  }

  storeLocalEvent(event, data) {
    const events = JSON.parse(localStorage.getItem('namerly-analytics') || '[]');
    events.push({ event, data, timestamp: Date.now() });
    
    // Keep only last 100 events
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }
    
    localStorage.setItem('namerly-analytics', JSON.stringify(events));
  }

  // 📈 Analytics Dashboard (for debugging)
  getAnalyticsData() {
    return {
      session: this.sessionData,
      events: JSON.parse(localStorage.getItem('namerly-analytics') || '[]'),
      config: this.config
    };
  }

  // 🎯 Conversion Tracking
  trackConversion(type, value = null) {
    this.trackEvent('conversion', {
      conversion_type: type,
      conversion_value: value,
      category: this.sessionData.category
    });
  }

  // Ko-fi donation tracking
  trackDonation() {
    this.trackConversion('ko_fi_donation', 'coffee');
  }

  // Social unlock tracking  
  trackSocialUnlock(type) {
    this.trackConversion('social_unlock', type);
  }
}

// Initialize analytics
const analytics = new AnalyticsManager();

// Export for global access
window.analytics = analytics;

// Helper functions for easy use
window.trackGeneration = (category) => analytics.trackEvent('content_generation', { category });
window.trackShare = (platform) => analytics.trackEvent('social_share', { platform });
window.trackUnlock = (type) => analytics.trackSocialUnlock(type);

console.log('📊 Namerly Analytics ready!');
