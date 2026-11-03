// Generates assets/cover.svg and assets/feature-*.svg (magazine layout). Run: node scripts/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const PAPER = '#FBFBF9', INK = '#141414', MUTE = '#444444', DIM = '#6B6B6B', RULE = '#D4D4D0', RED = '#D1242F';
const SERIF = "Georgia, 'Iowan Old Style', 'Times New Roman', serif";
const SANS = "Helvetica, Arial, 'Segoe UI', sans-serif";
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const T = (x, y, t, { f = SERIF, s = 15, w = 400, c = INK, st = 'normal', a = 'start', ls = 0 } = {}) =>
  `<text x="${x}" y="${y}" font-family="${f}" font-size="${s}" font-weight="${w}" font-style="${st}" fill="${c}" text-anchor="${a}" letter-spacing="${ls}">${esc(t)}</text>`;
const label = (x, y, t, c = RED, a = 'start') => T(x, y, t.toUpperCase(), { f: SANS, s: 10, w: 700, c, a, ls: 2 });
const wrap = (t, max) => { const out = []; let cur = ''; for (const w of t.split(' ')) { if ((cur + ' ' + w).trim().length > max) { out.push(cur.trim()); cur = w; } else cur += ' ' + w; } out.push(cur.trim()); return out; };

// ---------- cover ----------
{
  const W = 1200, H = 440;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${PAPER}"/>`;
  s += label(36, 44, 'Siddhartha Chauhan', INK);
  s += `<text x="${W - 36}" y="44" font-family="${SANS}" font-size="10" font-weight="700" letter-spacing="2" fill="${INK}" text-anchor="end"><tspan fill="${RED}">NO. 01</tspan>  ·  BENGALURU  ·  2026</text>`;
  s += `<rect x="36" y="56" width="${W - 72}" height="3" fill="${INK}"/>`;
  s += T(34, 150, 'The engineer', { s: 68, w: 700, ls: -2 });
  s += T(34, 222, 'in the middle.', { s: 68, w: 700, ls: -2 });
  wrap('A generalist who sits between customers and code, and ships the thing in between. Now doing forward deployed engineering and support, building AI agents for customers.', 64)
    .forEach((l, i) => { s += T(36, 268 + i * 29, l, { s: 21, st: 'italic', c: MUTE }); });
  // fact column
  const cx = 846, tx = 862;
  const facts = [['Roles', 'Solution architect, AI agent engineer, AI engineer, technical account manager'], ['Rule', 'If the same problem shows up twice, it becomes a tool'], ['Base', 'Bengaluru, hybrid or remote'], ['Status', 'Open to roles']];
  let y = 112;
  const y0 = y - 14;
  facts.forEach(([k, v]) => { s += label(tx, y, k); y += 18; wrap(v, 40).forEach(l => { s += T(tx, y, l, { f: SANS, s: 13, c: INK }); y += 19; }); y += 12; });
  s += `<rect x="${cx}" y="${y0}" width="3" height="${y - y0 - 22}" fill="${RED}"/>`;
  // contents
  s += `<line x1="36" y1="380" x2="${W - 36}" y2="380" stroke="${RULE}"/>`;
  s += label(36, 408, "In this issue", DIM);
  s += T(160, 408, '01 AgentIssue   02 TraceLens   03 json0.dev   04 PDFKit Pro   05 Linkzy   06 DevHelp AI', { f: SANS, s: 11, c: INK, ls: 0.5 });
  s += T(W - 36, 408, 'sidstack.in', { f: SANS, s: 11, c: DIM, a: 'end' });
  s += '</svg>';
  writeFileSync('assets/cover.svg', s);
}

