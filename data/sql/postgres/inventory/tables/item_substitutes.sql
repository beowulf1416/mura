create table if not exists item_substitutes (
    item_id bigint not null,
    substitute_item_id bigint not null,
    constraint pk_item_substitutes primary key (item_id, substitute_item_id),
    constraint fk_item_substitutes_1 foreign key (item_id) references inventory.items(id)
        on delete restrict on update restrict
    constraint fk_item_substitutes_2 foreign key (substitute_item_id) references inventory.items(id)
        on delete restrict on update restrict
);