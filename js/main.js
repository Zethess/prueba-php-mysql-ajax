var btn_cargar = document.getElementById('btn_cargar_usuarios'),
    error_box = document.getElementById('error_box'),
    tabla = document.getElementById('tabla'),
    loader = document.getElementById('loader');

var usuario_nombre,
    usuario_edad,
    usuario_pais,
    usuario_correo;

function cargarUsuarios(){
    //Lo primero que hara es borrar el contenido de la tabla, para ello reiniciamos el formato y solo dehjamos la cabecera
    tabla.innerHTML = '<tr><th>ID</th><th>Nombre</th><th>Edad</th><th>Pais</th><th>Correo</th></tr>';

    var peticion = new XMLHttpRequest();
    // peticion.open('GET','https://api.npoint.io/4e5e059fbe9dc08c0fb4');
    peticion.open('GET', 'php/leer-datos.php');
    

    loader.classList.add('active');

    peticion.onload = function(){
        var datos = JSON.parse(peticion.responseText);
        
        if(datos.error){
            error_box.classList.add('active');
        }else{
            for(var i = 0; i < datos.length; i++){
                var elemento = document.createElement('tr');
                elemento.innerHTML += ("<td>" + datos[i].id + "</td>");
                elemento.innerHTML += ("<td>" + datos[i].nombre + "</td>");
                elemento.innerHTML += ("<td>" + datos[i].edad + "</td>");
                elemento.innerHTML += ("<td>" + datos[i].pais + "</td>");
                elemento.innerHTML += ("<td>" + datos[i].correo + "</td>");
                tabla.appendChild(elemento);
                
            }
        }
    }

    peticion.onreadystatechange = function(){
        if(peticion.readyState == 4 && peticion.status == 200){ //el status es para comprobar que este todo correcto o hay algun problema
            //si hubiera algun problema marcaria 404
            loader.classList.remove('active');
        }
    }

    peticion.send();

}
function agregarUsuario(e){
    e.preventDefault();

    var peticion = new XMLHttpRequest();
    peticion.open('POST','php/insertar-usuario.php');

    usuario_nombre = formulario.nombre.value.trim();
    usuario_edad = parseInt(formulario.edad.value.trim());
    usuario_pais = formulario.pais.value.trim();
    usuario_correo = formulario.correo.value.trim();

    if(formulario_valido()){
        error_box.classList.remove('active');
		var parametros = 'nombre='+ usuario_nombre + '&edad='+ usuario_edad +'&pais='+ usuario_pais +'&correo=' + usuario_correo;
        
        peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//establecer como queremos establecer nuestra conexion
        //importante ya que se envia informacion

        loader.classList.add('active');

        peticion.onload = function(){
            cargarUsuarios();
            formulario.nombre.value = ''; //limpiar el campo
            formulario.edad.value = '';
            formulario.correo.value = '';
            formulario.pais.value = '';
        }

        peticion.onreadystatechange = function(){
            if(peticion.readyState == 4 && peticion.status == 200){ //el status es para comprobar que este todo correcto o hay algun problema
                //si hubiera algun problema marcaria 404
                loader.classList.remove('active');
            }
        }
        peticion.send(parametros); //se manda de javascript a php
    }else {
        error_box.classList.add('active');
        error_box.innerHTML = 'Por favor completa el formulario correctamente';
    }

}
btn_cargar.addEventListener('click', function(){
    cargarUsuarios();
});

formulario.addEventListener('submit', function(e){
    agregarUsuario(e);
});

function formulario_valido(){
    if(usuario_nombre == ''){
        return false;
    }else if(usuario_edad == ''){
        return false;
    }else if(usuario_pais == ''){
        return false;
    }else if(usuario_correo == ''){
        return false;
    }

    return true;
}