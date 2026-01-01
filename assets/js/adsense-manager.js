/**
 * NAMERLY GENERATOR - SMART ADSENSE MANAGEMENT SYSTEM
 * Strategic ad placement with user experience focus
 */

class AdSenseManager {
  constructor() {
    this.config = {
      // AdSense is now enabled with your Publisher ID
      enabled: true,
      
      // Your AdSense Publisher ID
      publisherId: 'ca-pub-8550109275788235',
      
      // User engagement tracking
      userActivity: {
        startTime: Date.now(),
        pageViews: 0,
        generationsUsed: 0,
        timeOnSite: 0,
        showDynamicAdsAfter: 240000, // 4 minutes of activity
        minGenerationsBeforeAds: 2,
        hasSeenRewardAd: false
      },
      
      // Ad placement configuration - STRATEGIC LOCATIONS
      adPlacements: {
        // STATIC ADS - Always visible in strategic locations
        homepageHero: {
          enabled: true,
          type: 'display',
          size: [728, 90], // Banner
          slot: '8550109275', // You'll need to create this ad unit in AdSense
          location: 'homepage-hero' // After main title on homepage
        },
        homepageSidebar: {
          enabled: true,
          type: 'display', 
          size: [300, 250], // Rectangle
          slot: '8550109276', // You'll need to create this ad unit in AdSense
          location: 'homepage-sidebar' // Right sidebar on homepage
        },
        footerBanner: {
          enabled: true,
          type: 'display',
          size: [728, 90], // Banner
          slot: '8550109277', // You'll need to create this ad unit in AdSense
          location: 'footer-banner' // Before footer on all pages
        },
        
        // REWARD ADS - For getting more AI uses ⭐ MONETIZATION BOOST
        rewardAd: {
          enabled: true,
          type: 'display',
          size: [336, 280], // Large rectangle
          slot: '4567890123',
          reward: 5, // Extra AI uses for watching
          location: 'reward-modal'
        },
        
        // DYNAMIC ADS - Appear after user engagement (Smart timing)
        dynamicAfterResults: {
          enabled: false, // Will be enabled after user activity
          type: 'display',
          size: [300, 250],
          slot: '5678901234',
          location: 'after-results'
        },
        
        mobileBanner: {
          enabled: true,
          type: 'display',
          size: [320, 50], // Mobile Banner
          slot: '6789012345',
          location: 'mobile-sticky'
        }
      },
      
      // Revenue optimization
      targeting: {
        pageLevel: true,
        keywords: ['name generator', 'viral content', 'social media', 'usernames'],
        categories: ['entertainment', 'tools', 'social-media']
      }
    };
    
    // Initialize activity tracking
    this.initializeActivityTracking();
    
    // Setup static ads immediately
    this.setupStaticAds();
    
    // Start monitoring user activity for dynamic ads
    this.startActivityMonitoring();
  }

  // Initialize user activity tracking
  initializeActivityTracking() {
    this.config.userActivity.startTime = Date.now();
    this.config.userActivity.pageViews = parseInt(localStorage.getItem('namerly_page_views') || '0') + 1;
    localStorage.setItem('namerly_page_views', this.config.userActivity.pageViews.toString());
    
    // Track time on site
    setInterval(() => {
      this.config.userActivity.timeOnSite = Date.now() - this.config.userActivity.startTime;
    }, 1000);
  }

  // Monitor user activity to show dynamic ads
  startActivityMonitoring() {
    // Check every 30 seconds if user is ready for dynamic ads
    setInterval(() => {
      const { timeOnSite, generationsUsed, showDynamicAdsAfter, minGenerationsBeforeAds } = this.config.userActivity;
      
      if (timeOnSite >= showDynamicAdsAfter && generationsUsed >= minGenerationsBeforeAds) {
        this.enableDynamicAds();
      }
    }, 30000);
  }

  // Enable dynamic ads after user engagement
  enableDynamicAds() {
    if (this.config.adPlacements.dynamicAfterResults.enabled) return; // Already enabled
    
    this.config.adPlacements.dynamicAfterResults.enabled = true;
    console.log('📢 Dynamic ads enabled - user is engaged!');
    
    // Add after-results ad to existing result containers
    this.insertAfterResults();
  }

  // Track AI generation usage (call this from AI functions)
  trackGeneration() {
    this.config.userActivity.generationsUsed++;
    localStorage.setItem('namerly_generations_today', this.config.userActivity.generationsUsed.toString());
  }

  // Setup static ads that are always visible
  setupStaticAds() {
    // Homepage hero ad
    if (this.isHomepage() && this.config.adPlacements.homepageHero.enabled) {
      this.insertHomepageHeroAd();
    }
    
    // Homepage sidebar ad
    if (this.isHomepage() && this.config.adPlacements.homepageSidebar.enabled) {
      this.insertHomepageSidebarAd();
    }
    
    // Footer banner on all pages
    if (this.config.adPlacements.footerBanner.enabled) {
      this.insertFooterBanner();
    }
    
    // Mobile sticky banner
    if (this.isMobile() && this.config.adPlacements.mobileBanner.enabled) {
      this.insertMobileStickyBanner();
    }
  }

