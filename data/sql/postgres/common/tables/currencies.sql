create table if not exists currencies (
    id bigserial,
    country varchar(100),
    country_code varchar(10),
    name text not null,
    code varchar(10),
    minor_unit varchar(10),
    symbol varchar(10),
    constraint pk_currencies primary key (id)
);