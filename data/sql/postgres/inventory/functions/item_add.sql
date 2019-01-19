create or replace function item_add (
    p_client_id inventory.items.client_id%type,
    p_name inventory.items.name%type,
    p_sku inventory.items.sku%type,
    p_upc_ean inventory.items.upc_ean%type,
    p_manufacturer inventory.items.manufacturer%type,
    p_model inventory.items.model%type,
    p_version inventory.items.version%type,
    p_perishable inventory.items.perishable%type
)
returns inventory.items.id%type
as $$
declare
    t_item_id bigint;
begin
    insert into inventory.items (
        client_id,
        name,
        sku,
        upc_ean,
        manufacturer,
        model,
        version,
        perishable
    ) values (
        p_client_id,
        p_name,
        p_sku,
        p_upc_ean,
        p_manufacturer,
        p_model,
        p_version,
        p_perishable
    )
    returning currval(pg_get_serial_sequence('inventory.items', 'id')) into t_item_id;

    return t_item_id;
end;
$$
language plpgsql;