  // Insert homepage hero ad
  insertHomepageHeroAd() {
    const heroSection = document.querySelector('.hero-content, .main-content h1');
    if (heroSection) {
      const ad = this.createAdPlacement('homepageHero', this.config.adPlacements.homepageHero);
      heroSection.insertAdjacentElement('afterend', ad);
    }
  }

  // Insert homepage sidebar ad
  insertHomepageSidebarAd() {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      // Create sidebar container if it doesn't exist
      let sidebar = document.querySelector('.ad-sidebar');
      if (!sidebar) {
        sidebar = document.createElement('div');
        sidebar.className = 'ad-sidebar';
        sidebar.style.cssText = `
          position: fixed;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
          display: none;
        `;
        document.body.appendChild(sidebar);
        
        // Show sidebar on larger screens
        if (window.innerWidth > 1200) {
          sidebar.style.display = 'block';
        }
      }
      
      const ad = this.createAdPlacement('homepageSidebar', this.config.adPlacements.homepageSidebar);
      sidebar.appendChild(ad);
    }
  }

  // Insert footer banner
  insertFooterBanner() {
    const footer = document.querySelector('footer, .legal-footer');
    if (footer) {
      const ad = this.createAdPlacement('footerBanner', this.config.adPlacements.footerBanner);
      footer.insertAdjacentElement('beforebegin', ad);
    }
  }

  // Insert mobile sticky banner
  insertMobileStickyBanner() {
    const stickyAd = this.createAdPlacement('mobileBanner', this.config.adPlacements.mobileBanner);
    stickyAd.style.cssText += `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: white;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    `;
    document.body.appendChild(stickyAd);
  }

  // Show reward ad modal for extra AI uses 💰 MONETIZATION FEATURE
  showRewardAdModal() {
    if (this.config.userActivity.hasSeenRewardAd) return; // Don't spam
    
    const modal = document.createElement('div');
    modal.className = 'reward-ad-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: white;
      padding: 30px;
      border-radius: 15px;
      text-align: center;
      max-width: 400px;
      margin: 20px;
    `;
    
    modalContent.innerHTML = `
      <h3 style="margin: 0 0 15px 0; color: #333;">🎁 Get 5 More AI Uses!</h3>
      <p style="margin: 0 0 20px 0; color: #666;">Watch this quick ad to unlock 5 additional AI generations today</p>
      <div id="rewardAdContainer"></div>
      <button onclick="adSenseManager.closeRewardModal()" 
              style="margin-top: 15px; padding: 8px 16px; background: #ccc; border: none; border-radius: 5px; cursor: pointer;">
        Maybe Later
      </button>
      <button onclick="adSenseManager.grantRewardUses()" 
              style="margin-top: 15px; margin-left: 10px; padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Watch Ad & Get Uses
      </button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Insert the reward ad
    const adContainer = modalContent.querySelector('#rewardAdContainer');
    const rewardAd = this.createAdPlacement('rewardAd', this.config.adPlacements.rewardAd);
    adContainer.appendChild(rewardAd);
    
    this.config.userActivity.hasSeenRewardAd = true;
    return modal;
  }

  // Close reward modal
  closeRewardModal() {
    document.querySelector('.reward-ad-modal')?.remove();
  }

  // Grant reward after ad interaction
  grantRewardUses() {
    const currentUses = parseInt(localStorage.getItem('namerly_bonus_uses') || '0');
    const newUses = currentUses + this.config.adPlacements.rewardAd.reward;
    localStorage.setItem('namerly_bonus_uses', newUses.toString());
    
    // Close modal and show success
    this.closeRewardModal();
    this.showRewardSuccess();
  }

  // Show reward success message
  showRewardSuccess() {
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      z-index: 10001;
      font-weight: bold;
    `;
    successMsg.textContent = `🎉 +${this.config.adPlacements.rewardAd.reward} AI uses added!`;
    document.body.appendChild(successMsg);
    
    setTimeout(() => successMsg.remove(), 3000);
  }

  // Helper functions
  isHomepage() {
    return window.location.pathname.endsWith('index.html') || 
           window.location.pathname === '/' || 
           window.location.pathname.endsWith('/');
  }

  isMobile() {
    return window.innerWidth <= 768;
  }

  // Load AdSense script when enabled
  loadAdSenseScript() {
    if (this.adsLoaded || !this.config.enabled) return;
    
    // Auto ads script
    const autoScript = document.createElement('script');
    autoScript.async = true;
    autoScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.config.publisherId}`;
    autoScript.crossOrigin = 'anonymous';
    document.head.appendChild(autoScript);
    
    this.adsLoaded = true;
    console.log('💰 AdSense loaded successfully');
  }

  // Create ad placement
  createAdPlacement(placementId, config) {
    if (!this.config.enabled || !config.enabled) {
      // Show placeholder when disabled
      return this.createAdPlaceholder(placementId, config);
    }

    const adContainer = document.createElement('div');
    adContainer.className = `ad-container ad-${placementId}`;
    adContainer.style.cssText = `
      text-align: center;
      margin: 20px auto;
      max-width: ${config.size[0]}px;
    `;

    const adElement = document.createElement('ins');
    adElement.className = 'adsbygoogle';
    adElement.style.display = 'inline-block';
    adElement.style.width = `${config.size[0]}px`;
    adElement.style.height = `${config.size[1]}px`;
    adElement.setAttribute('data-ad-client', this.config.publisherId);
    adElement.setAttribute('data-ad-slot', config.slot);
    
    adContainer.appendChild(adElement);
    
    // Initialize the ad
    setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.log('AdSense initialization deferred');
      }
    }, 100);
    
    return adContainer;
  }
  
  // Placeholder for when AdSense is disabled
  createAdPlaceholder(placementId, config) {
    const placeholder = document.createElement('div');
    placeholder.className = `ad-placeholder ad-${placementId}`;
    placeholder.style.cssText = `
      width: ${config.size[0]}px;
      height: ${config.size[1]}px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border: 2px dashed #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px auto;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #666;
      font-size: 14px;
      opacity: 0.7;
    `;
    
    // Different messages for different placements
    let message = 'Ad Space Reserved';
    let subtitle = 'Awaiting AdSense Approval';
    
    if (placementId === 'rewardAd') {
      message = 'Reward Ad Space';
      subtitle = 'Watch ads for extra uses';
    } else if (placementId === 'homepageHero') {
      message = 'Hero Banner Space';
      subtitle = 'Premium placement ready';
    } else if (placementId === 'footerBanner') {
      message = 'Footer Banner Space';
      subtitle = 'Strategic placement';
    }
    
    placeholder.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 24px; margin-bottom: 5px;">📢</div>
        <div>${message}</div>
        <div style="font-size: 12px; opacity: 0.8;">${subtitle}</div>
      </div>
    `;
    
    return placeholder;
  }
  
  // Insert ads in strategic locations - UPDATED METHOD
  setupAdPlacements() {
    // This method is now handled by setupStaticAds and dynamic insertion
    console.log('📍 Ad placements configured');
  }

  // Insert ad after AI generation results (dynamic)
  insertAfterResults() {
    if (!this.config.adPlacements.dynamicAfterResults.enabled) return;
    
    const resultContainers = document.querySelectorAll('.result-container, #resultContainer');
    resultContainers.forEach(container => {
      // Check if ad already exists
      if (container.nextElementSibling?.classList.contains('ad-container')) return;
      
      const ad = this.createAdPlacement('dynamicAfterResults', this.config.adPlacements.dynamicAfterResults);
      container.insertAdjacentElement('afterend', ad);
    });
  }
  
  // Enable AdSense (call this when approved)
  enableAdSense(publisherId) {
    this.config.enabled = true;
    this.config.publisherId = publisherId;
    
    // Remove placeholders
    document.querySelectorAll('.ad-placeholder').forEach(placeholder => {
      placeholder.remove();
    });
    
    // Load real ads
    this.loadAdSenseScript();
    this.setupStaticAds();
    
    console.log('🎉 AdSense activated with smart placement system!');
  }
  
  // Disable ads (for ad-free premium users in future)
  disableAds() {
    document.querySelectorAll('.ad-container, .ad-placeholder').forEach(ad => {
      ad.style.display = 'none';
    });
  }
  
  // Revenue optimization
  optimizeForRevenue() {
    if (!this.config.enabled) return;
    
    // Page-level targeting
    if (this.config.targeting.pageLevel) {
      const script = document.createElement('script');
      script.innerHTML = `
        window.googletag = window.googletag || {cmd: []};
        googletag.cmd.push(function() {
          googletag.pubads().setTargeting('category', ${JSON.stringify(this.config.targeting.categories)});
          googletag.pubads().setTargeting('keywords', ${JSON.stringify(this.config.targeting.keywords)});
        });
      `;
      document.head.appendChild(script);
    }
  }
}

// Initialize AdSense Manager
const adSenseManager = new AdSenseManager();

// Global functions for easy activation
window.enableAdSense = (publisherId) => {
  adSenseManager.enableAdSense(publisherId);
};

window.disableAds = () => {
  adSenseManager.disableAds();
};

// Global function to show reward ad modal
window.showRewardAd = () => {
  adSenseManager.showRewardAdModal();
};

console.log('📢 Smart AdSense management system loaded - ready for strategic monetization!');
