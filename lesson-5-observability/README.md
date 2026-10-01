# Lesson 5 — Observability  🧭 outlined

Make the running system legible: know what it's doing, prove it's healthy, and
find out about problems before users do.

Planned parts:

| Part | What we break / prove | The fix |
| --- | --- | --- |
| Part 1 — Blind in production | Trigger an error; show the logs tell you almost nothing (and once leaked a secret) | Structured JSON logging (pino) with request ids, never logging secrets |
| Part 2 — No health signal | A load balancer can't tell if the app is alive or the DB is reachable | `/healthz` (liveness) and `/readyz` (DB check) endpoints |
| Part 3 — No metrics | You can't answer "how slow is the report endpoint?" | Request metrics + the Prometheus/Grafana lab from the guide |
| Part 4 — Silent alerts | A failure happens and nobody is paged | Alerting on error rate / latency, tied to the Grafana lab |

Grounded in `Backend-Engineers-Guide/projects/grafana_test_setup`. The capstone:
a dashboard and health checks you can demo live in an interview.
