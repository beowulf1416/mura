create or replace function role_list (
    p_items int,
    p_offset int
)
returns table (
    id security.roles.id%type,
    active security.roles.active%type,
    created security.roles.created_ts%type,
    name security.roles.name%type,
    description security.roles.description%type
)
as $$
begin
    return query execute format('
        select
            r.id,
            r.active,
            r.created_ts,
            r.name,
            r.description
        from security.roles r
        order by r.id
        limit $1
        offset $2
    ')
    using p_items, p_offset;
end;
$$
language plpgsql;