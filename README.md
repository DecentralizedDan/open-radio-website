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

Open [http://localhost:4321/open-radio-website/](http://localhost:4321/open-radio-website/) (local preview uses the same base path as GitHub Pages).

## Deploy (GitHub Pages)

Live URL: [https://decentralizeddan.github.io/open-radio-website/](https://decentralizeddan.github.io/open-radio-website/)

1. Push to the `master` branch on [DecentralizedDan/open-radio-website](https://github.com/DecentralizedDan/open-radio-website).
2. In the repo: **Settings → Pages → Build and deployment → Source** → choose **GitHub Actions**.
3. The workflow in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) runs `npm ci`, `npm run build`, and publishes `dist/`.

`astro.config.mjs` sets `site` and `base` for this project-site URL. After the first successful deploy, Pages may take a minute or two to go live.

## Build

```bash
npm run build
npm run preview
```
