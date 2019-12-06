// La consigna es:
// * Utilizar la siguiente API https://randomuser.me para obtener datos de un usuario
// * Con la data obtenida de la API hacer un POST a la siguiente API https://reqres.in creando un usuario nuevo
// *La API 1 no nos da un elemento JOB que es el que pide la segunda, por lo tanto para el POST usamos el nombre obtenido y en JOB enviamos la ciudad de origen de esta persona generada
// *La api de randomuser nos da mucha mas data como por ejemplo 3 imagenes, entonces cuando el POST nos de OK deberíamos mostrar la data del usuario que acabamos de CREAR y la imagen (obtenida en la primer llamada)

// Declaración de variables
var axios = require('axios');

const urlCrearUser = 'https://randomuser.me/api/'; // En esta api se generan los datos del nuevo usuario
const urlPostearUser = 'https://reqres.in/api/users'; // En esta api se postean los datos del nuevo usuario
let botonGenerarUsuario = document.getElementById('botonGenerarUsuario');
// let main = document.getElementById('main');
let datosDelUsuario = document.getElementById('datosDelUsuario');
let textoSuccess = document.getElementById('textoSuccess');
let datosMostrados = document.getElementById('datosMostrados');
let datosAMostrar = ['Nombre:','Apellido:','País:','Ciudad:','Email:','Usuario:','Contraseña:'];
let datos;
let nuevoUsuario;

// Funciones auxiliares:

function crearLi(padre, arregloARecorrer){
    arregloARecorrer.forEach(dato => {
        let li = document.createElement('li');
        padre.appendChild(li);
        li.innerHTML = dato;
    });
}

// Lamados a la api

function crearUsuario(){
    axios.get(urlCrearUser)
    .then(user => {
        console.log('user', user);
        nuevoUsuario = user.results[0];
    
        datos = [nuevoUsuario.name.first,
                nuevoUsuario.name.last,
                nuevoUsuario.location.country,
                nuevoUsuario.location.city,
                nuevoUsuario.email,
                nuevoUsuario.login.username,
                nuevoUsuario.login.password];
    })
    .catch(e => console.log('Error:', e));
}

function postearUsuario(usuario){
    axios.post(urlPostearUser, {
        'name': `${usuario.name.first}`,
        'job': `${usuario.location.city}`
    })
    .then(data => {
        console.log('data', data.createdAt); // Esto no lo tengo que usar para nada?
        textoSuccess.innerHTML = 'Se ha generado un nuevo usuario:';
        crearLi(datosMostrados, datosAMostrar);
        crearLi(datosDelUsuario, datos);
    })
    .catch (e => console.log('Error: ', e));
}

// EventListeners que ejecutan las funciones declaradas arriba

botonGenerarUsuario.addEventListener('click', ()=>{
    crearUsuario();
    postearUsuario(nuevoUsuario);
})