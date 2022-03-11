#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  BEGIN;
   CREATE TABLE IF NOT EXISTS public.cars
   (
       car_id serial PRIMARY KEY NOT NULL,
       plate character varying(50) COLLATE pg_catalog."default" NOT NULL,
       color character varying(20) COLLATE pg_catalog."default" NOT NULL,
       created_on timestamp without time zone,
       CONSTRAINT cars_plate_key UNIQUE (plate)
   );

   CREATE TABLE IF NOT EXISTS public.drivers
   (
       driver_id serial PRIMARY KEY NOT NULL,
       first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
       last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
       created_on timestamp without time zone,
       car_id integer,
       CONSTRAINT drivers_car_id_fkey FOREIGN KEY (car_id)
       REFERENCES public.cars (car_id) MATCH SIMPLE
                            ON UPDATE NO ACTION
                            ON DELETE NO ACTION
       );

        CREATE OR REPLACE FUNCTION add_date_cars() RETURNS TRIGGER AS \$BODY\$
        	BEGIN
        		UPDATE public.cars
        			SET created_on = current_timestamp
        		WHERE created_on IS NULL;
        		RETURN NULL;
        	END;
        \$BODY\$ LANGUAGE plpgsql;

        CREATE TRIGGER add_date_cars
        AFTER INSERT ON cars
        FOR EACH STATEMENT EXECUTE PROCEDURE add_date_cars();

        CREATE OR REPLACE FUNCTION add_date_drivers() RETURNS TRIGGER AS
        \$BODY\$
        	BEGIN
        		UPDATE public.drivers
        			SET created_on = current_timestamp
        		WHERE created_on IS NULL;
        		RETURN NULL;
        	END;
        \$BODY\$ LANGUAGE plpgsql;

        CREATE TRIGGER add_date_drivers
        AFTER INSERT ON drivers
        FOR EACH STATEMENT EXECUTE PROCEDURE add_date_drivers();

  COMMIT;
EOSQL