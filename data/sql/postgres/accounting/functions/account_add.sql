create or replace function account_add (
    p_client_id accounting.accounts.client_id%type,
    p_name accounting.accounts.name%type,
    p_description accounting.accounts.description%type
)
returns accounting.accounts.id%type
as $$
declare
    t_acct_id bigint;
begin
    insert into accounting.accounts (
        client_id,
        name,
        description
    ) values (
        p_client_id,
        p_name,
        p_description
    )
    returning currval(pg_get_serial_sequence('accounting.accounts', 'id')) into t_acct_id;

    insert into accounting.balances (
        account_id,
        balance
    ) values (
        t_acct_id,
        0
    );

    return t_acct_id;
end
$$
language plpgsql;