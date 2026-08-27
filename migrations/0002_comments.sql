create table if not exists comments (
  id            serial primary key,
  user_id       text not null,
  author_name   text not null,
  author_image  text,
  body          text not null,
  created_at    timestamptz not null default now()
);

create index if not exists comments_created_at_idx on comments (created_at desc);
create index if not exists comments_user_id_idx on comments (user_id);
