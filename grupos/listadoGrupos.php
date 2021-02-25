<?php
$servidor  = "localhost";
$basedatos = "postit";
$usuario   = "root";
$password  = "";

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

$sql = "SELECT grupos.nombreGrupo as grupo , usuarios.username as usuario FROM grupos INNER JOIN usu_grupo ON grupos.nombreGrupo = usu_grupo.nombreGrupo INNER JOIN usuarios ON usuarios.username = usu_grupo.username";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));
$listadoGrupos = array();
$listadoUsuarios = array();

while($fila = mysqli_fetch_assoc($resultados))
{
    $listadoGrupos[$fila["grupo"]][]= $fila["usuario"];
}
$tabla = "<table border=1>";
$tabla .= "<tr><th>Grupo</th><th>Usuarios</th></tr>";

foreach($listadoGrupos as $grupo => $valor)
{
    $tabla .= "<tr><td>".$grupo."</td><td>";
    foreach ($valor as $usuario)
    {
        $tabla .= $usuario. "<br>";
    }
    $tabla.="</td></tr>";
}
$tabla .= "</table>";

echo $tabla;
?>