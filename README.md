## Testing Website (Testing Shop)

A frontend-only demo e-commerce site. Everything runs with just HTML, CSS, and vanilla JS.

### Files

- `index.html` — storefront layout (shop grid, modal, cart drawer)
- `styles.css` — theme + storefront styles
- `script.js` — product rendering, search/filter/sort, cart (localStorage), demo checkout

### Run locally

From the project folder:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

### Customize quickly

- Update products in `script.js` (`PRODUCTS` array).
- Swap the accent color by changing `--primary` in `styles.css`.
- Promo code: `WELCOME10` (10% off).

### Deploy to GitHub Pages

1. Push to GitHub.
2. On GitHub: **Repo → Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: **main**, Folder: **/(root)**

Your site will be available at:
`https://albert-huang-appier.github.io/Testing_Website/`

