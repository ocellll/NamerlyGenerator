// Optimized AI Common Functions
let currentLanguage = localStorage.getItem('namerly-lang') || (navigator.language.startsWith("es") ? "es" : "en");

// Common translations for AI pages
const commonTranslations = {
  en: {
    backToHome: "← Back to All Generators",
    shareTitle: "Share Your AI Result",
    remainingText: "AI generations remaining today",
    limitReached: "Daily limit reached 😴",
    upgradeCTA: "Want unlimited AI generations?",
    premiumText: "Upgrade to Premium for $4.99/month",
    resetInfo: "Reset at midnight • Free tier",
    privacyNote: "Your privacy is protected. We don't store personal data.",
    copyright: "© 2025 Namerly. All rights reserved.",
    dailyLimitAlert: "Daily limit reached! Upgrade to Premium for unlimited generations.",
    loadingTexts: {
      pickup: "AI is crafting your perfect line...",
      roast: "AI is crafting the perfect roast...",
      caption: "AI is creating your perfect caption..."
    }
  },
  es: {
    backToHome: "← Volver a Todos los Generadores",
    shareTitle: "Comparte Tu Resultado IA",
    remainingText: "generaciones IA restantes hoy",
    limitReached: "Límite diario alcanzado 😴",
    upgradeCTA: "¿Quieres generaciones IA ilimitadas?",
    premiumText: "Actualiza a Premium por $4.99/mes",
    resetInfo: "Reset a medianoche • Nivel gratuito",
    privacyNote: "Tu privacidad está protegida. No almacenamos datos personales.",
    copyright: "© 2025 Namerly. Todos los derechos reservados.",
    dailyLimitAlert: "¡Límite diario alcanzado! Actualiza a Premium para generaciones ilimitadas.",
    loadingTexts: {
      pickup: "IA está creando tu línea perfecta...",
      roast: "IA está creando el insulto perfecto...",
      caption: "IA está creando tu caption perfecto..."
    }
  }
};

// Cache DOM elements for performance
const domCache = {
  langBtn: null,
  backLink: null,
  footerInfo: null,
  premiumCTA: null,
  usageLimit: null,
  loading: null,
  cache: new Map(),

  getElement(id) {
    if (!this.cache.has(id)) {
      this.cache.set(id, document.getElementById(id));
    }
    return this.cache.get(id);
  },

  getElements(ids) {
    const elements = {};
    ids.forEach(id => {
      elements[id] = this.getElement(id);
    });
    return elements;
  },

  clearCache() {
    this.cache.clear();
  }
};

// Initialize and cache DOM elements
function initializeDOMCache() {
  domCache.langBtn = document.getElementById('langBtn');
  domCache.backLink = document.querySelector('a[href="index.html"]');
  domCache.footerInfo = document.querySelector('.footer-info');
  domCache.premiumCTA = document.querySelector('.premium-cta');
  domCache.usageLimit = document.querySelector('.usage-limit');
  domCache.loading = document.getElementById('loading');
}

// Initialize language system (optimized)
function initializeLanguage() {
  if (!domCache.langBtn) initializeDOMCache();
  updateLanguageButton();
  return currentLanguage;
}

// Update language toggle button (cached)
function updateLanguageButton() {
  if (domCache.langBtn) {
    domCache.langBtn.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
  }
}

// Toggle language function (optimized)
function toggleLanguageShared() {
  currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
  localStorage.setItem('namerly-lang', currentLanguage);
  updateLanguageButton();

  // Update common elements immediately
  updateCommonElements(currentLanguage);
}

// Update common elements (optimized with caching)
function updateCommonElements(language = currentLanguage) {
  const t = commonTranslations[language];

  // Update back link (cached)
  if (domCache.backLink) {
    domCache.backLink.textContent = t.backToHome;
  }

  // Update footer (cached)
  if (domCache.footerInfo) {
    domCache.footerInfo.innerHTML = `<p>${t.copyright}</p><p>🔒 ${t.privacyNote}</p>`;
  }

  // Update premium CTA (cached)
  if (domCache.premiumCTA) {
    domCache.premiumCTA.innerHTML = `<p>💎 ${t.upgradeCTA}</p><p><strong>${t.premiumText}</strong></p>`;
  }

  // Update usage limit text (cached and optimized)
  if (domCache.usageLimit) {
    const remainingSpan = document.getElementById('remainingUses');
    if (remainingSpan) {
      const remaining = remainingSpan.textContent;
      domCache.usageLimit.innerHTML = `<p>🎯 <span id="remainingUses">${remaining}</span> ${t.remainingText}</p><p>${t.resetInfo}</p>`;
    }
  }
}

