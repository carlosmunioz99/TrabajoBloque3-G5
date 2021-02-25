"use strict";


///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////   USUARIOS   //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function registrarUsuario() {
    let bValido = true;

    let sNombreDeUsuario = frmRegistro.txtIdUsuario;
    let txtMensajeError = frmRegistro.txtIdUsuario.nextElementSibling;

    let regExp = /^[a-zA-Z0-9_]{5,20}$/;
    if (!regExp.test(sNombreDeUsuario.value)) {
        bValido = false

        txtMensajeError.textContent = "- El nombre de usuario debe tener entre 5 y 20 caracteres";
        sNombreDeUsuario.focus();
    } else {
        txtMensajeError.textContent = "";
    }

    let sNombre = frmRegistro.txtNombre;
    txtMensajeError = frmRegistro.txtNombre.nextElementSibling;
    regExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{5,50}$/;

    if (!regExp.test(sNombre.value)) {
        if (bValido) {
            bValido = false
            sNombre.focus();
        }

        txtMensajeError.textContent = "- El nombre de usuario debe tener entre 5 y 50 caracteres y no contener números";
    } else {
        txtMensajeError.textContent = "";
    }

    let sEmail = frmRegistro.txtMail;
    txtMensajeError = frmRegistro.txtMail.nextElementSibling;
    regExp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if (!regExp.test(sEmail.value)) {
        if (bValido) {
            bValido = false
            sEmail.focus();
        }
        txtMensajeError.textContent = "- Formato de email incorrecto";
    } else {
        txtMensajeError.textContent = "";
    }

    let sPassword = frmRegistro.txtContraseña;
    txtMensajeError = frmRegistro.txtContraseña.nextElementSibling;
    regExp = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{4,15}$/
    if (!regExp.test(sPassword.value)) {
        if (bValido) {
            bValido = false
            txtContraseña.focus();
        }
        txtMensajeError.textContent = "- Formato de contraseña incorrecta";
    } else {
        txtMensajeError.textContent = "";
    }

    if (bValido) {
        introducirUsuario();
    }

}

function introducirUsuario() {
    let oAjax = instanciarXHR();
    let sParametros = "username=" + frmRegistro.txtIdUsuario.value.trim();
    sParametros += "&nombre=" + frmRegistro.txtNombre.value.trim();
    sParametros += "&email=" + frmRegistro.txtMail.value.trim();
    sParametros += "&contraseña=" + frmRegistro.txtContraseña.value.trim();
    sParametros = encodeURI(sParametros);

    //Configurar la llamada --> Asincrono por defecto
    oAjax.open("POST", encodeURI("usuarios/insertUsuario.php"));

    //Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", procesoInsertUsuario, false);

    // Cabecera POST
    oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //Hacer la llamada
    oAjax.send(sParametros);
}

function procesoInsertUsuario() {
    var oAjax = this;

    // Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) {
        console.log(oAjax.responseText);

        var oRespuesta = JSON.parse(oAjax.responseText);
        let $mensaje = frmRegistro.firstElementChild;
        if (oRespuesta.error == 0) { //Si no hay error

            $mensaje.classList.remove("ocultar");
            $mensaje.textContent = oRespuesta.mensaje;
            $mensaje.classList.remove("alert-danger");
            $mensaje.classList.add("alert-success");
            frmRegistro.reset()
        } else {
            $mensaje.classList.remove("ocultar");
            $mensaje.textContent = oRespuesta.mensaje;
            $mensaje.classList.remove("alert-success");
            $mensaje.classList.add("alert-danger");
        }
    }
}

function listadoUsuarios() {
    $.get("usuarios/listadoUsuarios.php", procesoListadoUsuarios);
}

