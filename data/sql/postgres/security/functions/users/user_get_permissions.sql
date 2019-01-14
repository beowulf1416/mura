create or replace function user_get_permissions (
    p_user_id security.users.id%type
)
returns table (
    name security.permissions.name%type
)
as $$
begin
    return query select
        distinct p.name
    from security.permissions p
        inner join security.role_permissions rp on p.id = rp.permission_id
        inner join security.user_roles ur on rp.role_id = ur.role_id
        inner join security.roles r on ur.role_id = r.id
    where
        p.active = true
        and r.active = true
        and ur.user_id = p_user_id;
end;
$$
language plpgsql;