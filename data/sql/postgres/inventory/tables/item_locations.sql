create table if not exists item_locations (
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id bigint not null,
    item_id bigint not null,
    locator_id bigint not null,
    expiry date,
    unit_id bigint not null,
    quantity numeric(10,4) not null default 0,
    constraint pk_item_locations primary key (client_id, item_id, locator_id),
    constraint fk_item_locations_1 foreign key (client_id) references clients.clients(id) 
        on delete restrict on update restrict,
    constraint fk_item_locations_2 foreign key (item_id) references inventory.items(id) 
        on delete restrict on update restrict,
    constraint fk_item_locations_3 foreign key (locator_id) references inventory.locations(id) 
        on delete restrict on update restrict
);