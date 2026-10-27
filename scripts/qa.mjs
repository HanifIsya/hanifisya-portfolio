/**
 * Visual QA harness.
 *
 * Drives the local dev server with Playwright, captures screenshots at
 * desktop + mobile widths, and reports console errors so regressions in
 * the animation layer surface immediately.
 *
 * Usage:  node scripts/qa.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = join(process.cwd(), "qa");

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, dsf: 2 },
  { name: "mobile", width: 390, height: 844, dsf: 2 },
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  channel: "chrome",
  args: ["--force-color-profile=srgb", "--font-render-hinting=none"],
});

let failures = 0;

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dsf,
    isMobile: vp.name === "mobile",
    hasTouch: vp.name === "mobile",
  });
  const page = await context.newPage();

  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60_000 });
  // Let the hero timeline settle.
  await page.waitForTimeout(2600);

  await page.screenshot({
    path: join(OUT, `${vp.name}-hero.png`),
    animations: "disabled",
  });

  // Scroll through the page, capturing each chapter.
  const total = await page.evaluate(() => document.body.scrollHeight);
  const step = Math.round(vp.height * 0.85);
  const shots = Math.min(9, Math.ceil(total / step));

  for (let i = 1; i <= shots; i++) {
    const y = Math.min(i * step, total - vp.height);
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
    await page.waitForTimeout(1100);
    await page.screenshot({
      path: join(OUT, `${vp.name}-${String(i).padStart(2, "0")}.png`),
      animations: "disabled",
    });
  }

  // Full page (capped — the page is very tall and a full capture is slow)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  try {
    await page.screenshot({
      path: join(OUT, `${vp.name}-full.png`),
      fullPage: true,
      animations: "disabled",
      timeout: 60_000,
    });
  } catch {
    console.log(`   (${vp.name}: full-page capture skipped)`);
  }

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );

  console.log(
    `[${vp.name}] height=${total}px shots=${shots} overflowX=${overflow} errors=${errors.length}`,
  );
  if (errors.length) {
    failures += errors.length;
    errors.slice(0, 8).forEach((e) => console.log(`   ! ${e}`));
  }
  if (overflow) console.log(`   ! horizontal overflow detected`);

  await context.close();
}

await browser.close();
console.log(failures ? `\nFAIL: ${failures} console error(s)` : "\nOK: no console errors");
process.exit(failures ? 1 : 0);
