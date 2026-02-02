-- Add image_url column to services table
alter table public.services add column if not exists image_url text;
