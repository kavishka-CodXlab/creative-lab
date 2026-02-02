-- Create services table
create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  icon text not null,
  features text[] default '{}',
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.services enable row level security;

-- Public can read active services
create policy "Public can view active services"
  on public.services for select
  using (is_active = true);

-- Authenticated users can manage services
create policy "Authenticated users can manage services"
  on public.services for all
  using (auth.uid() is not null);

-- Create index for ordering
create index if not exists services_display_order_idx on public.services(display_order);

-- Insert your custom services
insert into public.services (title, description, icon, features, display_order) values
  (
    'Custom Software Development',
    'We craft custom software that fits your business like a glove — intuitive, scalable, and built to last.',
    'Code',
    ARRAY[
      'Full-stack web applications',
      'Enterprise software solutions',
      'API development & integration',
      'Legacy system modernization',
      'Performance optimization',
      'Ongoing support & maintenance'
    ],
    1
  ),
  (
    'AI & Machine Learning',
    'Intelligent systems that augment human capabilities — making your team smarter, not replacing them.',
    'Brain',
    ARRAY[
      'Machine learning models',
      'Natural language processing',
      'Computer vision solutions',
      'Predictive analytics',
      'AI strategy consulting',
      'Model training & deployment'
    ],
    2
  ),
  (
    'Mobile App Development',
    'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    'Smartphone',
    ARRAY[
      'iOS & Android development',
      'Cross-platform solutions',
      'Mobile-first design',
      'App store optimization',
      'Push notifications',
      'Offline functionality'
    ],
    3
  ),
  (
    'Web Development',
    'Fast, responsive, and beautifully designed websites that convert visitors into customers.',
    'Globe',
    ARRAY[
      'Responsive web design',
      'E-commerce platforms',
      'Content management systems',
      'Progressive web apps',
      'SEO optimization',
      'Performance tuning'
    ],
    4
  ),
  (
    'Cloud & DevOps',
    'Modern infrastructure that scales with your business and keeps your systems running smoothly.',
    'Cloud',
    ARRAY[
      'Cloud migration',
      'AWS, Azure, GCP expertise',
      'CI/CD pipelines',
      'Infrastructure as code',
      'Monitoring & alerting',
      'Security best practices'
    ],
    5
  ),
  (
    'Data & Analytics',
    'Turn your data into insights that drive decisions — dashboards and analytics that actually get used.',
    'BarChart3',
    ARRAY[
      'Data strategy consulting',
      'Dashboard development',
      'Report automation',
      'Real-time analytics',
      'Data visualization',
      'Business intelligence'
    ],
    6
  );
