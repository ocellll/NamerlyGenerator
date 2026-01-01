const categories = [
  // ✅ CATEGORÍAS COMPLETADAS (con sistema anti-repetición y compartir social)
  { key: "crush", icon: "💌", completed: true },
  { key: "whatsapp", icon: "📱", completed: true },
  { key: "wifi", icon: "📶", completed: true },
  { key: "pets", icon: "🐾", completed: true },
  { key: "nicknames", icon: "😄", completed: true },
  { key: "usernames", icon: "👤", completed: true },
  { key: "gamers", icon: "🎮", completed: true },
  { key: "pickup", icon: "💕", completed: true },
  { key: "excuses", icon: "🎓", completed: true },
  { key: "bios", icon: "🧬", completed: true },
  { key: "icebreakers", icon: "❄️", completed: true },
  { key: "sarcastic", icon: "🙄", completed: true },
  { key: "roasts", icon: "🔥", completed: true },
  { key: "gym-excuses", icon: "🏋️", completed: true },
  { key: "social-excuses", icon: "🏠", completed: true },
  { key: "pranks", icon: "😈", completed: true },
  { key: "tiktok", icon: "🎵", completed: true },
  { key: "phrases", icon: "💭", completed: true },
  { key: "youtube", icon: "🎥", completed: true },

  // � NEW VIRAL GENERATORS (High SEO potential)
  { key: "instagram-names", icon: "📸", completed: true },
  { key: "tiktok-captions", icon: "🎬", completed: true },
  { key: "social-media-bios", icon: "📝", completed: true },
  { key: "youtube-ideas", icon: "💡", completed: true },

  // 🤖 AI GENERATORS (Premium Features)
  { key: "ai-pickup", icon: "🤖💕", completed: true, isAI: true },
  { key: "ai-roasts", icon: "🤖🔥", completed: true, isAI: true },
  { key: "ai-captions", icon: "🤖📸", completed: true, isAI: true },

  // �🔜 PRÓXIMAMENTE (pendientes de implementar)
  { key: "groups", icon: "👥", completed: true },
  { key: "teams", icon: "🏆", completed: true },
  { key: "telenovela", icon: "🎭", completed: false },
  { key: "projects", icon: "📚", completed: false },
  { key: "slogans", icon: "💡", completed: false },
  { key: "stories", icon: "📖", completed: false },
  { key: "emojis", icon: "😊", completed: false },
  { key: "status", icon: "💬", completed: false },
  { key: "profiles", icon: "🎯", completed: false },
  { key: "anonymous", icon: "🕵️", completed: false }
];

