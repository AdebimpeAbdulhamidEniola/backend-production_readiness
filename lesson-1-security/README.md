# Lesson 1 — Security

Make the Personal Finance API safe to expose to the internet. We walk the API
**from login to the last endpoint**, and at each stop we prove a real flaw in
Postman before fixing it. Work the parts in order — each builds on the Alice/Bob
setup from Part 0.

| Part | What you break | What you learn to fix | OWASP |
| --- | --- | --- | --- |
| [Part 0 — Setup](./part-0-setup.html) | *(no exploit)* | Run the API; build a Postman attack bench with two users | — |
| [Part 1 — Forging a token](./part-1-authentication.html) | Mint a valid session for Alice without her password | Remove the `default_secret` fallback; fail fast on a missing/weak secret | API2 Broken Authentication |
| [Part 2 — Object authorization](./part-2-object-authorization.html) | As Bob, delete & rewrite Alice's transactions | Scope every query to its owner (`where: { id, userId }`) | API1 BOLA |
| [Part 3 — Unguarded endpoints](./part-3-function-authorization.html) | Expose the reports routes mounted without the auth middleware | Guard routers consistently with `router.use(authenticate)`; audit every route | API5 BFLA |
| [Part 4 — Rate limiting](./part-4-rate-limiting.html) | Brute-force the login with unlimited guesses | Add `express-rate-limit`; budget limits per endpoint group | API4 Unrestricted Resource Consumption |
| [Part 5 — Misconfiguration](./part-5-misconfiguration.html) | Read the DB credentials from the boot log; call the API from any origin | Stop logging secrets; lock down CORS; add Helmet & body limits | API8 Security Misconfiguration |

## When you finish

You should be able to say, out loud and from memory: *"Here are six classes of
API vulnerability, how I proved each one against my own code, and exactly how I
closed it."* That sentence is the point of the whole lesson.

Then move on to [Lesson 2 — Performance](../lesson-2-performance/).
