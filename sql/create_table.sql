drop table if exists users cascade;
-- ----------------------------------------------------------------------------------------------------

create table users (
    id serial not null,             -- ID
    name text not null,             -- ユーザー名
    created_at timestamp not null,  -- 作成日時
    primary key (id)
);