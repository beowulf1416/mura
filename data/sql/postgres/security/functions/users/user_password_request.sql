create or replace function user_password_request (
    p_email security.users.email%type
)
returns security.password_resets.token%type
as $$
declare
    t_user_id security.password_resets.user_id%type;
    t_token security.password_resets.token%type;
begin
    select
        u.id into t_user_id
    from security.users u
    where u.email = p_email;

    -- generate url safe 10 character token
    t_token := encode(public.gen_random_bytes(10), 'base64');
    t_token := replace(t_token, '/', '_');
    t_token := replace(t_token, '+', '-');

    -- replace trailing '==' characters
    t_token := replace(t_token, '==', '');

    insert into security.password_resets (
        user_id,
        token
    ) values (
        t_user_id,
        t_token
    );

    return t_token;
exception
    when unique_violation then
        update security.password_resets set
            token = t_token
        where user_id = t_user_id;
        return t_token;
end;
$$
language plpgsql;