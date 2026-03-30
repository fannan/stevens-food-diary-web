# Deploy

**Production URL:** https://stevens-food-diary-web.vercel.app
**Vercel Dashboard:** https://vercel.com/fannans-projects-6640c6a0/stevens-food-diary-web
**Auto-deploy:** Push to `main` on GitHub triggers production deploy.

## How to deploy
1. Make changes
2. Bump version in package.json
3. `git add . && git commit -m "v<version>: description"`
4. `git push origin main`
5. Vercel auto-deploys in ~30 seconds
6. Verify at production URL

## Version
Check `package.json` → `version` field.
