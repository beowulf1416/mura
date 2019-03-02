create table if not exists genders (
    id bigint not null,
    name varchar(100) not null,
    constraint pk_genders primary key (id),
    constraint u_genders_1 unique (name)
);