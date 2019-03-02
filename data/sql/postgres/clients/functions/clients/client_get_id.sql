create or replace function client_get_id (
    p_name clients.clients.name%type
)
returns clients.clients.id%type
as $$
declare
    t_client_id clients.clients.id%type;
begin
    select
        c.id
        into
        t_client_id
    from clients.clients c
    where c.name = p_Name;

    return t_client_id;
end;
$$
language plpgsql;