function procesoListadoUsuarios(datos) {
    let oTabla = document.querySelector("#tablaUsuarios tbody");
    oTabla.innerHTML = "";
    let oUsuarios = JSON.parse(datos);
    for (let i = 0; i < oUsuarios.length; i++) {
        let oFila = oTabla.insertRow(-1);
        oFila.insertCell(-1).textContent = oUsuarios[i].username;
        oFila.insertCell(-1).textContent = oUsuarios[i].nombre;
        oFila.insertCell(-1).textContent = oUsuarios[i].email;
    }
    oTabla.parentElement.classList.remove("ocultar");


    console.log(oUsuarios);
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*GRUPOS*/

/**RELLENAR COMBO MULTIPLE DE USUARIOS PARA GRUPOS*/

function rellenarComboUsuarios(jqDiv) {
    jqDiv.load("usuarios/listaComboUsuarios.php");
}


function validarGrupos() {
    let bValido = true;
    let txtNombreGrupo = frmAñadirGrupo.txtNombreGrupo;
    //console.log(txtNombreGrupo);
    let regExp = /^[0-9a-zA-Z]{5,50}$/;

    if (!regExp.test(txtNombreGrupo.value)) {
        bValido = false;
        txtNombreGrupo.focus();

        let smallError = frmAñadirGrupo.txtNombreGrupo.nextElementSibling;
        smallError.textContent = "Formato del grupo incorrecto. (De 5-50 caracteres)";


    } else {
        let smallError = frmAñadirGrupo.txtNombreGrupo.nextElementSibling;
        smallError.textContent = "";
    }

    let oListadoUsuarios = frmAñadirGrupo.usuariosGrupos;
    let oSeleccionado = oListadoUsuarios.selectedOptions;
    let nombreSeleccionado = []


    if (oSeleccionado.length == 0) {
        bValido = false;
        let smallError = frmAñadirGrupo.usuariosGrupos.nextElementSibling;
        smallError.textContent = "Incluya algún usuario en el grupo";
    } else {
        let smallError = frmAñadirGrupo.usuariosGrupos.nextElementSibling;
        smallError.textContent = "";
        for (let i = 0; i < oSeleccionado.length; i++) {
            nombreSeleccionado.push(oSeleccionado[i].textContent);
        }
    }

    if (bValido) {
        introducirGrupo();
    }
}

function introducirGrupo() {
    let nombreGrupo = "nombreGrupo=" + frmAñadirGrupo.txtNombreGrupo.value.trim();
    $.post("grupos/insertGrupos.php", nombreGrupo, procesoInsertGrupo, "json");
}

function procesoInsertGrupo(datos) {
    let $mensaje = frmAñadirGrupo.firstElementChild;
    if (datos.error) {
        $mensaje.classList.remove("ocultar");
        $mensaje.textContent = datos.mensaje;
        $mensaje.classList.remove("alert-success");
        $mensaje.classList.add("alert-danger");
        //alert(datos.mensaje);
    } else {
        //alert(datos.mensaje);
        insertarUsuarioGrupo();

    }

}

function insertarUsuarioGrupo() {
    let txtNombreGrupo = frmAñadirGrupo.txtNombreGrupo.value.trim();
    let usuariosSeleccionados = $("#usuariosGrupos option:selected");
    var listaUsuarios = [];
    usuariosSeleccionados.each(function() {
        listaUsuarios.push($(this).val());
        //console.log($(this).val());
    })
    let oJSON = {};
    oJSON.grupo = txtNombreGrupo;
    oJSON.usuarios = listaUsuarios;

    $.ajax({
        method: "POST",
        url: "grupos/insertGruposUsuarios.php",
        dataType: "json",
        data: oJSON,
        success: procesarInsertarUsuarioGrupo
    })
}

function procesarInsertarUsuarioGrupo(datos) {
    let $mensaje = frmAñadirGrupo.firstElementChild;
    if (datos.error) {
        $mensaje.classList.remove("ocultar");
        $mensaje.textContent = datos.mensaje;
        $mensaje.classList.remove("alert-success");
        $mensaje.classList.add("alert-danger");
    } else {
        $mensaje.classList.remove("ocultar");
        $mensaje.textContent = datos.mensaje;
        $mensaje.classList.remove("alert-danger");
        $mensaje.classList.add("alert-success");
        frmRegistro.reset();
    }
}


function listadoGrupos() {
    //console.log("Hola");
    $.ajax({
        type: "GET",
        url: "grupos/listadoGrupos.php",
        dataType: "html",
        success: generarTablaGrupos
    });
}

function generarTablaGrupos(html) {
    $("#listadoGrupoGenerado").html(html);
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*NOTAS*/
/*RELLENAR COMBO NOTAS CON MEDIANTE LOCALSTORAGE*/
function rellenarDesplegableGrupos() {
    var oListaGrupos = null;
    if (localStorage["nombreGrupos"] != null) {
        oListaGrupos = JSON.parse(localStorage["nombreGrupos"]);
        procesarRellenarDesplegableGrupos(oListaGrupos);
    } else {
        $.get("grupos/listaComboGrupos.php", null, tratarGetGrupos, "json");
    }
    //console.log(oListaGrupos);
}

function tratarGetGrupos(oListaGrupos) {
    procesarRellenarDesplegableGrupos(oListaGrupos);
    console.log(oListaGrupos)
    localStorage["nombreGrupos"] = JSON.stringify(oListaGrupos);
    //console.log(oListaGrupos) 
}

function procesarRellenarDesplegableGrupos(oListaGrupos) {
    console.log(oListaGrupos);

    $("#grupoPropietario").empty();

    let sOption = ""
    for (let i = 0; i < oListaGrupos.length; i++) {
        sOption += "<option value = '" + oListaGrupos[i].nombreGrupo + "'>" + oListaGrupos[i].nombreGrupo + "</option>"
    }
    $("#grupoPropietario").html(sOption);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function validarNota() {
    let bValido = true;
    let txtTituloNota = document.querySelector("#txtTituloNota");

    let regExp = /[a-zA-Z0-9\s]{4,50}/;

    if (!regExp.test(txtTituloNota.value.trim())) {
        bValido = false;
        let smallError = frmNuevaNota.txtTituloNota.nextElementSibling;
        smallError.textContent = "Formato de título incorrecto, entre 4 y 50 caracteres";
        txtTituloNota.focus();
    } else {
        let smallError = frmNuevaNota.txtTituloNota.nextElementSibling;
        smallError.textContent = "";
    }


    let txtContenidoNota = document.querySelector("#contenidoNota");
    if (txtContenidoNota.value == "") {
        if (bValido) {
            bValido = false;
            txtContenidoNota.focus();

        }
        let smallError = frmNuevaNota.contenidoNota.nextElementSibling;
        smallError.textContent = "Introduzca algún contenido en la nota";
    } else {
        let smallError = frmNuevaNota.contenidoNota.nextElementSibling;
        smallError.textContent = "";
    }

    let divPrioridad = document.querySelector("#rbPrioridad");
    let radioPrioridad = frmNuevaNota.radio.value;
    if (radioPrioridad == "") {
        bValido = false;
        let smallError = divPrioridad.nextElementSibling;
        smallError.textContent = "Seleccione una prioridad";
    } else {
        let smallError = divPrioridad.nextElementSibling;
        smallError.textContent = "";
    }


    if (bValido) {
        insertarNota();
    }

}


function insertarNota() {
    let propietario = "";
    let compartida = "";
    let txtTitulo = frmNuevaNota.txtTituloNota.value.trim();
    let txtContenido = frmNuevaNota.contenidoNota.value.trim();
    let pertenece = $("#modalCreacionNota a[class*='active']").text();
    if (pertenece == "Grupo") {
        propietario = $("#grupoPropietario option:selected").val();
        compartida = "s"
    } else {
        propietario = $("#usuarioPropietario option:selected").val();
        compartida = "n"
    }
    let rbtPrioridad = $("#rbPrioridad input:checked").val();

    let oJSON = {
        titulo: txtTitulo,
        contenido: txtContenido,
        propietario: propietario,
        prioridad: rbtPrioridad,
        compartida
    }

    $.ajax({
        type: "post",
        url: "notas/insertarNotas.php",
        data: oJSON,
        dataType: "json",
        success: procesoInsertarNota
    });
}

function procesoInsertarNota(datos) {
    let $mensaje = frmNuevaNota.firstElementChild;
    if (!datos.error) {
        $mensaje.classList.remove("ocultar");
        $mensaje.textContent = datos.mensaje;
        $mensaje.classList.remove("alert-danger");
        $mensaje.classList.add("alert-success");

        frmNuevaNota.reset();
    } else {
        $mensaje.classList.remove("ocultar");
        $mensaje.textContent = oRespuesta.mensaje;
        $mensaje.classList.remove("alert-success");
        $mensaje.classList.add("alert-danger");
    }
}

function comprobarUsuarioIntroducido() {
    let txtUsuario = document.getElementById("txtUsuarioABuscar").value.trim();
    let argumento = "username=" + txtUsuario;
    $.get("notas/countUsuarioIntroducido.php", argumento, procesoComprobarUsuarioIntroducido, "json");
}

function procesoComprobarUsuarioIntroducido(dato) {
    let txtUsuario = document.getElementById("txtUsuarioABuscar");
    let smallError = txtUsuario.nextElementSibling;
    if (!dato) {
        smallError.textContent = "El usuario introducido no existe";
    } else {
        smallError.textContent = "";
        listadoNotasPorUsuario()

    }
    console.log(dato);
}


function listadoNotasPorUsuario() {
    $.getScript("notas/listadoNotasPorUsuario.js")
}

function comprobarGrupoIntroducido() {
    let txtGrupo = document.getElementById("txtGrupoABuscar").value.trim();
    let argumento = "nombreGrupo=" + txtGrupo;
    $.get("notas/countGrupoIntroducido.php", argumento, procesoComprobarGrupoIntroducido, "json");
}

function procesoComprobarGrupoIntroducido(dato) {
    let txtGrupo = document.getElementById("txtGrupoABuscar");
    let smallError = txtGrupo.nextElementSibling;
    if (!dato) {
        smallError.textContent = "El grupo introducido no existe";
    } else {
        smallError.textContent = "";
        listadoNotasPorGrupo()
    }
    console.log(dato);
}

function listadoNotasPorGrupo() {
    let txtGrupo = document.getElementById("txtGrupoABuscar");
    let argumento = "nombreGrupo=" + txtGrupo.value.trim();

    $.ajax({
        type: "GET",
        url: "notas/listadoNotasPorGrupos.php",
        data: argumento,
        dataType: "xml",
        success: procesoNotasPorGrupo
    });
}

function procesoNotasPorGrupo(datos) {
    let contenedorNotas = document.querySelector("#imprimeNotas");
    contenedorNotas.textContent = "";
    let txtGrupo = document.getElementById("txtGrupoABuscar");
    contenedorNotas.textContent = "";
    let cabecera = document.createElement("h3")
    $(cabecera).css({ "margin-top": "25px", "text-align": "center", "background-color": "gold", "color": "navy" });
    cabecera.textContent = "Notas de " + txtGrupo.value.trim();
    contenedorNotas.appendChild(cabecera);

    let oNotas = datos.querySelectorAll("nota")
    console.log(oNotas);
    for (let i = 0; i < oNotas.length; i++) {

        let oDivNota = document.createElement('div');
        oDivNota.setAttribute("class", "card");
        let notaContenido = document.createElement('div');
        notaContenido.setAttribute("class", "card-body");
        let oEncabezado = document.createElement('h4');
        oEncabezado.setAttribute("class", "card-title");

        let titulo = oNotas[i].querySelector("titulo").textContent;
        oEncabezado.textContent = titulo;

        let oContenido = document.createElement('p');
        oContenido.setAttribute("class", "card-text")
        let contenido = oNotas[i].querySelector("contenido").textContent;
        oContenido.textContent = contenido;

        oDivNota.style.width = "18rem";

        oDivNota.style.height = "300px";
        oDivNota.style.margin = "50px";
        oDivNota.style.float = "left";

        if (oNotas[i].querySelector("tipo").textContent == "u") {
            oDivNota.style.backgroundColor = "#ff5555";
            // oBoton.style.backgroundColor = "#ff5555";
        }
        if (oNotas[i].querySelector("tipo").textContent == "m") {
            oDivNota.style.backgroundColor = "#ffd88a";
            //oBoton.style.backgroundColor = "#ffd88a";
        }
        if (oNotas[i].querySelector("tipo").textContent == "b") {
            oDivNota.style.backgroundColor = "#b7ff8a";
            //oBoton.style.backgroundColor = "#b7ff8a";
        }

        let oContenedor = document.querySelector("#imprimeNotas");

        oContenedor.appendChild(oDivNota);
        oDivNota.appendChild(notaContenido);
        notaContenido.appendChild(oEncabezado)
        notaContenido.appendChild(oContenido);
    }


    //console.log(datos);
}


//$.ajax({method: "POST",url: "some.php",dataType: "html“,data: { name: "John", location: "Boston" }})

//$.post(url[,datos ] [,callback] [,tipo_de_dato])

/*function generarNotasGrupo() {
    let txtGrupoABuscar = document.querySelector("#txtGrupoABuscar");
    //console.log(txtUsuarioAbuscar);
    let oListadoGrupos = oNotas._grupos;
    let grupoABuscar = oListadoGrupos.find(oG => oG.nombreGrupo == txtGrupoABuscar.value);


    if (!grupoABuscar) {
        let smallError = txtGrupoABuscar.nextElementSibling;
        smallError.textContent = "El grupo introducido no existe";
    } else {
        let smallError = txtGrupoABuscar.nextElementSibling;
        smallError.textContent = "";

        let contenedor = document.querySelector("#imprimeNotas");

        /***************CAMBIAR ESTO*********************************************************************************************************************************** */
/*contenedor.textContent = ""


        let idGrupo = grupoABuscar.id
        let oUsuarioGrupoABuscar = oNotas._usuarioGrupos.filter(oUG => oUG.idGrupo == idGrupo);


        if (oUsuarioGrupoABuscar.length != 0) {

            let oNotasDelGrupo = [];
            let oTodasNotas = oNotas.getNotas();

            let aNotas = oUsuarioGrupoABuscar[0].notas;

            for (let i = 0; i < aNotas.length; i++) {
                Nota.contenidoNotaGrupo(aNotas[i], idGrupo);
            }
        }


    }
}



function generarNotasUsuario() {
    let txtUsuarioAbuscar = document.querySelector("#txtUsuarioABuscar");
    //console.log(txtUsuarioAbuscar);
    let oListadoUsuarios = oNotas.getUsuarios();
    let usuarioABuscar = oListadoUsuarios.find(oU => oU.usuario == txtUsuarioAbuscar.value)
    if (!usuarioABuscar) {
        let smallError = txtUsuarioAbuscar.nextElementSibling;
        smallError.textContent = "El usuario introducido no existe";
    } else {
        let smallError = txtUsuarioAbuscar.nextElementSibling;
        smallError.textContent = "";

        let contenedor = document.querySelector("#imprimeNotas");
        contenedor.innerHTML = "";
        let numHijos = contenedor.children;
        for (let i = 0; i < numHijos.length; i++) {
            contenedor.removeChild(numHijos[i])
        }

        for (let i = 0; i < usuarioABuscar.notas.length; i++) {
            Nota.contenidoNota(usuarioABuscar.notas[i], usuarioABuscar.usuario);
        }
    }


}




//EVENTOS

//registrar usuario*/
let $btnRegistrar = document.getElementById("btnRegistrarUsuario");
$btnRegistrar.addEventListener("click", registrarUsuario);

let btnListadoUsuarios = document.getElementById("btnListadoUsuarios");
btnListadoUsuarios.addEventListener("click", listadoUsuarios);



let btnListadoUsuariosCombos = document.getElementById("btnAbrirModalGrupos");
btnListadoUsuariosCombos.addEventListener("click", function() {
    rellenarComboUsuarios($("#usuariosGrupos"));
});

let btnCrearGrupos = document.getElementById("btnCrearGrupos");
btnCrearGrupos.addEventListener("click", validarGrupos);

$("#generarTablaGrupos").click("click", listadoGrupos);

$("#btnAbrirModalNuevaNota").click(function() {
    rellenarComboUsuarios($("#usuarioPropietario"));
    //rellenarComboGrupos($("#grupoPropietario"));
    rellenarDesplegableGrupos();

});



//NOTAS//
let btnCrearNota = document.querySelector("#btnCrearNota");
btnCrearNota.addEventListener("click", validarNota);


let btnNotasPorUsuario = document.querySelector("#btnBuscarNotas");
btnNotasPorUsuario.addEventListener("click", comprobarUsuarioIntroducido);

let btnNotasPorGrupo = document.querySelector("#btnBuscarGrupo");
btnNotasPorGrupo.addEventListener("click", comprobarGrupoIntroducido);

/*let $contenedorNotas = document.getElementById("imprimeNotas");
$contenedorNotas.addEventListener("click", borrarNotas);*/

function instanciarXHR() {
    var xhttp = null;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xhttp;
}
