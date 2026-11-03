// Generates assets/header.svg and assets/row-*.svg. Run: node scripts/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const PAPER = '#F7F4EE', INK = '#1E1C19', MUTE = '#6B665E', DIM = '#9A948A', RULE = '#DED8CC', GRID = '#ECE7DD';
const ACCENT = '#C2410C';
const SERIF = "Georgia, 'Iowan Old Style', 'Times New Roman', serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const mono = (x, y, t, size = 11, fill = INK, anchor = 'start', weight = 400, ls = 0) => `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${ls}">${esc(t)}</text>`;
const label = (x, y, t, anchor = 'start', fill = ACCENT) => mono(x, y, t.toUpperCase(), 9.5, fill, anchor, 600, 1.6);
const serif = (x, y, t, size, fill = INK, weight = 400, style = 'normal', anchor = 'start') => `<text x="${x}" y="${y}" font-family="${SERIF}" font-size="${size}" font-weight="${weight}" font-style="${style}" fill="${fill}" text-anchor="${anchor}">${esc(t)}</text>`;
const wrap = (t, max) => { const out = []; let cur = ''; for (const w of t.split(' ')) { if ((cur + ' ' + w).trim().length > max) { out.push(cur.trim()); cur = w; } else cur += ' ' + w; } out.push(cur.trim()); return out; };
const grid = (W, H) => { let g = ''; for (let x = 40; x < W; x += 40) g += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${GRID}" stroke-width="1"/>`; for (let y = 40; y < H; y += 40) g += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`; return g; };

// ---------- header ----------
{
  const W = 1200, H = 420;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  s += `<rect width="${W}" height="${H}" fill="${PAPER}"/>${grid(W, H)}<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="${RULE}"/>`;
  // corner marks
  s += mono(36, 40, 'Siddharthachuahan9 / README', 10.5, DIM);
  s += mono(W - 36, 40, 'sidstack.in', 10.5, DIM, 'end');
  // name + line
  s += serif(34, 128, 'Siddhartha Chauhan', 58, INK, 700);
  s += serif(36, 166, 'Generalist engineer. I sit between customers and code, and ship the thing in the middle.', 19, MUTE, 400, 'italic');
  // facts, right column
  const facts = [['now', 'forward deployed engineering and support, building AI agents for customers'], ['roles', 'solution architect · AI agent engineer · AI engineer · TAM'], ['base', 'Bengaluru · hybrid · remote'], ['rule', 'if the same problem shows up twice, it becomes a tool']];
  facts.forEach(([k, v], i) => { const y = 210 + i * 26; s += label(36, y, k); s += mono(100, y, v, 12, INK); });
  // the loop diagram
  const steps = ['customer problem', 'understand', 'design', 'build', 'deploy', 'debug', 'improve'];
  const y0 = 338, nh = 30, gap = 26, x0 = 36;
  const widths = steps.map(t => Math.round(t.length * 7.4 + 28));
  let x = x0; const centers = [];
  s += `<defs><marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0.5 L7,4 L0,7.5" fill="none" stroke="${INK}" stroke-width="1.2"/></marker></defs>`;
  steps.forEach((t, i) => {
    const w = widths[i], first = i === 0;
    s += `<rect x="${x}" y="${y0}" width="${w}" height="${nh}" rx="15" fill="${first ? ACCENT : PAPER}" stroke="${first ? ACCENT : INK}" stroke-width="1.2"/>`;
    s += mono(x + w / 2, y0 + 19.5, t, 11, first ? PAPER : INK, 'middle', 500);
    centers.push([x, x + w]);
    if (i < steps.length - 1) s += `<line x1="${x + w}" y1="${y0 + nh / 2}" x2="${x + w + gap}" y2="${y0 + nh / 2}" stroke="${INK}" stroke-width="1.2" marker-end="url(#arr)"/>`;
    x += w + gap;
  });
  // loop back from improve to understand
  const [, lastR] = centers[centers.length - 1]; const [uL] = centers[1]; const ux = uL + (centers[1][1] - uL) / 2, ix = lastR - (centers[6][1] - centers[6][0]) / 2;
  s += `<path d="M${ix},${y0 + nh} v14 H${ux} v-14" fill="none" stroke="${ACCENT}" stroke-width="1.2" stroke-dasharray="3 3" marker-end="url(#arr)"/>`;
  s += mono(ux + 10, y0 + nh + 24, 'something will break. that is step five. then round again.', 10.5, DIM, 'start', 400);
  s += label(W - 36, y0 + 19.5, 'how every engagement goes', 'end', DIM);
  s += '</svg>';
  writeFileSync('assets/header.svg', s);
}

