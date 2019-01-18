create table if not exists item_conversions (
    item_id bigint not null,
    from_uom_id bigint not null,
    to_uom_id bigint not null,
    factor numeric(10,4) not null,
    constraint pk_item_conversions primary key (item_id),
    constraint fk_item_conversions_1 foreign key (from_uom_id) references common.uom(id)
        on delete restrict on update restrict,
    constraint fk_item_conversions_2 foreign key (to_uom_id) references common.uom(id)
        on delete restrict on update restrict
);