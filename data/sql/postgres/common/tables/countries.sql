create table if not exists countries (
    id bigserial,
    name text,
    full_name text,
    local_name text,
    alpha_2 varchar(2),
    alpha_3 varchar(3),
    numeric int,
    remarks text,
    is_independent boolean,
    language_alpha_2 varchar(2),
    language_alpha_3 varchar(3),
    constraint pk_countries primary key (id)
);