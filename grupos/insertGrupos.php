<?php
error_reporting(0);
$servidor  = "localhost";
$basedatos = "postit";
$usuario   = "root";
$password  = "";

$nombreGrupo = $_POST['nombreGrupo'];

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

$sql = "INSERT INTO grupos (nombreGrupo) VALUES ('$nombreGrupo');";

$resultado = mysqli_query($conexion,$sql);

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta de grupo realizada"; 
} 
else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "El grupo ya existe";
}

mysqli_close($conexion);


echo json_encode($respuesta);

?>