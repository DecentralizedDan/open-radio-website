# Website Migration Checklist

Checklist for moving the curriculum site to **teachradio.net** and completing follow-up work.

## Resolve the site on teachradio.net

- [x] Point DNS to GitHub Pages (apex **A** records and/or **www** **CNAME** to `username.github.io` per [GitHub Pages custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site))
- [x] In the repo **Settings → Pages**, set the custom domain and wait for verification
- [x] Confirm **Enforce HTTPS** is available and turned on
- [x] Confirm `astro.config.mjs` uses `site: 'https://teachradio.net'` or `https://www.teachradio.net` to match your canonical hostname
- [x] Spot-check key routes in production (home, `/curriculum/`, a unit page, downloads)

## Email at teachradio.net

- [ ] Choose a provider (e.g. Google Workspace, Fastmail, Proton, Cloudflare Email Routing + destination inbox)
- [ ] Add the DNS records they give you (often **MX**, sometimes **SPF** as a **TXT** record, **DKIM**, **DMARC**)
- [ ] Create the mailbox or alias you want (e.g. `hello@`, `contact@`)
- [ ] Send a test message in and out

## Upload Radio Practical Skills activity

- [ ] Add workshop files under `public/downloads/workshops/radio-practical-skills/` (slides, handout, trainer guide as applicable)
- [ ] Set the unit to `ready: true` in `src/data/curriculum.ts` when materials are complete
- [ ] Verify the activity page and **Downloads** hub show the new files

## Upload GMRS 101 curriculum

- [ ] Add workshop files under `public/downloads/workshops/gmrs-101/` (slides, handout, trainer guide as applicable)
- [ ] Set `ready: true` for the unit when ready
- [ ] Verify unit page and downloads

## Upload Ham 101 curriculum

- [ ] Add workshop files under `public/downloads/workshops/ham-101/` (slides, handout, trainer guide as applicable)
- [ ] Set `ready: true` for the unit when ready
- [ ] Verify unit page and downloads

## Upload How to Host a Neighborhood Net

- [ ] Add workshop or activity files under `public/downloads/workshops/how-to-host-a-neighborhood-net/` (slides, handout, trainer guide as applicable)
- [ ] Set `ready: true` for the unit when ready
- [ ] Verify unit page and downloads
