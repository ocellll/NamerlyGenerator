/**
 * NAMERLY MONETIZATION SYSTEM
 * AI Premium + Ads Model
 */

// Ad Networks Configuration (High-traffic only)
const adConfig = {
  google: {
    enabled: false, // Disabled for low-traffic (avoid slow load times)
    publisherId: 'ca-pub-XXXXXXXXXXXXXXXX',
  },
  facebook: {
    enabled: false
  }
};

// AI Premium Configuration
const aiPremium = {
  freeLimit: 3, // Set back to 3 as requested
  premiumPrice: 4.99,
  features: {
    free: ['Basic Results', '3 daily generations', 'Template-based fallback'],
    premium: ['Google Gemini Pro AI', 'Unlimited generations', 'Creative & Unique results', 'Faster response', 'Priority support']
  }
};

class MonetizationManager {
  constructor() {
    this.adBlockDetected = false;
    this.premiumUser = this.checkPremiumStatus();
    this.init();
  }

  init() {
    this.setupAdBlockDetection();
    this.setupAds();
    this.setupPremiumSystem();
    this.trackRevenue();
  }

  // 🚫 Ad Block Detection
  setupAdBlockDetection() {
    // Create test ad element
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    testAd.style.position = 'absolute';
    testAd.style.left = '-10000px';
    document.body.appendChild(testAd);

    // Check if blocked
    setTimeout(() => {
      if (testAd.offsetHeight === 0) {
        this.adBlockDetected = true;
        this.showAdBlockMessage();
      }
      document.body.removeChild(testAd);
    }, 100);
  }

  showAdBlockMessage() {
    const message = document.getElementById('adblock-message');
    if (message) {
      message.style.display = 'block';
      message.innerHTML = `
        <div class="adblock-notice" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-left: 5px solid #e11d48;">
          <h3>❤️ Support Namerly</h3>
          <p>We are using real AI to generate results. Consider supporting the development:</p>
          <ul style="text-align: left; display: inline-block;">
            <li>☕ Support us on Ko-fi</li>
            <li>🚀 Unlock Unlimited AI Features</li>
            <li>📢 Share with friends to unlock uses</li>
          </ul>
          <div style="margin-top: 15px;">
            <button onclick="monetization.hideAdBlock()" style="background: #e11d48; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold;">I'll support!</button>
          </div>
        </div>
      `;
    }
  }

  // 📱 Smart Ad Placement
  setupAds() {
    if (this.premiumUser || this.adBlockDetected) return;

    // Load ads after user interaction (better UX)
    let userInteracted = false;
    const loadAds = () => {
      if (!userInteracted) {
        userInteracted = true;
        this.loadGoogleAds();
        this.loadFacebookAds();
      }
    };

    // Wait for user interaction
    document.addEventListener('click', loadAds, { once: true });
    document.addEventListener('scroll', loadAds, { once: true });

    // Fallback: load after 3 seconds
    setTimeout(loadAds, 3000);
  }

  loadGoogleAds() {
    if (!adConfig.google.enabled) return;

    // Google AdSense
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.setAttribute('data-ad-client', adConfig.google.publisherId);
    document.head.appendChild(script);

    // Initialize ads after page load
    window.addEventListener('load', () => {
      this.insertAdUnits();
    });
  }

  insertAdUnits() {
    // Banner ad (top of generators)
    const bannerSlot = document.querySelector('.ad-banner-slot');
    if (bannerSlot) {
      bannerSlot.innerHTML = `
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="${adConfig.google.publisherId}"
             data-ad-slot="${adConfig.google.slots.banner}"
             data-ad-format="auto"></ins>
      `;
      (adsbygoogle = window.adsbygoogle || []).push({});
    }

    // Sidebar ad (desktop)
    const sidebarSlot = document.querySelector('.ad-sidebar-slot');
    if (sidebarSlot && window.innerWidth > 768) {
      sidebarSlot.innerHTML = `
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="${adConfig.google.publisherId}"
             data-ad-slot="${adConfig.google.slots.sidebar}"
             data-ad-format="rectangle"></ins>
      `;
      (adsbygoogle = window.adsbygoogle || []).push({});
    }
  }

  loadFacebookAds() {
    if (!adConfig.facebook.enabled) return;

    // Facebook Audience Network
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbadnw.js';
    document.head.appendChild(script);
  }

  // 💎 AI Premium System
  setupPremiumSystem() {
    this.aiUsage = this.getAiUsage();
    this.updateAiLimits();
  }

