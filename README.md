# skillcraft.codes

Personal site for Arrington Walters. React 19 + TypeScript + Vite, styled with Tailwind. Repo data is fetched live from the GitHub REST API.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run typecheck
npm run build
```

Output goes to `dist/`. Deployed as a container — `Dockerfile` builds an nginx image published to `ghcr.io/beep-platforms/home` and served on the tailnet at `https://home.tail699d2d.ts.net/` (canonical brand: skillcraft.codes).

## Editing content

All static profile content lives in `src/data/profile.ts`. Photos and other static assets live in `public/assets/`.
