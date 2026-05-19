export const sitemap = (req, res) => {
  const base = process.env.CLIENT_URL || 'http://localhost:5173';
  const urls = [
    '',
    '/about',
    '/contact',
    '/videos',
    '/gallery',
    '/login',
    '/register'
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${base}${u}</loc></url>`).join('')}</urlset>`;
  res.type('application/xml').send(xml);
};

export const robots = (req, res) => {
  const base = process.env.CLIENT_URL || 'http://localhost:5173';
  res.type('text/plain').send(`User-agent: *
Allow: /
Sitemap: ${base}/sitemap.xml`);
};
