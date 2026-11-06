# Free Ham Radio Curriculum Website

Static site prototype for the ARDC curriculum. Design notes live in [design-notes/](./design-notes/).

## License

This repository — website source code and curriculum materials — is licensed under
[Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).

You may use, adapt, and share the work with attribution. If you share adaptations, you must
license them under the same terms. See [LICENSE](./LICENSE) for the full notice; the deployed site
has a plain-language summary at `/license/`.

Copyright &copy; 2026 Dan Tennery-Spalding.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:4321/](http://localhost:4321/) (dev server uses the same `base` as production: `/` on teachradio.net).

## Deploy

**Production URL:** [https://teachradio.net/](https://teachradio.net/)

`astro.config.mjs` sets `site: 'https://teachradio.net'` and `base: '/'` so links, assets, and canonical URLs use the apex domain. If you prefer **www**, use `site: 'https://www.teachradio.net'` instead and point DNS accordingly.

### GitHub Pages

1. **One-time:** In the repo, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions** (not “Deploy from a branch”). Save.
2. **Custom domain:** **Settings → Pages → Custom domain** → `teachradio.net` (or `www.teachradio.net`). Enable **Enforce HTTPS** after DNS validates. The `public/CNAME` file should match that hostname.
3. **DNS** (at your registrar or DNS host): for the apex, add GitHub’s **A** records ([GitHub Pages DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)); for **www**, use a **CNAME** to `<user>.github.io` as documented there.
4. Push to the `master` branch. After the first successful deploy, Pages may take a minute or two to go live.

**Old GitHub Pages URL** (`https://decentralizeddan.github.io/open-radio-website/...`) uses a different path prefix; after switching the custom domain, either remove that project-site host or add redirects so bookmarks still work.

### Other hosts (Cloudflare Pages, Netlify, Vercel, etc.)

Connect the same repo, run `npm run build`, publish the `dist/` folder, attach `teachradio.net`, and set the production URL in `astro.config.mjs` to match (apex vs www).

The workflow in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) runs `npm ci`, `npm run build`, and publishes `dist/`.

## Build

```bash
npm run build
npm run preview
```
