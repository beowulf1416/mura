create table if not exists employee_skills (
    created_ts timestamp without time zone not null default (now() at time zone 'utc'),
    client_id bigint not null,
    employee_id bigint not null,
    tag_id bigint not null,
    constraint pk_employee_skills primary key (client_id, employee_id, tag_id),
    constraint fk_employee_skills_1 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict,
    constraint fk_employee_skills_2 foreign key (employee_id) references hr.employees(id)
        on delete restrict on update restrict,
    constraint fk_employee_skills_3 foreign key (tag_id) references hr.tags_skills(id)
        on delete restrict on update restrict
);