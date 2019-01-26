create or replace function user_list (
    p_items int,
    p_offset int
)
returns table (
    id security.users.id%type,
    active security.users.active%type,
    created security.users.created_ts%type,
    verified security.users.verified_ts%type,
    email security.users.email%type,
    last_signed security.users.last_signed_ts%type
)
as $$
begin
    return query execute format('
        select
            u.id,
            u.active,
            u.created_ts,
            u.verified_ts,
            u.email,
            u.last_signed_ts
        from security.users u
        order by u.id
        limit $1
        offset $2
    ')
    using p_items, p_offset;
end;
$$
language plpgsql;