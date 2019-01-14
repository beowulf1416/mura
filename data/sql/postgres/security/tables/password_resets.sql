create table if not exists password_resets (
    user_id bigint not null,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    token text not null,
    constraint pk_password_resets primary key (user_id),
    constraint u_password_resets unique (token),
    constraint fk_password_resets foreign key (user_id) references users(id) on delete restrict on update restrict
);