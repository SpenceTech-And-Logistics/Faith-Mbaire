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

## Source
Built from Faith's own CV site export (WYSIWYG Web Builder). Nothing was added beyond that content.
