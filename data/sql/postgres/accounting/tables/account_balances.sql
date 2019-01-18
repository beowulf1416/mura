create table if not exists account_balances (
    account_id bigint not null,
    balance numeric(10,4) not null default 0,
    constraint pk_account_balances primary key (account_id),
    constraint fk_account_balances_1 foreign key (account_id) references accounting.accounts(id)
        on delete restrict on update restrict
);