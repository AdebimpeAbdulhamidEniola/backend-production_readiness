# Lesson 1 — Security: what I learned (quick notes)

Each item: **the flaw → the fix → how to do it in Express and in NestJS.**

---

## Part 1 — Broken Authentication (forgeable tokens)
- **Flaw:** JWT secret fell back to a public string (`default_secret`), so anyone could forge a token for any user → full account takeover.
- **Rule:** a signing secret must be strong, random, and never hard-coded; fail fast if it's missing. A JWT is *signed, not encrypted* — no secrets in the payload. Pin the algorithm and set an expiry.
- **Express:**
  ```ts
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET || JWT_SECRET.length < 32) throw new Error("JWT_SECRET missing/weak");
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });   // pin the algorithm
  ```
- **NestJS:** use `@nestjs/jwt` + `@nestjs/config`; validate env with a schema (Joi/Zod) at startup so the app won't boot without a strong `JWT_SECRET`.
  ```ts
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (c: ConfigService) => ({
      secret: c.getOrThrow("JWT_SECRET"),           // throws if missing
      signOptions: { expiresIn: "1h", algorithm: "HS256" },
    }),
  });
  ```

## Part 2 — Broken Object Level Authorization (BOLA)
- **Flaw:** update/delete looked a row up by `id` only → any user could change/delete anyone's records.
- **Rule:** every query that uses client input to reach a record must be **scoped to the owner** — reads, searches, updates, deletes. Match on **id + userId**, not id alone. Return 404 (not 403) so you don't reveal the row exists.
- **Express (Prisma):**
  ```ts
  const { count } = await prisma.transaction.deleteMany({ where: { id, userId } });
  if (count === 0) throw new AppError("Transaction not found", 404);
  ```
- **NestJS:** same ownership scoping inside the service; use a `JwtAuthGuard` to populate the user, then enforce ownership in the service (or a custom guard/`CASL` policy for richer rules).
  ```ts
  async remove(id: string, userId: string) {
    const { count } = await this.prisma.transaction.deleteMany({ where: { id, userId } });
    if (count === 0) throw new NotFoundException();
  }
  ```

## Part 3 — Broken Function Level Authorization (unguarded routes)
- **Flaw:** the reports router was mounted **without** the auth middleware → inconsistent protection.
- **Rule:** make "protected" the default for a router; never add a route without a deliberate auth decision. Audit every endpoint.
- **Express:**
  ```ts
  const router = Router();
  router.use(authenticate);          // every route below is now protected
  router.get("/monthly", getMonthlyReport);
  ```
- **NestJS:** apply the guard globally, then opt specific routes **out** with a `@Public()` decorator — the opposite default (secure unless marked public).
  ```ts
  app.useGlobalGuards(new JwtAuthGuard());   // or APP_GUARD provider
  @Public() @Post("login") login() { ... }   // explicit exceptions only
  ```

## Part 4 — Unrestricted Resource Consumption (brute force)
- **Flaw:** no limit on login attempts → unlimited password guessing (credential stuffing).
- **Rule:** limit attempts per IP (and, in big apps, per account). Rate-limit auth routes tightly; keep the "invalid email or password" message generic.
- **Express:**
  ```ts
  import rateLimit from "express-rate-limit";
  const authLimiter = rateLimit({ windowMs: 15*60*1000, max: 10 });
  app.use("/api/auth", authLimiter, authRoutes);
  ```
- **NestJS:** use `@nestjs/throttler`.
  ```ts
  ThrottlerModule.forRoot([{ ttl: 900_000, limit: 10 }]);   // 10 per 15 min
  @UseGuards(ThrottlerGuard) @Post("login") login() { ... }
  ```

## Part 5 — Security Misconfiguration (secrets & settings)
- **Flaw:** DB URL logged on boot (a credential in logs); CORS open to the whole internet; raw error objects logged.
- **Rule:** never log secrets/PII (a logged secret = a leaked secret → rotate it); lock CORS to known origins; add safe headers; log messages, not raw objects.
- **Express:**
  ```ts
  import helmet from "helmet";
  app.use(helmet());
  app.use(express.json({ limit: "10kb" }));
  app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") ?? [], credentials: true }));
  app.disable("x-powered-by");
  // delete console.log(process.env.DB_URL); log error.message, never the whole object
  ```
- **NestJS:** `app.use(helmet())`, `app.enableCors({ origin: [...] })`, `ValidationPipe` for body limits/whitelisting, and a structured logger (pino) with redaction instead of `console`.

---

## The five one-liners to remember
1. **Auth:** strong, non-hardcoded secret; fail fast if missing; pin algorithm + expiry.
2. **BOLA:** scope every record query by owner (`id + userId`); 404 on miss.
3. **Function auth:** secure-by-default routers; audit every endpoint.
4. **Rate limiting:** cap attempts on auth/expensive routes (per IP, and per account at scale).
5. **Misconfig:** never log secrets, lock CORS, add Helmet, return generic errors.

**Cross-cutting:** authentication = *who you are*; authorization = *what you may do*. Every protected request checks identity, and checks permission whenever the caller can reach something that might not be theirs.
