create or replace function user_info (
    p_user_id security.users.id%type
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
    select
        u.id,
        u.active,
        u.created_ts,
        u.verified_ts,
        u.email,
        u.last_signed_ts
    from security.users u
    where u.id = p_user_id;
end;
$$
language plpgsql;