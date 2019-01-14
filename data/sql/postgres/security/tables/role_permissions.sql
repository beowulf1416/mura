create table if not exists role_permissions (
    role_id bigint not null,
    permission_id bigint not null,
    constraint pk_role_permissions primary key (role_id, permission_id),
    constraint fk_role_permissions_1 foreign key (role_id) references roles(id) on delete restrict,
    constraint fk_role_permissions_2 foreign key (permission_id) references permissions(id) on delete restrict
);