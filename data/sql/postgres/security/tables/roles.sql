create table if not exists roles (
    id bigserial,
    client_id bigint not null,
    active boolean not null default true,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    name varchar(100) not null,
    description text,
    constraint pk_roles primary key (id),
    constraint u_roles_1 unique (client_id, name),
    constraint fk_roles_1 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict
);