# Zafkiel — cinematic personal bio

A dependency-free, responsive personal profile inspired by cinematic terminal
interfaces and minimalist link-in-bio pages. It includes a configurable profile
card, social links, ambient effects, an entry screen, and a complete MP3 player.

## Customize it

Open [`assets/js/config.js`](assets/js/config.js). This one file controls:

- name, role, status, bio, timezone, and theme colors
- profile and card images from a repository file or hosted/CDN URL
- MP3 and cover art from a repository file or hosted/CDN URL
- link labels, descriptions, and destinations
- music autoplay-after-entry, looping, and starting volume

For local media, add files to `assets/images/` or `assets/audio/` and use a path
such as `assets/images/profile.webp`. For hosted media, paste the complete HTTPS
URL into the matching `remote` field. A remote URL takes priority over a local
path when both are set.

The starter ships without a photo or song. It shows a polished CSS fallback
until you add your own media, avoiding unlicensed placeholder content.

## Preview locally

Open `index.html` directly, or start a small local server:

```sh
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy to GitHub Pages

1. Push the repository to GitHub using the `main` branch.
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. The included workflow deploys the site on every push to `main`.

### Custom domain

Because this project deploys through GitHub Actions, set the domain in
**Settings → Pages → Custom domain**; a repository `CNAME` file is not required
for this deployment method. Add the domain in GitHub before changing DNS. For a
subdomain, point a DNS `CNAME` record directly to `YOUR-USERNAME.github.io`
(without the repository name). Then return to Pages settings to enable HTTPS.

## Project structure

```text
index.html                 Page structure and metadata
assets/css/styles.css      Visual design and responsive layout
assets/js/config.js        Your content and media settings
assets/js/app.js           UI, image, link, and audio behavior
assets/images/             Local profile/card/cover art
assets/audio/              Local MP3 files
.github/workflows/         Automatic GitHub Pages deployment
```

## Notes

- Autoplay is off by default. Browsers generally require a user gesture before
  audio can begin; the entry screen provides that gesture when enabled.
- Only publish media you own or have permission to use.
- No framework, package install, or build step is required.
