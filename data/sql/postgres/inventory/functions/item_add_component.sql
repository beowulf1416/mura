create or replace function item_add_component (
    p_item_id inventory.item_components.item_id%type,
    p_component_id inventory.item_components.component_id%type,
    p_uom_id inventory.item_components.uom_id%type,
    p_quantity inventory.item_components.quantity%type
)
returns void
as $$
begin
    insert into inventory.item_components (
        item_id,
        component_id,
        uom_id,
        quantity
    ) values (
        p_item_id,
        p_component_id,
        p_uom_id,
        p_quantity
    );
end;
$$
language plpgsql;