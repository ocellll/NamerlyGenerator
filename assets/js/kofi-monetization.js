/**
 * NAMERLY GENERATOR - KO-FI MONETIZATION SYSTEM
 * Safe monetization without payment processing risks
 */

class KofiMonetization {
  constructor() {
    this.config = {
      // UPDATE THIS with your Ko-fi username
      kofiUsername: 'namerly', // Replace with your actual Ko-fi username

      // Daily usage limits
      dailyLimits: {
        free: 5,
        shareBonus: 10,
        donationBonus: 50
      },

      // Social media handles (for follow bonuses)
      socialMedia: {
        instagram: '@your_instagram',
        tiktok: '@your_tiktok',
        twitter: '@your_twitter'
      }
    };

    this.init();
  }

  init() {
    this.loadUsageData();
    this.checkAdFreeStatus(); // Check if ads should be hidden
    this.setupKofiButton();
    this.setupSocialButtons();
    this.updateUI();
  }

  // Load user's usage data from localStorage
  loadUsageData() {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('namerly_usage');

    if (saved) {
      try {
        this.usage = JSON.parse(saved);

        // Ensure all required properties exist
        if (!this.usage.bonuses) {
          this.usage.bonuses = {};
        }
        if (!this.usage.bonuses.platforms) {
          this.usage.bonuses.platforms = {
            general: false,
            whatsapp: false,
            telegram: false,
            twitter: false,
            facebook: false
          };
        }

        // Reset if new day
        if (this.usage.date !== today) {
          this.resetDailyUsage();
        }
      } catch (error) {
        console.error('Error parsing usage data:', error);
        this.resetDailyUsage();
      }
    } else {
      this.resetDailyUsage();
    }
  }

  // Reset usage for new day
  resetDailyUsage() {
    this.usage = {
      date: new Date().toDateString(),
      used: 0,
      bonuses: {
        shared: false,
        shareCount: 0, // Track number of different platforms shared
        platforms: {
          general: false,
          whatsapp: false,
          telegram: false,
          twitter: false,
          facebook: false
        },
        donated: false
      }
    };
    this.saveUsage();
  }

  // Save usage data
  saveUsage() {
    localStorage.setItem('namerly_usage', JSON.stringify(this.usage));
  }

  // Check if user can generate content - UNLIMITED
  canGenerate() {
    // Always return true - unlimited generations
    return true;

    /* ORIGINAL CODE DISABLED:
    const totalLimit = this.getTotalLimit();
    return this.usage.used < totalLimit;
    */
  }

  // Get total daily limit based on bonuses
  getTotalLimit() {
    let limit = this.config.dailyLimits.free;

    // Add bonus for each platform shared (up to 5 platforms max)
    const shareCount = this.usage.bonuses.shareCount || 0;
    limit += shareCount * this.config.dailyLimits.shareBonus;

    if (this.usage.bonuses.donated) {
      limit += this.config.dailyLimits.donationBonus;
    }

    return limit;
  }

  // Use one generation
  useGeneration() {
    if (this.canGenerate()) {
      this.usage.used++;
      this.saveUsage();
      this.updateUI();
      return true;
    }
    return false;
  }

  // Setup Ko-fi donation button (DISABLED as requested)
  setupKofiButton() {
    return; // System disabled
  }

