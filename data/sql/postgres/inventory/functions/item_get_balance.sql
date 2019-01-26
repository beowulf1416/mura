create or replace function item_get_balance (
    p_item_id inventory.items.id%type
)
returns table (
    uom_id inventory.item_locations.uom_id%type,
    quantity inventory.item_locations.quantity%type
)
as $$
begin
    return query
    select
        
    from inventory.item_locations il
    where il.item_id = p_item_id;
end;
$$
language plpgsql;