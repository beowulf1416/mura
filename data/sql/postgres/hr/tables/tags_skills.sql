create table if not exists tags_skills (
    id bigserial,
    active boolean not null default true,
    created_ts timestamp without time zone not null default (now() at time zone 'utc'),
    client_id bigint not null,
    name varchar(100),
    constraint pk_tags_skills primary key (id),
    constraint u_tags_skills_1 unique (client_id, name),
    constraint fk_tags_skills_1 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict
);