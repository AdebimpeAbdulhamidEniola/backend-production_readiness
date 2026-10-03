# Lesson 2 — Performance

Make the API stay fast and correct as data grows. Same method as Lesson 1:
each part opens with a **Study & Check** gate (a Backend-Engineers-Guide
reading + MCQs), then you **prove the slow/wrong behaviour**, then fix it.
Reuse the Alice/Bob setup and seeded data from Lesson 1's Part 0.

| Part | What you prove | The fix | Guide reading |
| --- | --- | --- | --- |
| [Part 1 — Pagination](./part-1-pagination.html) | `GET /transactions` returns every row; slows as data grows | Bounded pages (`skip`/`take`), cap `limit` server-side | `04_databases/03_indexes.md` (full scans) |
| [Part 2 — Indexes](./part-2-indexes.html) | Filtering by `userId` is a full-table `Seq Scan` | `@@index([userId])` + `@@index([userId, createdAt])` | `04_databases/03_indexes.md` |
| [Part 3 — Money precision](./part-3-money-precision.html) | Float amounts drift (`0.1+0.2 != 0.3`) | Integer minor units (or `Decimal`) + data migration | MDN floating point (guide gap) |
| [Part 4 — Aggregation](./part-4-aggregation.html) | Monthly report pulls all rows into Node to sum them | Aggregate in the DB (`groupBy` / `_sum`) | `04_databases/03_indexes.md` |

## When you finish

You should be able to say: *"I bound result sizes with pagination, index the
columns I filter on, store money as integers so it never drifts, and push
aggregation into the database so cost scales with the answer, not the data."*

Then move on to [Lesson 3 - Reliability](../lesson-3-reliability/).

> Note: Part 3 changes money storage and Part 4 uses `amountMinor` - if you do
> them in order, Part 4's code already assumes Part 3's integer column. If you
> skip Part 3, use `amount` in Part 4's `_sum` instead.
