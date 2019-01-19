create or replace function item_receive (
    p_client inventory.item_locations.client_id%type,
    p_item_id inventory.item_locations.item_id%type,
    p_location_id inventory.item_locations.location_id%type,
    p_uom_id inventory.item_locations.uom_id%type,
    p_quantity inventory.item_locations.quantity%type
)
returns void
as $$
begin
    insert into inventory.item_locations (
        client_id,
        item_id,
        location_id,
        uom_id,
        quantity
    ) values (
        p_client_id,
        p_item_id,
        p_location_id,
        p_uom_id,
        p_quantity
    );
end;
$$
language plpgsql;