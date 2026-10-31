# Deployment and future edits

## Intended hosting configuration

- Host: Cloudflare Pages (Free plan, subject to provider limits)
- Git provider: owner-controlled GitHub repository
- Production branch: main
- Framework: None
- Build command: leave empty for this buildless project
- Output directory: dist
- Preview deployments: enabled for working branches / pull requests
- Custom domain: none initially; use the assigned pages.dev address

Status: not connected or deployed yet. Record the actual repository URL, hosting project name and production URL here after successful setup.

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
