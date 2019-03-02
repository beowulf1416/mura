create schema if not exists clients;
set schema 'clients';


/** tables **/

\ir tables/clients.sql
\ir tables/client_info.sql

\ir tables/organizations.sql
\ir tables/org_tree.sql


/** functions **/
-- clients
\ir functions/clients/client_add.sql
\ir functions/clients/clients_list.sql
\ir functions/clients/clients_list_public.sql
\ir functions/clients/client_get.sql
\ir functions/clients/client_get_id.sql
-- organizations
\ir functions/organizations/organization_add.sql
\ir functions/organizations/organization_set_parent.sql
