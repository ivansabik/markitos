<?php

$marcadores = json_decode($_POST["marcadores"], true);
// Guarda los marcadores en una BD 
header('Content-type: text/json');
// Responde a Javascript
$respuesta = array("exito" => true);
print(json_encode($respuesta));
?>
