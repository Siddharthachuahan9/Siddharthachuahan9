// Generates assets/header.svg and assets/card-*.svg. Run: node scripts/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const BG = '#0B0B0D', PANEL = '#111114', LINE = '#232328', INK = '#F2F2F0', MUTE = '#8B8B93', DIM = '#5A5A63';
const ACCENT = '#FF8A3D';
const SANS = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// deterministic value noise for the dither band
function rng(seed) { let s = seed >>> 0; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }
function makeNoise(seed, gw, gh) {
  const r = rng(seed); const g = [];
  for (let y = 0; y <= gh; y++) { g[y] = []; for (let x = 0; x <= gw; x++) g[y][x] = r(); }
  const sm = t => t * t * (3 - 2 * t);
  return (fx, fy) => {
    const x0 = Math.floor(fx), y0 = Math.floor(fy), tx = sm(fx - x0), ty = sm(fy - y0);
    const a = g[y0][x0], b = g[y0][x0 + 1], c = g[y0 + 1][x0], d = g[y0 + 1][x0 + 1];
    return (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty;
  };
}
function ditherBand(x, y, w, h, seed) {
  const step = 6, cols = Math.floor(w / step), rows = Math.floor(h / step);
  const n1 = makeNoise(seed, 12, 4), n2 = makeNoise(seed + 7, 40, 10);
  let out = '';
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const u = i / cols, v = j / rows;
    const wave = Math.exp(-Math.pow((v - (0.5 + 0.18 * Math.sin(u * 6.5 + 1))) / 0.26, 2));
    const val = (0.55 * n1(u * 12, v * 4) + 0.45 * n2(u * 40, v * 10)) * (0.45 + 0.9 * wave);
    const cx = x + i * step + 3, cy = y + j * step + 3;
    if (val > 0.72) out += `<rect x="${cx - 3}" y="${cy - 3}" width="6" height="6" fill="${ACCENT}"/>`;
    else if (val > 0.6) out += `<circle cx="${cx}" cy="${cy}" r="2.2" fill="${ACCENT}"/>`;
    else if (val > 0.5) out += `<circle cx="${cx}" cy="${cy}" r="1.3" fill="${ACCENT}" opacity="0.7"/>`;
    else if (val > 0.33) out += `<circle cx="${cx}" cy="${cy}" r="1.3" fill="#3A3A42"/>`;
    else out += `<circle cx="${cx}" cy="${cy}" r="0.9" fill="#26262C"/>`;
  }
  return out;
}
const label = (x, y, t, anchor = 'start') => `<text x="${x}" y="${y}" font-family="${MONO}" font-size="10" letter-spacing="1.4" fill="${DIM}" text-anchor="${anchor}">${esc(t.toUpperCase())}</text>`;
const mono = (x, y, t, size = 12, fill = INK, anchor = 'start', weight = 500) => `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(t)}</text>`;
const sans = (x, y, t, size = 14, fill = INK, weight = 400) => `<text x="${x}" y="${y}" font-family="${SANS}" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(t)}</text>`;

