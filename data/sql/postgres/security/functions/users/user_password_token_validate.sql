create or replace function user_password_token_validate (
    p_token security.password_resets.token%type
)
returns security.users.email%type
as $$
declare
    t_email varchar(100);
begin
    select
        u.email into t_email
    from security.password_resets pr
        inner join security.users u on pr.user_id = u.id
    where pr.token = p_token;

    return t_email;
exception
    when no_data_found then
        return '';
end;
$$
language plpgsql;