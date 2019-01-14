create or replace function user_password_reset (
    p_token security.password_resets.token%type,
    p_password security.users.password%type
)
returns void
as $$
declare
    t_user_id security.password_resets.user_id%type;
begin
    select
        pr.user_id into t_user_id
    from security.password_resets pr
    where pr.token = p_token;

    update security.users set
        password = public.crypt(p_password, public.gen_salt('md5'))
    where id = t_user_id;

    delete from security.password_resets pr
    where pr.token = p_token;
exception
    when no_data_found then
        raise exception 'Password reset token is not valid';
end;
$$
language plpgsql;