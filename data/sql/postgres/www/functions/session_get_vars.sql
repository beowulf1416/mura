create or replace function session_get_vars (
    p_session_id www.session_data.session_id%type
)
returns table (
    name www.session_data.name%type,
    value www.session_data.value%type
)
as $$
begin
    return query
    select
        sd.name,
        sd.value
    from www.session_data sd
    where sd.session_id = p_session_id;
end
$$
language plpgsql;