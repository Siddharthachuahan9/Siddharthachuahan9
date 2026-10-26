# Hi, I'm Siddhartha 👋

I'm a generalist engineer in Bengaluru. I sit between customers and code: I listen to a problem, design the fix, build it, ship it, and then stick around to make sure it keeps working.

The roles that describe me best are **Solution Architect**, **AI Agent Engineer**, **AI Engineer** and **Technical Account Manager**. On a normal day I am a bit of all four, sometimes before lunch.

Currently a Customer Engineer at [Hevo Data](https://hevodata.com), where I build integrations, AI agents and MCP servers for real customers with real deadlines.

---

## What I actually do

**If you are technical:** AI agents, MCP servers, runtime guardrails, customer integrations (ETL, CDC, reverse ETL, REST APIs), Cloudflare Workers, Next.js, Python, TypeScript, and a lot of SQL. I like boring tools, small surfaces, and a failure path on day one.

**If you are not technical:** when a company's software needs to talk to another company's software, or when someone wants an AI to do work safely without breaking things, I'm the person who makes that happen and then explains it in plain English.

My rule: **if the same problem shows up twice, it becomes a tool.** Everything below started that way.

---

## Things I've built that people actually use

| Project | What it is | In plain English |
|---|---|---|
| [**AgentIssue**](https://agentissue.tech) | A runtime control layer that checks every AI agent action before it runs. Allow, ask a human, or block. Signed audit trail for every decision. | A security guard for AI agents. The agent asks "can I do this?" before it does it. If the answer is "ask a human", it waits. *Still building.* |
| [**TraceLens**](https://tracelens.site) · [code](https://github.com/Siddharthachuahan9/TRACELENS) | Open-source Chrome DevTools extension. Groups network requests into user actions, diagnoses slow or failing API calls, decodes JWTs, exports a Jira-ready incident report. | When a website is slow or broken, this tells you *why* in one sentence instead of 14 rows of gibberish. Built because I spent too many customer calls squinting at the network tab. |
| [**json0.dev**](https://json0.dev) · [code](https://github.com/Siddharthachuahan9/JSON0.dev) | Privacy-first JSON, CSV and MongoDB tools that run entirely in the browser. Diff, validate, query, format, JWT, hashing, UUIDs. A build-time network guard fails the build if any tool tries to phone home. | Thirty-odd tiny tools developers use all day. Nothing you paste ever leaves your computer. I mean it, the build literally breaks if it tries. |
| [**PDFKit Pro**](https://pdfkit.pro) · [code](https://github.com/Siddharthachuahan9/pdfpro) | About twenty PDF tools (merge, split, compress, sign, OCR, Word ↔ PDF) with everything processed client-side. | Free PDF tools that don't upload your contract to a stranger's server. An earlier version had accounts and billing. I deleted all of it. Simpler is better. |
| [**Linkzy**](https://linkzy.fun) | Link-in-bio service built entirely on Cloudflare's free tier. Zero-dependency auth via Web Crypto, edge-cached pages, analytics by device and country, plus an API, `llms.txt` and OpenAPI spec so AI agents can drive it too. | A Linktree alternative that costs me nothing to run. Also the reason I reach for Cloudflare first whenever something needs to be small, global and cheap. |
| [**DevHelp AI**](https://debugger-flax.vercel.app) · [code](https://github.com/Siddharthachuahan9/DEBUGGER) | Paste an error or stack trace, pick OpenAI, Anthropic, Gemini or Groq, get an explanation and a fix, with the cost of each answer shown next to it. | Paste the scary red text, get a calm explanation. Lets you see which AI model is actually good at your particular mess. |
| **Hot Wheels Stock Tracker** | Multi-tenant service watching Blinkit and Zepto for restocks at your pincode. BullMQ scheduling with jitter, circuit breakers, alert cooldowns, WhatsApp alerts via Twilio. | Quick-commerce apps restock collectibles at random. This texts you the moment they do. Yes, it started because I wanted a specific toy car. No, I'm not sorry. |
| **Zendesk Bulk Ticket Console** | Internal tool: load recipients from Google Sheets or CSV, validate, hash the dataset, create hundreds of Zendesk tickets in one go. | Support teams used to do this by hand, hundreds at a time. Now they don't. |

### Work I can't link to (customers own it)

- **Matrix MCP server** at Hevo. Lets an LLM read and act inside chat rooms and internal systems from one conversation. Cut manual ops work by about 10%. Lesson learned: tool design matters more than the model.
- **AI handover-notes platform.** Drafts the full case handover so an engineer can pick up a customer cold. Handover prep went from about 20 minutes to about 5. The model is told to say "unknown" instead of guessing.
- **Three years of customer connectors.** ETL, CDC, reverse ETL, REST APIs and databases, each adapted to one customer's auth, data model and environment. This is the work everything above grew out of.

---

## How I work

Understand → Design → Build → Deploy → Debug → Improve.

The honest version: get on a call, ask what they're *trying* to do rather than what broke, write the smallest fix in plain language, make sure the customer can explain it back to me, then ship it with a failure path already in place. Something will still break. That's step five.

Longer write-up on my site: [sidstack.in](https://sidstack.in)

---

## Tools I reach for

`Python` `TypeScript` `SQL` `Next.js` `React` `Hono` `FastAPI` `Cloudflare Workers / D1 / KV / R2` `Supabase` `PostgreSQL` `MongoDB` `Snowflake` `BigQuery` `Redis / BullMQ` `MCP` `OpenAI / Anthropic / Gemini APIs` `Chrome Extensions` `Playwright`

---

## Say hi

- 🌐 [sidstack.in](https://sidstack.in)
- 💼 [LinkedIn](https://www.linkedin.com/in/siddharthachauhan)
- 📧 siddharthachauhan16@gmail.com

Open to Solution Architect, AI Agent Engineer, AI Engineer and Technical Account Manager roles. Bengaluru, hybrid, or remote. If you've read this far, you're clearly thorough. We'd get along.
