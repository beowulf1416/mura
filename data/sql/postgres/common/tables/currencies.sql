create table if not exists currencies (
    id bigserial,
    country varchar(100),
    country_code varchar(10),
    name text not null,
    code varchar(10),
    symbol varchar(10) not null,
    constraint pk_currencies primary key (id),
    constraint u_currencies_1 unique (name)
);