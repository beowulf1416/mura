create or replace function verify_email (
    p_token security.email_verifications.token%type
)
returns boolean
as $$
declare
    t_user_id security.email_verifications.user_id%type;
    t_email varchar(100);
begin
    select
        ev.user_id,
        u.email
        into 
        t_user_id,
        t_email
    from security.email_verifications ev
        inner join security.users u on ev.user_id = u.id
    where ev.token = p_token;

    update security.users set
        verified_ts = now() at time zone 'utc',
        active = true
    where id = t_user_id;

    delete from security.email_verifications
    where token = p_token;

    return true;
exception
    when no_data_found then
        --raise exception 'Email address % not found', t_email; 
        return false;
end;
$$
language plpgsql;
