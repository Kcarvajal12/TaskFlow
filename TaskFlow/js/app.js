"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario-tarea");
    const campoId = document.getElementById("tarea-id");
    const campoTitulo = document.getElementById("titulo");
    const campoDescripcion = document.getElementById("descripcion");
    const campoFecha = document.getElementById("fecha");
    const campoEstado = document.getElementById("estado");
    const listaTareas = document.getElementById("lista-tareas");
    const buscador = document.getElementById("buscador");
    const botonGuardar = document.getElementById("boton-guardar");
    const botonCancelar = document.getElementById("boton-cancelar");

    let tareas = cargarTareas();

    formulario.addEventListener("submit", guardarTarea);
    buscador.addEventListener("input", filtrarTareas);
    botonCancelar.addEventListener("click", cancelarEdicion);
    listaTareas.addEventListener("click", manejarAcciones);

    mostrarTareas(tareas);

    function cargarTareas() {
        const datosGuardados = localStorage.getItem("taskflow_tareas");

        if (!datosGuardados) {
            return [];
        }

        try {
            const datosConvertidos = JSON.parse(datosGuardados);

            if (Array.isArray(datosConvertidos)) {
                return datosConvertidos;
            }

            return [];
        } catch (error) {
            console.error("Error al cargar las tareas:", error);
            return [];
        }
    }

    function guardarTarea(evento) {
        evento.preventDefault();

        const titulo = campoTitulo.value.trim();
        const descripcion = campoDescripcion.value.trim();
        const fecha = campoFecha.value;
        const estado = campoEstado.value;

        if (
            titulo === "" ||
            descripcion === "" ||
            fecha === "" ||
            estado === ""
        ) {
            alert("Debes completar todos los campos.");
            return;
        }

        if (campoId.value === "") {
            registrarTarea(
                titulo,
                descripcion,
                fecha,
                estado
            );
        } else {
            actualizarTarea(
                Number(campoId.value),
                titulo,
                descripcion,
                fecha,
                estado
            );
        }

        guardarEnLocalStorage();
        limpiarFormulario();
        filtrarTareas();
    }

    function registrarTarea(
        titulo,
        descripcion,
        fecha,
        estado
    ) {
        const nuevaTarea = {
            id: Date.now(),
            titulo: titulo,
            descripcion: descripcion,
            fecha: fecha,
            estado: estado
        };

        tareas.push(nuevaTarea);

        alert("Tarea registrada correctamente.");
    }

    function actualizarTarea(
        id,
        titulo,
        descripcion,
        fecha,
        estado
    ) {
        const posicion = tareas.findIndex(function (tarea) {
            return tarea.id === id;
        });

        if (posicion === -1) {
            alert("No se encontró la tarea.");
            return;
        }

        tareas[posicion] = {
            id: id,
            titulo: titulo,
            descripcion: descripcion,
            fecha: fecha,
            estado: estado
        };

        alert("Tarea actualizada correctamente.");
    }

    function mostrarTareas(tareasAMostrar) {
        listaTareas.innerHTML = "";

        if (tareasAMostrar.length === 0) {
            listaTareas.innerHTML = `
                <p id="mensaje-vacio">
                    No hay tareas registradas.
                </p>
            `;

            return;
        }

        tareasAMostrar.forEach(function (tarea) {
            const articulo = document.createElement("article");

            articulo.classList.add("tarea");

            if (tarea.estado === "Completada") {
                articulo.classList.add("completada");
            }

            const claseEstado =
                tarea.estado === "Completada"
                    ? "estado-completada"
                    : "estado-pendiente";

            articulo.innerHTML = `
                <h3>
                    ${escaparHTML(tarea.titulo)}
                </h3>

                <p>
                    ${escaparHTML(tarea.descripcion)}
                </p>

                <p>
                    <strong>Fecha de vencimiento:</strong>
                    ${formatearFecha(tarea.fecha)}
                </p>

                <span class="estado ${claseEstado}">
                    ${escaparHTML(tarea.estado)}
                </span>

                <div class="tarea-acciones">

                    <button
                        type="button"
                        class="boton-editar"
                        data-accion="editar"
                        data-id="${tarea.id}"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="boton-eliminar"
                        data-accion="eliminar"
                        data-id="${tarea.id}"
                    >
                        Eliminar
                    </button>

                </div>
            `;

            listaTareas.appendChild(articulo);
        });
    }

    function manejarAcciones(evento) {
        const boton = evento.target.closest(
            "button[data-accion]"
        );

        if (!boton) {
            return;
        }

        const id = Number(boton.dataset.id);
        const accion = boton.dataset.accion;

        if (accion === "editar") {
            prepararEdicion(id);
        }

        if (accion === "eliminar") {
            eliminarTarea(id);
        }
    }

    function prepararEdicion(id) {
        const tareaSeleccionada = tareas.find(
            function (tarea) {
                return tarea.id === id;
            }
        );

        if (!tareaSeleccionada) {
            alert("No se encontró la tarea.");
            return;
        }

        campoId.value = tareaSeleccionada.id;
        campoTitulo.value = tareaSeleccionada.titulo;
        campoDescripcion.value =
            tareaSeleccionada.descripcion;
        campoFecha.value = tareaSeleccionada.fecha;
        campoEstado.value = tareaSeleccionada.estado;

        botonGuardar.textContent = "Actualizar tarea";
        botonCancelar.classList.remove("oculto");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function eliminarTarea(id) {
        const confirmacion = confirm(
            "¿Deseas eliminar esta tarea?"
        );

        if (!confirmacion) {
            return;
        }

        tareas = tareas.filter(function (tarea) {
            return tarea.id !== id;
        });

        guardarEnLocalStorage();

        if (Number(campoId.value) === id) {
            limpiarFormulario();
        }

        filtrarTareas();

        alert("Tarea eliminada correctamente.");
    }

    function filtrarTareas() {
        const textoBuscado = buscador.value
            .trim()
            .toLowerCase();

        if (textoBuscado === "") {
            mostrarTareas(tareas);
            return;
        }

        const tareasFiltradas = tareas.filter(
            function (tarea) {
                return (
                    tarea.titulo
                        .toLowerCase()
                        .includes(textoBuscado) ||

                    tarea.descripcion
                        .toLowerCase()
                        .includes(textoBuscado) ||

                    tarea.estado
                        .toLowerCase()
                        .includes(textoBuscado) ||

                    tarea.fecha.includes(textoBuscado)
                );
            }
        );

        mostrarTareas(tareasFiltradas);
    }

    function cancelarEdicion() {
        limpiarFormulario();
    }

    function limpiarFormulario() {
        formulario.reset();
        campoId.value = "";
        campoEstado.value = "Pendiente";

        botonGuardar.textContent = "Guardar tarea";
        botonCancelar.classList.add("oculto");
    }

    function guardarEnLocalStorage() {
        localStorage.setItem(
            "taskflow_tareas",
            JSON.stringify(tareas)
        );
    }

    function formatearFecha(fecha) {
        const partes = fecha.split("-");

        if (partes.length !== 3) {
            return fecha;
        }

        const anio = partes[0];
        const mes = partes[1];
        const dia = partes[2];

        return `${dia}/${mes}/${anio}`;
    }

    function escaparHTML(texto) {
        const elemento = document.createElement("div");
        elemento.textContent = texto;

        return elemento.innerHTML;
    }

    console.log("TaskFlow funciona correctamente.");
});