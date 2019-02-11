create or replace function role_add (
    p_client_id security.roles.client_id%type,
    p_name security.roles.name%type,
    p_description security.roles.description%type
)
returns security.roles.id%type
as $$
declare
    t_role_id security.roles.id%type;
begin
    insert into security.roles (
        client_id,
        name,
        description
    ) values (
        p_client_id,
        p_name,
        p_description
    )
    returning currval(pg_get_serial_sequence('security.roles', 'id')) into t_role_id;

    return t_role_id;
end;
$$
language plpgsql;