# Bright Scene Studioz

Black-and-gold studio portfolio. Buildless HTML/CSS/JavaScript; all deployable files are in `dist/`.

## Run locally

Requires Node.js. Run `node serve.cjs`, then open http://127.0.0.1:4173/.

## Files

- dist/index.html: sections, services, Instagram/WhatsApp links, Drive reel embeds
- dist/style.css: layout, responsive styling and animations
- dist/videos.js: curated YouTube portfolio, categories and role credits
- dist/gallery.js: category filters and two-row pagination
- dist/motion.js: delayed YouTube previews, optional sound and scroll reveals
- dist/app.js: contact chooser
- dist/assets/: studio logo

## Content ownership

Do not infer production credits from a title. Production means filmed and edited by the studio; editing means client footage edited by the studio. Keep the two Drive brand reels credited as production. Keep BEETHOVEN in More edits (editing only). Exclude audio upload 9OI1RUcVBbU; its video version is retained.

YouTube and Drive content is manually curated, not automatically synced. Full videos stay on those services; two short microdrama hover-preview clips and their posters are hosted in dist/assets. Embedding, playback and sound depend on their permissions and browser policy.

## Deployment

GitHub: https://github.com/brightscenestudioz/bright-scene-studioz

Public site: https://bright-scene-studioz.brightscenestudioz.workers.dev/

Cloudflare Workers is connected to `main`. Check Cloudflare deployment success before assuming a GitHub push is live. See DEPLOYMENT.md for the editing workflow and SEO.md for SEO settings and Search Console setup.
