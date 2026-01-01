// 🔔 NAMERLY NOTIFICATION SYSTEM
// Advanced toast notifications with accessibility and animations

class NamelyNotifications {
  constructor() {
    this.notifications = [];
    this.container = null;
    this.init();
  }

  init() {
    this.createContainer();
    this.setupEventListeners();
    console.log('🔔 Notification System loaded');
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.id = 'notification-container';
    this.container.className = 'notification-container';
    this.container.setAttribute('aria-live', 'polite');
    this.container.setAttribute('aria-label', 'Notifications');
    document.body.appendChild(this.container);
  }

  // 🎯 SHOW NOTIFICATION
  show(message, type = 'info', options = {}) {
    const notification = this.createNotification(message, type, options);
    this.notifications.push(notification);
    this.container.appendChild(notification.element);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.element.classList.add('show');
    });

    // Auto dismiss
    if (options.autoClose !== false) {
      const duration = options.duration || this.getDefaultDuration(type);
      setTimeout(() => {
        this.dismiss(notification.id);
      }, duration);
    }

    // Track notification
    if (window.namelyGA4) {
      window.namelyGA4.trackEvent('notification_shown', {
        notification_type: type,
        message_category: options.category || 'general'
      });
    }

    return notification.id;
  }

  createNotification(message, type, options) {
    const id = 'notification_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    const element = document.createElement('div');
    element.className = `notification notification-${type}`;
    element.setAttribute('role', type === 'error' ? 'alert' : 'status');
    element.setAttribute('aria-atomic', 'true');
    element.id = id;

    const icon = this.getIcon(type);
    const actionButtons = this.createActionButtons(options.actions || []);

    element.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">${icon}</div>
        <div class="notification-message">
          <div class="notification-title">${options.title || this.getDefaultTitle(type)}</div>
          <div class="notification-text">${message}</div>
        </div>
        ${actionButtons}
        <button class="notification-close" aria-label="Close notification">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="notification-progress"></div>
    `;

    // Add event listeners
    element.querySelector('.notification-close').addEventListener('click', () => {
      this.dismiss(id);
    });

    // Action button listeners
    element.querySelectorAll('.notification-action').forEach(button => {
      button.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (options.actions) {
          const actionConfig = options.actions.find(a => a.action === action);
          if (actionConfig && actionConfig.handler) {
            actionConfig.handler();
          }
        }
        if (e.target.dataset.dismiss !== 'false') {
          this.dismiss(id);
        }
      });
    });

    return { id, element, type, message };
  }

  createActionButtons(actions) {
    if (!actions.length) return '';
    
    return `
      <div class="notification-actions">
        ${actions.map(action => `
          <button class="notification-action" data-action="${action.action}" data-dismiss="${action.dismiss !== false}">
            ${action.label}
          </button>
        `).join('')}
      </div>
    `;
  }

  getIcon(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
      loading: '⏳'
    };
    return icons[type] || icons.info;
  }

  getDefaultTitle(type) {
    const titles = {
      success: 'Success!',
      error: 'Error',
      warning: 'Warning',
      info: 'Info',
      loading: 'Loading...'
    };
    return titles[type] || 'Notification';
  }

  getDefaultDuration(type) {
    const durations = {
      success: 4000,
      error: 6000,
      warning: 5000,
      info: 4000,
      loading: 0 // No auto close
    };
    return durations[type] || 4000;
  }

  // 🚫 DISMISS NOTIFICATION
  dismiss(id) {
    const notification = this.notifications.find(n => n.id === id);
    if (!notification) return;

    notification.element.classList.add('hide');
    
    setTimeout(() => {
      if (notification.element.parentNode) {
        notification.element.parentNode.removeChild(notification.element);
      }
      this.notifications = this.notifications.filter(n => n.id !== id);
    }, 300);
  }

  // 🧹 CLEAR ALL NOTIFICATIONS
  clearAll() {
    this.notifications.forEach(notification => {
      this.dismiss(notification.id);
    });
  }

  // 🎯 PRESET NOTIFICATION TYPES
  success(message, options = {}) {
    return this.show(message, 'success', options);
  }

  error(message, options = {}) {
    return this.show(message, 'error', options);
  }

  warning(message, options = {}) {
    return this.show(message, 'warning', options);
  }

  info(message, options = {}) {
    return this.show(message, 'info', options);
  }

  loading(message, options = {}) {
    return this.show(message, 'loading', { ...options, autoClose: false });
  }

  // 📋 COPY SUCCESS NOTIFICATION
  copySuccess(content, category = 'general') {
    this.success('Copied to clipboard!', {
      title: 'Content Copied',
      category: 'copy_action',
      actions: [
        {
          label: 'Generate More',
          action: 'generate_more',
          handler: () => {
            const generateBtn = document.querySelector('#generateBtn, .generate-btn');
            if (generateBtn) generateBtn.click();
          }
        }
      ]
    });

    // Track copy action
    if (window.trackCopy) {
      window.trackCopy(category, content);
    }
  }

  // 🚨 ERROR WITH RETRY
  errorWithRetry(message, retryCallback, options = {}) {
    return this.error(message, {
      ...options,
      title: 'Something went wrong',
      actions: [
        {
          label: 'Retry',
          action: 'retry',
          handler: retryCallback,
          dismiss: false
        },
        {
          label: 'Dismiss',
          action: 'dismiss'
        }
      ]
    });
  }

  // 🔄 UPDATE LOADING NOTIFICATION
  updateLoading(id, message, progress = null) {
    const notification = this.notifications.find(n => n.id === id);
    if (!notification) return;

    const textElement = notification.element.querySelector('.notification-text');
    const progressElement = notification.element.querySelector('.notification-progress');
    
    if (textElement) {
      textElement.textContent = message;
    }

    if (progress !== null && progressElement) {
      progressElement.style.width = `${progress}%`;
    }
  }

  // ✅ COMPLETE LOADING NOTIFICATION
  completeLoading(id, successMessage, options = {}) {
    const notification = this.notifications.find(n => n.id === id);
    if (!notification) return;

    // Transform to success notification
    notification.element.className = 'notification notification-success show';
    notification.element.querySelector('.notification-icon').textContent = '✅';
    notification.element.querySelector('.notification-title').textContent = options.title || 'Complete!';
    notification.element.querySelector('.notification-text').textContent = successMessage;

    // Auto dismiss after delay
    setTimeout(() => {
      this.dismiss(id);
    }, options.duration || 3000);
  }

  setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Escape to close notifications
      if (e.key === 'Escape') {
        const activeNotifications = document.querySelectorAll('.notification.show');
        if (activeNotifications.length > 0) {
          this.dismiss(activeNotifications[activeNotifications.length - 1].id);
        }
      }
    });

    // Click outside to dismiss (optional)
    document.addEventListener('click', (e) => {
      if (e.target.closest('.notification-container')) return;
      // Could implement click-outside-to-dismiss here if desired
    });
  }
}

// 🎨 GLOBAL NOTIFICATION FUNCTIONS
window.notify = {
  show: (message, type, options) => window.namelyNotifications.show(message, type, options),
  success: (message, options) => window.namelyNotifications.success(message, options),
  error: (message, options) => window.namelyNotifications.error(message, options),
  warning: (message, options) => window.namelyNotifications.warning(message, options),
  info: (message, options) => window.namelyNotifications.info(message, options),
  loading: (message, options) => window.namelyNotifications.loading(message, options),
  copySuccess: (content, category) => window.namelyNotifications.copySuccess(content, category),
  errorWithRetry: (message, retry, options) => window.namelyNotifications.errorWithRetry(message, retry, options),
  updateLoading: (id, message, progress) => window.namelyNotifications.updateLoading(id, message, progress),
  completeLoading: (id, message, options) => window.namelyNotifications.completeLoading(id, message, options),
  dismiss: (id) => window.namelyNotifications.dismiss(id),
  clearAll: () => window.namelyNotifications.clearAll()
};

// 🚀 INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
  window.namelyNotifications = new NamelyNotifications();
});

console.log('🔔 Namerly Notification System loaded!');
