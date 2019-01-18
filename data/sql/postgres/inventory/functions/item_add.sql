create or replace function item_add (
    p_client_id inventory.items.client_id%type,
    p_name inventory.items.name%type
)
returns inventory.items.id%type
as $$
declare
    t_item_id bigint;
begin
    insert into inventory.items (
        client_id,
        name
    ) values (
        p_client_id,
        p_name
    )
    returning currval(pg_get_serial_sequence('inventory.items', 'id')) into t_item_id;

    return t_item_id;
end;
$$
language plpgsql;