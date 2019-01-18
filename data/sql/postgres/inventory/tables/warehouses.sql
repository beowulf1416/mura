create table if not exists warehouses (
    id bigserial,
    active boolean not null default true,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id bigint not null,
    name text not null,
    description text,
    constraint pk_warehouses primary key (id),
    constraint u_warehouses_1 unique (client_id, name),
    constraint fk_warehouses_1 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict
);