  getAiUsage() {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('namerly-ai-usage');

    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) {
        return data.count;
      }
    }

    // Reset for new day
    localStorage.setItem('namerly-ai-usage', JSON.stringify({
      date: today,
      count: 0
    }));
    return 0;
  }

  updateAiUsage() {
    if (this.premiumUser) return true;

    this.aiUsage++;
    const today = new Date().toDateString();
    localStorage.setItem('namerly-ai-usage', JSON.stringify({
      date: today,
      count: this.aiUsage
    }));

    this.updateAiLimits();
    return this.aiUsage <= aiPremium.freeLimit;
  }

  updateAiLimits() {
    const remaining = Math.max(0, aiPremium.freeLimit - this.aiUsage);
    const limitElements = document.querySelectorAll('.ai-limit-display');

    limitElements.forEach(element => {
      if (this.premiumUser) {
        element.innerHTML = '💎 <strong>Premium</strong> - Unlimited';
        element.className = 'ai-limit-display premium';
      } else if (remaining > 0) {
        element.innerHTML = `🤖 <strong>${remaining}</strong> AI generations left today`;
        element.className = 'ai-limit-display free';
      } else {
        element.innerHTML = `⏰ <strong>Limit reached!</strong> <a href="#premium">Upgrade to Premium</a>`;
        element.className = 'ai-limit-display limit-reached';
      }
    });
  }

  checkPremiumStatus() {
    // Check if user has premium subscription
    const premium = localStorage.getItem('namerly-premium');
    if (premium) {
      const data = JSON.parse(premium);
      return new Date(data.expires) > new Date();
    }
    return false;
  }

  // 💰 Premium Purchase Flow
  showPremiumModal() {
    const modal = document.createElement('div');
    modal.className = 'premium-modal';
    modal.innerHTML = `
      <div class="premium-content">
        <div class="premium-header">
          <h2>🤖 Upgrade to AI Premium</h2>
          <button class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
        </div>
        
        <div class="premium-features">
          <div class="feature-comparison">
            <div class="free-column">
              <h3>🆓 Free</h3>
              <ul>
                <li>✅ All basic generators</li>
                <li>⚡ 3 AI generations/day</li>
                <li>🤖 Standard AI quality</li>
                <li>📱 With ads</li>
              </ul>
            </div>
            
            <div class="premium-column">
              <h3>💎 Premium</h3>
              <ul>
                <li>✅ All basic generators</li>
                <li>🔥 Unlimited AI generations</li>
                <li>🚀 GPT-4 premium quality</li>
                <li>🚫 Ad-free experience</li>
                <li>⚡ Faster AI responses</li>
                <li>💬 Priority support</li>
              </ul>
            </div>
          </div>
          
          <div class="pricing">
            <div class="price-tag">
              <span class="price">$2.99</span>
              <span class="period">/month</span>
            </div>
            <p class="price-note">Cancel anytime • 7-day free trial</p>
          </div>
          
          <div class="premium-actions">
            <button class="upgrade-btn" onclick="monetization.startPremiumPurchase()">
              🚀 Start Free Trial
            </button>
            <button class="maybe-later" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  startPremiumPurchase() {
    // Integrate with Stripe or PayPal
    console.log('Starting premium purchase flow...');

    // For now, show success message
    alert('🚀 Premium purchase flow coming soon! Thanks for your interest!');
  }

  // 📊 Revenue Tracking
  trackRevenue() {
    // Track ad impressions
    window.addEventListener('load', () => {
      if (!this.adBlockDetected && !this.premiumUser) {
        this.trackEvent('ad_impression', { page: window.location.pathname });
      }
    });

    // Track premium interest
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('upgrade-btn') ||
        e.target.closest('.premium-cta')) {
        this.trackEvent('premium_interest', { source: e.target.className });
      }
    });
  }

  trackEvent(event, data) {
    // Send to analytics
    if (window.gtag) {
      gtag('event', event, data);
    }

    // Also track locally for reporting
    const events = JSON.parse(localStorage.getItem('namerly-events') || '[]');
    events.push({
      event,
      data,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('namerly-events', JSON.stringify(events.slice(-100))); // Keep last 100
  }

  // Utility methods
  hideAdBlock() {
    document.getElementById('adblock-message').style.display = 'none';
  }

  // 📈 Revenue Optimization
  optimizeAds() {
    // A/B test ad placements
    // Adjust based on user behavior
    // Optimize for mobile vs desktop
  }
}

// Initialize monetization system
const monetization = new MonetizationManager();

// Export for global access
window.monetization = monetization;

console.log('💰 Namerly Monetization System loaded!');
