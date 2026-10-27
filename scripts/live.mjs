import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("pageerror", e => errs.push("pageerror: " + e.message));
p.on("console", m => { if (m.type()==="error") errs.push(m.text()); });
const resp = await p.goto("https://hanifisya-portfolio.vercel.app", { waitUntil: "networkidle", timeout: 90000 });
await p.waitForTimeout(3000);
console.log("HTTP", resp.status());
// scroll through the whole page
const H = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < H; y += 700) {
  await p.evaluate(yy => window.scrollTo(0, yy), y);
  await p.waitForTimeout(320);
}
await p.evaluate(() => window.scrollTo(0,0));
await p.waitForTimeout(800);
const ov = await p.evaluate(()=>document.documentElement.scrollWidth > window.innerWidth+1);
const counters = await p.evaluate(()=>Array.from(document.querySelectorAll(".tabular-nums")).slice(0,4).map(e=>e.textContent));
const sections = await p.evaluate(()=>Array.from(document.querySelectorAll("section[id]")).map(s=>s.id));
console.log("height:", H, "| overflowX:", ov, "| counters:", counters.join(", "));
console.log("sections:", sections.join(", "));
console.log("errors:", errs.length ? errs.slice(0,6) : "none");
await b.close();
