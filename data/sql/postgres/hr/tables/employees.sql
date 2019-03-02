create table if not exists employees (
    id bigserial,
    active boolean not null default true,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id bigint not null,
    first_name varchar(100) not null,
    middle_name varchar(100),
    last_name varchar(100) not null,
    job_title varchar(100) not null,
    gender_id bigint,
    constraint pk_employees primary key (id),
    constraint u_employees_1 unique (client_id, first_name, middle_name, last_name),
    constraint fk_employees_1 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict
);