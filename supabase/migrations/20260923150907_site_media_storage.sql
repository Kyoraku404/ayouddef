INSERT INTO storage.buckets(id,name,public,file_size_limit,allowed_mime_types) VALUES ('site-media','site-media',true,5242880,ARRAY['image/jpeg','image/png','image/webp','image/gif','image/avif','image/x-icon','image/vnd.microsoft.icon']) ON CONFLICT (id) DO NOTHING;
-- Uploads are server-only, authorized by the existing admin session. No public write policies.
