create or replace function clients_list_public (
)
returns table (
    client_id clients.clients.id%type,
    active clients.clients.active%type,
    created_ts clients.clients.created_ts%type,
    name clients.clients.name%type, 
    description clients.clients.description%type
)
as $$
begin
    return query
    select
        c.id,
        c.public_name
    from clients.clients c
    where c.active = true;
end;
$$
language plpgsql;