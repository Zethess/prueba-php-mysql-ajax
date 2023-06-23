var btn = document.getElementById('btn_cargar_usuarios');
var loader = document.getElementById('loader');


btn.addEventListener('click', function(){
    var peticion = new XMLHttpRequest();
    peticion.open('GET', 'leer-datos.php');//aqui como no accedemos a un archivo si no a un enlace online sería
    // peticion.open('GET','https://api.npoint.io/4e5e059fbe9dc08c0fb4');
    loader.classList.add('active');

    peticion.onload = function(){ //permitira ejecutar una funcion cuando la peticion cargo y por lo tanto podemos acceder a los datos
        //JSON.parse(peticion.responseText) //permite parsear de codigo a JSON, ahora si le pedimos la posicion 0
        //nos devolvera el 1 primer objeto de json, antes nos hubiera devuelto el caracter que estuviera en esa posicion
        var datos = JSON.parse(peticion.responseText);
        // datos.forEach(persona => {
            // var elemento = document.createElement('tr');
            // elemento.innerHTML += ("<td>" + persona.edad + "</td>");
            // elemento.innerHTML += ("<td>" + persona.nombre + "</td>");
            // elemento.innerHTML += ("<td>" + persona.edad + "</td>");
            // elemento.innerHTML += ("<td>" + persona.pais + "</td>");
            // elemento.innerHTML += ("<td>" + persona.correo + "</td>");
            // document.getElementById('tabla').appendChild(elemento);
        // });
        for (let i = 0; i < 5; i++) {
            var elemento = document.createElement('tr');
            elemento.innerHTML += ("<td>" + datos[i].edad + "</td>");
            elemento.innerHTML += ("<td>" + datos[i].nombre + "</td>");
            elemento.innerHTML += ("<td>" + datos[i].edad + "</td>");
            elemento.innerHTML += ("<td>" + datos[i].pais + "</td>");
            elemento.innerHTML += ("<td>" + datos[i].correo + "</td>");
            document.getElementById('tabla').appendChild(elemento);
            
        }
    }
    
    peticion.onreadystatechange = function(){//Nos permite ejecutar una funcion, cada que el estado de nuestra 
        //peticion cambie, por ejemplo cuando pasemos de pendiente a recibido

        if(peticion.readyState == 4 && peticion.status == 200){ //el status es para comprobar que este todo correcto o hay algun problema
            //si hubiera algun problema marcaria 404
            loader.classList.remove('active');
        }


//console.log(peticion.status);
//console.log(peticion.readyState);//tendremos tres resultados en la consola, 2 que significa que la peticion fue recibida
//3 que la peticion esta siendo procesada y 4 que la peticion ha sido finalizada y la respuesta esta lista
} 
    
    
    peticion.send();
});
