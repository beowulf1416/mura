create schema if not exists inventory;
set schema 'inventory';

/** tables **/
\ir tables/warehouses.sql
\ir tables/locations.sql

\ir tables/vendors.sql

\ir tables/items.sql
\ir tables/item_substitutes.sql
\ir tables/item_locations.sql
\ir tables/item_conversions.sql
\ir tables/item_vendors.sql


/** functions **/
\ir functions/item_add.sql