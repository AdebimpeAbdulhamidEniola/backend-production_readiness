# Lesson 3 — Reliability  🧭 outlined

Make the API behave predictably when things go wrong. Prove the failure mode,
then make it graceful.

Planned parts:

| Part | What we break / prove | The fix |
| --- | --- | --- |
| Part 1 — No port / bad config | Server starts with `PORT` unset (`NaN`) and misbehaves silently | Validate all env config at boot (schema), fail fast |
| Part 2 — DB down | Kill Postgres mid-request; see how the API responds | Connection handling, timeouts, friendly 503s, retries where safe |
| Part 3 — Crash safety | An unhandled rejection takes the process down | Centralised async error handling, `unhandledRejection` guard, graceful shutdown |
| Part 4 — Double submit | Replay a create request; get duplicate transactions | Idempotency keys / request de-duplication |

Grounded in `Backend-Engineers-Guide/notes/04_databases` and
`projects/api_reliability_lab`. Depends on Lesson 1's fixes being in place.