// Optimized usage tracking with better performance
const usageCache = new Map();

function getDailyUsage(category) {
  const today = new Date().toDateString();

  // Check cache first
  if (usageCache.has(category) && usageCache.get(category).date === today) {
    return usageCache.get(category);
  }

  const lastUseDate = localStorage.getItem(`${category}Date`) || '';
  let dailyUses = parseInt(localStorage.getItem(`${category}Uses`) || '0');

  // Reset if it's a new day
  if (lastUseDate !== today) {
    dailyUses = 0;
    localStorage.setItem(`${category}Date`, today);
    localStorage.setItem(`${category}Uses`, '0');
  }

  // Cache the result
  const result = { dailyUses, today, date: today };
  usageCache.set(category, result);

  return result;
}

function incrementUsage(category) {
  const { dailyUses, today } = getDailyUsage(category);
  const newUses = dailyUses + 1;

  // Update localStorage
  localStorage.setItem(`${category}Uses`, newUses.toString());
  localStorage.setItem(`${category}Date`, today);

  // Update cache
  usageCache.set(category, { dailyUses: newUses, today, date: today });

  return newUses;
}

// Update usage tracking function (called by AI pages)
function updateUsageTracking(category) {
  // Track generation with AdSense manager for smart ad timing
  if (typeof adSenseManager !== 'undefined') {
    adSenseManager.trackGeneration();
  }

  return incrementUsage(category);
}

// Get current usage count (called by AI pages)
function getUsageCount(category) {
  const { dailyUses } = getDailyUsage(category);
  return dailyUses;
}

// Check if user can use AI or offer reward ad
function checkUsageOrShowReward(category, maxUses) {
  const { dailyUses } = getDailyUsage(category);
  const bonusUses = parseInt(localStorage.getItem('namerly_bonus_uses') || '0');
  const totalUses = dailyUses - bonusUses; // Subtract bonus uses from daily count

  if (totalUses >= maxUses) {
    // User has reached limit, offer reward ad
    if (bonusUses > 0) {
      // Use bonus uses
      localStorage.setItem('namerly_bonus_uses', (bonusUses - 1).toString());
      return true; // Can proceed
    } else {
      // Show reward ad option
      showRewardAdOffer();
      return false; // Cannot proceed
    }
  }

  return true; // Can proceed normally
}

// Show reward ad offer or growth loop sharing
function showRewardAdOffer() {
  const t = commonTranslations[currentLanguage];
  const shareMsg = currentLanguage === 'en'
    ? "Share Namerly with friends to get 5 more generations instantly! 🚀"
    : "¡Comparte Namerly con amigos para obtener 5 generaciones más al instante! 🚀";

  if (confirm(shareMsg)) {
    // Open share dialog
    const shareText = currentLanguage === 'en'
      ? "I'm using Namerly to generate cool AI nicknames and captions! check it out: https://namerlygenerator.netlify.app"
      : "¡Estoy usando Namerly para generar nombres y captions con IA! Échale un vistazo: https://namerlygenerator.netlify.app";

    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');

    // Add bonus uses
    const currentBonus = parseInt(localStorage.getItem('namerly_bonus_uses') || '0');
    localStorage.setItem('namerly_bonus_uses', (currentBonus + 5).toString());

    alert(currentLanguage === 'en' ? "Thanks for sharing! You got +5 bonus uses!" : "¡Gracias por compartir! ¡Has recibido +5 usos extra!");
    location.reload(); // Refresh to update limits
  }
}

// Optimized dropdown option updater
function updateDropdownOptions(selectId, language) {
  const select = document.getElementById(selectId);
  if (!select) return;

  const options = select.querySelectorAll('option');
  const attribute = `data-${language}`;

  // Use DocumentFragment for better performance
  options.forEach(option => {
    if (option.value === '') return;

    const text = option.getAttribute(attribute);
    if (text) {
      option.textContent = text;
    }
  });
}

