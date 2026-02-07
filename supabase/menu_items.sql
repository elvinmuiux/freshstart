-- Minimal schema required by app/api/menu-items/route.ts
-- Run in Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  section_slug text not null,
  name jsonb not null,
  description jsonb not null default '{}'::jsonb,
  price text not null,
  image text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists menu_items_created_at_idx
  on public.menu_items (created_at desc);

create index if not exists menu_items_section_slug_idx
  on public.menu_items (section_slug);
