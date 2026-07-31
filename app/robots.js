// app/robots.js

export default function robots() {
  const baseUrl = 'https://kbfixer.onepersonai.in'; // अपनी लाइव डोमेन URL यहाँ डालें

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Hide private internal APIs from search engines
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}