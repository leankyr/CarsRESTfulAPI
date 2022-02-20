CREATE TABLE IF NOT EXISTS public.cars
(
    car_id integer NOT NULL DEFAULT nextval('cars_car_id_seq'::regclass),
    plate character varying(50) COLLATE pg_catalog."default" NOT NULL,
    color character varying(20) COLLATE pg_catalog."default" NOT NULL,
    created_on timestamp without time zone NOT NULL,
    CONSTRAINT cars_pkey PRIMARY KEY (car_id),
    CONSTRAINT cars_plate_key UNIQUE (plate)
    );

CREATE TABLE IF NOT EXISTS public.drivers
(
    driver_id integer NOT NULL DEFAULT nextval('drivers_driver_id_seq'::regclass),
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    created_on timestamp without time zone NOT NULL,
    car_id integer,
    CONSTRAINT drivers_pkey PRIMARY KEY (driver_id),
    CONSTRAINT drivers_car_id_fkey FOREIGN KEY (car_id)
    REFERENCES public.cars (car_id) MATCH SIMPLE
                         ON UPDATE NO ACTION
                         ON DELETE NO ACTION
    );
