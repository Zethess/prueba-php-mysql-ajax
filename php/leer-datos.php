<?php

error_reporting(0);//si hay algun error en la pagina, no se mostrara como respuesta

header('Content-type: application/json; charset=utf-8'); //para indicar al navegador que es un archivo json, el formato


$conexion = new mysqli('localhost','jquery_user','12345','curso_php_ajax');
if ($conexion->connect_errno) {
    $respuesta = [
        'error' => true
    ];
} else {
    $conexion->set_charset("utf8"); //indicar que queremos trabajar con utf-8 tanto para recibir como enviar datos
    $statement = $conexion->prepare("SELECT * FROM usuarios");//preparar consulta sql
    $statement->execute(); 
    $resultados = $statement->get_result();

    $respuesta = []; //aqui meteremos la informacion en formato json

    while ($fila = $resultados->fetch_assoc()) {
        $usuario = [
            'id'        => $fila['ID'],
            'nombre'    => $fila['nombre'],
            'edad'      => $fila['edad'],
            'pais'      => $fila['pais'],
            'correo'    => $fila['correo']
        ];

        array_push($respuesta, $usuario); //creamos un array para cada persona y luego lo metemos en respuesta
    }
}

echo json_encode($respuesta);