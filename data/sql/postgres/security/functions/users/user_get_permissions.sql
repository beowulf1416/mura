create or replace function user_get_permissions (
    p_user_id security.users.id%type,
    p_client_id clients.clients.id%type
)
returns table (
    name security.permissions.name%type
)
as $$
/* declare
    t_client_id www.session_data.value%type;
    t_user_id www.session_data.value%type; */
begin
    /* select
        sd.value into t_client_id
    from www.session_data sd
    where sd.session_id = p_session_id
        and sd.name = 'client_id';

    select
        sd.value into t_user_id
    from www.session_data sd
    where sd.session_id = p_session_id
        and sd.name = 'user_id'; */

    return query select
        distinct p.name
    from security.permissions p
        inner join security.role_permissions rp on p.id = rp.permission_id
        inner join security.user_roles ur on rp.role_id = ur.role_id
        inner join security.roles r on ur.role_id = r.id
    where
        p.active = true
        and r.active = true
        and r.client_id = p_client_id
        and ur.user_id = p_user_id;
end;
$$
language plpgsql;