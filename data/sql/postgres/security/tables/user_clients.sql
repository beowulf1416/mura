create table if not exists user_clients (
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    user_id bigint not null,
    client_id bigint not null,
    constraint pk_user_clients primary key (user_id, client_id),
    constraint fk_user_clients_1 foreign key (user_id) references security.users(id)
        on delete restrict on update restrict,
    constraint fk_user_clients_2 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict
);