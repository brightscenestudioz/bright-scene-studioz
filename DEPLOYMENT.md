# Deployment and future edits

## Connected hosting configuration

- Host: Cloudflare Workers
- Git repository: https://github.com/brightscenestudioz/bright-scene-studioz
- Production branch: main
- Framework: None
- Build command: leave empty for this buildless project
- Deploy command shown in dashboard: npx wrangler deploy
- Site assets: dist
- Preview deployments: check Cloudflare settings; enablement has not been verified
- Public URL: https://bright-scene-studioz.brightscenestudioz.workers.dev/

The repository is connected and a public deployment exists. A successful push is not proof of a successful deployment: check the production build's commit and public content. On 2026-10-31, a deployment-only trigger commit e6d0d0e successfully ran Workers Builds and published the portfolio changes from af2aeec. The live campaign and microdrama sections and both MP4 previews were verified. The reason the earlier push was missed was not established. SEO work remains on the working branch until separately published.

## Everyday workflow

1. Create a working branch from current main.
2. Change files under dist; run JavaScript syntax checks and preview important interactions.
3. Push the branch and open a pull request (PR).
4. Review the hosting preview URL; further commits update the preview.
5. On the owner's approval, merge the PR to main.
6. Hosting deploys main automatically. Verify deployment success and the public page before reporting it live.

A PR preview is not the live production site. A merge triggers deployment; the deployment must succeed before visitors receive the update. No API token or account password should be stored in the code. The repository and hosting account remain owned by the studio.

## Checks

node --check dist/app.js
node --check dist/gallery.js
node --check dist/motion.js
node --check dist/videos.js

## Rollback

Revert the faulty change in GitHub and merge the revert into main to publish a corrected version. Hosting rollback alone does not change the repository source.
