create table if not exists session_data (
    session_id varchar(100) not null,
    name varchar(100) not null,
    value text not null,
    constraint pk_session_data primary key (session_id, name),
    constraint fk_session_data foreign key (session_id) references www.sessions(id) on delete restrict
);