create table if not exists items (
    id bigserial,
    active boolean not null default true,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id bigint not null,
    name varchar(100) not null,
    constraint pk_items primary key (id),
    constraint u_items_1 unique (client_id,name),
    constraint fk_items_1 foreign key (id) references clients.clients(id) 
        on delete restrict on update restrict
);