// ---------- project rows ----------
const projects = [
  { id: 'agentissue', name: 'AgentIssue', url: 'agentissue.tech', kind: 'runtime guardrails for AI agents', blurb: 'A safety layer that checks every agent action before it runs. Allow, block, or wait for a human. Every decision lands in a signed audit trail.', stack: 'TypeScript · Cloudflare Workers · D1', status: 'building' },
  { id: 'tracelens', name: 'TraceLens', url: 'tracelens.site', kind: 'open-source Chrome DevTools extension', blurb: 'Groups network requests into the click that caused them, explains slow or failing API calls in one sentence, decodes tokens, and writes the incident report.', stack: 'JavaScript · Manifest V3', status: 'live' },
  { id: 'json0', name: 'json0.dev', url: 'json0.dev', kind: 'browser-only developer tools', blurb: 'Thirty-odd JSON, CSV and MongoDB tools. Diff, validate, query, format, JWT, hashing. Nothing you paste leaves your browser, and the build fails if it tries.', stack: 'Next.js · TypeScript', status: 'live' },
  { id: 'pdfkit', name: 'PDFKit Pro', url: 'pdfkit.pro', kind: 'client-side PDF toolkit', blurb: 'About twenty free PDF tools: merge, split, compress, sign, OCR, Word to PDF and back. Files never leave the device, which matters when the file is a contract.', stack: 'Next.js · pdf-lib · tesseract.js', status: 'live' },
  { id: 'linkzy', name: 'Linkzy', url: 'linkzy.fun', kind: 'link-in-bio on the edge', blurb: 'Runs entirely on Cloudflare’s free tier. Zero-package auth, edge-cached pages, analytics by country, and an API with llms.txt so agents can use it too.', stack: 'Hono · Workers · D1 · KV · R2', status: 'live' },
  { id: 'devhelp', name: 'DevHelp AI', url: 'debugger-flax.vercel.app', kind: 'multi-model error explainer', blurb: 'Paste an error or stack trace, pick OpenAI, Anthropic, Gemini or Groq, get a calm explanation and a fix, with the cost of each answer shown beside it.', stack: 'Next.js · OpenAI, Anthropic, Gemini, Groq SDKs', status: 'live' },
];
projects.forEach((p, i) => {
  const W = 1200, H = 176, img = readFileSync(`assets/shots/${p.id}.jpg`).toString('base64');
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  s += `<rect width="${W}" height="${H}" fill="${PAPER}"/><line x1="0" y1="0.5" x2="${W}" y2="0.5" stroke="${RULE}"/>`;
  if (i === projects.length - 1) s += `<line x1="0" y1="${H - 0.5}" x2="${W}" y2="${H - 0.5}" stroke="${RULE}"/>`;
  s += mono(36, 44, String(i + 1).padStart(2, '0'), 11, ACCENT, 'start', 600, 1);
  s += serif(76, 50, p.name, 28, INK, 700);
  s += mono(76 + p.name.length * 15.5 + 14, 48, p.kind, 11, DIM);
  wrap(p.blurb, 92).forEach((l, j) => { s += serif(76, 80 + j * 21, l, 15, MUTE); });
  s += label(76, 144, 'stack'); s += mono(126, 144, p.stack, 11, INK);
  s += label(76, 162, 'status'); s += mono(126, 162, p.status, 11, p.status === 'building' ? ACCENT : INK, 'start', 600);
  s += label(520, 144, 'at'); s += mono(542, 144, p.url + '  ↗', 11, INK, 'start', 600);
  // screenshot window
  const sx = 790, sy = 22, sw = 374, sh = 132;
  s += `<clipPath id="c${i}"><rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="3"/></clipPath>`;
  s += `<rect x="${sx + 4}" y="${sy + 4}" width="${sw}" height="${sh}" rx="3" fill="${INK}" opacity="0.12"/>`;
  s += `<image href="data:image/jpeg;base64,${img}" x="${sx}" y="${sy}" width="${sw}" height="${sw * 599 / 1180}" preserveAspectRatio="xMidYMin slice" clip-path="url(#c${i})"/>`;
  s += `<rect x="${sx + 0.5}" y="${sy + 0.5}" width="${sw - 1}" height="${sh - 1}" rx="3" fill="none" stroke="${INK}" stroke-width="1"/>`;
  s += '</svg>';
  writeFileSync(`assets/row-${p.id}.svg`, s);
});
console.log('built', 1 + projects.length, 'svgs');
