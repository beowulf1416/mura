create or replace function session_get (
    p_session_id www.session_data.session_id%type,
    p_name www.session_data.name%type
)
returns www.session_data.value%type
as $$
declare
    t_value www.session_data.value%type;
begin
    select
        sd.value into t_value
    from www.session_data sd
    where sd.session_id = p_session_id
        and sd.name = p_name;

    return t_value;
end;
$$
language plpgsql;