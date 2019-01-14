create table if not exists sessions (
    id varchar(100) not null,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    constraint pk_sessions primary key (id)
);