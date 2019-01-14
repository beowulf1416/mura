create or replace function user_authenticate (
    p_email security.users.email%type,
    p_pw security.users.password%type
)
returns boolean
as $$
declare
    authentic boolean;
begin
    select
        u.password = public.crypt(p_pw, u.password)
        into
        authentic
    from security.users u
    where u.email = p_email
        and u.active = true;

    if authentic then
        update security.users set
            last_signed_ts = now()
        where email = p_email;
    end if;

    return authentic;
end;
$$
language plpgsql;