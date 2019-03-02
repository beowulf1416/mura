set schema 'hr';
\echo '** HR **'

\echo 'hr.relationships';
\copy relationships (id, name) from '../../csv/relationships.csv' delimiter ',' csv header;

\echo "hr.org_member_types"
insert into hr.org_member_types (id,name) values 
(1,'member'),
(2,'supervisor');

set schema 'public';