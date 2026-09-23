# Supabase admin setup

The admin portal is `/adminzaky`; `/admizaky` and `/admin` redirect there.

Project: `eiebjftgtbwbcvtrvrbc` (Marrakeshi Tour Guide Admin, 42app).
The existing database records were copied into this project. The original database
was retained. The local `.env` now points to Supabase; `.env.before-supabase` is
an ignored backup of the old connection settings.

## Hosting environment

Copy these values from the local, ignored `.env` into the hosting provider's
server environment before deploying:

- `DATABASE_URL`: Supabase session-pooler connection for `marrakeshi_app`.
- `SUPABASE_URL`: `https://eiebjftgtbwbcvtrvrbc.supabase.co`.
- `SUPABASE_SERVICE_ROLE_KEY` (or `SUPABASE_SECRET_KEY`): server-only Storage key.
- `SUPABASE_STORAGE_BUCKET`: `site-media`.
- `AUTH_SECRET` and `OCN_AUTH_SECRET`: independent random signing secrets.

Never prefix secrets with `NEXT_PUBLIC_` or commit them. Restart the server after
changing connection settings. Existing administrator accounts were preserved;
changing signing secrets requires signing in again.

## Media and content

The Images tab edits logos, hero/about photos and existing tour image slots.
Tour Packs edits card icons, themes, cover photos, prices and descriptions.
Gallery uploads new gallery photos. Images accept JPEG, PNG, WebP, GIF, AVIF and
ICO up to 5 MB. Uploads require an admin session and are stored in the public-read
`site-media` bucket; anonymous users cannot upload or edit database rows.

Existing bundled photos remain in `public`. New uploads use Supabase Storage.
Tour detail pages render current database content on each request.
After a successful reservation, both booking forms open WhatsApp directly in
the same tab with the request details prefilled. The visitor still presses Send
in WhatsApp. A failed submission stays on the form with an error.

## Database and verification

The Prisma schema describes the application tables. SQL snapshots are in
`supabase/migrations`. Provision the `marrakeshi_app` login password separately:
the migration intentionally contains no credentials. Public tables use RLS,
with writes and reads restricted to the backend database role.

For a fresh database only, set `ZAKY_ADMIN_PASSWORD` and `OCN_ADMIN_PASSWORD`
before running the seed. Seeding no longer resets existing admin passwords.

Run `npm run build`, `npm run lint`, and `npm run test:admin` with a production
server running on port 3005 (`npm run start -- --port 3005`). The integration
test checks access control, redirects, image upload/read/edit, tour icon changes,
and booking display fields. It removes its temporary images and restores the
original tour icon. Override `TEST_BASE_URL` to use a different local port.
`npm run test:reservation` verifies the WhatsApp redirect and failure paths
without creating reservations or sending messages.
