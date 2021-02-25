<?php
$servidor  = "localhost";
$basedatos = "postit";
$usuario   = "root";
$password  = "";

extract($_POST);


$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

for($i=0;$i<count($usuarios);$i++)
{
    $sql = "INSERT INTO usu_grupo(username, nombreGrupo) VALUES ( '$usuarios[$i]', '$grupo')";
    $resultado = mysqli_query($conexion,$sql);
}

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