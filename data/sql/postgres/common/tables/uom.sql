create table if not exists uom (
    id bigserial,
    dimension_id int not null,
    name varchar(100) not null,
    symbol varchar(10),
    constraint pk_uom primary key (id),
    constraint u_uom_1 unique (dimension_id, name),
    constraint fk_uom_1 foreign key (dimension_id) references common.dimensions(id)
        on delete restrict on update restrict
);