<?php
$servidor  = "localhost";
$basedatos = "postit";
$usuario   = "root";
$password  = "";

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");
extract($_POST);
$sql="";

if($compartida == "s")
{
    $sql = "INSERT INTO notas (titulo, contenido, tipo, compartida, username, nombreGrupo) VALUES ('$titulo','$contenido', '$prioridad', '$compartida', NULL, '$propietario');";

}
else
{
    $sql = "INSERT INTO notas (titulo, contenido, tipo, compartida, username, nombreGrupo) VALUES ('$titulo','$contenido', '$prioridad', '$compartida', '$propietario', NULL);";
}

$resultado = mysqli_query($conexion,$sql);

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Nota creada"; 
} 
else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de creacion";
}
mysqli_close($conexion);

echo json_encode($respuesta);
//echo $sql;

?>