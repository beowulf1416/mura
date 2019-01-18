create table if not exists item_vendors (
    item_id bigint not null,
    vendor_id bigint not null,
    constraint pk_item_vendors primary key (item_id, vendor_id),
    constraint fk_item_vendors_1 foreign key (item_id) references inventory.items(id)
        on delete restrict on update restrict,
    constraint fk_item_vendors_2 foreign key (vendor_id) references inventory.vendors(id)
        on delete restrict on update restrict
);