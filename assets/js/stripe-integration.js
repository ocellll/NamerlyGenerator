/**
 * NAMERLY STRIPE INTEGRATION
 * AI Premium Subscription System
 */

class StripeManager {
  constructor() {
    // Stripe configuration
    this.stripe = null;
    this.publicKey = 'pk_test_...'; // Replace with your publishable key
    this.priceId = 'price_...'; // Replace with your price ID from Stripe Dashboard
    
    // Subscription status
    this.isSubscribed = this.checkSubscriptionStatus();
    this.aiUsage = this.getAiUsage();
    
    this.init();
  }

  async init() {
    // Load Stripe.js
    if (!window.Stripe) {
      await this.loadStripe();
    }
    
    this.stripe = Stripe(this.publicKey);
    this.setupPremiumSystem();
    this.updateUI();
    
    console.log('💳 Stripe integration loaded!');
  }

  async loadStripe() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }

  // 🤖 AI Usage Management
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

  canUseAI() {
    if (this.isSubscribed) return true;
    return this.aiUsage < 3; // 3 free uses per day
  }

  incrementAiUsage() {
    if (this.isSubscribed) return true;

    this.aiUsage++;
    const today = new Date().toDateString();
    localStorage.setItem('namerly-ai-usage', JSON.stringify({
      date: today,
      count: this.aiUsage
    }));

    this.updateUI();
    return this.aiUsage <= 3;
  }

  // 💎 Subscription Management
  checkSubscriptionStatus() {
    const subscription = localStorage.getItem('namerly-subscription');
    if (subscription) {
      const data = JSON.parse(subscription);
      const isActive = new Date(data.expires) > new Date();
      
      if (!isActive) {
        localStorage.removeItem('namerly-subscription');
        return false;
      }
      
      return true;
    }
    return false;
  }

  async createCheckoutSession() {
    try {
      // Call your backend to create checkout session
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: this.priceId,
          successUrl: window.location.origin + '/success?session_id={CHECKOUT_SESSION_ID}',
          cancelUrl: window.location.origin + '/cancel',
        }),
      });

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const { error } = await this.stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error('Stripe redirect error:', error);
        this.showError('Error redirecting to payment. Please try again.');
      }

    } catch (error) {
      console.error('Checkout session error:', error);
      this.showError('Error creating payment session. Please try again.');
    }
  }

  // 🎨 UI Management
  setupPremiumSystem() {
    // Add premium modals to page
    this.addPremiumModal();
    this.addAiLimitDisplays();
    this.bindEvents();
  }

  addPremiumModal() {
    if (document.getElementById('premium-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'premium-modal';
    modal.className = 'premium-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div class="premium-content">
        <div class="premium-header">
          <h2>🤖 Upgrade to AI Premium</h2>
          <button class="close-modal" onclick="stripeManager.closePremiumModal()">×</button>
        </div>
        
        <div class="premium-features">
          <div class="feature-comparison">
            <div class="free-column">
              <h3>🆓 Free</h3>
              <ul>
                <li>✅ All basic generators</li>
                <li>⚡ 3 AI generations/day</li>
                <li>🤖 Standard AI quality</li>
                <li>📱 Basic features</li>
              </ul>
            </div>
            
            <div class="premium-column">
              <h3>💎 Premium</h3>
              <ul>
                <li>✅ All basic generators</li>
                <li>🔥 Unlimited AI generations</li>
                <li>🚀 GPT-4 premium quality</li>
                <li>⚡ Faster AI responses</li>
                <li>🎨 Advanced AI personalities</li>
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
            <button class="upgrade-btn" onclick="stripeManager.startCheckout()">
              🚀 Start Free Trial
            </button>
            <button class="maybe-later" onclick="stripeManager.closePremiumModal()">
              Maybe Later
            </button>
          </div>
          
          <div class="security-badges">
            <p>🔒 Secure payment powered by Stripe</p>
            <div class="payment-methods">
              💳 Visa • Mastercard • PayPal • Apple Pay
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  addAiLimitDisplays() {
    // Add AI limit displays to AI generator pages
    const aiContainers = document.querySelectorAll('.ai-container');
    
    aiContainers.forEach(container => {
      if (container.querySelector('.ai-limit-display')) return;
      
      const limitDisplay = document.createElement('div');
      limitDisplay.className = 'ai-limit-display';
      
      // Insert after the first element (usually the title)
      const firstChild = container.firstElementChild;
      if (firstChild && firstChild.nextSibling) {
        container.insertBefore(limitDisplay, firstChild.nextSibling);
      } else {
        container.appendChild(limitDisplay);
      }
    });
    
    this.updateUI();
  }

  updateUI() {
    const remaining = Math.max(0, 3 - this.aiUsage);
    const limitElements = document.querySelectorAll('.ai-limit-display');
    
    limitElements.forEach(element => {
      if (this.isSubscribed) {
        element.innerHTML = '💎 <strong>Premium Active</strong> - Unlimited AI generations';
        element.className = 'ai-limit-display premium';
      } else if (remaining > 0) {
        element.innerHTML = `🤖 <strong>${remaining}</strong> AI generations left today <a href="#" onclick="stripeManager.showPremiumModal()">Upgrade?</a>`;
        element.className = 'ai-limit-display free';
      } else {
        element.innerHTML = `⏰ <strong>Daily limit reached!</strong> <a href="#" onclick="stripeManager.showPremiumModal()">Upgrade to Premium</a>`;
        element.className = 'ai-limit-display limit-reached';
      }
    });

    // Update generate buttons
    const generateButtons = document.querySelectorAll('.generate-btn');
    generateButtons.forEach(button => {
      if (!this.canUseAI()) {
        button.disabled = true;
        button.textContent = '💎 Upgrade to Premium';
        button.onclick = () => this.showPremiumModal();
      }
    });
  }

  bindEvents() {
    // Intercept AI generation attempts
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const url = args[0];
      
      // Check if it's an AI API call
      if (typeof url === 'string' && (
        url.includes('api-inference.huggingface.co') ||
        url.includes('api.openai.com') ||
        url.includes('ai-api')
      )) {
        if (!this.canUseAI()) {
          this.showPremiumModal();
          throw new Error('AI limit reached');
        }
        
        // Increment usage for non-premium users
        if (!this.isSubscribed) {
          this.incrementAiUsage();
        }
      }
      
      return originalFetch.apply(this, args);
    };
  }

  // 🎪 Modal Management
  showPremiumModal() {
    const modal = document.getElementById('premium-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Analytics
      this.trackEvent('premium_modal_shown', {
        aiUsage: this.aiUsage,
        trigger: 'limit_reached'
      });
    }
  }

  closePremiumModal() {
    const modal = document.getElementById('premium-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }

  // 💳 Stripe Checkout
  async startCheckout() {
    // Track conversion attempt
    this.trackEvent('checkout_started', {
      plan: 'ai_premium',
      price: 2.99
    });

    // For development/testing - simulate successful subscription
    if (this.publicKey.includes('test') || window.location.hostname === 'localhost') {
      this.simulateSubscription();
      return;
    }

    await this.createCheckoutSession();
  }

  // 🧪 Development Helper
  simulateSubscription() {
    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);
    
    localStorage.setItem('namerly-subscription', JSON.stringify({
      status: 'active',
      expires: expires.toISOString(),
      plan: 'ai_premium'
    }));
    
    this.isSubscribed = true;
    this.closePremiumModal();
    this.updateUI();
    
    // Show success message
    this.showSuccess('🎉 Premium activated! (Development mode)');
    
    console.log('💎 Premium subscription simulated for development');
  }

  // 📊 Analytics & Notifications
  trackEvent(event, data) {
    // Send to your analytics
    if (window.gtag) {
      gtag('event', event, data);
    }
    
    console.log('📊 Event tracked:', event, data);
  }

  showSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      z-index: 10001;
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  showError(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #f44336;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      z-index: 10001;
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  // 🔄 Subscription Status Check (for returning users)
  async refreshSubscriptionStatus() {
    try {
      const response = await fetch('/subscription-status', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.active) {
          const expires = new Date(data.expires);
          localStorage.setItem('namerly-subscription', JSON.stringify({
            status: 'active',
            expires: expires.toISOString(),
            plan: data.plan
          }));
          this.isSubscribed = true;
        } else {
          localStorage.removeItem('namerly-subscription');
          this.isSubscribed = false;
        }
        
        this.updateUI();
      }
    } catch (error) {
      console.error('Error checking subscription status:', error);
    }
  }
}

// Initialize Stripe manager
const stripeManager = new StripeManager();

// Export for global access
window.stripeManager = stripeManager;

// Auto-refresh subscription status on page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    stripeManager.refreshSubscriptionStatus();
  }, 1000);
});

console.log('💳 Stripe AI Premium system loaded!');