// ---------- features ----------
const projects = [
  { id: 'agentissue', name: 'AgentIssue', url: 'agentissue.tech', cap: 'AgentIssue deciding to block a destructive production action.', p1: 'AI agents now read, write and delete real data, and most teams have no gate between the model deciding and the action happening. When something goes wrong there is no record of what was allowed, who approved it, or why.', p2: 'AgentIssue sits between the agent and the resource. Every action is evaluated first and the answer is allow, ask a human, or block. Only an allowed action runs, exactly once, and every decision lands in a signed audit trail.', meta: 'TypeScript · Cloudflare Workers · D1 · Building' },
  { id: 'tracelens', name: 'TraceLens', url: 'tracelens.site', cap: 'TraceLens reading one click on an orders page.', p1: 'A big part of customer engineering is staring at network tabs with a customer on the call. The information is there, but it is slow to read and hard to share.', p2: 'TraceLens is a Chrome DevTools extension that groups requests into the click that caused them, explains slow or failing calls in one sentence, decodes tokens in place, and writes the Jira report. Open source, one permission, nothing leaves the browser.', meta: 'JavaScript · Manifest V3 · Live · Open source' },
  { id: 'json0', name: 'json0.dev', url: 'json0.dev', cap: 'The JSON diff tool, one of about thirty.', p1: 'Developers reach for the same small tools many times a day: diff this JSON, validate it, decode this token, hash that string. Most of the sites offering them quietly upload what you paste.', p2: 'json0.dev runs every tool in the browser. Share links keep the whole state in the URL hash, which never reaches a server, and a network guard fails the build if any tool tries to make a request it should not.', meta: 'Next.js · TypeScript · Monaco · Live' },
  { id: 'pdfkit', name: 'PDFKit Pro', url: 'pdfkit.pro', cap: 'The PDFKit Pro front page.', p1: 'People handling contracts and IDs should not have to upload them to a stranger to merge two pages. About twenty PDF tools here, from merge and split to sign, OCR and Word to PDF, all processed on the device.', p2: 'An earlier version had accounts, billing and a Pro tier. The current one dropped all of it to stay simple. Simpler won.', meta: 'Next.js · pdf-lib · tesseract.js · Live' },
  { id: 'linkzy', name: 'Linkzy', url: 'linkzy.fun', cap: 'The Linkzy landing page, where the URL is the headline.', p1: 'A link-in-bio service built entirely on Cloudflare’s free tier: Workers, D1, KV, R2 and Pages. Auth uses zero third-party packages, and public pages are served from the edge in about 80 ms.', p2: 'It is built for agents as much as people, with API keys, an llms.txt, an OpenAPI spec and a JSON twin of every page. It is also why I reach for Cloudflare first when something needs to be small, global and cheap.', meta: 'Hono · Workers · D1 · KV · R2 · Live' },
  { id: 'devhelp', name: 'DevHelp AI', url: 'debugger-flax.vercel.app', cap: 'DevHelp AI, waiting for a stack trace.', p1: 'Paste an error or stack trace, pick OpenAI, Anthropic, Gemini or Groq, and get a calm explanation and a fix. It detects the language, framework and database from the text before asking the model.', p2: 'It started as a way to compare how different models handle the same production error, so the cost of each answer is shown right next to it.', meta: 'Next.js · OpenAI, Anthropic, Gemini and Groq SDKs · Live' },
];
projects.forEach((p, i) => {
  const W = 1200, left = i % 2 === 0; // alternate: screenshot left on even rows
  const img = readFileSync(`assets/shots/${p.id}.jpg`).toString('base64');
  const SW = 460, SH = 234, sx = left ? 36 : W - 36 - SW, tx = left ? 540 : 36, tw = W - 36 - 540;
  const maxc = 82, lh = 22;
  let body = ''; let y = 72;
  body += T(tx, y, p.name, { s: 36, w: 700, ls: -1 });
  y += 34;
  const l1 = wrap(p.p1, maxc - 12);
  body += T(tx - 1, y + 26, p.p1[0], { s: 52, w: 700, c: RED });
  l1.forEach((l, j) => { const first = j < 2; body += T(tx + (first ? 40 : 0), y + j * lh, first ? (j === 0 ? l.slice(1) : l) : l, { s: 15, c: INK }); });
  y += l1.length * lh + 12;
  wrap(p.p2, maxc).forEach((l, j) => { body += T(tx, y + j * lh, l, { s: 15, c: INK }); }); y += wrap(p.p2, maxc).length * lh + 10;
  body += `<text x="${tx}" y="${y + 6}" font-family="${SANS}" font-size="10.5" font-weight="700" letter-spacing="1.5" fill="${DIM}">${esc(p.meta.toUpperCase())}   <tspan fill="${RED}">${esc(p.url.toUpperCase())} ↗</tspan></text>`;
  const H = Math.max(y + 36, 310);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${PAPER}"/>`;
  s += `<line x1="36" y1="0.5" x2="${W - 36}" y2="0.5" stroke="${RULE}"/>`;
  s += `<clipPath id="c${i}"><rect x="${sx}" y="36" width="${SW}" height="${SH}"/></clipPath>`;
  s += `<image href="data:image/jpeg;base64,${img}" x="${sx}" y="36" width="${SW}" height="${SW * 599 / 1180}" preserveAspectRatio="xMidYMin slice" clip-path="url(#c${i})"/>`;
  s += `<rect x="${sx + 0.5}" y="36.5" width="${SW - 1}" height="${SH - 1}" fill="none" stroke="${INK}"/>`;
  s += T(sx, 36 + SH + 18, `${String(i + 1).padStart(2, '0')}  ${p.cap}`, { f: SANS, s: 10.5, c: DIM, ls: 0.5 });
  s += body + '</svg>';
  writeFileSync(`assets/feature-${p.id}.svg`, s);
});
console.log('built', 1 + projects.length, 'svgs');
