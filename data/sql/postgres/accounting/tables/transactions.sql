create table if not exists transactions (
    id bigserial,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    posted_ts timestamp without time zone,
    client_id bigint not null,
    summary text,
    constraint pk_transactions primary key (id),
    constraint fk_transactions_1 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict
);