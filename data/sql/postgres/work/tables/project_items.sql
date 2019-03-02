create table if not exists project_items (
    id bigserial,
    active boolean not null default true,
    created_ts timestamp without time zone not null default (now() at time zone 'utc'),
    client_id bigint not null,
    project_id bigint not null,
    item_id bigint,
    summary text not null,
    description text not null,
    start_dt date,
    end_dt date,
    actual_start_dt date,
    actual_end_dt date,
    constraint pk_project_items primary key (id),
    constraint fk_project_items_1 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict,
    constraint fk_project_items_2 foreign key (project_id) references work.projects(id)
        on delete restrict on update restrict,
    constraint fk_project_items_3 foreign key (item_id) references work.project_items(id)
        on delete restrict on update restrict
);