const mascotaInput = document.querySelector('#mascota');
const mascotaPropietario = document.querySelector('#propietario');
const mascotaTelefono = document.querySelector('#telefono');
const mascotaFecha = document.querySelector('#fecha');
const mascotaHora= document.querySelector('#hora');
const mascotaSintomas = document.querySelector('#sintomas');


//Ui
const formulario = document.querySelector('#nueva-cita');

const contenedorCitas = document.querySelector('#citas');


let editando;


//classes

class Citas{
    constructor(){
        this.citas = [];
    }

    agregarCita(citas){
        this.citas = [...this.citas, citas]
        // console.log(this.citas);
    }
    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id) 
        console.log(this.citas);
    };
    
    editarCita(citaActualizada ){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita);
        console.log(this.citas);
    }
}

class UI{

    imprimirAlerta(mensaje, tipo){

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert',  'd-block', 'col-12');

        //agregar clase en base al tipo error

        if(tipo ==='error'){
            divMensaje.classList.add('alert-danger');
        }else{ 
            divMensaje.classList.add('alert-success');
        }
        

        // mensaje de error
        divMensaje.textContent  = mensaje;

        // agregar al DOM'

        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //Quitar la alerta despues de 5seg

        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
    }
    imprimirCitas({citas}){
        this.limpiarHTML();
        citas.forEach(cita => {
            const { mascota, propietario,telefono,fecha,hora, sintomas, id} = cita;
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3')
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;


            
            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            <Span class="font-weight-bolder">Propietario:</span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <Span class="font-weight-bolder">Telefono:</span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <Span class="font-weight-bolder">Fecha:</span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <Span class="font-weight-bolder">Hora:</span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
            <Span class="font-weight-bolder">Sintomas:</span> ${sintomas}
            `;

            //boton para eliminar la cita

            const btnEliminar = document.createElement('p');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';


            btnEliminar.onclick = () => eliminarCita(id);



            // Añade un boton para eliminar las citas
            const btnEditar = document.createElement('p');
            btnEditar.classList.add('btn', 'btn-info', 'mr-2');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';

            btnEditar.onclick = () => cargarEdicion(cita);
            


            // Agregar los parrafos al divCitas
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //agregar las citas al HTML
            contenedorCitas.appendChild(divCita);

        });
    }
    limpiarHTML(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
            
        }
    }

}

const ui = new UI();
const administrarCitas = new Citas();

//Registrar eventos
eventListener();
function eventListener(){
    // el change se ejecuta cuando seleccionamos otra cosa fuera del cuadro el input conforme escribamos.
    mascotaInput.addEventListener('input', datosCita);
    mascotaPropietario.addEventListener('input', datosCita);
    mascotaTelefono.addEventListener('input', datosCita);
    mascotaFecha.addEventListener('input', datosCita);
    mascotaHora.addEventListener('input', datosCita);
    mascotaSintomas.addEventListener('input', datosCita);
    formulario.addEventListener('submit', nuevaCita);
}

//Objeto con la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''


}

//Agrega datos al objeto
function datosCita(e){
    citaObj [e.target.name] = e.target.value;
    //console.log(citaObj);
}


///valida nueva cita

function nuevaCita(e) {
    e.preventDefault();

    //exctraer la informacion del objeto cita

    const { mascota, propietario,telefono,fecha,hora, sintomas} = citaObj; 

    // validar

    if( mascota == '',propietario == '',telefono == '',fecha == '',hora == '',mascota == '',sintomas == ''){

        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if (editando) {
        // Agregar el mensaje de registro actualizado correctamente
        ui.imprimirAlerta('La cita actualizo correctamente');

        // Pasar el obj de la cita a edicion 

        administrarCitas.editarCita({...citaObj});

        // Quitar modo edicion
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
        editando = false;
        
        
    } else {
           // generar un id unico

        citaObj.id = Date.now()

        // creando una nueva cita

        administrarCitas.agregarCita({...citaObj});

        // imprimir mensaje de agregado correctamente
        ui.imprimirAlerta('La cita se agrego correctamente');
    }



    // Reiniciar objeto para validacion
    reiniciarObj();   

    // Reiniciar formulario

    formulario.reset();  

    //mostrar el HTML de las citas

    ui.imprimirCitas(administrarCitas);
    


    // reiniciar objeto
    function reiniciarObj() {
        citaObj.mascota = '';
        citaObj.propietario = '';
        citaObj.telefono = '';
        citaObj.fecha = '';
        citaObj.hora = '';
        citaObj.sintomas = '';
    }
}

function eliminarCita(id) {
    //eliminar la cita
    administrarCitas.eliminarCita(id);
    //muestre el mensaje principal
    ui.imprimirAlerta('La cita se elimino correctamente');


    // refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

//carga los datos y el modo edicion
function cargarEdicion(cita){
    
    const { mascota, propietario,telefono,fecha,hora, sintomas, id} = cita; 

    //llenar los inputs

    mascotaInput.value = mascota;
    mascotaPropietario.value = propietario;
    mascotaTelefono.value = telefono;
    mascotaFecha.value = fecha;
    mascotaHora.value = hora;
    mascotaSintomas.value = sintomas;


    // llegar el objeto 

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cabiar texto de boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
     editando = true;
}

















