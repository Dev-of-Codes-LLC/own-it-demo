# own-it-demo

A small product list for a fictional shop, Acme Supply, with layout-shift bugs planted on purpose. It is the demo app for the Own It episodes, where the [`after-action`](https://github.com/Dev-of-Codes-LLC/agent-toolkit/tree/main/plugins/own-it) skill reviews why the page failed UAT and what to fix first.

Everything here is written from a blank repo for the demo. The shop, the testers and the feedback are fictional.

## The story

UAT came back bad. Testers say the page jumps when the list loads ([`uat/feedback.md`](uat/feedback.md)). The team has reasons ([`uat/excuses.md`](uat/excuses.md)). The page is fine on a fast laptop and falls apart on a slow phone.

Two git tags hold the two states:

| Tag | What it is |
| --- | --- |
| `before` | The page that failed UAT. Four bugs move the layout while it loads. |
| `after` | The fixes, one commit per bug, so each diff reads on its own. |

The four bugs on `before`:

1. The skeleton is a short grey block, and there are only four of them. The real cards are taller and there are twelve, so everything below jumps when the list arrives.
2. The product images have no width, height or aspect ratio. Each card grows when its picture arrives and pushes the cards below it.
3. The display font swaps in late with `font-display: swap` and no preload, so titles and prices change size after the page shows.
4. The promo banner arrives after the list and is inserted at the top with no space kept for it.

## Run it

Node 20.19 or newer (on Node 22, at least 22.12).

```bash
npm install
npm run build
npm run preview
```

Open <http://localhost:4173/products>. The fake API waits 1,500 ms by default. Change it with `?delay=<ms>`, for example `/products?delay=3000`.

To see it the way the testers did, open Chrome DevTools, set the network to "Slow 4G", and reload. The `data-state` attribute on `<main>` changes from `loading` to `loaded` when the list arrives.

To switch between the two states:

```bash
git checkout before   # or: git checkout after
npm run build && npm run preview
```

## Measure it

Lighthouse with real network throttling (`--throttling-method=devtools`), so the images and the font really arrive late:

```bash
npx lighthouse@13.5.0 "http://localhost:4173/products?delay=1500" --only-categories=performance --throttling-method=devtools --output=json --output-path=lighthouse/report.json
```

Measured 2026-10-21: Lighthouse 13.5.0, Chrome 155, mobile, the default Slow 4G profile (562.5 ms latency, 1.6 Mbps down) and a 4x CPU slowdown. Three runs per tag; every run gave the same CLS.

| Tag | CLS | Shifting elements | LCP | LCP element |
| --- | --- | --- | --- | --- |
| `before` | 0.730 | 6 | 1.5 s | The "Gear for the weekend" heading |
| `after` | 0.000 | 0 | 3.9 s | The Camp Mug product image |

CLS under 0.1 is "good"; over 0.25 is "poor".

**Why LCP went up.** The page did not get slower. In both builds the product images finish loading at about 3.8 s, because the browser cannot ask for them until the fake API answers. On `before`, the largest element Lighthouse saw was the heading; on `after`, with every card at its full size from the first paint, it is a product image. The fixes made the page honest about when its main content arrives. Getting the images sooner (sending the first page of products with the HTML, or preloading the first images) is the next job, not part of this one.

## Credit

The Own It skills are inspired by *Extreme Ownership* by Jocko Willink and Leif Babin ([book](https://openlibrary.org/works/OL20017105W) · [@jockowillink](https://x.com/jockowillink)). Not affiliated with or endorsed by them.

The display font is [Syne](https://gitlab.com/bonjour-monde/fonderie/syne-typeface), under the SIL Open Font License ([`public/fonts/OFL.txt`](public/fonts/OFL.txt)).

## Licence

MIT. See [LICENSE](LICENSE). Made by Dev of Codes LLC.
