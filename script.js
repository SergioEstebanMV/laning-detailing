// ======================================================
// IA: ChatGPT ayudó a mejorar:
// - Sanitización contra XSS
// - Validaciones con regex
// - Codificación segura del mensaje para WhatsApp
// - Modularización de funciones
// - Manipulación segura del DOM con createElement y textContent
// - Sistema de reserva tipo carrito
// ======================================================

// ======================================================
// VARIABLES PRINCIPALES
// ======================================================

let consultas = [];
let reservas = [];
let servicioSeleccionado = null;

// ======================================================
// SANITIZACIÓN
// ======================================================

function sanitizar(texto) {
    return texto
        .replace(/[<>"'`]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

// ======================================================
// VALIDACIONES GENERALES
// ======================================================

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(nombre);
}

function validarVehiculo(vehiculo) {
    const vehiculosPermitidos = ["Citycar", "Sedan", "SUV"];
    return vehiculosPermitidos.includes(vehiculo);
}

function validarTelefono(telefono) {
    const regex = /^[0-9]{8,12}$/;
    return regex.test(telefono);
}

function validarUltimosDigitos(digitos) {
    if (!digitos) {
        return true;
    }

    const regex = /^[0-9]{4}$/;
    return regex.test(digitos);
}

function validarFechaReserva(fecha) {
    const fechaSeleccionada = new Date(fecha + "T00:00:00");
    const hoy = new Date();

    hoy.setHours(0, 0, 0, 0);

    return fechaSeleccionada >= hoy;
}

function validarHoraReserva(hora) {
    return hora >= "09:00" && hora <= "19:00";
}

// ======================================================
// LOCAL STORAGE CONSULTAS
// ======================================================

function guardarConsultasLocal() {
    localStorage.setItem(
        "consultas",
        JSON.stringify(consultas)
    );
}

function cargarConsultasLocal() {
    try {
        consultas = JSON.parse(localStorage.getItem("consultas")) || [];
    } catch (error) {
        consultas = [];
        localStorage.removeItem("consultas");
    }
}

// ======================================================
// LOCAL STORAGE RESERVAS
// ======================================================

function guardarReservasLocal() {
    localStorage.setItem(
        "reservas",
        JSON.stringify(reservas)
    );
}

function cargarReservasLocal() {
    try {
        reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    } catch (error) {
        reservas = [];
        localStorage.removeItem("reservas");
    }
}

// ======================================================
// FORMATO PRECIO
// ======================================================

function formatearPrecio(valor) {
    return Number(valor).toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP"
    });
}

// ======================================================
// FORMULARIO CONTACTO SIMPLE
// ======================================================

function validarFormulario(nombre, email, vehiculo, mensaje) {

    if (!nombre || !email || !vehiculo || !mensaje) {
        return "Todos los campos son obligatorios";
    }

    if (nombre.length < 3) {
        return "El nombre debe tener al menos 3 caracteres";
    }

    if (nombre.length > 40) {
        return "El nombre no puede superar los 40 caracteres";
    }

    if (!validarNombre(nombre)) {
        return "El nombre solo puede contener letras y espacios";
    }

    if (email.length > 80) {
        return "El email no puede superar los 80 caracteres";
    }

    if (!validarEmail(email)) {
        return "El email ingresado no es válido";
    }

    if (!validarVehiculo(vehiculo)) {
        return "Debes seleccionar un tipo de vehículo válido";
    }

    if (mensaje.length < 10) {
        return "El mensaje debe tener al menos 10 caracteres";
    }

    if (mensaje.length > 300) {
        return "El mensaje no puede superar los 300 caracteres";
    }

    return null;
}

function mostrarMensajeExito() {
    const mensajeExito = document.getElementById("mensajeExito");

    mensajeExito.textContent =
        "Consulta registrada correctamente. Se abrirá WhatsApp para enviar el mensaje.";
}

function limpiarMensajeExito() {
    const mensajeExito = document.getElementById("mensajeExito");
    mensajeExito.textContent = "";
}

function actualizarContadorConsultas() {
    const contador = document.getElementById("contadorConsultas");

    contador.textContent =
        `Total consultas: ${consultas.length}`;
}

function renderConsultas() {
    const lista = document.getElementById("listaConsultas");

    lista.replaceChildren();

    consultas.forEach((consulta) => {

        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center";

        const texto = document.createElement("span");

        texto.textContent =
            `${consulta.nombre} - ${consulta.email} - ${consulta.vehiculo}`;

        const btn = document.createElement("button");

        btn.textContent = "Eliminar";
        btn.className = "btn btn-danger btn-sm";

        btn.addEventListener("click", () => {
            eliminarConsulta(consulta.id);
        });

        li.appendChild(texto);
        li.appendChild(btn);

        lista.appendChild(li);
    });

    actualizarContadorConsultas();
}

function eliminarConsulta(id) {
    consultas = consultas.filter(
        consulta => consulta.id !== id
    );

    guardarConsultasLocal();
    renderConsultas();
}

