# Hi, I'm Siddhartha 👋

I'm a generalist engineer in Bengaluru who likes sitting right between customers and code. Someone tells me what's getting in their way, and I design the fix, build it, ship it, and stay around to make sure it keeps working. That last part is where most of the interesting problems live.

The roles that fit me best are **Solution Architect**, **AI Agent Engineer**, **AI Engineer** and **Technical Account Manager**. In practice I'm a bit of all four, usually in the same week.

Right now I'm a Customer Engineer at [Hevo Data](https://hevodata.com), building integrations, AI agents and MCP servers for customers who have real deadlines and very little patience for things that almost work.

---

## What I do

Mostly I connect things. One company's software to another's. An AI model to a set of tools it's allowed to use. A messy question from a customer to a clean answer they can act on.

The building blocks are AI agents, MCP servers, runtime guardrails, data integrations (ETL, CDC, reverse ETL, REST APIs), Cloudflare Workers, Next.js, Python, TypeScript and a lot of SQL. I lean toward boring tools, small surfaces, and planning for failure on day one, because something always fails and I'd rather have written down what happens next.

One habit shapes most of my work: **if the same problem shows up twice, it becomes a tool.** Everything below started that way.

---

## Things I've built

| Project | What it does |
|---|---|
| [**AgentIssue**](https://agentissue.tech) | A safety layer for AI agents. Before an agent takes an action, it asks "can I do this?" The answer is allow, block, or wait for a human to approve. Every decision is written to a signed audit trail, so you always know what was allowed and why. *Still building this one.* |
| [**TraceLens**](https://tracelens.site) · [code](https://github.com/Siddharthachuahan9/TRACELENS) | An open-source Chrome DevTools extension. When a website is slow or broken, it groups the network requests into actions like "clicked Save", explains what went wrong in a sentence, decodes tokens in place, and exports a report you can paste straight into Jira. I built it after too many customer calls spent squinting at the network tab. |
| [**json0.dev**](https://json0.dev) · [code](https://github.com/Siddharthachuahan9/JSON0.dev) | Thirty-odd small tools developers use all day: JSON diff, validate, format, query, JWT decode, hashing, UUIDs, CSV and MongoDB helpers. Everything runs in your browser and nothing you paste is sent anywhere. The build literally fails if any tool tries to phone home. |
| [**PDFKit Pro**](https://pdfkit.pro) · [code](https://github.com/Siddharthachuahan9/pdfpro) | About twenty free PDF tools: merge, split, compress, sign, OCR, Word to PDF and back. Files never leave your device, which matters when the file is a contract or an ID. An earlier version had accounts and billing. I removed all of it. Simpler won. |
| [**Linkzy**](https://linkzy.fun) | A link-in-bio service that runs entirely on Cloudflare's free tier. Pages load from the edge in about 80 ms, auth uses zero third-party packages, and there's an API, `llms.txt` and OpenAPI spec so AI agents can use it as easily as people. It costs me nothing to run, and it's why I reach for Cloudflare first when something needs to be small, global and cheap. |
| [**DevHelp AI**](https://debugger-flax.vercel.app) · [code](https://github.com/Siddharthachuahan9/DEBUGGER) | Paste an error or stack trace, pick OpenAI, Anthropic, Gemini or Groq, and get a calm explanation and a fix. It shows the cost of each answer next to it, so you can see which model is actually good at your particular mess. |
| **Hot Wheels Stock Tracker** | Quick-commerce apps restock collectibles at random. This watches Blinkit and Zepto for your pincode and sends a WhatsApp message the moment something comes back. Scheduling with jitter, circuit breakers, alert cooldowns, multi-tenant accounts. Yes, it started because I wanted one specific toy car. |
| **Zendesk Bulk Ticket Console** | An internal tool for support teams. Load a list of customers from Google Sheets or CSV, validate it, confirm a hash so nothing changed, and create hundreds of tickets in one go. People used to do this by hand. Now they don't. |

### Work I can't link to, because customers own it

- **Matrix MCP server** at Hevo. Lets an AI model read and act inside chat rooms and internal systems from one conversation. Cut manual ops work by about 10%. The big lesson: how you design the tools matters more than which model you use.
- **AI handover-notes platform.** Drafts the full story of a customer case so the next engineer can pick it up cold. Handover prep went from about 20 minutes to about 5. The model is told to say "unknown" rather than guess.
- **Three years of customer connectors.** ETL, CDC, reverse ETL, REST APIs and databases, each shaped around one customer's auth, data model and environment. This is the work everything above grew out of.

---

## How I work

Understand → Design → Build → Deploy → Debug → Improve.

Get on a call. Ask what someone is trying to do, not just what broke, because the real problem is often two steps upstream. Write down the smallest fix in plain language and make sure they can explain it back to me. Ship it with a failure path already in place. Then something breaks anyway, and that's step five.

Longer version on my site: [sidstack.in](https://sidstack.in)

---

## Tools I reach for

`Python` `TypeScript` `SQL` `Next.js` `React` `Hono` `FastAPI` `Cloudflare Workers / D1 / KV / R2` `Supabase` `PostgreSQL` `MongoDB` `Snowflake` `BigQuery` `Redis / BullMQ` `MCP` `OpenAI / Anthropic / Gemini APIs` `Chrome Extensions` `Playwright`

---

## Say hi

- 🌐 [sidstack.in](https://sidstack.in)
- 💼 [LinkedIn](https://www.linkedin.com/in/siddharthachauhan)
- 📧 siddharthachauhan16@gmail.com

Open to Solution Architect, AI Agent Engineer, AI Engineer and Technical Account Manager roles. Bengaluru, hybrid or remote. Always happy to talk shop, or just talk.
