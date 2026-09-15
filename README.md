# Little Letters

A cozy, literature-inspired postcard site. Create a note, generate a shareable link, and send someone a quiet moment — no backend required.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

Push the repo and import it in Vercel. `vercel.json` already rewrites all routes to `index.html` for client-side routing.

Postcard data lives in the URL (base64-encoded JSON). Drafts are stored in `localStorage`.
