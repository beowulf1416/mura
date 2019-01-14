create or replace function add_role_to_user (
    p_user_id security.user_roles.user_id%type,
    p_role_id security.user_roles.role_id%type
)
returns void
as $$
begin
    insert into security.user_roles (
        user_id,
        role_id
    ) values (
        p_user_id,
        p_role_id
    );
end;
$$
language plpgsql;