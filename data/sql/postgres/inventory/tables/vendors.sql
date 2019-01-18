create table if not exists vendors (
    id bigserial,
    active boolean not null default true,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id bigint not null,
    name text not null,
    constraint pk_vendors primary key (id),
    constraint u_vendors_1 unique (client_id, name),
    constraint fk_vendors_1 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict
);