-- Create industries table
create table if not exists public.industries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  image_url text not null,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.industries enable row level security;

-- Public can read active industries
create policy "Public can view active industries"
  on public.industries for select
  using (is_active = true);

-- Authenticated users can manage industries
create policy "Authenticated users can manage industries"
  on public.industries for all
  using (auth.uid() is not null);

-- Create index for ordering
create index if not exists industries_display_order_idx on public.industries(display_order);

-- Insert default industries
insert into public.industries (name, image_url, display_order) values
  ('Healthcare', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop', 1),
  ('Finance', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', 2),
  ('E-commerce', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop', 3),
  ('Education', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop', 4),
  ('Manufacturing', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop', 5),
  ('Real Estate', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop', 6);
