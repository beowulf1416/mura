create or replace function clients_list (
    p_items int,
    p_offset int,
    p_filter text[]
)
returns table (
    client_id clients.clients.id%type,
    active clients.clients.active%type,
    created_ts clients.clients.created_ts%type,
    name clients.clients.name%type,
    description clients.clients.description%type
)
as $$
declare
    t_sql text;
begin
    t_sql := '

    ';

    return query execute format(
        'select
         from clients.clients c
         limit $1
         offset $2
        '
    )
    using p_items, p_offset;
end;
$$
language plpgsql;