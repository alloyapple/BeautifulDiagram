import { getAllPosts, getAllDocs } from '@/lib/mdx/content';
import { SITE_URL, SITE_CONFIG } from '@/lib/config';

function escapeXml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

function generateHreflangAlternates(path: string): string {
  return SITE_CONFIG.locales
    .map(locale => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${SITE_URL}/${locale}${path}" />`)
    .join('\n');
}

export function GET() {
  const locales = SITE_CONFIG.locales;
  const staticPages = ['', '/features', '/pricing', '/about', '/blog', '/docs', '/changelog'];
  const toolPages = ['/mindmap', '/flowchart', '/charts', '/architecture', '/mermaid', '/infographic'];

  const urls: string[] = [];

  // Static pages with hreflang alternates
  for (const locale of locales) {
    for (const page of staticPages) {
      const loc = `${SITE_URL}/${locale}${page}`;
      const priority = page === '' ? '1.0' : '0.8';
      const hreflangs = generateHreflangAlternates(page);
      urls.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
${hreflangs}
  </url>`);
    }
  }

  for (const locale of locales) {
    for (const page of toolPages) {
      const loc = `${SITE_URL}/${locale}${page}`;
      const hreflangs = generateHreflangAlternates(page);
      urls.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
${hreflangs}
  </url>`);
    }
  }

  // Blog posts
  for (const locale of locales) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      const loc = `${SITE_URL}/${locale}/blog/${post.slug}`;
      urls.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${formatDate(new Date(post.frontmatter.date))}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
    }
  }

  // Doc pages
  for (const locale of locales) {
    const docs = getAllDocs(locale);
    for (const doc of docs) {
      const loc = `${SITE_URL}/${locale}/docs/${doc.slug}`;
      urls.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
