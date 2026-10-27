import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });

// --- Reduced motion ---
const ctxRM = await b.newContext({ viewport:{width:1440,height:900}, reducedMotion:"reduce" });
const p1 = await ctxRM.newPage();
const errs1 = [];
p1.on("pageerror", e => errs1.push(e.message));
await p1.goto("http://localhost:3000", { waitUntil:"networkidle" });
await p1.waitForTimeout(2500);
const rm = await p1.evaluate(() => {
  const h1 = document.querySelector("h1");
  const cs = h1 ? getComputedStyle(h1) : null;
  const counters = Array.from(document.querySelectorAll(".tabular-nums")).slice(0,4).map(e=>e.textContent);
  return { h1Opacity: cs?.opacity, h1Transform: cs?.transform, counters };
});
console.log("REDUCED MOTION:", JSON.stringify(rm));
console.log("  errors:", errs1.length ? errs1 : "none");
await p1.screenshot({ path:"qa/reduced-motion.png", animations:"disabled" });
await ctxRM.close();

// --- A11y / semantics ---
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p2 = await ctx.newPage();
await p2.goto("http://localhost:3000", { waitUntil:"networkidle" });
await p2.waitForTimeout(2000);
const a11y = await p2.evaluate(() => {
  const imgs = Array.from(document.querySelectorAll("img")).map(i=>({src:i.src.split("/").pop(), alt:i.alt, w:i.naturalWidth}));
  const headings = Array.from(document.querySelectorAll("h1,h2,h3")).map(h=>`${h.tagName}: ${h.textContent.trim().slice(0,45)}`);
  const linksNoText = Array.from(document.querySelectorAll("a")).filter(a=>!a.textContent.trim() && !a.getAttribute("aria-label")).length;
  const btnsNoLabel = Array.from(document.querySelectorAll("button")).filter(b=>!b.textContent.trim() && !b.getAttribute("aria-label")).length;
  return { imgs, h1count: document.querySelectorAll("h1").length, headings: headings.slice(0,14), linksNoText, btnsNoLabel };
});
console.log("A11Y:", JSON.stringify(a11y, null, 1));

// keyboard focus
await p2.keyboard.press("Tab");
const focused = await p2.evaluate(()=>{ const a=document.activeElement; return a.tagName + " " + (a.textContent||a.getAttribute("aria-label")||"").trim().slice(0,30); });
console.log("first tab focus:", focused);
await b.close();
