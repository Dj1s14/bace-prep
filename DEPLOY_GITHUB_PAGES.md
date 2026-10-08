# GitHub Pages deployment

The BACE Prep frontend is configured to deploy to:

`https://dj1s14.github.io/bace-prep/`

## One-time GitHub setting

In GitHub:

1. Open **Settings → Pages** for this repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.

The workflow in `.github/workflows/deploy-pages.yml` will then build and deploy the site.

## Supabase Auth redirect

For Google OAuth, add this URL to the Supabase Auth redirect allow list:

`https://dj1s14.github.io/bace-prep/`

If GitHub Pages becomes the primary production URL, use the same address as the Supabase Site URL.

## Build configuration

The Pages workflow builds with:

- `VITE_BASE_PATH=/bace-prep/`
- `VITE_SUPABASE_URL=https://gfdbcrfqbsowlbnprqqn.supabase.co`
- the project's browser-safe Supabase publishable key

The app uses `import.meta.env.BASE_URL` for OAuth redirects so authentication returns to the repository subpath instead of the GitHub user root.

## Local/other hosting

The Vite config remains host-neutral. Outside GitHub Pages it defaults to a relative base unless `VITE_BASE_PATH` is supplied.
