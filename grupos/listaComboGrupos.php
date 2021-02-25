<?php

$servidor  = "localhost";
$basedatos = "postit";
$usuario   = "root";
$password  = "";


// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

$sql = "select * from grupos";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$listadoGrupos=[];
while($fila = mysqli_fetch_assoc($resultados))
{
    //echo "<option value='".$fila["nombreGrupo"]."'>".$fila["nombreGrupo"]."</option>";
    $listadoGrupos[] = $fila;
}

echo json_encode($listadoGrupos);

mysqli_close($conexion);




?>