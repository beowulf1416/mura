create schema if not exists clients;
set schema 'clients';


/** tables **/

\ir tables/clients.sql
\ir tables/client_info.sql

/** functions **/

\ir functions/client_add.sql
\ir functions/clients_list.sql
\ir functions/client_get.sql
