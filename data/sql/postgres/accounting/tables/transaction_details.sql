create table if not exists transaction_details (
    id bigserial,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    posted_ts timestamp without time zone,
    client_id bigint not null,
    account_id bigint not null,
    debit numeric(10,4),
    credit numeric(10,4),
    constraint pk_transaction_details primary key (id),
    constraint fk_transaction_details_1 foreign key (account_id) references accounting.accounts(id)
        on delete restrict on update restrict
);