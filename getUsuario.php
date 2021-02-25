<?php
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "postit";
$usuario   = "root";
$password  = "";

$username = $_GET["username"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

$sql = "select count(*) as numero from usuarios where username='". $username."'";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$fila = mysqli_fetch_array($resultados);

mysqli_close($conexion);
//echo $sql;
echo json_encode($fila); 

?>