CREATE TABLE IF NOT EXISTS public.cars
(
    car_id integer NOT NULL DEFAULT nextval('cars_car_id_seq'::regclass),
    plate character varying(50) COLLATE pg_catalog."default" NOT NULL,
    color character varying(20) COLLATE pg_catalog."default" NOT NULL,
    created_on timestamp without time zone NOT NULL,
    CONSTRAINT cars_pkey PRIMARY KEY (car_id),
    CONSTRAINT cars_plate_key UNIQUE (plate)
    );