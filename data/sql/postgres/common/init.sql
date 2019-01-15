set schema 'common';

\copy countries (name, alpha_2, alpha_3, code, iso_3166_2, region, sub_region, intermediate_region, region_code, sub_region_code, intermediate_region_code) from '../../csv/countries_iso_3166-1.csv' delimiter ',' csv header;