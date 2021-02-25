<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "postit";
$usuario   = "root";
$password  = "";

$username = $_POST["username"];
$nombre = $_POST["nombre"];
$email = $_POST["email"];
$contraseña = $_POST["contraseña"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "INSERT INTO usuarios (username, nombre, email, contraseña) VALUES ('$username','$nombre', '$email', '$contraseña');";
$resultado = mysqli_query($conexion,$sql);

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Registro realizado"; 
} 
else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
}
//echo mysqli_error($conexion);
mysqli_close($conexion);


echo json_encode($respuesta);


?>