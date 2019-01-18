create table if not exists account_tree (
    account_id bigint not null,
    parent_account_id bigint not null,
    constraint pk_account_tree primary key (account_id, parent_account_id),
    constraint fk_account_tree_1 foreign key (account_id) references accounting.accounts(id)
        on delete restrict on update restrict,
    constraint fk_account_tree_2 foreign key (parent_account_id) references accounting.accounts(id)
        on delete restrict on update restrict
);