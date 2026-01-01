// 🗺️ NAMERLY AUTOMATIC SITEMAP GENERATOR
// Generates dynamic sitemap with proper priorities and frequencies

class SitemapGenerator {
  constructor() {
    this.baseUrl = 'https://namerlygenerator.netlify.app';
    this.lastmod = new Date().toISOString().split('T')[0];
    this.pages = this.getPageStructure();
  }

  getPageStructure() {
    return {
      // High priority pages
      primary: [
        { url: '/', priority: '1.0', changefreq: 'weekly' },
        { url: '/bios/', priority: '0.9', changefreq: 'monthly' },
        { url: '/usernames/', priority: '0.9', changefreq: 'monthly' },
        { url: '/pickup/', priority: '0.9', changefreq: 'monthly' },
        { url: '/youtube/', priority: '0.9', changefreq: 'monthly' }
      ],
      
      // Generator pages
      generators: [
        { url: '/roasts/', priority: '0.8', changefreq: 'monthly' },
        { url: '/tiktok/', priority: '0.8', changefreq: 'monthly' },
        { url: '/whatsapp/', priority: '0.8', changefreq: 'monthly' },
        { url: '/pets/', priority: '0.8', changefreq: 'monthly' },
        { url: '/gamers/', priority: '0.8', changefreq: 'monthly' },
        { url: '/wifi/', priority: '0.8', changefreq: 'monthly' },
        { url: '/sarcastic/', priority: '0.8', changefreq: 'monthly' },
        { url: '/phrases/', priority: '0.8', changefreq: 'monthly' },
        { url: '/pranks/', priority: '0.8', changefreq: 'monthly' },
        { url: '/icebreakers/', priority: '0.8', changefreq: 'monthly' },
        { url: '/nicknames/', priority: '0.8', changefreq: 'monthly' },
        { url: '/excuses/', priority: '0.8', changefreq: 'monthly' },
        { url: '/gym-excuses/', priority: '0.8', changefreq: 'monthly' },
        { url: '/social-excuses/', priority: '0.8', changefreq: 'monthly' },
        { url: '/crush/', priority: '0.8', changefreq: 'monthly' }
      ],
      
      // AI features
      ai: [
        { url: '/ai-pickup.html', priority: '0.7', changefreq: 'weekly' },
        { url: '/ai-roasts.html', priority: '0.7', changefreq: 'weekly' },
        { url: '/ai-captions.html', priority: '0.7', changefreq: 'weekly' }
      ],
      
      // Legal pages
      legal: [
        { url: '/privacy-policy.html', priority: '0.5', changefreq: 'yearly' },
        { url: '/terms-of-service.html', priority: '0.5', changefreq: 'yearly' },
        { url: '/cookie-policy.html', priority: '0.5', changefreq: 'yearly' },
        { url: '/disclaimer.html', priority: '0.5', changefreq: 'yearly' },
        { url: '/contact.html', priority: '0.6', changefreq: 'monthly' }
      ]
    };
  }

  generateXML() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

    // Add all page categories
    Object.values(this.pages).forEach(category => {
      category.forEach(page => {
        xml += this.generateUrlEntry(page);
      });
    });

    xml += '</urlset>';
    return xml;
  }

  generateUrlEntry(page) {
    return `
  <url>
    <loc>${this.baseUrl}${page.url}</loc>
    <lastmod>${this.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${this.baseUrl}${page.url}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${this.baseUrl}${page.url}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${this.baseUrl}${page.url}"/>
  </url>`;
  }

  generateRobotsTxt() {
    return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${this.baseUrl}/sitemap.xml

# High-value pages for crawling
Allow: /bios/
Allow: /usernames/
Allow: /pickup/
Allow: /youtube/
Allow: /roasts/
Allow: /tiktok/

# Block unnecessary files
Disallow: /*.ps1
Disallow: /temp_*
Disallow: /.*
Disallow: /node_modules/
Disallow: /_*

# Crawl-delay for heavy bots
User-agent: Bingbot
Crawl-delay: 1

User-agent: Baiduspider
Crawl-delay: 2

# Allow important bots
User-agent: Googlebot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /
`;
  }
}

// Generate and log sitemap
const generator = new SitemapGenerator();
console.log('🗺️ Sitemap Generator ready');
console.log('Generated XML:', generator.generateXML().length, 'characters');

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SitemapGenerator;
}
