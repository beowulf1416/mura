create table if not exists projects (
    id bigserial,
    created_ts timestamp without time zone not null default (now() at time zone 'utc'),
    client_id bigint not null,
    state_id bigint not null,
    summary text not null,
    description text,
    start_dt date,
    end_dt date,
    actual_start date,
    actual_end date,
    constraint pk_projects primary key (id),
    constraint fk_projects_1 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict,
    constraint fk_projects_2 foreign key (state_id) references work.project_states(id)
        on delete restrict on update restrict
);