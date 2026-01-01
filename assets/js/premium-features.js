/**
 * NAMERLY GENERATOR - PREMIUM FEATURES
 * Handles Saved Results, History, and Sync with Supabase
 */

import { supabase } from './supabase-client.js';

class PremiumFeatures {
    constructor() {
        this.data = {
            saved: [],
            history: []
        };
        this.user = null;
        this.isPremium = false;
        this.init();
    }

    async init() {
        this.createPanelUI();
        this.attachEventListeners();
        this.loadStripeScript(); // Load Stripe

        // Check session
        const { data: { session } } = await supabase.auth.getSession();
        this.handleAuthChange(session);

        // Listen for auth changes
        supabase.auth.onAuthStateChange((_event, session) => {
            this.handleAuthChange(session);
        });
    }

    loadStripeScript() {
        if (!document.getElementById('stripe-js')) {
            const script = document.createElement('script');
            script.id = 'stripe-js';
            script.src = 'https://js.stripe.com/v3/';
            script.onload = () => console.log('Stripe loaded');
            document.head.appendChild(script);
        }
    }

    // ... (rest of methods) ...

    // Login logic
    async login() {
        const email = prompt("Enter your email to sign in / sign up:");
        if (!email) return;

        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) alert("Error: " + error.message);
        else alert("Check your email for the magic link!");
    }

    async logout() {
        await supabase.auth.signOut();
        window.location.reload();
    }

    // Checkout Logic
    async startCheckout() {
        if (!this.user) {
            this.login();
            return;
        }

        const btn = document.getElementById('upgrade-btn');
        if (btn) btn.innerText = 'Loading...';

        try {
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.user.id })
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Error starting checkout: ' + (data.error || 'Unknown error'));
                if (btn) btn.innerText = 'Get Pro 🚀';
            }
        } catch (e) {
            console.error(e);
            alert('Connection error. Please try again.');
            if (btn) btn.innerText = 'Get Pro 🚀';
        }
    }

    // Create the floating panel UI
    createPanelUI() {
        const panelHTML = `
            <div id="premium-panel-container">
                <div class="panel-toggle" id="premium-panel-toggle">
                    <span>⭐</span>
                    <span class="badge" id="premium-badge-count">0</span>
                </div>

                <div class="premium-panel" id="premium-panel">
                    <div class="panel-header">
                        <h3>Your Library</h3>
                        <div class="header-actions">
                            <button id="auth-btn" class="mini-btn">Login</button>
                            <button class="close-btn" id="premium-panel-close">&times;</button>
                        </div>
                    </div>
                    
                    ${!this.isPremium ? `
                    <div class="premium-promo" id="pro-promo">
                        <p>Unlock Unlimited Saves & History</p>
                        <button id="upgrade-btn" class="upgrade-btn">Get Pro 🚀</button>
                    </div>
                    ` : ''}

                    <div class="panel-tabs">
                        <div class="panel-tab active" data-target="saved-content">Saved</div>
                        <div class="panel-tab" data-target="history-content">History</div>
                    </div>

                    <div class="panel-content">
                        <div id="saved-content" class="tab-pane active"></div>
                        <div id="history-content" class="tab-pane" style="display:none"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', panelHTML);
        this.renderSaved();
        this.renderHistory();

        // Attach upgrade listener
        const upgradeBtn = document.getElementById('upgrade-btn');
        if (upgradeBtn) {
            upgradeBtn.addEventListener('click', () => this.startCheckout());
        }
    }

    async handleAuthChange(session) {
        this.user = session?.user || null;
        this.updateAuthUI();

        if (this.user) {
            await this.syncLocalToRemote(); // Auto-migrate local data
            await this.loadRemoteData();
            await this.checkRemotePremiumStatus();
        } else {
            this.loadLocalData();
            this.isPremium = false;
        }

        this.updateBadgeCount();
        this.renderSaved();
        this.renderHistory();
        this.checkPremiumStatus(); // UI update
    }

    // Migrate local data to Supabase if not already there
    async syncLocalToRemote() {
        const localSaved = JSON.parse(localStorage.getItem('namerly_saved_results') || '[]');
        const localHistory = JSON.parse(localStorage.getItem('namerly_history') || '[]');

        if (localSaved.length === 0 && localHistory.length === 0) return;

        console.log('Syncing local data to cloud...');

        // 1. Sync Saved Results
        if (localSaved.length > 0) {
            const { data: remoteSaved } = await supabase.from('saved_results').select('content').eq('user_id', this.user.id);
            const remoteContent = new Set(remoteSaved?.map(i => i.content) || []);

            const newItems = localSaved.filter(item => !remoteContent.has(item.content)).map(item => ({
                user_id: this.user.id,
                content: item.content,
                category: item.category || 'General',
                created_at: item.timestamp || new Date().toISOString()
            }));

            if (newItems.length > 0) {
                await supabase.from('saved_results').insert(newItems);
            }
        }

        // 2. Sync History
        if (localHistory.length > 0) {
            const recentLocal = localHistory.slice(0, 50);

            const { data: existingRemote } = await supabase.from('user_history').select('content').eq('user_id', this.user.id);
            const existingSet = new Set(existingRemote?.map(i => i.content) || []);

            const historyToInsert = recentLocal.filter(i => !existingSet.has(i.content)).map(item => ({
                user_id: this.user.id,
                content: item.content,
                category: item.category || 'General',
                created_at: item.timestamp || new Date().toISOString()
            }));

            if (historyToInsert.length > 0) {
                await supabase.from('user_history').insert(historyToInsert);
            }
        }


        // 3. Sync Premium Status (One-time migration)
        const localUsage = JSON.parse(localStorage.getItem('namerly_usage') || '{}');
        if (localUsage.bonuses?.donated) {
            const { data: profile } = await supabase.from('user_profiles').select('is_premium').eq('id', this.user.id).single();
            if (profile && !profile.is_premium) {
                console.log('Migrating premium status...');
                await supabase.from('user_profiles').update({ is_premium: true }).eq('id', this.user.id);
                this.isPremium = true;
            }
        }

        // Clear local storage after sync to avoid confusion? 
        // Keeping it for now as safe backup until verified.
    }

    // Load data from Supabase
    async loadRemoteData() {
        const { data: saved } = await supabase.from('saved_results').select('*').order('created_at', { ascending: false });
        const { data: history } = await supabase.from('user_history').select('*').order('created_at', { ascending: false });

        if (saved) this.data.saved = saved;
        if (history) this.data.history = history;
    }

    // Load data from localStorage (Fallback)
    loadLocalData() {
        const saved = localStorage.getItem('namerly_saved_results');
        const history = localStorage.getItem('namerly_history');

        if (saved) this.data.saved = JSON.parse(saved);
        if (history) this.data.history = JSON.parse(history);
    }

    // Check Premium Status from DB or Local
    async checkRemotePremiumStatus() {
        const { data: profile } = await supabase.from('user_profiles').select('is_premium').eq('id', this.user.id).single();
        this.isPremium = profile?.is_premium || false;
    }

    checkPremiumStatus() {
        // Fallback or UI update
        if (this.isPremium) {
            document.body.classList.add('premium-user');
        } else {
            document.body.classList.remove('premium-user');
        }
    }

    // Login logic
    async login() {
        const email = prompt("Enter your email to sign in / sign up:");
        if (!email) return;

        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) alert("Error: " + error.message);
        else alert("Check your email for the magic link!");
    }

    async logout() {
        await supabase.auth.signOut();
    }

    // Add result to history
    async addToHistory(content, category = 'General') {
        const item = {
            content: content,
            category: category,
            timestamp: new Date().toISOString(),
            id: Date.now() // Temporary ID for UI
        };

        this.data.history.unshift(item);
        this.renderHistory();

        if (this.user) {
            // Save to DB
            const { error } = await supabase.from('user_history').insert({
                user_id: this.user.id,
                content: content,
                category: category
            });
            if (error) console.error('History sync error:', error);
        } else {
            // Save to Local
            this.saveToLocal();
        }
    }

    // Save/Unsave a result
    async toggleSave(content, category = 'General') {
        if (!this.user) {
            this.login();
            return false;
        }

        if (!this.isPremium) {
            alert('⭐ Premium Required: Upgrade to Pro to save favorites!');
            return false;
        }

        const index = this.data.saved.findIndex(item => item.content === content);

        if (index > -1) {
            // Remove
            const id = this.data.saved[index].id; // DB ID if loaded from DB
            // Optimistic update
            this.data.saved.splice(index, 1);
            if (typeof id !== 'number') { // If it's a DB ID (usually number for bigints but JS handles safely mostly, checking if it exists)
                // Supabase IDs...
                // Wait, my DB schema uses bigint generated by identity. 
                // If loaded from remote, item.id is valid.
                await supabase.from('saved_results').delete().eq('user_id', this.user.id).eq('content', content);
            }
        } else {
            // Add
            const newItem = {
                content: content,
                category: category,
                timestamp: new Date().toISOString(),
                id: Date.now()
            };
            this.data.saved.unshift(newItem);

            await supabase.from('saved_results').insert({
                user_id: this.user.id,
                content: content,
                category: category
            });
            // Re-fetch to get ID? Or just rely on content matching for now.
            this.loadRemoteData();
        }

        this.updateBadgeCount();
        this.renderSaved();

        // Update UI button
        const saveBtn = document.getElementById('save-result-btn');
        if (saveBtn) {
            const isSaved = this.data.saved.some(item => item.content === content);
            saveBtn.classList.toggle('active', isSaved);
            saveBtn.innerHTML = isSaved ? '❤️ Saved' : '⭐ Save';
        }

        return true;
    }

    // Delete item
    async deleteItem(id, type = 'saved') {
        if (type === 'saved') {
            const item = this.data.saved.find(i => i.id == id);
            this.data.saved = this.data.saved.filter(i => i.id !== id);
            this.renderSaved();
            if (this.user && item) {
                await supabase.from('saved_results').delete().eq('id', id);
            } else {
                this.saveToLocal();
            }
        } else {
            const item = this.data.history.find(i => i.id == id);
            this.data.history = this.data.history.filter(i => i.id !== id);
            this.renderHistory();
            if (this.user && item) {
                await supabase.from('user_history').delete().eq('id', id);
            } else {
                this.saveToLocal();
            }
        }
    }

    saveToLocal() {
        localStorage.setItem('namerly_saved_results', JSON.stringify(this.data.saved));
        localStorage.setItem('namerly_history', JSON.stringify(this.data.history));
        this.updateBadgeCount();
    }

    // Create the floating panel UI
    createPanelUI() {
        const panelHTML = `
            <div id="premium-panel-container">
                <div class="panel-toggle" id="premium-panel-toggle">
                    <span>⭐</span>
                    <span class="badge" id="premium-badge-count">0</span>
                </div>

                <div class="premium-panel" id="premium-panel">
                    <div class="panel-header">
                        <h3>Your Library</h3>
                        <div class="header-actions">
                            <button id="auth-btn" class="mini-btn">Login</button>
                            <button class="close-btn" id="premium-panel-close">&times;</button>
                        </div>
                    </div>

                    <div class="panel-tabs">
                        <div class="panel-tab active" data-target="saved-content">Saved</div>
                        <div class="panel-tab" data-target="history-content">History</div>
                    </div>

                    <div class="panel-content">
                        <div id="saved-content" class="tab-pane active"></div>
                        <div id="history-content" class="tab-pane" style="display:none"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', panelHTML);
        this.renderSaved();
        this.renderHistory();
    }

    updateAuthUI() {
        const btn = document.getElementById('auth-btn');
        if (btn) {
            btn.textContent = this.user ? 'Logout' : 'Login';
            btn.onclick = this.user ? () => this.logout() : () => this.login();
        }
    }

    attachEventListeners() {
        const toggle = document.getElementById('premium-panel-toggle');
        const close = document.getElementById('premium-panel-close');
        const panel = document.getElementById('premium-panel');
        const tabs = document.querySelectorAll('.panel-tab');

        if (toggle) toggle.addEventListener('click', () => panel.classList.add('active'));
        if (close) close.addEventListener('click', () => panel.classList.remove('active'));

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const targetId = tab.dataset.target;
                const savedContent = document.getElementById('saved-content');
                const historyContent = document.getElementById('history-content');

                if (savedContent) savedContent.style.display = targetId === 'saved-content' ? 'block' : 'none';
                if (historyContent) historyContent.style.display = targetId === 'history-content' ? 'block' : 'none';
            });
        });
    }

    updateBadgeCount() {
        const badge = document.getElementById('premium-badge-count');
        if (badge) badge.textContent = this.data.saved.length;
    }

    renderSaved() {
        const container = document.getElementById('saved-content');
        if (!container) return;

        if (this.data.saved.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i>📂</i>
                    <p>No saved results yet.</p>
                    ${!this.isPremium ? '<p style="font-size:0.8rem">Upgrade to Pro to save favorites!</p>' : ''}
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.saved.map(item => this.createItemHTML(item, 'saved')).join('');
    }

    renderHistory() {
        const container = document.getElementById('history-content');
        if (!container) return;

        if (this.data.history.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i>🕒</i>
                    <p>Your history is empty.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.history.map(item => this.createItemHTML(item, 'history')).join('');
    }

    createItemHTML(item, type) {
        const date = new Date(item.timestamp).toLocaleDateString();
        const isSaved = this.data.saved.some(s => s.content === item.content);
        const safeContent = item.content.replace(/'/g, "\\'");

        return `
            <div class="panel-item ${type === 'saved' ? 'saved' : ''}" data-id="${item.id}">
                <div class="item-content">${item.content}</div>
                <div class="item-meta">
                    <span>${item.category}</span>
                    <span>${date}</span>
                </div>
                <div class="item-actions">
                    <button class="mini-btn" onclick="premiumFeatures.copyItem('${safeContent}')" title="Copy">📋</button>
                    ${type === 'history' && !isSaved ? `<button class="mini-btn" onclick="premiumFeatures.toggleSave('${safeContent}', '${item.category}')" title="Save">⭐</button>` : ''}
                    <button class="mini-btn" onclick="premiumFeatures.deleteItem(${item.id}, '${type}')" title="Delete">&times;</button>
                </div>
            </div>
        `;
    }

    copyItem(text) {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    }
}

// Initialize
let premiumFeatures;
document.addEventListener('DOMContentLoaded', () => {
    premiumFeatures = new PremiumFeatures();
    window.premiumFeatures = premiumFeatures;

    // Inject CSS if not present
    if (!document.getElementById('premium-features-css')) {
        const link = document.createElement('link');
        link.id = 'premium-features-css';
        link.rel = 'stylesheet';
        link.href = '/assets/css/premium-features.css';
        document.head.appendChild(link);
    }
});
