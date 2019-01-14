create schema www;
set schema 'www';

/** tables **/
\ir tables/sessions.sql
\ir tables/session_data.sql

/** functions **/
\ir functions/session_clear.sql
\ir functions/session_create.sql
\ir functions/session_set.sql
\ir functions/session_get.sql