# Lesson 4 — Testing & CI/CD  🧭 outlined

Turn every "break it" from Lessons 1–3 into an automated test, then make a
pipeline run them on every push so a regression can never merge.

Planned parts:

| Part | What we build | Why |
| --- | --- | --- |
| Part 1 — First real test | Replace the placeholder `test` script; add Vitest/Jest + Supertest | A runnable harness |
| Part 2 — Security regression tests | Encode Lesson 1's attacks as tests (BOLA → 404, forged token → 401, brute force → 429) | The exploits can never silently return |
| Part 3 — A test database | Spin an ephemeral Postgres for tests (Docker), run migrations, seed fixtures | Tests hit real SQL, not mocks |
| Part 4 — GitHub Actions | CI runs install → lint → typecheck → migrate → test on every PR; block merge on red | The pipeline is the gatekeeper |
| Part 5 — CD | Build + deploy on green, with migrations applied safely | Ship with confidence |

Grounded in `Backend-Engineers-Guide/notes/09_deployment/05_ci_cd.md`. This is
the lesson that makes every earlier fix permanent.
