create table if not exists org_members (
    id bigserial,
    created_ts timestamp without time zone default (now() at time zone 'utc'),
    client_id bigint not null,
    org_id bigint not null,
    employee_id bigint not null,
    constraint pk_org_members primary key (id),
    constraint u_org_members_1 unique (client_id, org_id, employee_id),
    constraint fk_org_members_1 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict,
    constraint fk_org_members_2 foreign key (org_id) references clients.organizations(id)
        on delete restrict on update restrict,
    constraint fk_org_members_3 foreign key (employee_id) references hr.employees(id)
        on delete restrict on update restrict
);