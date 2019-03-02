set schema 'security';
\echo '** SECURITY **'

\echo 'permissions';
\copy permissions (name,description) from '../../csv/permissions.csv' delimiter ',' csv header;

create or replace function init()
returns void
as $$
declare
    t_client_id clients.clients.id%type;
    t_user_id security.users.id%type;
    t_role_id security.roles.id%type;
    t_permission_id security.permissions.id%type;
begin
    select
        clients.client_get_id('default')
        into
        t_client_id;

    -- create admin role
    select
        security.role_add(t_client_id, 'admin', 'default administrative role')
        into
        t_role_id;

    -- add all permissions to admin role
    insert into security.role_permissions
    select t_role_id, p.id
    from security.permissions p;

    -- create admin user
    insert into security.users (
        active,
        verified_ts,
        email,
        password,
        last_signed_ts
    ) values (
        true,
        now(),
        'admin@admin.com',
        public.crypt('test1admin', public.gen_salt('md5')),
        now()
    )
    returning currval(pg_get_serial_sequence('security.users', 'id')) into t_user_id;

    perform security.add_role_to_user(t_user_id, t_role_id);
end;
$$
language plpgsql;

select init();
drop function init;

set schema 'public';