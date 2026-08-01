export default function robots() {
  const baseUrl = 'https://kbfixer.onepersonai.in';

  return {
    rules: [
      {
        // Standard Web Crawlers (Google, Bing, Yahoo, DuckDuckGo)
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',          // Private APIs
          '/_next/',        // Internal Next.js build files
          '/static/',       // Static cache
        ],
      },
      {
        // Googlebot specific directive for deep crawling
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        // Allow AI Crawlers (GPTBot, Perplexity, Claude) for AI Search Visibility
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot'],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}