  // Setup social media unlock buttons
  setupSocialButtons() {
    const socialContainer = document.getElementById('social-unlocks');
    if (!socialContainer) return;

    const platforms = [
      { id: 'general', name: 'General Share', icon: '📤', desc: 'Share with friends' },
      { id: 'whatsapp', name: 'WhatsApp', icon: '💬', desc: 'Share on WhatsApp' },
      { id: 'telegram', name: 'Telegram', icon: '✈️', desc: 'Share on Telegram' },
      { id: 'twitter', name: 'Twitter/X', icon: '🐦', desc: 'Share on Twitter' },
      { id: 'facebook', name: 'Facebook', icon: '📘', desc: 'Share on Facebook' }
    ];

    const shareCount = this.usage.bonuses.shareCount || 0;
    const maxShares = 5;

    socialContainer.innerHTML = `
      <div class="social-unlocks">
        <h3>🚀 Get More Generations FREE!</h3>
        <p>Each platform you share on gets you <strong>+${this.config.dailyLimits.shareBonus} uses</strong> (max ${maxShares} platforms)</p>
        <p class="share-progress">Shared on <strong>${shareCount}/${maxShares}</strong> platforms</p>
        
        <div class="platforms-grid">
          ${platforms.map(platform => `
            <div class="unlock-option ${this.usage.bonuses.platforms[platform.id] ? 'completed' : ''}">
              <div class="unlock-info">
                <strong>${platform.icon} ${platform.name}</strong>
                <p>${platform.desc}</p>
              </div>
              <button onclick="kofiMonetization.shareOnPlatform('${platform.id}')" 
                      ${this.usage.bonuses.platforms[platform.id] ? 'disabled' : ''}>
                ${this.usage.bonuses.platforms[platform.id] ? '✅ Shared' : `${platform.icon} Share`}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Share content functionality
  shareContent() {
    // Fallback to general share
    this.shareOnPlatform('general');
  }

  // Share on specific platform
  shareOnPlatform(platform) {
    if (this.usage.bonuses.platforms[platform]) {
      alert('You already unlocked bonus from this platform today!');
      return;
    }

    const shareData = {
      title: 'NamerlyGenerator - Free AI Name Generator',
      text: 'Check out this amazing AI name generator! Get creative names, pickup lines, and more!',
      url: window.location.href
    };

    // Platform-specific sharing
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`, '_blank');
        break;
      default: // general
        if (navigator.share) {
          navigator.share(shareData);
        } else {
          navigator.clipboard.writeText(shareData.url);
          alert('Link copied to clipboard! Share it with your friends 🎉');
        }
    }

    // Wait a moment then ask for confirmation
    setTimeout(() => {
      if (confirm(`Did you share on ${platform}? Click OK to unlock your +${this.config.dailyLimits.shareBonus} bonus uses!`)) {
        // Grant platform bonus
        this.usage.bonuses.platforms[platform] = true;
        this.usage.bonuses.shareCount = (this.usage.bonuses.shareCount || 0) + 1;
        this.usage.bonuses.shared = true; // Keep for backward compatibility
        this.saveUsage();
        this.updateUI();

        // Track event
        if (window.analytics) {
          analytics.trackEvent('social_share', {
            platform: platform,
            method: 'platform_specific',
            bonus_unlocked: true,
            total_platforms: this.usage.bonuses.shareCount
          });
        }

        alert(`🎉 Awesome! You got +${this.config.dailyLimits.shareBonus} more uses today!`);
      }
    }, 2000);
  }

  // Track Ko-fi donation (user needs to manually confirm)
  trackDonation() {
    // Track the click
    if (window.analytics) {
      analytics.trackEvent('kofi_click', {
        kofi_username: this.config.kofiUsername
      });
    }

    // After user returns, they can confirm donation
    setTimeout(() => {
      if (confirm('Thanks for supporting us! Did you complete your donation?')) {
        this.usage.bonuses.donated = true;
        this.saveUsage();
        this.checkAdFreeStatus(); // Re-check ad status
        this.updateUI();

        if (window.analytics) {
          analytics.trackEvent('donation_confirmed', {
            bonus_unlocked: true,
            bonus_amount: this.config.dailyLimits.donationBonus
          });
        }
      }
    }, 5000);
  }

  // Check and apply Ad-Free status
  checkAdFreeStatus() {
    // If user has donated, they are Premium/Pro
    if (this.usage.bonuses.donated) {
      document.body.classList.add('premium-user');

      // Hide all ad containers
      const adContainers = document.querySelectorAll('.adsbygoogle, .ad-container, [id^="google_ads_"]');
      adContainers.forEach(el => {
        el.style.display = 'none !important';
        el.style.visibility = 'hidden';
        el.innerHTML = ''; // Also clear content to be safe
      });

      // Add stylesheet to force hide ads
      if (!document.getElementById('premium-styles')) {
        const style = document.createElement('style');
        style.id = 'premium-styles';
        style.innerHTML = `
          .adsbygoogle, .ad-space, .ad-container, ins.adsbygoogle { 
            display: none !important; 
            height: 0 !important; 
            width: 0 !important; 
            overflow: hidden !important;
          }
          .premium-badge { display: inline-block !important; }
        `;
        document.head.appendChild(style);
      }

      console.log('Premium status active: Ads hidden');
    }
  }

  // Update UI with current usage - DISABLED (unlimited generations)
  updateUI() {
    // Usage counter disabled - unlimited generations for all users
    return;

    /* ORIGINAL CODE DISABLED:
    const usageDisplay = document.getElementById('usage-display');
    if (!usageDisplay) return;
    
    const totalLimit = this.getTotalLimit();
    const remaining = totalLimit - this.usage.used;
    
    usageDisplay.innerHTML = `
      <div class="usage-counter">
        <div class="usage-bar">
          <div class="usage-fill" style="width: ${(this.usage.used / totalLimit) * 100}%"></div>
        </div>
        <p><strong>${remaining}</strong> generations left today</p>
        <p class="usage-detail">Used: ${this.usage.used}/${totalLimit}</p>
      </div>
    `;
    
    // Update all generate buttons
    const generateButtons = document.querySelectorAll('.generate-btn');
    generateButtons.forEach(btn => {
      if (!this.canGenerate()) {
        btn.disabled = true;
        btn.textContent = 'Daily limit reached - Unlock more!';
        btn.style.opacity = '0.5';
      } else {
        btn.disabled = false;
        btn.textContent = btn.dataset.originalText || 'Generate';
        btn.style.opacity = '1';
      }
    });
    */

    // Show/hide monetization sections
    const monetizationSection = document.getElementById('monetization-section');
    if (monetizationSection) {
      monetizationSection.style.display = remaining <= 1 ? 'block' : 'none';
    }
  }

  // Get usage stats for analytics
  getUsageStats() {
    return {
      used: this.usage.used,
      limit: this.getTotalLimit(),
      bonuses: this.usage.bonuses,
      date: this.usage.date
    };
  }
}

// Initialize Ko-fi monetization system
let kofiMonetization;
document.addEventListener('DOMContentLoaded', function () {
  kofiMonetization = new KofiMonetization();
});

// CSS for Ko-fi integration
const kofiStyles = `
<style>
.premium-upgrade {
  background: white;
  border-radius: 20px;
  padding: 0;
  margin: 20px 0;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  max-width: 600px;
  margin: 20px auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.upgrade-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px 15px;
  border-bottom: 1px solid #f0f0f0;
}

.upgrade-header h2 {
  margin: 0;
  font-size: 1.4em;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
}

.close-btn:hover {
  color: #666;
}

.plans-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 25px;
}

.plan {
  border: 2px solid #e8e8e8;
  border-radius: 15px;
  padding: 20px;
  position: relative;
  background: #fafafa;
}

.premium-plan {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
  transform: scale(1.02);
}

.plan-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffd700;
  color: #333;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75em;
  font-weight: bold;
}

.plan-header h3 {
  margin: 0 0 15px 0;
  font-size: 1.2em;
  font-weight: 600;
}

.plan-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feature {
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cta-section {
  padding: 25px;
  text-align: center;
  border-top: 1px solid #f0f0f0;
}

.premium-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 40px;
  border: none;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1em;
  display: inline-block;
  margin-bottom: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.premium-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.maybe-later-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 0.9em;
  padding: 10px;
}

.maybe-later-btn:hover {
  color: #666;
}

/* Responsive */
@media (max-width: 600px) {
  .plans-container {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .premium-plan {
    transform: none;
  }
  
  .price {
    font-size: 2em;
  }
}

/* Keep existing styles */
.social-unlocks {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
  margin: 20px 0;
}

.share-progress {
  text-align: center;
  color: #007bff;
  font-weight: bold;
  margin: 10px 0;
  padding: 10px;
  background: white;
  border-radius: 8px;
}

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 10px;
  margin-top: 15px;
}

.unlock-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  margin: 10px 0;
  transition: all 0.3s;
}

.unlock-option:hover {
  border-color: #00D9FF;
  background: #ffffff;
}

.unlock-option.completed {
  border-color: #28a745;
  background: #d4edda;
}

.unlock-info {
  flex-grow: 1;
}

.unlock-option button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}

.unlock-option button:disabled {
  background: #28a745;
  cursor: not-allowed;
}

.usage-counter {
  background: white;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #e9ecef;
  margin: 15px 0;
}

.usage-bar {
  width: 100%;
  height: 10px;
  background: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 0;
}

.usage-fill {
  height: 100%;
  background: linear-gradient(90deg, #28a745, #20c997);
  transition: width 0.3s ease;
}

.usage-detail {
  color: #6c757d;
  font-size: 0.9em;
  margin: 5px 0;
}

#monetization-section {
  margin: 30px 0;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
}
</style>
`;

// Inject CSS
document.head.insertAdjacentHTML('beforeend', kofiStyles);
