<?php

header('Content-type: application/json; charset=utf-8');//para indicar al navegador que es un archivo json, el formato


$respuesta = [
	[
		'id' => '5b9c49f09b0a13367ad35ff9',
		'nombre' => 'Carlos',
		'edad' => 23,
		'pais' => 'Mexico',
		'correo' => 'correo@correo.com'
	],
	[
		'id' => '5b9c49f09b0a13367ad35ff9',
		'nombre' => 'Alejandro',
		'edad' => 23,
		'pais' => 'España',
		'correo' => 'correo@correo.com'
	]
];

echo json_encode($respuesta);//nos permite pasar x estructura a un fichero json, para ello hay que pasarle un array dentro


// echo '[{"nombre": "Carlos"}, {"nombre": "Alejandro"}]';