set schema 'common';

\copy countries (name, alpha_2, alpha_3, code, iso_3166_2, region, sub_region, intermediate_region, region_code, sub_region_code, intermediate_region_code) from '../../csv/countries_iso_3166-1.csv' delimiter ',' csv header;

insert into dimensions (id, name) values 
(0, 'count'),
(1, 'distance'),
(2, 'area'),
(3, 'volume'),
(4, 'mass');

\copy units (name, symbol) from '../../csv/units_of_measure.csv' delimiter ',' csv header;