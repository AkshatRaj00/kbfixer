export default function robots() {
  const baseUrl = 'https://kbfixer.onepersonai.in';

  return {
    rules: [
      {
        // Global crawlers rule - allow full site and assets crawling
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/css/',
          '/_next/static/chunks/',
          '/_next/static/media/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      {
        // Googlebot specific directive for maximum SERP indexing
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        // Googlebot Image crawler for indexing tool previews & infographics
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        // Bingbot directive for Bing & Yahoo search engines
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        // Allow leading AI search engines (Perplexity, ChatGPT, Claude) for citation index
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Applebot',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}