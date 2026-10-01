# Backend Production-Readiness Course

A hands-on course that takes a working-but-naive REST API — the
[Personal Finance API](https://github.com/AdebimpeAbdulhamidEniola/personal_finance_api)
(TypeScript, Express 5, Prisma, PostgreSQL) — and hardens it into something you
could defend in a backend engineering interview.

**The method, every time: break it first, then fix it.** You never read a fix
before you've exploited the flaw with your own hands in Postman. Each part ends
with a *Your turn* challenge (an unguided task with a hidden answer) and a quick
quiz.

## How to use this course

1. Clone your own copy of the Personal Finance API and get it running locally.
2. Open a lesson part (the `.html` files) in your browser — they're self-contained
   and styled for reading.
3. Keep Postman open on one side, your editor on the other. Do the breaks, apply
   the fixes, re-run the requests.
4. Ask your teacher (Claude, in the session that built this) anything that's
   unclear — that's part of the design.

> Each part is a standalone HTML page. Open it directly, or serve the folder with
> any static server (e.g. `npx serve`) if your browser blocks local file links.

## The five pillars (one lesson each)

| Lesson | Pillar | Status |
| --- | --- | --- |
| [Lesson 1](./lesson-1-security/) | **Security** — auth, authorization, abuse, misconfiguration | ✅ Complete (6 parts) |
| [Lesson 2](./lesson-2-performance/) | **Performance** — pagination, indexing, N+1, money precision | 🧭 Outlined |
| [Lesson 3](./lesson-3-reliability/) | **Reliability** — graceful failure, DB connection handling, idempotency | 🧭 Outlined |
| [Lesson 4](./lesson-4-testing-and-cicd/) | **Testing & CI/CD** — turning every break/fix into an automated test + pipeline | 🧭 Outlined |
| [Lesson 5](./lesson-5-observability/) | **Observability** — structured logging, health checks, metrics | 🧭 Outlined |

## Repository layout

```
README.md                 you are here
MISSION.md                why this course exists (the goal it serves)
RESOURCES.md              the trusted sources every claim is grounded in
NOTES.md                  learner preferences + the backlog of found flaws
assets/                   shared stylesheet + quiz widget (reused by every part)
lesson-1-security/        part-0 … part-5, each a break-then-fix exercise
lesson-2-performance/     (outline)
lesson-3-reliability/     (outline)
lesson-4-testing-and-cicd/(outline)
lesson-5-observability/   (outline)
```

## Grounded in

- [OWASP API Security Top 10 (2023)](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
- [Backend Engineer's Guide](https://github.com/djeada/Backend-Engineers-Guide) (notes + runnable labs)
- Official Prisma / Express documentation

See [`RESOURCES.md`](./RESOURCES.md) for the full list.
