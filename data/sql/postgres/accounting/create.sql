create schema if not exists accounting;
set schema 'accounting';


/** tables **/
\ir tables/account_types.sql
\ir tables/accounts.sql
\ir tables/account_balances.sql

\ir tables/transactions.sql
\ir tables/transaction_details.sql


/** functions **/
\ir functions/account_add.sql