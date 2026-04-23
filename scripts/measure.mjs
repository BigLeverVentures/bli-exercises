// Measures each exercise's rendered height with a headless browser and
// patches its companion .oembed.json so the iframe height Circle uses
// always matches reality. Run before committing copy changes:
//
//   npm run measure
//
// Then stage and commit any updated JSON files.

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const VIEWPORT_WIDTH = 720;   // narrower than our .wrap max-width of 760 — conservative
const BUFFER_PX = 40;         // small safety margin below the content

const htmlFiles = readdirSync(REPO_ROOT)
  .filter(f => /^ex\d+-[a-z0-9-]+\.html$/.test(f))
  .filter(f => !f.includes('DRAFT') && !f.includes('TEMPLATE'))
  .sort();

if (htmlFiles.length === 0) {
  console.log('No exercise HTML files found.');
  process.exit(0);
}

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: VIEWPORT_WIDTH, height: 800 } });
const page = await context.newPage();

let updates = 0;
let skipped = 0;

for (const htmlFile of htmlFiles) {
  const slug = htmlFile.replace(/\.html$/, '');
  const jsonFile = `${slug}.oembed.json`;
  const htmlPath = join(REPO_ROOT, htmlFile);
  const jsonPath = join(REPO_ROOT, jsonFile);

  if (!existsSync(jsonPath)) {
    console.warn(`[skip] ${htmlFile}: no companion ${jsonFile}`);
    skipped++;
    continue;
  }

  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const measuredHeight = scrollHeight + BUFFER_PX;

  const json = JSON.parse(readFileSync(jsonPath, 'utf8'));
  const oldHeight = json.height;

  if (oldHeight === measuredHeight) {
    console.log(`[ok]   ${htmlFile}: ${measuredHeight}px (unchanged)`);
    continue;
  }

  json.height = measuredHeight;
  json.html = json.html.replace(/height="\d+"/, `height="${measuredHeight}"`);
  writeFileSync(jsonPath, JSON.stringify(json, null, 2) + '\n');
  console.log(`[upd]  ${htmlFile}: ${oldHeight}px → ${measuredHeight}px`);
  updates++;
}

await browser.close();

console.log(`\n${updates} updated, ${skipped} skipped, ${htmlFiles.length - updates - skipped} unchanged.`);
if (updates > 0) {
  console.log('Review the diffs in the .oembed.json files and commit when satisfied.');
}
