create schema if not exists inventory;
set schema 'inventory';

/** tables **/
\ir tables/warehouses.sql
\ir tables/locations.sql

\ir tables/vendors.sqlw

\ir tables/items.sql
\ir tables/item_components.sql
\ir tables/item_substitutes.sql
\ir tables/item_locations.sql
\ir tables/item_conversions.sql
\ir tables/item_vendors.sql


/** functions **/
\ir functions/item_add.sql
\ir functions/item_add_component.sql
\ir functions/item_get_balance.sql
\ir functions/item_receive.sql
\ir functions/item_withdraw.sql
\ir functions/item_set_expiry.sql
