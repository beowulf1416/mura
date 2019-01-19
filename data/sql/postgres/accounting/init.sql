set schema 'accounting';

insert into accounting.account_types (id, name) values 
(1,'asset'),
(2,'liability'),
(3,'expense'),
(4,'equity'),
(5,'')


create or replace function init ()
returns void
as $$
begin
end;
$$
lanuage plpgsql;

init();
drop function init;