create or replace function add_permission_to_role (
    p_role_id security.role_permissions.role_id%type,
    p_permission_id security.role_permissions.permission_id%type
)
returns void
as $$
begin
    insert into security.role_permissions (
        role_id,
        permission_id
    ) values (
        p_role_id,
        p_permission_id
    );
end;
$$
language plpgsql;