create table if not exists client_info (
    client_id bigint not null,
    address text,
    city text,
    state text,
    zip text,
    country_id varchar(3),
    constraint pk_client_info primary key (client_id),
    constraint fk_client_info_1 foreign key (country_id) references common.countries(code) 
        on delete restrict on update restrict
);