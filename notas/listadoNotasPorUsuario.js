txtUsuario = document.getElementById("txtUsuarioABuscar").value.trim();
argumento = "username=" + txtUsuario;
$.ajax({
    type: "GET",
    url: "notas/listadoNotasPorUsuario.php",
    data: argumento,
    dataType: "json",
    success: function(respuesta) {
        let contenedorNotas = document.querySelector("#imprimeNotas");

        contenedorNotas.textContent = "";
        let cabecera = document.createElement("h3")
        $(cabecera).css({ "margin-top": "25px", "text-align": "center", "background-color": "gold", "color": "navy" });
        cabecera.textContent = "Notas de " + txtUsuario
        contenedorNotas.appendChild(cabecera);


        for (let i = 0; i < respuesta.length; i++) {
            let oDivNota = document.createElement('div');
            oDivNota.setAttribute("class", "card");
            let notaContenido = document.createElement('div');
            notaContenido.setAttribute("class", "card-body contenedor_notas");
            let oEncabezado = document.createElement('h4');
            oEncabezado.setAttribute("class", "card-title");
            oEncabezado.textContent = respuesta[i].titulo;

            let oContenido = document.createElement('p');
            oContenido.setAttribute("class", "card-text")
            oContenido.textContent = respuesta[i].contenido;

            oDivNota.style.width = "18rem";

            oDivNota.style.height = "300px";
            oDivNota.style.margin = "50px";
            oDivNota.style.float = "left";

            if (respuesta[i].tipo == "u") {
                oDivNota.style.backgroundColor = "#ff5555";
                // oBoton.style.backgroundColor = "#ff5555";
            }
            if (respuesta[i].tipo == "m") {
                oDivNota.style.backgroundColor = "#ffd88a";
                //oBoton.style.backgroundColor = "#ffd88a";
            }
            if (respuesta[i].tipo == "b") {
                oDivNota.style.backgroundColor = "#b7ff8a";
                //oBoton.style.backgroundColor = "#b7ff8a";
            }

            let oContenedor = document.querySelector("#imprimeNotas");

            oContenedor.appendChild(oDivNota);
            oDivNota.appendChild(notaContenido);
            notaContenido.appendChild(oEncabezado)
            notaContenido.appendChild(oContenido);

            //console.log(respuesta[0].contenido)
        }

        //$("#modalBusquedaUsuario").css("display", "none");
        //$("#modalBusquedaUsuario").attr("aria-hidden", "true");
        //$("#modalBusquedaUsuario").removeClass("modal show");
        //$("#modalBusquedaUsuario").addClass("modal");
    }
}); //class="modal"aria-hidden="true"data-target="#modalRegistroUsuario"