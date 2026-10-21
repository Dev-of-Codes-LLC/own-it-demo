// Writes the product images in public/img. Run once: node scripts/make-images.mjs
// Each image is an 800 x 600 SVG, so the page has to reserve a 4:3 box for it.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
const products = JSON.parse(readFileSync('src/products.json', 'utf8'));

mkdirSync('public/img', { recursive: true });
for (const [i, p] of products.entries()) {
  const hue = (i * 47) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="hsl(${hue} 45% 88%)"/>
  <circle cx="${250 + (i % 4) * 90}" cy="300" r="170" fill="hsl(${hue} 55% 62%)"/>
  <rect x="430" y="${180 + (i % 3) * 40}" width="220" height="220" rx="28" fill="hsl(${(hue + 30) % 360} 50% 40%)"/>
  <text x="40" y="560" font-family="Arial, sans-serif" font-size="40" fill="hsl(${hue} 40% 25%)">${p.name}</text>
</svg>
`;
  writeFileSync(`public/img/${p.id}.svg`, svg);
}
console.log(`wrote ${products.length} images`);
