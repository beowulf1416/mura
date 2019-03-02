create table if not exists employee_dependents (
    created_ts timestamp without time zone not null default (now() at time zone 'utc'),
    employee_id bigint not null,
    relationship_id bigint not null,
    first_name varchar(100) not null,
    middle_name varchar(100),
    last_name varchar(100) not null,
    constraint fk_employee_dependents_1 foreign key (employee_id) references hr.employees(id)
        on delete restrict on update restrict,
    constraint fk_employee_dependents_2 foreign key (relationship_id) references hr.relationships(id)
        on delete restrict on update restrict
);