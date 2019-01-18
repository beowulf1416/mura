create table if not exists accounts (
    id bigserial,
    active boolean not null default true,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id bigint not null,
    name text not null,
    description text,
    constraint pk_accounts primary key (id),
    constraint u_accounts_1 unique (client_id, name)
);