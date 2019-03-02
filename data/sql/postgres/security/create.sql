create schema if not exists security;
set schema 'security';

/* tables */

\ir tables/users.sql
\ir tables/permissions.sql
\ir tables/roles.sql

\ir tables/email_verifications.sql
\ir tables/password_resets.sql

\ir tables/role_permissions.sql
\ir tables/user_roles.sql

-- user client management
\ir tables/user_clients.sql



/* functions */

-- user account management
\ir functions/users/user_register.sql
\ir functions/users/verify_email.sql
\ir functions/users/user_authenticate.sql
\ir functions/users/user_get_id.sql
\ir functions/users/user_has_permission.sql
\ir functions/users/user_get_permissions.sql

\ir functions/users/user_list.sql
\ir functions/users/user_info.sql
\ir functions/users/user_client_list.sql

-- password management
\ir functions/users/user_password_request.sql
\ir functions/users/user_password_token_validate.sql
\ir functions/users/user_password_reset.sql

-- permissions management
\ir functions/permissions/permission_add.sql
\ir functions/permissions/add_permission_to_role.sql

-- role management
\ir functions/roles/role_add.sql
\ir functions/roles/add_role_to_user.sql
\ir functions/roles/role_list.sql


set schema 'public';