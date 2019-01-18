create table if not exists locations (
    id bigserial,
    active boolean not null default true,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id bigint not null,
    tag text,
    warehouse_id bigint not null,
    section text,
    floor text,
    level text,
    aisle text,
    cabinet text,
    box_id text,
    uom_id bigint not null,
    balance numeric(10,4) not null default 0,
    constraint pk_locations primary key (id),
    constraint u_locations_1 unique (client_id, tag),
    constraint fk_locations_1 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict,
    constraint fk_locations_2 foreign key (warehouse_id) references inventory.warehouses(id)
        on delete restrict on update restrict,
    constraint fk_locations_3 foreign key (uom_id) references common.uom(id)
        on delete restrict on update restrict
);