create or replace function item_set_expiry (
    p_client_id inventory.item_locations.client_id%type,
    p_item_id inventory.item_locations.item_id%type,
    p_location_id inventory.item_locations.location_id%type,
    p_expire_date inventory.item_locations.expiry%type
)
returns void
as $$
begin
    update inventory.item_locations set
        expiry = p_expire_date
    where client_id = p_client_id
        and item_id = p_item_id
        and location_id = p_location_id;
end;
$$
language plpgpsql;