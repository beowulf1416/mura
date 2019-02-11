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

    -- role
    select
        security.role_add(t_client_id, 'admin', 'default administrative role')
        into
        t_role_id;

    -- users
    select
        security.permission_add('user.authenticated', 'user is authenticated')
        into
        t_permission_id;
    perform security.add_permission_to_role(t_role_id, t_permission_id);

    select
        security.permission_add('user.dashboard', 'allow user to view dashboard')
        into
        t_permission_id;
    perform security.add_permission_to_role(t_role_id, t_permission_id);

    -- admin
    select
        security.permission_add('admin.dashboard', 'allow user to view admin dashboard')
        into
        t_permission_id;
    perform security.add_permission_to_role(t_role_id, t_permission_id);

    select
        security.permission_add('admin.clients', 'allow user to view admin clients dashboard')
        into
        t_permission_id;
    perform security.add_permission_to_role(t_role_id, t_permission_id);


    -- security
    select
        security.permission_add('security.users.list', 'allow user to view list of users')
        into
        t_permission_id;
    perform security.add_permission_to_role(t_role_id, t_permission_id);

    select
        security.permission_add('security.user.info', 'allow user to view user details')
        into
        t_permission_id;
    perform security.add_permission_to_role(t_role_id, t_permission_id);


    -- clients
    select
        security.permission_add('clients.list', 'allow user to get a list of clients')
        into
        t_permission_id;
    perform security.add_permission_to_role(t_role_id, t_permission_id);

    select
        security.permission_add('clients.add', 'allow user to add client record')
        into
        t_permission_id;
    perform security.add_permission_to_role(t_role_id, t_permission_id);

    -- inventory
    select
        security.permission_add('inventory.dashboard', 'allow user to view inventory dashboard')
        into
        t_permission_id;
    perform security.add_permission_to_role(t_role_id, t_permission_id);


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