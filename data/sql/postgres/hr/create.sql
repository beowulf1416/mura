create schema if not exists hr;
set schema 'hr';

/** tables **/
\ir tables/relationships.sql
\ir tables/org_member_types.sql

\ir tables/employees.sql

\ir tables/org_members.sql

\ir tables/tags_skills.sql
\ir tables/employee_skills.sql


/** functions **/



set schema 'public';