<?php

$servidor  = "localhost";
$basedatos = "postit";
$usuario   = "root";
$password  = "";

extract($_GET);

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

$sql = "SELECT * FROM notas WHERE username = '$username'";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$listadoNotas=[];

while($fila = mysqli_fetch_assoc($resultados))
{
    $listadoNotas[] = $fila;
}

//mysqli_close($conexion);
echo json_encode($listadoNotas); 


?>