set schema 'accounting';

create or replace function init ()
returns void
as $$
begin
end;
$$
lanuage plpgsql;

init();
drop function init;