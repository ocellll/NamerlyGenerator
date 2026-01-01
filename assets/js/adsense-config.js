/**
 * NAMERLY GENERATOR - ADSENSE CONFIGURATION
 * Shared AdSense configuration for all pages
 */

// AdSense Configuration Object
window.NamelyAdSense = {
  // Your AdSense Publisher ID
  publisherId: 'ca-pub-8550109275788235',
  
  // Ad Slots (you'll need to create these in your AdSense account)
  adSlots: {
    homepage_header: '8550109275',    // Banner ad at top of homepage
    homepage_content: '8550109276',   // Content ad on homepage
    homepage_footer: '8550109277',    // Footer ad on homepage
    
    generator_header: '8550109278',   // Header ad on generator pages
    generator_results: '8550109279',  // Ad shown after generating results
    generator_sidebar: '8550109280',  // Sidebar ad on generator pages
    
    mobile_banner: '8550109281',      // Mobile banner ad
    mobile_interstitial: '8550109282' // Mobile interstitial ad
  },
  
  // Ad placement configuration
  config: {
    // Show ads after user interaction
    showAdsAfterGenerations: 2,
    
    // Delay before showing ads (milliseconds)
    adDelay: 2000,
    
    // Respect user preferences
    respectDoNotTrack: true,
    
    // Ad refresh rate (for auto-refresh ads)
    refreshRate: 30000, // 30 seconds
    
    // Mobile detection
    isMobile: window.innerWidth <= 768,
    
    // Current page detection
    isHomepage: window.location.pathname === '/' || window.location.pathname === '/index.html',
    isGenerator: window.location.pathname.includes('/') && !window.location.pathname.endsWith('index.html')
  },
  
  // Initialize AdSense
  init: function() {
    console.log('Namerly AdSense initializing...');
    
    // Check if AdSense script is loaded
    if (typeof adsbygoogle === 'undefined') {
      console.warn('AdSense script not loaded yet');
      return;
    }
    
    // Initialize existing ads on page
    this.initializeExistingAds();
    
    // Set up event listeners for dynamic ad loading
    this.setupEventListeners();
    
    console.log('Namerly AdSense initialized successfully');
  },
  
  // Initialize ads that are already in the DOM
  initializeExistingAds: function() {
    const existingAds = document.querySelectorAll('.adsbygoogle');
    existingAds.forEach((ad, index) => {
      try {
        if (!ad.dataset.adsbygoogleStatus) {
          (adsbygoogle = window.adsbygoogle || []).push({});
          console.log(`Initialized ad ${index + 1}`);
        }
      } catch (error) {
        console.log(`Error initializing ad ${index + 1}:`, error);
      }
    });
  },
  
  // Set up event listeners for dynamic ad loading
  setupEventListeners: function() {
    // Listen for result generation events
    document.addEventListener('resultGenerated', () => {
      this.showResultsAd();
    });
    
    // Listen for page interaction events
    let generationCount = 0;
    document.addEventListener('click', () => {
      generationCount++;
      if (generationCount >= this.config.showAdsAfterGenerations) {
        this.showEngagementAds();
      }
    });
  },
  
  // Show ad after results are generated
  showResultsAd: function() {
    const resultsAdContainer = document.getElementById('results-ad');
    if (resultsAdContainer) {
      setTimeout(() => {
        resultsAdContainer.style.display = 'block';
        this.loadAd(resultsAdContainer);
      }, this.config.adDelay);
    }
  },
  
  // Show ads based on user engagement
  showEngagementAds: function() {
    // Show additional ads for engaged users
    console.log('User is engaged, showing additional ads');
  },
  
  // Load a specific ad
  loadAd: function(container) {
    try {
      const ad = container.querySelector('.adsbygoogle');
      if (ad && !ad.dataset.adsbygoogleStatus) {
        (adsbygoogle = window.adsbygoogle || []).push({});
        console.log('Ad loaded successfully');
      }
    } catch (error) {
      console.log('Error loading ad:', error);
    }
  },
  
  // Create and insert a new ad dynamically
  createAd: function(slotId, containerId, format = 'auto') {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`Container ${containerId} not found`);
      return;
    }
    
    const adHtml = `
      <div class="ad-container">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="${this.publisherId}"
             data-ad-slot="${slotId}"
             data-ad-format="${format}"
             data-full-width-responsive="true"></ins>
      </div>
    `;
    
    container.innerHTML = adHtml;
    
    // Initialize the new ad
    setTimeout(() => {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
        console.log(`Dynamic ad created with slot ${slotId}`);
      } catch (error) {
        console.log('Error creating dynamic ad:', error);
      }
    }, 100);
  },
  
  // Responsive ad sizing
  getResponsiveAdSize: function() {
    const width = window.innerWidth;
    
    if (width < 768) {
      return { width: 320, height: 100 }; // Mobile banner
    } else if (width < 1024) {
      return { width: 728, height: 90 };  // Tablet leaderboard
    } else {
      return { width: 970, height: 250 }; // Desktop billboard
    }
  }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Small delay to ensure AdSense script is loaded
  setTimeout(() => {
    if (window.NamelyAdSense) {
      window.NamelyAdSense.init();
    }
  }, 1000);
});

// Initialize on window load as backup
window.addEventListener('load', function() {
  if (window.NamelyAdSense && typeof adsbygoogle !== 'undefined') {
    window.NamelyAdSense.init();
  }
});
