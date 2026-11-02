# Faith Mbaire Ng'ethe: single-page site

React 19 + Vite 7, plain CSS. Built by SpenceTec and Logistics Limited.

## Edit
- All text, links and image lists: `src/content.js`
- Images: `public/images/`
- Contact details (email, phone, LinkedIn, optional Formspree id) are blank in `contact`; empty ones stay hidden.

## Run and deploy
```bash
npm install
npm run dev
npm run build        # outputs dist/
npx wrangler deploy  # Cloudflare Workers, SPA fallback in wrangler.jsonc
```

`wrangler deploy` runs the build itself (`build.command` in `wrangler.jsonc`), so Cloudflare's Build command can stay blank. Deploy command: `npx wrangler deploy`. Node version is set in `.node-version`.

## Motion
All motion is plain CSS plus `src/motion.js`, with no animation library. Add `data-reveal` to an element to animate it in on scroll (`rise` by default, or `fade`, `lift`, `pop`, `slide`, `wipe`). Visitors with reduced motion turned on see everything without animation.

## Source
Built from Faith's own CV site export (WYSIWYG Web Builder). Nothing was added beyond that content.
