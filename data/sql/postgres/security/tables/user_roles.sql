create table if not exists user_roles (
    user_id bigint not null,
    role_id bigint not null,
    constraint pk_user_roles primary key (user_id, role_id),
    constraint fk_user_roles_1 foreign key (user_id) references users(id) on delete restrict,
    constraint fk_user_roles_2 foreign key (role_id) references roles(id) on delete restrict
);