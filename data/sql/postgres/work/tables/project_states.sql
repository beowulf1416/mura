create table if not exists project_states (
    id bigint not null,
    name varchar(50),
    constraint pk_project_states primary key (id),
    constraint u_project_states_1 unique (name)
);