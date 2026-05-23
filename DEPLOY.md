# Deploy naar Cloudflare

De site draait via [OpenNext for Cloudflare](https://opennext.js.org/cloudflare). Database = **Cloudflare D1** (SQLite). Lokaal blijft `npm run dev` werken met better-sqlite3.

## 1. Eenmalige setup

```bash
# log in op je Cloudflare account via de browser
npx wrangler login

# maak de D1 database (geeft een database_id terug)
npx wrangler d1 create renocheck-professionals
```

Plak het `database_id` uit de output in `wrangler.jsonc` (vervangt de placeholder).

## 2. Schema pushen

```bash
# productie
npm run db:cf:migrate

# of lokaal voor wrangler-preview
npm run db:cf:migrate:local
```

## 3. Session secret zetten

```bash
# productie (interactieve prompt → paste random 48-byte string)
npx wrangler secret put SESSION_SECRET

# genereer een waarde:
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

## 4. Preview lokaal in worker-omgeving

```bash
npm run preview
```

Dit bouwt met OpenNext en serveert via wrangler op `http://localhost:8787` — gebruikt de echte Cloudflare runtime (geen native bindings, D1 binding actief).

## 5. Deploy

```bash
npm run deploy
```

Krijg je een `https://renocheck-professionals.<account>.workers.dev` URL terug. Voor een vaste subdomein:
1. Ga naar Cloudflare dashboard → Workers & Pages → Settings → Domains & Routes
2. Add a `*.workers.dev` route of bind een custom domain

## 6. Eerste admin

De seed-admin logic uit `lib/db.ts` runt **alleen** in lokale dev. Voor D1 productie moet je manueel een admin aanmaken:

```bash
# bash hieronder werkt op Mac/Linux. Op Windows PowerShell: gebruik backticks ipv backslashes.
node -e "const{scryptSync,randomBytes,randomUUID}=require('crypto');const s=randomBytes(16);const h=scryptSync('admin123',s,64);console.log(s.toString('hex')+':'+h.toString('hex'))"
```

Run die hash met:

```bash
npx wrangler d1 execute renocheck-professionals --remote --command "INSERT INTO users (id, email, password_hash, full_name, role) VALUES ('<uuid>', 'admin@renocheck.be', '<hash-output>', 'Beheerder', 'admin');"
```

Of makkelijker: via `npx wrangler d1 execute renocheck-professionals --remote --file=migrations/seed-admin.sql` met een hand-geschreven SQL-bestand.

## Common commands

| Command | Wat het doet |
|---|---|
| `npm run dev` | Snel lokaal dev (Node + better-sqlite3) |
| `npm run preview` | OpenNext build + wrangler preview op poort 8787 |
| `npm run deploy` | Push naar Cloudflare |
| `npm run cf-typegen` | Regenereer `cloudflare-env.d.ts` types |
| `npm run db:cf:migrate` | Push schema naar production D1 |
| `npm run db:local:reset` | Wis lokale SQLite database |
