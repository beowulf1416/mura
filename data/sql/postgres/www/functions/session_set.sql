create or replace function session_set (
    p_session_id www.session_data.session_id%type,
    p_name www.session_data.name%type,
    p_value www.session_data.value%type
)
returns void
as $$
begin
    insert into www.session_data (
        session_id,
        name,
        value
    ) values (
        p_session_id,
        p_name,
        p_value
    )
    on conflict (session_id, name)
    do update set
        value = p_value;
end;
$$
language plpgsql;