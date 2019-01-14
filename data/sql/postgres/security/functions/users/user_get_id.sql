create or replace function user_get_id (
    p_email security.users.email%type
)
returns security.users.id%type
as $$
declare
    t_user_id security.users.id%type;
begin
    select
        u.id into t_user_id
    from security.users u
    where u.email = p_email;

    return t_user_id;
end;
$$
language plpgsql;