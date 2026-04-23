# API Contracts & Integration Plan

Full-stack portfolio for Patel Chaitash. Two deployment targets:
1. **Current Emergent preview** — FastAPI (Python) + MongoDB (existing stack)
2. **Vercel deployment ZIP** — React static + Vercel Serverless Functions (Node.js)
   + MongoDB Atlas

Both expose the same REST contract so the React front-end code stays identical.

## Environment / base URL

Front-end derives the API base like this:
```js
const API_BASE =
  (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "") + "/api";
```
- On Emergent preview, `REACT_APP_BACKEND_URL` is set → hits FastAPI.
- On Vercel, it's empty/unset → hits same-origin `/api/*` serverless functions.

## Endpoints

### `POST /api/contact`
Create a new contact message.
- Body: `{ name: string, email: string, message: string }`
- Returns: `{ id: string, ok: true, created_at: ISO8601 }`
- Persists in `messages` collection.

### `GET /api/contact`
List all messages (newest first). Simple — no auth in MVP.
- Returns: `Array<{ id, name, email, message, created_at }>`

### `POST /api/stats/visit`
Increment page-visit counter (called once per session from front-end).
- Body: `{}` or `{ page?: string }`
- Returns: `{ visits: number }`

### `POST /api/stats/resume-download`
Increment résumé-download counter (called when the button is clicked).
- Returns: `{ downloads: number }`

### `GET /api/stats`
Get aggregate counters for display in the hero / footer.
- Returns: `{ visits: number, downloads: number, messages: number }`

## Data model (MongoDB collections)

### `messages`
```
{
  _id: ObjectId,
  id: uuid-string,
  name: string,
  email: string,
  message: string,
  created_at: Date
}
```

### `stats`
Single document with `_id: "global"`:
```
{
  _id: "global",
  visits: number,
  downloads: number
}
```

## Front-end wiring

- **Contact.jsx** — replace the `localStorage` stub with `fetch` POST to
  `${API_BASE}/contact`. Keep the Sonner toast flow for success/error.
- **Hero.jsx / Portfolio.jsx** — on mount, fire a single `POST /api/stats/visit`
  (gated by `sessionStorage` flag so one bump per session), then `GET /api/stats`
  and surface the real **visitors** count in the hero stats grid.
- **Résumé buttons** (Navbar, Hero, Contact, Footer) — on click, fire
  `POST /api/stats/resume-download` (non-blocking, fire-and-forget). Original
  download behaviour via `<a href download>` is unchanged.

## Files to change

### Emergent preview
- `backend/server.py` — add `/api/contact`, `/api/stats/*` routes and MongoDB
  helpers. Existing `/api/` health route stays.
- `frontend/src/lib/api.js` — new tiny helper.
- `frontend/src/components/Contact.jsx` — call `api.submitMessage(...)`.
- `frontend/src/components/Hero.jsx` — read real visit count.
- `frontend/src/components/Portfolio.jsx` — bump visit counter on mount.
- `frontend/src/components/{Navbar,Hero,Contact,Footer}.jsx` — fire
  `resume-download` on click.

### Vercel bundle (packaged separately in /tmp and zipped)
- `api/_lib/db.js` — cached MongoDB client.
- `api/contact.js` — GET/POST handler.
- `api/stats/index.js` — GET aggregate.
- `api/stats/visit.js` — POST increment.
- `api/stats/resume-download.js` — POST increment.
- `vercel.json` — builds CRA, routes `/api/*` to serverless, rest to SPA.
- `.env.example` — `MONGODB_URI=...`, `MONGODB_DB=portfolio`.
- `README.md` — full deployment instructions (MongoDB Atlas + Vercel).

## Testing

- Backend first via `deep_testing_backend_v2` — test all 5 routes,
  validation errors, and persistence.
- Frontend manual verification via screenshot tool.
