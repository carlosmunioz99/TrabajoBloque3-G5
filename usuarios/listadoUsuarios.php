<?php
$servidor  = "localhost";
$basedatos = "postit";
$usuario   = "root";
$password  = "";


// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

$sql = "select * from usuarios";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$listadoUsuarios=[];
while($fila = mysqli_fetch_assoc($resultados))
{
    /*$listadoUsuarios['username'] = $fila['username'];
    $listadoUsuarios['nombre'] = $fila['nombre'];
    $listadoUsuarios['email'] = $fila['email'];*/
    $listadoUsuarios[] = $fila;
}

mysqli_close($conexion);
//echo $sql;
echo json_encode($listadoUsuarios); 

?>