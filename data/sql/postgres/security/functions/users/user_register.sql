create or replace function user_register (
    p_email security.users.email%type,
    p_pw security.users.password%type
)
returns security.email_verifications.token%type
as $$
declare
    t_user_id security.users.id%type;
    t_token security.email_verifications.token%type;
begin
    insert into security.users (
        email,
        password
    ) values (
        p_email,
        public.crypt(p_pw, public.gen_salt('md5'))
    )
    returning currval(pg_get_serial_sequence('security.users', 'id')) into t_user_id;

    -- generate url safe 10 character token
    t_token := encode(public.gen_random_bytes(10), 'base64');
    t_token := replace(t_token, '/', '_');
    t_token := replace(t_token, '+', '-');

    -- replace trailing '==' characters
    t_token := replace(t_token, '==', '');

    insert into security.email_verifications (
        user_id,
        token
    ) values (
        t_user_id,
        t_token
    );

    return t_token;
exception
    when unique_violation then
        raise exception 'Email address % already exists', p_email;
end;
$$
language plpgsql;
