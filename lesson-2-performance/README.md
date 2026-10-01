# Lesson 2 — Performance  🧭 outlined

Make the API stay fast as data grows. Same method: prove the slow/incorrect
behaviour first (with a seeded database and timing), then fix it.

Planned parts:

| Part | What we break / prove | The fix |
| --- | --- | --- |
| Part 1 — Unbounded list | `GET /api/transactions` returns *every* row at once; seed 50k rows and watch the response balloon | Cursor/offset pagination with sane `take` limits |
| Part 2 — Missing indexes | Filtering by `userId` / date does a full table scan (`EXPLAIN ANALYZE`) | Add Prisma indexes on `userId` and `createdAt` |
| Part 3 — The money bug | `amount` is a `Float`; prove rounding drift by summing many values | Move to integer minor units (or `Decimal`) and migrate |
| Part 4 — Report efficiency | The monthly report pulls all transactions into Node and filters in JS | Push the aggregation into the database (`groupBy` / SQL) |

Grounded in `Backend-Engineers-Guide/notes/04_databases/03_indexes.md` and the
Prisma docs on pagination & aggregation. Start after Lesson 1.
