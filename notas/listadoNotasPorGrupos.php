<?php
$servidor  = "localhost";
$basedatos = "postit";
$usuario   = "root";
$password  = "";

//print_r($_GET);
extract($_GET);

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

$sql = "SELECT * FROM notas WHERE nombreGrupo = '$nombreGrupo'";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<notas>';

while($fila = mysqli_fetch_assoc($resultados))
{
    $XML .= "<nota>";
        $XML .= "<id>".$fila['id']."</id>";
        $XML .= "<titulo>".$fila['titulo']."</titulo>";
        $XML .= "<contenido>".$fila['contenido']."</contenido>";
        $XML .= "<tipo>".$fila['tipo']."</tipo>";
        $XML .= "<compartida>".$fila['compartida']."</compartida>";
        $XML .= "<username>".$fila['username']."</username>";
        $XML .= "<nombreGrupo>".$fila['nombreGrupo']."</nombreGrupo>";
    $XML .= "</nota>";
}

$XML .='</notas>';
header("Content-Type: text/xml");
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

echo $XML;

?>