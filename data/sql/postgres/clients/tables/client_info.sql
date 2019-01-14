create table if not exists client_info (
    client_id bigint not null,
    address text,
    city text,
    state text,
    zip text,
    country_id bigint,
    constraint pk_client_info primary key (client_id)
);