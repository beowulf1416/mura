create table if not exists email_verifications (
    user_id bigint not null,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    token text not null,
    constraint pk_email_verifications primary key (user_id),
    constraint u_email_verifications_1 unique (token),
    constraint fk_email_verifications_1 foreign key (user_id) references users(id) on delete restrict on update restrict
);