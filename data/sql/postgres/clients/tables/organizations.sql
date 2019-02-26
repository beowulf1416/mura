create table if not exists organizations (
    id bigserial,
    active boolean not null default true,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id bigint not null,
    name varchar(100) not null,
    description text,
    constraint pk_organizations  primary key (client_id, name),
    constraint fk_organizations_1 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict
);