function enviarFormulario(evento) {
    evento.preventDefault();

    limpiarMensajeExito();

    const nombre = sanitizar(
        document.getElementById("nombre").value
    );

    const email = sanitizar(
        document.getElementById("email").value
    );

    const vehiculo = sanitizar(
        document.getElementById("vehiculo").value
    );

    const mensaje = sanitizar(
        document.getElementById("mensaje").value
    );

    const error = validarFormulario(
        nombre,
        email,
        vehiculo,
        mensaje
    );

    if (error) {
        alert(error);
        return;
    }

    const nuevaConsulta = {
        id: Date.now(),
        nombre,
        email,
        vehiculo,
        mensaje
    };

    consultas.push(nuevaConsulta);

    guardarConsultasLocal();

    renderConsultas();

    mostrarMensajeExito();

    const textoWhatsapp = encodeURIComponent(
        `Hola, soy ${nombre} (${email}) - ${vehiculo}\n${mensaje}`
    );

    window.open(
        `https://wa.me/56959863089?text=${textoWhatsapp}`,
        "_blank"
    );

    document.getElementById("contactForm").reset();
}

// ======================================================
// SISTEMA DE CARRITO / RESERVA
// ======================================================

function seleccionarServicio(boton) {
    servicioSeleccionado = {
        nombre: boton.dataset.servicio,
        precios: {
            Citycar: Number(boton.dataset.citycar),
            Sedan: Number(boton.dataset.sedan),
            SUV: Number(boton.dataset.suv)
        }
    };

    actualizarCarrito();

    document.getElementById("reserva").scrollIntoView({
        behavior: "smooth"
    });
}

function actualizarCarrito() {
    const carritoServicio = document.getElementById("carritoServicio");
    const carritoTotal = document.getElementById("carritoTotal");
    const vehiculo = document.getElementById("reservaVehiculo").value;

    if (!servicioSeleccionado) {
        carritoServicio.textContent = "Aún no has seleccionado un servicio.";
        carritoTotal.textContent = "";
        return;
    }

    carritoServicio.textContent =
        `Servicio: ${servicioSeleccionado.nombre}`;

    if (vehiculo && servicioSeleccionado.precios[vehiculo]) {
        carritoTotal.textContent =
            `Total: ${formatearPrecio(servicioSeleccionado.precios[vehiculo])}`;
    } else {
        carritoTotal.textContent =
            "Selecciona el tipo de vehículo para calcular el total.";
    }
}

function validarFormularioReserva(datos) {
    if (!servicioSeleccionado) {
        return "Debes seleccionar un servicio antes de reservar";
    }

    if (
        !datos.nombre ||
        !datos.email ||
        !datos.telefono ||
        !datos.vehiculo ||
        !datos.direccion ||
        !datos.fecha ||
        !datos.hora ||
        !datos.metodoPago
    ) {
        return "Todos los campos de reserva son obligatorios";
    }

    if (datos.nombre.length < 3 || datos.nombre.length > 40) {
        return "El nombre debe tener entre 3 y 40 caracteres";
    }

    if (!validarNombre(datos.nombre)) {
        return "El nombre solo puede contener letras y espacios";
    }

    if (datos.email.length > 80) {
        return "El email no puede superar los 80 caracteres";
    }

    if (!validarEmail(datos.email)) {
        return "El email ingresado no es válido";
    }

    if (!validarTelefono(datos.telefono)) {
        return "El teléfono debe contener solo números y tener entre 8 y 12 dígitos";
    }

    if (!validarVehiculo(datos.vehiculo)) {
        return "Debes seleccionar un vehículo válido";
    }

    if (datos.direccion.length < 8 || datos.direccion.length > 120) {
        return "La dirección debe tener entre 8 y 120 caracteres";
    }

    if (!validarFechaReserva(datos.fecha)) {
        return "La fecha de reserva no puede ser anterior al día actual";
    }

    if (!validarHoraReserva(datos.hora)) {
        return "La hora debe estar entre las 09:00 y las 19:00";
    }

    if (!validarUltimosDigitos(datos.ultimosDigitos)) {
        return "Los últimos 4 dígitos deben contener solo números";
    }

    return null;
}

function actualizarContadorReservas() {
    const contadorReservas = document.getElementById("contadorReservas");

    contadorReservas.textContent =
        `Total reservas: ${reservas.length}`;
}

