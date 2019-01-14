create or replace function user_has_permission (
    p_session_id www.sessions.id%type,
    p_permission_name security.permissions.name%type
)
returns boolean
as $$
declare
    t_count int;
begin
    select
        count(*) into t_count
    from www.session_data sd
        inner join security.users u on u.id = cast(sd.value as integer)
        inner join security.user_roles ur on ur.user_id = u.id
        inner join security.role_permissions rp on rp.role_id = ur.role_id
        inner join security.permissions p on p.id = rp.permission_id
    where p.name = p_permission_name
    limit 1;

    return t_count > 0;
end;
$$
language plpgsql;