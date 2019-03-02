create or replace function clients_list (
    p_items int,
    p_offset int
)
returns table (
    client_id clients.clients.id%type,
    active clients.clients.active%type,
    created_ts clients.clients.created_ts%type,
    name clients.clients.name%type,
    public_name clients.clients.public_name%type,
    description clients.clients.description%type
)
as $$
begin
    return query execute format(
        'select
            c.id,
            c.active,
            c.created_ts,
            c.name,
            c.public_name,
            c.description
         from clients.clients c
         limit $1
         offset $2
        '
    )
    using p_items, p_offset;
end;
$$
language plpgsql;