const translations = {
  en: {
    description: "Choose a category to generate something cool!",
    comingSoon: "🔜 Coming Soon",
    categories: {
      // Completadas
      crush: "Messages for Your Crush",
      whatsapp: "WhatsApp Names",
      wifi: "WiFi Names",
      pets: "Pet Names",
      nicknames: "Friend Nicknames",
      usernames: "Social Media Usernames",
      gamers: "Gamer Names",
      pickup: "Pickup Lines",
      excuses: "School Excuses",
      bios: "Instagram Bios",
      icebreakers: "Ice Breaker Questions",
      sarcastic: "Sarcastic Responses",
      roasts: "Creative Roasts",
      "gym-excuses": "Gym Excuses",
      "social-excuses": "Social Excuses",
      pranks: "Prank Ideas",
      tiktok: "TikTok Comment Ideas",
      phrases: "Random Phrases",
      youtube: "YouTube Video Titles",

      // New Viral Generators
      "instagram-names": "Instagram Username Generator",
      "tiktok-captions": "TikTok Caption Generator",
      "social-media-bios": "Social Media Bio Generator",
      "youtube-ideas": "YouTube Video Ideas Generator",

      // AI Generators
      "ai-pickup": "AI Pickup Lines Generator",
      "ai-roasts": "AI Roast Generator",
      "ai-captions": "AI Instagram Captions",

      // Próximamente
      groups: "WhatsApp Group Names",
      teams: "Team/Clan Names",
      telenovela: "Dramatic Character Names",
      projects: "School Project Names",
      slogans: "Funny Business Slogans",
      stories: "Story Ideas",
      emojis: "Daily Emoji Picks",
      status: "WhatsApp Status",
      profiles: "Profile Phrases",
      anonymous: "Anonymous Account Names"
    }
  },
  es: {
    description: "Elige una categoría para generar algo genial.",
    comingSoon: "🔜 Próximamente",
    categories: {
      // Completadas
      crush: "Mensajes para tu Crush",
      whatsapp: "Nombres para WhatsApp",
      wifi: "Nombres para WiFi",
      pets: "Nombres para Mascotas",
      nicknames: "Apodos para Amigos",
      usernames: "Nombres de Usuario",
      gamers: "Nombres para Gamers",
      pickup: "Frases para Ligar",
      excuses: "Excusas Escolares",
      bios: "Bios para Instagram",
      icebreakers: "Preguntas Rompe Hielo",
      sarcastic: "Respuestas Sarcásticas",
      roasts: "Insultos Creativos",
      "gym-excuses": "Excusas para el Gym",
      "social-excuses": "Excusas para No Salir",
      pranks: "Ideas para Bromas",
      tiktok: "Comentarios TikTok",
      phrases: "Frases Aleatorias",
      youtube: "Títulos para YouTube",

      // Nuevos Generadores Virales
      "instagram-names": "Generador de Nombres para Instagram",
      "tiktok-captions": "Generador de Captions para TikTok",
      "social-media-bios": "Generador de Biografías Redes Sociales",
      "youtube-ideas": "Generador de Ideas para YouTube",

      // AI Generators
      "ai-pickup": "Generador IA de Frases para Ligar",
      "ai-roasts": "Generador IA de Insultos",
      "ai-captions": "Generador IA de Captions",

      // Próximamente
      groups: "Nombres de Grupos WhatsApp",
      teams: "Nombres de Equipos/Clanes",
      telenovela: "Nombres de Telenovela",
      projects: "Nombres de Proyectos",
      slogans: "Slogans Graciosos",
      stories: "Ideas para Historias",
      emojis: "Emoji del Día",
      status: "Estados WhatsApp",
      profiles: "Frases para Perfiles",
      anonymous: "Cuentas Anónimas"
    }
  }
};

let currentLang = localStorage.getItem('namerly-lang') || (navigator.language.startsWith("es") ? "es" : "en");

function render() {
  const t = translations[currentLang];
  document.getElementById("description").textContent = t.description;

  // Update language toggle button to show which language to switch TO
  const nextLang = currentLang === "en" ? "ES" : "EN";
  document.getElementById("lang-toggle").innerHTML = `🌐 ${nextLang}`;

  const catContainer = document.getElementById("categories");
  catContainer.innerHTML = "";

  categories.forEach(cat => {
    const div = document.createElement("div");
    div.className = "category-card";

    // Add AI category special styling
    if (cat.isAI) {
      div.classList.add("ai-category");
    }

    if (cat.completed) {
      // Categoría completada - clickeable
      if (cat.isAI) {
        // AI categories have special files
        div.innerHTML = `<div class="category-icon">${cat.icon}</div><h3>${t.categories[cat.key]}</h3>`;
        div.addEventListener("click", () => {
          window.location.href = `${cat.key}.html`;
        });
      } else {
        // Regular categories
        div.innerHTML = `${cat.icon}<br>${t.categories[cat.key]}`;
        div.addEventListener("click", () => {
          window.location.href = `${cat.key}/index.html`;
        });
      }
    } else {
      // Categoría pendiente - no clickeable, con estilo diferente
      div.innerHTML = `${cat.icon}<br>${t.categories[cat.key]}<br><small style="color: #666; font-size: 0.8rem;">${t.comingSoon}</small>`;
      div.style.opacity = "0.6";
      div.style.cursor = "default";
      div.style.border = "2px dashed #ccc";
    }

    catContainer.appendChild(div);
  });
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  currentLang = currentLang === "en" ? "es" : "en";
  localStorage.setItem('namerly-lang', currentLang);
  render();
});

render();

// Search Functionality
const searchInput = document.getElementById('category-search');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const t = translations[currentLang];

    document.querySelectorAll('.category-card').forEach(card => {
      // Find the category key associated with this card
      // We need to look up the text content or store the key on the card
      const cardText = card.textContent.toLowerCase();

      if (cardText.includes(searchTerm)) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.5s ease';
      } else {
        card.style.display = 'none';
      }
    });

    // Check if any categories are visible, if not show a message?
    // Optional enhancement for later
  });
}

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
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZCBGMRHJ21';
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');

      // Load Microsoft Clarity
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", "slkofqd3y3");

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
document.addEventListener('DOMContentLoaded', function () {
  window.cookieConsent = new CookieConsent();
});