# Cookie Consent Banner Implementation

## Add this to your main CSS file (assets/css/style.css)

```css
/* Cookie Consent Banner */
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2c3e50;
  color: white;
  padding: 1rem;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  z-index: 10000;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
}

.cookie-banner.show {
  transform: translateY(0);
}

.cookie-banner-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.cookie-banner-text {
  flex: 1;
  min-width: 250px;
}

.cookie-banner-text p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.cookie-banner-text a {
  color: #3498db;
  text-decoration: underline;
}

.cookie-banner-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cookie-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: bold;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.cookie-btn-accept {
  background: #27ae60;
  color: white;
}

.cookie-btn-accept:hover {
  background: #229954;
}

.cookie-btn-decline {
  background: #e74c3c;
  color: white;
}

.cookie-btn-decline:hover {
  background: #c0392b;
}

.cookie-btn-settings {
  background: #95a5a6;
  color: white;
}

.cookie-btn-settings:hover {
  background: #7f8c8d;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .cookie-banner-content {
    flex-direction: column;
    text-align: center;
  }
  
  .cookie-banner-buttons {
    width: 100%;
    justify-content: center;
  }
  
  .cookie-btn {
    flex: 1;
    min-width: 80px;
  }
}
```

## Add this JavaScript to your main app.js or create a separate cookies.js file

```javascript
// Cookie Consent Management
class CookieConsent {
  constructor() {
    this.consentKey = 'namerly-cookie-consent';
    this.init();
  }

  init() {
    // Check if consent has already been given
    const consent = localStorage.getItem(this.consentKey);
    if (!consent) {
      this.showBanner();
    } else {
      this.loadAnalytics(JSON.parse(consent));
    }
  }

  showBanner() {
    // Create banner HTML
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-banner-text">
          <p>
            🍪 We use cookies to enhance your experience and analyze our traffic. 
            <a href="cookie-policy.html" target="_blank">Learn more</a> about our cookie usage.
          </p>
        </div>
        <div class="cookie-banner-buttons">
          <button class="cookie-btn cookie-btn-accept" onclick="cookieConsent.acceptAll()">
            Accept All
          </button>
          <button class="cookie-btn cookie-btn-decline" onclick="cookieConsent.acceptEssential()">
            Essential Only
          </button>
          <button class="cookie-btn cookie-btn-settings" onclick="cookieConsent.showSettings()">
            Settings
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    
    // Show banner with animation
    setTimeout(() => {
      banner.classList.add('show');
    }, 500);
  }

  acceptAll() {
    const consent = {
      essential: true,
      analytics: true,
      functional: true,
      timestamp: Date.now()
    };
    
    localStorage.setItem(this.consentKey, JSON.stringify(consent));
    this.loadAnalytics(consent);
    this.hideBanner();
    
    // Track consent event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'cookie_consent', {
        'consent_type': 'accept_all'
      });
    }
  }

  acceptEssential() {
    const consent = {
      essential: true,
      analytics: false,
      functional: false,
      timestamp: Date.now()
    };
    
    localStorage.setItem(this.consentKey, JSON.stringify(consent));
    this.hideBanner();
    
    console.log('Only essential cookies accepted. Analytics disabled.');
  }

  showSettings() {
    // Create detailed settings modal
    const modal = document.createElement('div');
    modal.className = 'cookie-settings-modal';
    modal.innerHTML = `
      <div class="cookie-settings-content">
        <h2>Cookie Settings</h2>
        <div class="cookie-category">
          <h3>
            <input type="checkbox" id="essential" checked disabled>
            Essential Cookies (Required)
          </h3>
          <p>These cookies are necessary for the website to function and cannot be disabled.</p>
        </div>
        <div class="cookie-category">
          <h3>
            <input type="checkbox" id="analytics">
            Analytics Cookies
          </h3>
          <p>Help us understand how you use our website to improve the service.</p>
        </div>
        <div class="cookie-category">
          <h3>
            <input type="checkbox" id="functional">
            Functional Cookies
          </h3>
          <p>Remember your preferences and enhance your experience.</p>
        </div>
        <div class="cookie-settings-buttons">
          <button onclick="cookieConsent.saveSettings()">Save Settings</button>
          <button onclick="cookieConsent.closeSettings()">Cancel</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  saveSettings() {
    const consent = {
      essential: true,
      analytics: document.getElementById('analytics').checked,
      functional: document.getElementById('functional').checked,
      timestamp: Date.now()
    };
    
    localStorage.setItem(this.consentKey, JSON.stringify(consent));
    this.loadAnalytics(consent);
    this.closeSettings();
    this.hideBanner();
  }

  closeSettings() {
    const modal = document.querySelector('.cookie-settings-modal');
    if (modal) {
      modal.remove();
    }
  }

  hideBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
      banner.classList.remove('show');
      setTimeout(() => {
        banner.remove();
      }, 300);
    }
  }

  loadAnalytics(consent) {
    if (consent.analytics) {
      // Load Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');

      // Load Microsoft Clarity
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");

      console.log('Analytics loaded with user consent');
    }
  }

  // Method to revoke consent (for settings page)
  revokeConsent() {
    localStorage.removeItem(this.consentKey);
    // Reload page to reset everything
    window.location.reload();
  }

  // Get current consent status
  getConsent() {
    const consent = localStorage.getItem(this.consentKey);
    return consent ? JSON.parse(consent) : null;
  }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.cookieConsent = new CookieConsent();
});
```

## Add this CSS for the settings modal

```css
.cookie-settings-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10001;
}

.cookie-settings-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.cookie-category {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.cookie-category h3 {
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cookie-settings-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.cookie-settings-buttons button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #007acc;
  color: white;
}

.cookie-settings-buttons button:hover {
  background: #0056b3;
}
```

## Implementation Instructions

1. Add the CSS to your main stylesheet
2. Add the JavaScript to your main app.js file
3. Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics ID
4. Replace 'CLARITY_PROJECT_ID' with your actual Microsoft Clarity ID
5. Test the banner on different devices and browsers

The banner will automatically show for new visitors and comply with GDPR, CCPA, and other privacy regulations.
