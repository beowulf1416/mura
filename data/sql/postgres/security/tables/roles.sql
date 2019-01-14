create table if not exists roles (
    id bigserial,
    active boolean not null default true,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    name varchar(100) not null,
    description text,
    constraint pk_roles primary key (id),
    constraint u_roles_1 unique (name)
);