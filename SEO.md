# SEO maintenance

The production URL is https://bright-scene-studioz.brightscenestudioz.workers.dev/.
SEO source settings are in `seo.config.json`. Generated HTML, robots.txt and sitemap.xml are checked into `dist/`, so hosting does not need a build command.

After changing the public domain, SEO settings or `dist/videos.js`, run:

```sh
node scripts/build-seo.cjs
```

This updates the page title, description, canonical URL, Open Graph and Twitter previews, Organization/Person/Service structured data, first six portfolio cards in the HTML, robots.txt and sitemap.xml. It does not change the interactive category filters. Preserve the `seo` and `portfolio` generation markers in the HTML.

Delhi NCR, Chandigarh, Mohali and Mumbai are service areas, not office addresses. Do not invent local branches, reviews, ratings, awards or project upload dates. Instagram belongs to the studio; the IMDb profile belongs to Neeraj Sachdeva. The structured data preserves that distinction.

The header uses a 152px WebP copy of the supplied logo (about 3 KB instead of the original 958 KB). Social previews use a 600px JPEG copy, and separate 48px favicon / 180px Apple icons are included. The original logo is preserved. These are resized copies of the same artwork, not a redesigned identity.

Fonts are requested in the document head with preconnects instead of a CSS import. Thumbnail dimensions reserve layout space, and the first row loads eagerly. Below-the-fold embeds remain lazy, and local video previews load on interaction. Real Core Web Vitals still need measurement on the deployed site; local functional checks are not a PageSpeed score.

## Search Console: requires the owner's Google account

1. After deployment, confirm the live page has the new metadata and `/sitemap.xml` returns XML (not a 404 or the homepage).
2. Add the exact live URL as a **URL-prefix** property in Google Search Console. A workers.dev URL cannot be verified by editing Cloudflare's parent domain DNS.
3. For HTML-file verification, put Google's verification file directly in `dist/` and deploy it. Alternatively, add the provided verification meta tag to the HTML head outside the generated SEO block. Verification tokens are site ownership proofs; never store account passwords or OAuth tokens here.
4. Verify ownership, submit `sitemap.xml`, and use URL Inspection to request indexing of the homepage.
5. Check indexing and search queries in Search Console. Implementation does not guarantee indexing, ranking or a particular search snippet.

Only the homepage is a public indexable page at present. Filter buttons and section anchors are not separate pages and are not included in the sitemap. The first six projects appear in HTML before JavaScript runs; further filter/pagination results still depend on interaction. Do not claim that every project has a separate searchable page.

## Domain changes

Update `url` in `seo.config.json`, regenerate, and configure the actual redirect from the old hostname to the new one in hosting. Then verify the new Search Console property and submit its sitemap. A canonical tag alone does not redirect visitors.

## References

- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

