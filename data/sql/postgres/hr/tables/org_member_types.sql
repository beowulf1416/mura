create table if not exists org_member_types (
    id bigint not null,
    name varchar(100) not null,
    constraint pk_org_member_types primary key (id),
    constraint u_org_member_types unique (name)
);