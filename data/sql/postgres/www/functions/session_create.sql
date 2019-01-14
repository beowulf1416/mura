create or replace function session_create (
    p_session_id www.sessions.id%type
)
returns void
as $$
begin
    insert into www.sessions (
        id
    ) values (
        p_session_id
    );
end;
$$
language plpgsql;