create table if not exists dimensions (
    id int not null,
    name varchar(10) not null,
    constraint pk_dimensions primary key (id),
    constraint u_dimensions_1 unique (name)
);