function renderReservas() {
    const listaReservas = document.getElementById("listaReservas");

    listaReservas.replaceChildren();

    reservas.forEach((reserva) => {
        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center";

        const contenido = document.createElement("div");

        const titulo = document.createElement("strong");
        titulo.textContent =
            `${reserva.servicio} - ${reserva.vehiculo} - ${formatearPrecio(reserva.total)}`;

        const datosCliente = document.createElement("span");
        datosCliente.className = "reserva-dato";
        datosCliente.textContent =
            `${reserva.nombre} | ${reserva.telefono}`;

        const datosReserva = document.createElement("span");
        datosReserva.className = "reserva-dato";
        datosReserva.textContent =
            `${reserva.fecha} a las ${reserva.hora} | ${reserva.direccion}`;

        const datosPago = document.createElement("span");
        datosPago.className = "reserva-dato";
        datosPago.textContent =
            `Pago: ${reserva.metodoPago}`;

        contenido.appendChild(titulo);
        contenido.appendChild(datosCliente);
        contenido.appendChild(datosReserva);
        contenido.appendChild(datosPago);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn btn-danger btn-sm";

        btnEliminar.addEventListener("click", () => {
            eliminarReserva(reserva.id);
        });

        li.appendChild(contenido);
        li.appendChild(btnEliminar);

        listaReservas.appendChild(li);
    });

    actualizarContadorReservas();
}

function eliminarReserva(id) {
    reservas = reservas.filter(
        reserva => reserva.id !== id
    );

    guardarReservasLocal();
    renderReservas();
}

function mostrarMensajeReserva() {
    const mensajeReserva = document.getElementById("mensajeReserva");

    mensajeReserva.textContent =
        "Reserva registrada correctamente. Se abrirá WhatsApp para confirmar.";
}

function limpiarMensajeReserva() {
    const mensajeReserva = document.getElementById("mensajeReserva");
    mensajeReserva.textContent = "";
}

function enviarReserva(evento) {
    evento.preventDefault();

    limpiarMensajeReserva();

    const datos = {
        nombre: sanitizar(document.getElementById("reservaNombre").value),
        email: sanitizar(document.getElementById("reservaEmail").value),
        telefono: sanitizar(document.getElementById("reservaTelefono").value),
        vehiculo: sanitizar(document.getElementById("reservaVehiculo").value),
        direccion: sanitizar(document.getElementById("reservaDireccion").value),
        fecha: sanitizar(document.getElementById("reservaFecha").value),
        hora: sanitizar(document.getElementById("reservaHora").value),
        metodoPago: sanitizar(document.getElementById("metodoPago").value),
        nombreTarjeta: sanitizar(document.getElementById("nombreTarjeta").value),
        ultimosDigitos: sanitizar(document.getElementById("ultimosDigitos").value)
    };

    const error = validarFormularioReserva(datos);

    if (error) {
        alert(error);
        return;
    }

    const total = servicioSeleccionado.precios[datos.vehiculo];

    const nuevaReserva = {
        id: Date.now(),
        servicio: servicioSeleccionado.nombre,
        total,
        ...datos
    };

    reservas.push(nuevaReserva);

    guardarReservasLocal();

    renderReservas();

    mostrarMensajeReserva();

    const textoWhatsapp = encodeURIComponent(
        `Hola, quiero confirmar una reserva:\n\n` +
        `Servicio: ${nuevaReserva.servicio}\n` +
        `Vehículo: ${nuevaReserva.vehiculo}\n` +
        `Total: ${formatearPrecio(nuevaReserva.total)}\n\n` +
        `Nombre: ${nuevaReserva.nombre}\n` +
        `Email: ${nuevaReserva.email}\n` +
        `Teléfono: ${nuevaReserva.telefono}\n` +
        `Dirección: ${nuevaReserva.direccion}\n` +
        `Fecha: ${nuevaReserva.fecha}\n` +
        `Hora: ${nuevaReserva.hora}\n` +
        `Método de pago: ${nuevaReserva.metodoPago}`
    );

    window.open(
        `https://wa.me/56959863089?text=${textoWhatsapp}`,
        "_blank"
    );

    document.getElementById("reservaForm").reset();

    servicioSeleccionado = null;
    actualizarCarrito();
}

// ======================================================
// GALERÍA CON FLECHAS
// ======================================================

function activarGaleria() {
    const galeriaScroll = document.getElementById("galeriaScroll");
    const flechaIzquierda = document.getElementById("flechaIzquierda");
    const flechaDerecha = document.getElementById("flechaDerecha");

    flechaIzquierda.addEventListener("click", () => {
        galeriaScroll.scrollBy({
            left: -300,
            behavior: "smooth"
        });
    });

    flechaDerecha.addEventListener("click", () => {
        galeriaScroll.scrollBy({
            left: 300,
            behavior: "smooth"
        });
    });
}

// ======================================================
// INIT
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    cargarConsultasLocal();
    cargarReservasLocal();

    renderConsultas();
    renderReservas();

    document
        .getElementById("contactForm")
        .addEventListener("submit", enviarFormulario);

    document
        .getElementById("reservaForm")
        .addEventListener("submit", enviarReserva);

    document
        .getElementById("reservaVehiculo")
        .addEventListener("change", actualizarCarrito);

    document.querySelectorAll(".btn-servicio").forEach((boton) => {
        boton.addEventListener("click", () => {
            seleccionarServicio(boton);
        });
    });

    activarGaleria();
});