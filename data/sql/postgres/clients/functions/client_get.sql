create or replace function client_get (
    p_id clients.clients.id%type
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
        c.active,
        c.created_ts,
        c.name,
        c.description
    from clients.clients c
    where c.id = p_id;
end;
$$
language plpgsql;