<?php
$servidor  = "localhost";
$basedatos = "postit";
$usuario   = "root";
$password  = "";

extract($_GET);

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

$sql = "SELECT COUNT(*) AS numGrupo FROM grupos WHERE nombreGrupo = '$nombreGrupo'";
$resultado = mysqli_query($conexion,$sql);
$fila = mysqli_fetch_assoc($resultado);

if($fila['numGrupo'] > 0)
{
    $respuesta = true;
}
else
{
    $respuesta = false;
}
mysqli_close($conexion);
echo json_encode($respuesta);
//echo $sql;
?>