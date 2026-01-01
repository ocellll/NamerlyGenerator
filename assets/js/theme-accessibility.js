// 🌙 NAMERLY DARK MODE & ACCESSIBILITY SYSTEM
// Complete dark mode implementation with accessibility features

class NamelyThemeSystem {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemPreference();
    this.transitions = false;
    this.init();
  }

  init() {
    this.createThemeToggle();
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
    this.enableTransitions();
    this.setupAccessibility();
    console.log('🌙 Theme System loaded');
  }

  // 🎨 THEME DETECTION
  getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  getStoredTheme() {
    return localStorage.getItem('namerly-theme');
  }

  storeTheme(theme) {
    localStorage.setItem('namerly-theme', theme);
  }

  // 🔘 CREATE THEME TOGGLE BUTTON
  createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.innerHTML = `
      <div class="toggle-track">
        <div class="toggle-thumb">
          <span class="sun-icon">☀️</span>
          <span class="moon-icon">🌙</span>
        </div>
      </div>
    `;

    // Add to header or create floating button
    const header = document.querySelector('header, .header, nav');
    if (header) {
      header.appendChild(toggle);
    } else {
      // Create floating toggle
      toggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        border: none;
        background: none;
        cursor: pointer;
      `;
      document.body.appendChild(toggle);
    }

    return toggle;
  }

  // 🎯 APPLY THEME
  applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    } else {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    }

    this.currentTheme = theme;
    this.updateToggleState();
    this.updateMetaThemeColor();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    this.storeTheme(newTheme);
    
    // Track theme change
    if (window.namelyGA4) {
      window.namelyGA4.trackEvent('theme_change', {
        new_theme: newTheme,
        user_preference: 'manual'
      });
    }
  }

  updateToggleState() {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.classList.toggle('dark', this.currentTheme === 'dark');
      toggle.setAttribute('aria-pressed', this.currentTheme === 'dark');
    }
  }

  updateMetaThemeColor() {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.content = this.currentTheme === 'dark' ? '#0a0a0a' : '#3b82f6';
    }
  }

  // 🎧 EVENT LISTENERS
  setupEventListeners() {
    // Toggle button click
    document.addEventListener('click', (e) => {
      if (e.target.closest('#theme-toggle')) {
        this.toggleTheme();
      }
    });

    // System preference change
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Keyboard shortcut (Ctrl/Cmd + Shift + D)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  enableTransitions() {
    // Enable transitions after initial load to prevent flash
    setTimeout(() => {
      document.documentElement.classList.add('theme-transitions');
    }, 100);
  }

  // ♿ ACCESSIBILITY FEATURES
  setupAccessibility() {
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
    this.setupReducedMotion();
    this.setupHighContrast();
    this.setupKeyboardNavigation();
  }

  setupFocusManagement() {
    // Enhanced focus indicators
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  setupScreenReaderSupport() {
    // Add screen reader announcements for theme changes
    const announcer = document.createElement('div');
    announcer.id = 'theme-announcer';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(announcer);

    // Announce theme changes
    const originalToggle = this.toggleTheme.bind(this);
    this.toggleTheme = function() {
      originalToggle();
      announcer.textContent = `Switched to ${this.currentTheme} mode`;
    };
  }

  setupReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduced-motion');
    }

    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      document.documentElement.classList.toggle('reduced-motion', e.matches);
    });
  }

  setupHighContrast() {
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      document.documentElement.classList.add('high-contrast');
    }

    window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
      document.documentElement.classList.toggle('high-contrast', e.matches);
    });
  }

  setupKeyboardNavigation() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Ensure main content has ID
    let mainContent = document.querySelector('main, #main-content');
    if (!mainContent) {
      mainContent = document.querySelector('.container, .content, .main');
      if (mainContent) mainContent.id = 'main-content';
    }
  }
}

// 🎨 ANIMATION SYSTEM
class NamelyAnimations {
  constructor() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupLoadingAnimations();
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    document.querySelectorAll('.category-card, .feature-card, .generator-result').forEach(el => {
      observer.observe(el);
    });
  }

  setupHoverEffects() {
    // Add hover effects to interactive elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.matches('button, .btn, .card, a')) {
        e.target.classList.add('hovered');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.matches('button, .btn, .card, a')) {
        e.target.classList.remove('hovered');
      }
    });
  }

  setupLoadingAnimations() {
    // Add loading states for async operations
    window.showLoading = function(element) {
      element.classList.add('loading');
      element.setAttribute('aria-busy', 'true');
    };

    window.hideLoading = function(element) {
      element.classList.remove('loading');
      element.setAttribute('aria-busy', 'false');
    };
  }
}

// 🚀 INITIALIZE THEME SYSTEM
document.addEventListener('DOMContentLoaded', () => {
  window.namelyTheme = new NamelyThemeSystem();
  window.namelyAnimations = new NamelyAnimations();
});

console.log('🎨 Namerly Theme & Accessibility System loaded!');
