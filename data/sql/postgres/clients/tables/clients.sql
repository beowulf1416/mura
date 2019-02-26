create table if not exists clients (
    id bigserial,
    active boolean not null default true,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    name varchar(100) not null,
    public_name varchar(100),
    description text,
    domain varchar(100),
    constraint pk_clients primary key (id),
    constraint u_clients_1 unique (name),
    constraint u_clients_2 unique (public_name)
);