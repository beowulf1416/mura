create or replace function item_withdraw (
    p_client inventory.item_locations.client_id%type,
    p_item_id inventory.item_locations.item_id%type,
    p_location_id inventory.item_locations.location_id%type,
    p_uom_id inventory.item_locations.uom_id%type,
    p_quantity inventory.item_locations.quantity%type
)
returns void
as $$
begin
    update inventory.item_locations set
        quantity = quantity - p_quantity
    where client_id = p_client_id
        and item_id = p_item_id
        and location_id = p_location_id
        and uom_id = p_uom_id;
end;
$$
language plpgsql;