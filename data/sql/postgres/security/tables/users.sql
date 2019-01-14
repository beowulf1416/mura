create table if not exists users (
    id bigserial,
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    verified_ts timestamp without time zone,
    email public.email_address,
    password text not null,
    last_signed_ts timestamp without time zone,
    constraint pk_users primary key (id),
    constraint u_users_1 unique (email)
);