// ---------- header ----------
{
  const W = 1200, H = 470;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  s += `<rect width="${W}" height="${H}" rx="8" fill="${BG}"/><rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="8" fill="none" stroke="${LINE}"/>`;
  // top strip
  s += mono(22, 29, 'siddhartha / README.md', 11, MUTE);
  s += `<circle cx="196" cy="25" r="3.5" fill="${ACCENT}"><animate attributeName="opacity" values="1;0.25;1" dur="2.4s" repeatCount="indefinite"/></circle>`;
  s += mono(207, 29, 'BUILDING', 10, INK, 'start', 600);
  s += mono(W - 22, 29, 'github.com/Siddharthachuahan9', 11, MUTE, 'end');
  s += `<line x1="0" y1="44" x2="${W}" y2="44" stroke="${LINE}"/>`;
  // dither band
  s += `<clipPath id="band"><rect x="1" y="45" width="${W - 2}" height="130"/></clipPath><g clip-path="url(#band)">${ditherBand(0, 45, W, 132, 20261103)}</g>`;
  s += `<line x1="0" y1="177" x2="${W}" y2="177" stroke="${LINE}"/>`;
  // left: identity
  s += `<text x="26" y="236" font-family="${SANS}" font-size="44" font-weight="700" fill="${INK}" letter-spacing="-1">Siddhartha Chauhan</text>`;
  s += sans(28, 266, 'Generalist engineer. I sit between customers and code, and ship the thing in the middle.', 15, MUTE);
  const rows = [['now', 'building AI agents, MCP servers and integrations at Hevo Data'], ['roles', 'solution architect · AI agent engineer · AI engineer · TAM'], ['base', 'Bengaluru · hybrid · remote'], ['rule', 'if the same problem shows up twice, it becomes a tool']];
  rows.forEach(([k, v], i) => { const y = 306 + i * 30; s += label(28, y, k); s += mono(96, y, v, 12.5, INK); });
  // right: stats grid
  const gx = 800, gy = 196, gw = 376, gh = 250, cw = gw / 2, ch = gh / 2;
  s += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="6" fill="${PANEL}" stroke="${LINE}"/>`;
  s += `<line x1="${gx + cw}" y1="${gy}" x2="${gx + cw}" y2="${gy + gh}" stroke="${LINE}"/><line x1="${gx}" y1="${gy + ch}" x2="${gx + gw}" y2="${gy + ch}" stroke="${LINE}"/>`;
  const stats = [['projects live', '6'], ['years in production', '3+'], ['status', 'open to roles'], ['focus', 'agents · integrations']];
  stats.forEach(([k, v], i) => {
    const x = gx + (i % 2) * cw + 18, y = gy + Math.floor(i / 2) * ch + 30;
    s += label(x, y, k);
    const big = v.length <= 3;
    s += `<text x="${x}" y="${y + (big ? 52 : 40)}" font-family="${big ? SANS : MONO}" font-size="${big ? 40 : 13}" font-weight="${big ? 700 : 600}" fill="${i === 2 ? ACCENT : INK}" letter-spacing="${big ? -1 : 0}">${esc(v)}</text>`;
  });
  s += '</svg>';
  writeFileSync('assets/header.svg', s);
}

// ---------- cards ----------
const projects = [
  { id: 'agentissue', name: 'AgentIssue', url: 'https://agentissue.tech', kind: 'runtime guardrails', blurb: 'A safety layer for AI agents. Every action is checked first: allow, block, or wait for a human.', stack: 'TypeScript · Cloudflare', status: 'building', since: 'Oct 2026', cta: 'visit project' },
  { id: 'tracelens', name: 'TraceLens', url: 'https://tracelens.site', kind: 'chrome devtools extension', blurb: 'Explains slow or failing API calls in one sentence and exports a Jira-ready report. Open source.', stack: 'JavaScript · MV3', status: 'live', since: 'May 2026', cta: 'visit project' },
  { id: 'json0', name: 'json0.dev', url: 'https://json0.dev', kind: 'browser-only dev tools', blurb: 'Thirty-odd JSON, CSV and MongoDB tools. Nothing you paste leaves your browser, and the build enforces it.', stack: 'Next.js · TypeScript', status: 'live', since: 'Aug 2026', cta: 'visit project' },
  { id: 'pdfkit', name: 'PDFKit Pro', url: 'https://pdfkit.pro', kind: 'client-side pdf toolkit', blurb: 'About twenty free PDF tools. Merge, split, sign, OCR. Files never leave your device.', stack: 'Next.js · pdf-lib', status: 'live', since: 'Mar 2026', cta: 'visit project' },
  { id: 'linkzy', name: 'Linkzy', url: 'https://linkzy.fun', kind: 'link-in-bio on the edge', blurb: 'Runs entirely on Cloudflare’s free tier. Agent-friendly API, llms.txt and OpenAPI spec included.', stack: 'Hono · Workers · D1', status: 'live', since: 'Mar 2026', cta: 'visit project' },
  { id: 'devhelp', name: 'DevHelp AI', url: 'https://debugger-flax.vercel.app', kind: 'multi-model error explainer', blurb: 'Paste a stack trace, pick OpenAI, Anthropic, Gemini or Groq, get a calm fix with the cost shown.', stack: 'Next.js · LLM SDKs', status: 'live', since: 'Feb 2026', cta: 'visit project' },
];
for (const p of projects) {
  const W = 590, H = 500, img = readFileSync(`assets/shots/${p.id}.jpg`).toString('base64');
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  s += `<rect width="${W}" height="${H}" rx="8" fill="${BG}"/><rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="8" fill="none" stroke="${LINE}"/>`;
  s += mono(18, 26, p.name.toLowerCase().replace(/\s+/g, '-'), 11, INK, 'start', 600);
  s += mono(W - 18, 26, `${p.status === 'building' ? '● building' : 'since ' + p.since}`, 10.5, p.status === 'building' ? ACCENT : MUTE, 'end');
  s += `<line x1="0" y1="40" x2="${W}" y2="40" stroke="${LINE}"/>`;
  // screenshot, 554x281 box with rounded clip
  s += `<clipPath id="shot"><rect x="18" y="56" width="554" height="281" rx="4"/></clipPath>`;
  s += `<image href="data:image/jpeg;base64,${img}" x="18" y="56" width="554" height="281" preserveAspectRatio="xMidYMin slice" clip-path="url(#shot)"/>`;
  s += `<rect x="18.5" y="56.5" width="553" height="280" rx="4" fill="none" stroke="${LINE}"/>`;
  s += `<text x="18" y="373" font-family="${SANS}" font-size="22" font-weight="700" fill="${INK}" letter-spacing="-0.4">${esc(p.name)}</text>`;
  s += mono(W - 18, 372, p.kind, 10.5, DIM, 'end');
  // blurb, wrapped
  const words = p.blurb.split(' '); const lines = []; let cur = '';
  for (const w of words) { if ((cur + ' ' + w).trim().length > 78) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; }
  lines.push(cur.trim());
  lines.forEach((l, i) => { s += sans(18, 396 + i * 19, l, 13.5, MUTE); });
  s += `<line x1="0" y1="438" x2="${W}" y2="438" stroke="${LINE}"/>`;
  const meta = [['stack', p.stack], ['status', p.status]];
  meta.forEach(([k, v], i) => { const x = 18 + i * 200; s += label(x, 458, k); s += mono(x, 478, v, 12, i === 1 && p.status === 'building' ? ACCENT : INK, 'start', 600); });
  s += `<line x1="200" y1="438" x2="200" y2="${H}" stroke="${LINE}"/><line x1="400" y1="438" x2="400" y2="${H}" stroke="${LINE}"/>`;
  s += `<rect x="416" y="452" width="156" height="34" rx="3" fill="${ACCENT}"/>`;
  s += `<text x="494" y="474" font-family="${MONO}" font-size="11" font-weight="700" letter-spacing="1.2" fill="#121212" text-anchor="middle">${esc(p.cta.toUpperCase())}</text>`;
  s += '</svg>';
  writeFileSync(`assets/card-${p.id}.svg`, s);
}
console.log('built', 1 + projects.length, 'svgs');
