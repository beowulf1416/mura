create table if not exists countries (
    name text not null,
    alpha_2 varchar(2),
    alpha_3 varchar(3),
    code varchar(3) not null,
    iso_3166_2 varchar(20),
    region varchar(20),
    sub_region varchar(50),
    intermediate_region varchar(50),
    region_code varchar(3),
    sub_region_code varchar(3),
    intermediate_region_code varchar(3),
    constraint pk_countries primary key (code),
    constraint u_countries_1 unique (alpha_2),
    constraint u_countries_2 unique (alpha_3),
    constraint u_countries_3 unique (code),
    constraint u_countries_4 unique (iso_3166_2)
);