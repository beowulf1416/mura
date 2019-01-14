create or replace function session_clear (
    p_session_id www.sessions.id%type
)
returns void
as $$
begin
    delete from www.session_data
    where session_id = p_session_id;
    
    delete from www.sessions
    where id = p_session_id;
end;
$$
language plpgsql;