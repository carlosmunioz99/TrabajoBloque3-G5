DROP DATABASE IF EXISTS postit;
CREATE DATABASE postit;
USE postit;

CREATE TABLE usuarios(
    username VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(50),
    email VARCHAR(50),
    contraseña VARCHAR(15)
);

CREATE TABLE grupos(
    nombreGrupo VARCHAR(50) PRIMARY KEY
);

CREATE TABLE usu_grupo(
    username VARCHAR(20),
    nombreGrupo VARCHAR(50),
    CONSTRAINT username_fk2 FOREIGN KEY (username) REFERENCES usuarios(username),
    CONSTRAINT nombreGrupo_fk2 FOREIGN KEY (nombreGrupo) REFERENCES grupos(nombreGrupo)

);

CREATE TABLE notas(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50),
    contenido VARCHAR(500),
    tipo enum('u', 'm', 'b'),
    compartida enum('s', 'n'),
    username VARCHAR(20),
    nombreGrupo VARCHAR(50),
    CONSTRAINT username_fk FOREIGN KEY (username) REFERENCES usuarios(username),
    CONSTRAINT nombreGrupo_fk FOREIGN KEY (nombreGrupo) REFERENCES grupos(nombreGrupo)
);


INSERT INTO usuarios(username, nombre, email, contraseña) VALUES ("carlos_munioz", "Carlos Muñoz", "carlos@correo.com", "1234");
INSERT INTO usuarios(username, nombre, email, contraseña) VALUES ("daniel_correa", "Daniel Correa", "daniel@correo.com", "1234");
INSERT INTO usuarios(username, nombre, email, contraseña) VALUES ("adrian_sanchez", "Adrian Sanchez", "adrian@correo.com", "1234");
INSERT INTO usuarios(username, nombre, email, contraseña) VALUES ("bruno_rguez", "Bruno Rodriguez", "bruno@correo.com", "1234");

INSERT INTO grupos(nombreGrupo) VALUES ("GrupoBloque1");
INSERT INTO grupos(nombreGrupo) VALUES ("GrupoBloque2");
INSERT INTO grupos(nombreGrupo) VALUES ("GrupoBloque3");
INSERT INTO grupos(nombreGrupo) VALUES ("GrupoTrabajoFinal");


INSERT INTO notas(titulo, contenido, tipo, compartida, username, nombreGrupo) VALUES ("Nota Carlos", "Esta es la nota de Carlos, la mas potente", "u", "n", "carlos_munioz", NULL);
INSERT INTO notas(titulo, contenido, tipo, compartida, username, nombreGrupo) VALUES ("Nota Daniel", "Esta es la nota de Daniel Correa", "b", "n", "daniel_correa", NULL);
INSERT INTO notas(titulo, contenido, tipo, compartida, username, nombreGrupo) VALUES ("Nota Bruno", "Esta es la nota de Bruno, la mas potente", "b", "n", "bruno_rguez", NULL);
INSERT INTO notas(titulo, contenido, tipo, compartida, username, nombreGrupo) VALUES ("Nota Adrian", "Esta es la nota de Adrian", "m", "n", "adrian_sanchez", NULL);


INSERT INTO notas(titulo, contenido, tipo, compartida, username, nombreGrupo) VALUES ("Nota GrupoBloque1", "Apuntes para el trabajo de la DGT", "m", "s", NULL, "GrupoBloque1");
INSERT INTO notas(titulo, contenido, tipo, compartida, username, nombreGrupo) VALUES ("Nota GrupoBloque2", "Apuntes para el trabajo del 7 de Febrero", "u", "s", NULL, "GrupoBloque2");
INSERT INTO notas(titulo, contenido, tipo, compartida, username, nombreGrupo) VALUES ("Nota GrupoBloque2", "Rehacer métodos del trabajo del bloque 2", "u", "s", NULL, "GrupoBloque2");
INSERT INTO notas(titulo, contenido, tipo, compartida, username, nombreGrupo) VALUES ("Nota GrupoTrabajoFinal", "El último tiron para terminar ya", "b", "s", NULL, "GrupoTrabajoFinal");


INSERT INTO usu_grupo(username, nombreGrupo) VALUES("carlos_munioz", "GrupoBloque1");
INSERT INTO usu_grupo(username, nombreGrupo) VALUES("daniel_correa", "GrupoBloque1");
INSERT INTO usu_grupo(username, nombreGrupo) VALUES("bruno_rguez", "GrupoBloque1");
INSERT INTO usu_grupo(username, nombreGrupo) VALUES("adrian_sanchez", "GrupoBloque1");

INSERT INTO usu_grupo(username, nombreGrupo) VALUES("carlos_munioz", "GrupoBloque2");
INSERT INTO usu_grupo(username, nombreGrupo) VALUES("bruno_rguez", "GrupoBloque2");


INSERT INTO usu_grupo(username, nombreGrupo) VALUES("daniel_correa", "GrupoTrabajoFinal");

INSERT INTO usu_grupo(username, nombreGrupo) VALUES("adrian_sanchez", "GrupoBloque3");
INSERT INTO usu_grupo(username, nombreGrupo) VALUES("carlos_munioz", "GrupoBloque3");
INSERT INTO usu_grupo(username, nombreGrupo) VALUES("daniel_correa", "GrupoBloque3");