/**
 * enable pgcrypto extension
 * NOTE** should be run as database administrator
 */
set schema 'public';
create extension pgcrypto;


-- http://www.regular-expressions.info/email.html
create domain email_address
  text not null
  constraint chk_email
  check(
    length(value) < 254
    and
    value ~ '^[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,125}[a-zA-Z]{2,63}$'
);


\ir common/create.sql
\ir www/create.sql
\ir security/create.sql
\ir clients/create.sql
\ir inventory/create.sql


set schema 'public';
