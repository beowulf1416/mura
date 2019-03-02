create or replace function organization_set_parent (
    p_client_id clients.org_tree.client_id%type,
    p_org_id clients.org_tree.org_id%type,
    p_parent_org_id clients.org_tree.parent_org_id%type
)
returns void
as $$
begin
    insert into clients.org_tree (
        client_id,
        org_id,
        parent_org_id
    ) values (
        p_client_id,
        p_org_id,
        p_parent_org_id
    );
end
$$
language plpgsql;