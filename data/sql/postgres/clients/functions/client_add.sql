create or replace function client_add (
    p_name clients.clients.name%type,
    p_description clients.clients.description%type
)
returns clients.clients.id%type
as $$
declare
    tmp clients.clients.id%type;
begin
    insert into clients.clients (
        name,
        description
    ) values (
        p_name,
        p_description
    )
    returning currval(pg_get_serial_sequence('clients.clients', 'id')) into tmp;

    return tmp;
end;
$$
language plpgsql;