create table if not exists currencies (
    id bigserial,
    name text not null,
    symbol varchar(10) not null,
    constraint pk_currencies primary key (id),
    constraint u_currencies_1 unique (name)
);