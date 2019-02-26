create schema if not exists clients;
set schema 'clients';


/** tables **/

\ir tables/clients.sql
\ir tables/client_info.sql

\ir tables/organizations.sql
\ir tables/org_tree.sql


/** functions **/

\ir functions/client_add.sql
\ir functions/clients_list.sql
\ir functions/clients_list_public.sql
\ir functions/client_get.sql
\ir functions/client_get_id.sql
