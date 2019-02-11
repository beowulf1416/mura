create or replace function user_client_list ()
returns table (
    id clients.clients.id%type,
    name clients.clients.name%type
)
as $$
begin
    return query
    select
        c.id,
        c.name
    from clients.clients c
    order by c.name;
end;
$$
language plpgsql;