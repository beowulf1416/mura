create table if not exists relationships (
    id bigint not null,
    name varchar(100),
    constraint pk_relationships primary key (id),
    constraint u_relationships_1 unique (name)
);