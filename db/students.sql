-- -- Creacion de la BBDD
-- CREATE DATABASE students;

-- --Creación de la tabla estudiantesselect * from estudiantes

-- drop table estudiantes

-- CREATE TABLE estudiantes (
--     id SERIAL PRIMARY KEY,
--     nombre VARCHAR(100) NOT NULL,
--     rut VARCHAR(12) NOT NULL UNIQUE,
--     curso VARCHAR(50) NOT NULL,
--     nivel VARCHAR(50)
-- );
-- insert into estudiantes(nombre, rut, curso, nivel) values('Brian May', '10.100.100-1', 'Java', 'Basico');
-- insert into estudiantes(nombre, rut, curso, nivel) values('John Doe', '10.100.100-2', 'Java', 'Basico');
------------------------
CREATE TABLE agendamiento (
    id SERIAL PRIMARY KEY,
    rut_paciente VARCHAR(10),
    nombre_paciente VARCHAR(255),
    especialidad_medica VARCHAR(255),
    nombre_medico VARCHAR(255),
    fecha_hora TIMESTAMP
);

CREATE TABLE cola_correo (
    id SERIAL PRIMARY KEY,
    id_agendamiento INTEGER,
    correo_paciente VARCHAR(255),
    fecha_insercion TIMESTAMP,
    FOREIGN KEY (id_agendamiento) REFERENCES agendamiento(id)
);
