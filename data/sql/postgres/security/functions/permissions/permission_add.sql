create or replace function permission_add (
    p_name security.permissions.name%type,
    p_description security.permissions.description%type
)
returns security.permissions.id%type
as $$
declare
    t_permission_id security.permissions.id%type;
begin
    insert into security.permissions (
        name,
        description
    ) values (
        p_name,
        p_description
    )
    returning currval(pg_get_serial_sequence('security.permissions', 'id')) into t_permission_id;

    return t_permission_id;
end;
$$
language plpgsql;