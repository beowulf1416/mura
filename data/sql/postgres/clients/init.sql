set schema 'clients';
\echo '** CLIENTS **'

create or replace function init()
returns void
as $$
declare
    t_client_id clients.clients.id%type;
    t_user_id security.users.id%type;
begin
    select
        security.user_get_id('admin@admin.com')
        into
        t_user_id;

    select
        clients.client_add('default', 'default', 'default client')
        into
        t_client_id;
end;
$$
language plpgsql;

select init();
drop function init;

set schema 'public';