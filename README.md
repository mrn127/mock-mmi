# Mock MMI Volunteer Helper

This is a Vite + React version of the helper app, adjusted so it can be deployed easily to GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a GitHub repo and upload these files.
2. In `vite.config.js`, change the `base` value if your repo name is different.
3. In GitHub, go to **Settings > Pages > Build and deployment > Source** and choose **GitHub Actions**.
4. Push to `main`.
5. GitHub Actions will build and deploy the site.

Your URL will usually be:

```text
https://YOUR-USERNAME.github.io/mock-mmi-helper-ghpages/
```
