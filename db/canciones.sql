CREATE TABLE canciones (id SERIAL, titulo VARCHAR(50), artista 
VARCHAR(50), tono VARCHAR(10)); 
select * from canciones;
insert into canciones(titulo, artista, tono) values('Brian May', 'Java', 'Basico');