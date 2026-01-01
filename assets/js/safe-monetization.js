/**
 * NAMERLY SAFE MONETIZATION
 * No payments, no legal issues, just growth
 */

class SafeMonetization {
  constructor() {
    this.aiUsage = this.getAiUsage();
    this.bonusUses = this.getBonusUses();
    this.init();
  }

  init() {
    this.setupAiLimits();
    this.setupSocialUnlocks();
    this.setupAffiliateLinks();
    this.updateUI();
    
    console.log('✅ Safe monetization loaded - no payments required!');
  }

  // 🤖 AI Usage (Free with Social Unlocks)
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

  getBonusUses() {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('namerly-bonus-uses');
    
    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) {
        return data.bonuses;
      }
    }
    
    return { shared: false, followed: false, donated: false };
  }

  getTotalAvailableUses() {
    const base = 3; // Free daily uses
    let bonus = 0;
    
    if (this.bonusUses.shared) bonus += 5;    // +5 for sharing
    if (this.bonusUses.followed) bonus += 10; // +10 for following
    if (this.bonusUses.donated) bonus += 50;  // +50 for coffee donation
    
    return base + bonus;
  }

  canUseAI() {
    return this.aiUsage < this.getTotalAvailableUses();
  }

  incrementAiUsage() {
    if (this.canUseAI()) {
      this.aiUsage++;
      const today = new Date().toDateString();
      localStorage.setItem('namerly-ai-usage', JSON.stringify({
        date: today,
        count: this.aiUsage
      }));
      this.updateUI();
      return true;
    }
    
    this.showUnlockModal();
    return false;
  }

  // 🎁 Social Unlocks (Growth Hacking)
  setupSocialUnlocks() {
    // Check URL parameters for social unlocks
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('shared') === 'true') {
      this.unlockBonus('shared', 5, 'sharing on social media');
    }
    
    if (urlParams.get('followed') === 'true') {
      this.unlockBonus('followed', 10, 'following us on Twitter');
    }
    
    if (urlParams.get('donated') === 'true') {
      this.unlockBonus('donated', 50, 'buying us a coffee');
    }
  }

  unlockBonus(type, amount, action) {
    if (this.bonusUses[type]) return; // Already unlocked
    
    this.bonusUses[type] = true;
    const today = new Date().toDateString();
    
    localStorage.setItem('namerly-bonus-uses', JSON.stringify({
      date: today,
      bonuses: this.bonusUses
    }));
    
    this.showUnlockSuccess(amount, action);
    this.updateUI();
  }

  // 🎨 UI Management
  setupAiLimits() {
    // Add AI limit displays to AI generator pages
    const aiContainers = document.querySelectorAll('.ai-container');
    
    aiContainers.forEach(container => {
      if (container.querySelector('.ai-limit-display')) return;
      
      const limitDisplay = document.createElement('div');
      limitDisplay.className = 'ai-limit-display';
      
      const firstChild = container.firstElementChild;
      if (firstChild && firstChild.nextSibling) {
        container.insertBefore(limitDisplay, firstChild.nextSibling);
      }
    });
  }

  updateUI() {
    const remaining = this.getTotalAvailableUses() - this.aiUsage;
    const limitElements = document.querySelectorAll('.ai-limit-display');
    
    limitElements.forEach(element => {
      if (remaining > 10) {
        element.innerHTML = `🎉 <strong>${remaining}</strong> AI generations available today!`;
        element.className = 'ai-limit-display premium';
      } else if (remaining > 0) {
        element.innerHTML = `🤖 <strong>${remaining}</strong> AI generations left - <a href="#" onclick="safeMonetization.showUnlockModal()">Get more?</a>`;
        element.className = 'ai-limit-display free';
      } else {
        element.innerHTML = `⏰ <strong>Daily limit reached!</strong> <a href="#" onclick="safeMonetization.showUnlockModal()">Unlock more</a>`;
        element.className = 'ai-limit-display limit-reached';
      }
    });

    // Update generate buttons
    const generateButtons = document.querySelectorAll('.generate-btn');
    generateButtons.forEach(button => {
      if (!this.canUseAI() && !button.dataset.originalText) {
        button.dataset.originalText = button.textContent;
        button.textContent = '🎁 Unlock More Uses';
        button.onclick = () => this.showUnlockModal();
      } else if (this.canUseAI() && button.dataset.originalText) {
        button.textContent = button.dataset.originalText;
        button.onclick = null; // Reset to original function
      }
    });
  }

  // 🎁 Unlock Modal (Growth Focused)
  showUnlockModal() {
    this.removeExistingModal();
    
    const modal = document.createElement('div');
    modal.id = 'unlock-modal';
    modal.className = 'premium-modal';
    modal.innerHTML = `
      <div class="premium-content">
        <div class="premium-header">
          <h2>🎁 Unlock More AI Uses</h2>
          <button class="close-modal" onclick="safeMonetization.closeUnlockModal()">×</button>
        </div>
        
        <div class="premium-features">
          <p>Get more AI generations by supporting Namerly! 🚀</p>
          
          <div class="unlock-options">
            ${!this.bonusUses.shared ? `
              <div class="unlock-option">
                <div class="unlock-icon">📱</div>
                <div class="unlock-details">
                  <h3>Share on Social Media</h3>
                  <p>+5 extra AI uses today</p>
                  <button class="unlock-btn" onclick="safeMonetization.shareToSocial()">
                    Share & Unlock
                  </button>
                </div>
              </div>
            ` : ''}
            
            ${!this.bonusUses.followed ? `
              <div class="unlock-option">
                <div class="unlock-icon">🐦</div>
                <div class="unlock-details">
                  <h3>Follow on Twitter</h3>  
                  <p>+10 extra AI uses today</p>
                  <button class="unlock-btn" onclick="safeMonetization.followTwitter()">
                    Follow & Unlock
                  </button>
                </div>
              </div>
            ` : ''}
            
            ${!this.bonusUses.donated ? `
              <div class="unlock-option premium-option">
                <div class="unlock-icon">☕</div>
                <div class="unlock-details">
                  <h3>Buy Me a Coffee</h3>
                  <p>+50 extra AI uses today</p>
                  <button class="unlock-btn premium" onclick="safeMonetization.buyMeCoffee()">
                    Support & Unlock
                  </button>
                </div>
              </div>
            ` : ''}
          </div>
          
          <div class="unlock-footer">
            <p>💡 <strong>Tomorrow you get 3 fresh AI uses automatically!</strong></p>
            <p>🎪 All basic generators remain unlimited forever</p>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
  }

  closeUnlockModal() {
    const modal = document.getElementById('unlock-modal');
    if (modal) {
      modal.remove();
      document.body.style.overflow = 'auto';
    }
  }

  removeExistingModal() {
    const existing = document.getElementById('unlock-modal');
    if (existing) existing.remove();
  }

  // 🔗 Social Actions (Growth Hacking)
  shareToSocial() {
    const text = `🤖 Just discovered Namerly - AI that generates pickup lines, roasts, and captions in English & Spanish! Check it out: ${window.location.origin}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    
    window.open(url, '_blank', 'width=600,height=400');
    
    // Give them the unlock immediately (trust-based)
    setTimeout(() => {
      this.unlockBonus('shared', 5, 'sharing on social media');
      this.closeUnlockModal();
    }, 2000);
  }

  followTwitter() {
    // Replace with your actual Twitter handle
    window.open('https://twitter.com/intent/follow?screen_name=NamerlyCool', '_blank');
    
    // Give them the unlock immediately (trust-based)
    setTimeout(() => {
      this.unlockBonus('followed', 10, 'following us on Twitter');
      this.closeUnlockModal();
    }, 2000);
  }

  buyMeCoffee() {
    // Replace with your actual Ko-fi/Buy Me a Coffee link
    window.open('https://ko-fi.com/namerly', '_blank');
    
    // They get the unlock when they return (honor system)
    setTimeout(() => {
      this.unlockBonus('donated', 50, 'supporting us with coffee');
      this.closeUnlockModal();
    }, 5000);
  }

  // 💰 Affiliate Links (Safe Revenue)
  setupAffiliateLinks() {
    // Add affiliate links to relevant pages
    const affiliateLinks = {
      dating: {
        tinder: 'https://tinder.com/?ref=namerly',
        bumble: 'https://bumble.com/?ref=namerly',
        courses: 'https://example-dating-course.com?aff=namerly'
      },
      tools: {
        grammarly: 'https://grammarly.com/?ref=namerly',
        canva: 'https://canva.com/?ref=namerly'
      }
    };

    // Add subtle affiliate mentions
    this.addAffiliateWidget();
  }

  addAffiliateWidget() {
    const widget = document.createElement('div');
    widget.className = 'affiliate-widget';
    widget.innerHTML = `
      <div class="affiliate-content">
        <h4>🎯 Level Up Your Game</h4>
        <p>Take your dating to the next level:</p>
        <div class="affiliate-links">
          <a href="https://tinder.com" target="_blank" rel="noopener">
            🔥 Tinder Gold
          </a>
          <a href="https://bumble.com" target="_blank" rel="noopener">
            💛 Bumble Premium  
          </a>
        </div>
      </div>
    `;
    
    // Add to pickup/dating related pages
    if (window.location.pathname.includes('pickup') || 
        window.location.pathname.includes('crush')) {
      document.body.appendChild(widget);
    }
  }

  showUnlockSuccess(amount, action) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
      <div class="success-content">
        <h3>🎉 Unlocked!</h3>
        <p>+${amount} AI uses for ${action}</p>
        <p>Thank you for supporting Namerly! 💕</p>
      </div>
    `;
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #4CAF50, #45a049);
      color: white;
      padding: 2rem;
      border-radius: 15px;
      z-index: 10001;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      animation: bounce 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 4000);
  }
}

// Initialize safe monetization
const safeMonetization = new SafeMonetization();
window.safeMonetization = safeMonetization;

console.log('🎁 Safe monetization ready - no payments, no problems!');
