create table if not exists item_components (
    item_id bigint not null,
    component_id bigint not null,
    uom_id bigint not null,
    quantity numeric(10,4) not null,
    constraint pk_item_components primary key (item_id),
    constraint u_item_components_1 unique (item_id, component_id),
    constraint fk_item_components_1 foreign key (item_id) references inventory.items(id)
        on delete restrict on update restrict,
    constraint fk_item_components_2 foreign key (component_id) references inventory.items(id)
        on delete restrict on update restrict,
    constraint fk_item_components_3 foreign key (uom_id) references common.uom(id)
        on delete restrict on update restrict
);