// La consigna es:
// * Utilizar la siguiente API https://randomuser.me para obtener datos de un usuario
// * Con la data obtenida de la API hacer un POST a la siguiente API https://reqres.in creando un usuario nuevo
// *La API 1 no nos da un elemento JOB que es el que pide la segunda, por lo tanto para el POST usamos el nombre obtenido y en JOB enviamos la ciudad de origen de esta persona generada
// *La api de randomuser nos da mucha mas data como por ejemplo 3 imagenes, entonces cuando el POST nos de OK deberíamos mostrar la data del usuario que acabamos de CREAR y la imagen (obtenida en la primer llamada)

// Declaración de variables
const urlCrearUser = 'https://randomuser.me/api/' // En esta api se generan los datos del nuevo usuario
const urlPostearUser = 'https://reqres.in/api/users' // En esta api se postean los datos del nuevo usuario
let botonGenerarUsuario = document.getElementById('botonGenerarUsuario');
let main = document.getElementById('main');
let datosDelUsuario = document.getElementById('datosDelUsuario');
let textoSucces = document.getElementById('textoSucces');
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

async function crearUsuario(){
    try {
        const response = await fetch(urlCrearUser);
        const user = await response.json();
        nuevoUsuario = user.results[0];

        datos = [nuevoUsuario.name.first,
                nuevoUsuario.name.last,
                nuevoUsuario.location.country,
                nuevoUsuario.location.city,
                nuevoUsuario.email,
                nuevoUsuario.login.username,
                nuevoUsuario.login.password];
    } catch (e) {
        console.log('Error: ', e);
    }
}

async function postearUsuario(usuario){
    try{
        const response = await fetch(urlPostearUser, {
            'name': `${usuario.name.first}`,
            'job': `${usuario.location.city}`
        });
        const data = await response.json();
        console.log('data', data.createdAt); // Esto no lo tengo que usar para nada?

        textoSuccess.innerHTML = 'Se ha generado un nuevo usuario:';
        crearLi(datosMostrados, datosAMostrar);
        crearLi(datosDelUsuario, datos);
    } catch (e){
        console.log('Error: ', e);
    }
}

// EventListeners que ejecutan las funciones declaradas arriba

botonGenerarUsuario.addEventListener('click', ()=>{
    crearUsuario();
    postearUsuario(nuevoUsuario);
})






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Funciones sin refactorizar:

// function crearUsuario(){
    //     fetch(urlCrearUser)
    //     .then(response => response.text())
    //     .then(content => {
    //         console.log('JSON', JSON.parse(content)); // Devuelve un arreglo con un usuario
    //         let usuarioGenerado = JSON.parse(content);
    //         usuarioGenerado.results.forEach(user => nuevoUsuario = user);
    //         datos = [nuevoUsuario.name.first, nuevoUsuario.name.last, nuevoUsuario.location.country, nuevoUsuario.location.city, nuevoUsuario.email, nuevoUsuario.login.username, nuevoUsuario.login.password];
    //         return datos,nuevoUsuario;
    //     })
    //     .catch(error => console.log('Error', error));
    // }

    // function postearUsuario(usuario){
        //     fetch(urlPostearUser, {
        //         name: usuario.name.first,
        //         job: usuario.location.city
        //     })
        //     .then(response => response.text())
        //     .then(content => {
        //         console.log('JSON.parse', JSON.parse(content));
        //         textoSucces.innerHTML = 'Se ha generado un nuevo usuario:';
        //         datosAMostrar.forEach(dato => {
        //             let li = document.createElement('li');
        //             datosMostrados.appendChild(li);
        //             li.innerHTML = dato;
        //         });
        //         datos.forEach(dato => {
        //             let li = document.createElement('li');
        //             datosDelUsuario.appendChild(li);
        //             li.innerHTML = dato;
        //         });
        //     })
        //     .catch(error => console.log('Error', error));
        // }
        