// Optimized placeholder updater
function updatePlaceholders(language) {
  const inputs = document.querySelectorAll('input[data-placeholder-en], textarea[data-placeholder-en]');
  const attribute = `data-placeholder-${language}`;

  inputs.forEach(input => {
    const placeholder = input.getAttribute(attribute);
    if (placeholder) {
      input.placeholder = placeholder;
    }
  });
}

// 🔑 AI CONFIGURATION (Moved to backend proxy for security)
// The frontend calls the /api/ai/generate proxy which handles the actual keys

// Unified AI API call function using Namerly Backend Proxy
async function callAIAPI(prompt, maxLength = 100) {
  // Check if API is disabled
  const apiDisabled = localStorage.getItem('namerly-api-disabled');
  if (apiDisabled === 'true') return null;

  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        maxLength: maxLength
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.text) {
        return data.text;
      }
    }

    // Handle rate limits or quotas
    if (response.status === 429 || response.status === 403) {
      console.warn("AI Limit/Quota reached on backend.");
      localStorage.setItem('namerly-api-disabled', 'true');
      setTimeout(() => localStorage.removeItem('namerly-api-disabled'), 60000);
    }

    return null;
  } catch (error) {
    console.error('AI Backend Connection Error:', error);
    return null;
  }
}

// Check if API should be re-enabled (called on page load)
function checkAPIStatus() {
  const resetTime = localStorage.getItem('namerly-api-reset');
  if (resetTime && Date.now() > parseInt(resetTime)) {
    // It's a new day, re-enable API
    localStorage.removeItem('namerly-api-disabled');
    localStorage.removeItem('namerly-api-reset');
  }
}

// Clean AI result function (optimized)
function cleanAIResult(text) {
  return text.replace(/^(Generated|Output|Result):?\s*/i, '')
    .replace(/["\[\]]/g, '')
    .trim();
}

// Unified alert function with language support
function showAlert(messageKey, isError = false) {
  const t = commonTranslations[currentLanguage];
  alert(t[messageKey] || messageKey);
}

// Optimized copy to clipboard with feedback
async function copyToClipboard(text, feedbackElement = null) {
  try {
    await navigator.clipboard.writeText(text);

    if (feedbackElement) {
      const originalText = feedbackElement.textContent;
      feedbackElement.textContent = currentLanguage === 'en' ? 'Copied!' : '¡Copiado!';
      setTimeout(() => {
        feedbackElement.textContent = originalText;
      }, 2000);
    } else {
      alert(currentLanguage === 'en' ? 'Copied to clipboard! 📋' : '¡Copiado al portapapeles! 📋');
    }
  } catch (err) {
    // Silently handle copy errors in production
  }
}

// Social sharing functions (optimized)
const socialUrls = {
  twitter: (text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
  whatsapp: (text) => `https://wa.me/?text=${encodeURIComponent(text)}`
};

function shareToSocial(platform, text) {
  const url = socialUrls[platform]?.(text);
  if (url) {
    window.open(url, '_blank');
  }
}

// Individual social sharing functions called by AI pages
function shareToInstagramShared(text) {
  // Instagram doesn't support direct sharing, copy to clipboard instead
  copyToClipboardShared(text, 'Caption ready for Instagram! 📸✨', 'Error copying caption');
}

function shareToTwitterShared(text, hashtag = '', description = '') {
  const fullText = `${text}\n\n#${hashtag} ${description}`;
  shareToSocial('twitter', fullText);
}

function shareToTikTokShared(text) {
  // TikTok doesn't support direct sharing, copy to clipboard instead
  copyToClipboardShared(text, 'Caption ready for TikTok! 🎵✨', 'Error copying caption');
}

function shareToWhatsAppShared(text, prefix = '', suffix = '') {
  const fullText = `${prefix}\n\n${text}\n\n${suffix}`;
  shareToSocial('whatsapp', fullText);
}

function copyToClipboardShared(text, successMessage = '', errorMessage = '') {
  navigator.clipboard.writeText(text).then(() => {
    alert(successMessage || (currentLanguage === 'en' ? 'Copied to clipboard! 📋' : '¡Copiado al portapapeles! 📋'));
  }).catch(err => {
    // Silently handle copy errors in production
    alert(errorMessage || (currentLanguage === 'en' ? 'Error copying text' : 'Error copiando texto'));
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    initializeDOMCache();
    updateCommonElements();
    checkAPIStatus();
  });
} else {
  // DOM already loaded
  initializeDOMCache();
  updateCommonElements();
  checkAPIStatus();
}
