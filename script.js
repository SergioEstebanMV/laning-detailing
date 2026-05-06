// 🔐 IA: sanitizar (XSS)
function sanitizar(texto) {
    return texto.replace(/[<>"'`]/g, "");
}

// 📦 almacenamiento
let consultas = [];

// 💾 localStorage
function guardarLocal() {
    localStorage.setItem("consultas", JSON.stringify(consultas));
}

function cargarLocal() {
    consultas = JSON.parse(localStorage.getItem("consultas")) || [];
}

// 🧠 validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// 🧠 validar formulario
function validarFormulario(nombre, email, mensaje) {
    if (!nombre || !email || !mensaje) return "Completa los campos";
    if (!validarEmail(email)) return "Email inválido";
    return null;
}

// 📲 enviar
function enviarWhatsApp(e) {
    e.preventDefault();

    const nombre = sanitizar(document.getElementById("nombre").value);
    const email = sanitizar(document.getElementById("email").value);
    const vehiculo = sanitizar(document.getElementById("vehiculo").value);
    const mensaje = sanitizar(document.getElementById("mensaje").value);

    const error = validarFormulario(nombre, email, mensaje);
    if (error) return alert(error);

    const texto = `Hola, soy ${nombre} (${email}) - ${vehiculo}%0A${mensaje}`;
    window.open(`https://wa.me/56959863089?text=${texto}`);

    const nueva = { id: Date.now(), nombre, email, vehiculo, mensaje };
    consultas.push(nueva);

    guardarLocal();
    renderConsultas();

    document.getElementById("contactForm").reset();
}

// 🧠 render DOM
function renderConsultas() {
    const lista = document.getElementById("listaConsultas");
    lista.innerHTML = "";

    consultas.forEach(c => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between";

        const texto = document.createElement("span");
        texto.textContent = `${c.nombre} - ${c.email}`;

        const btn = document.createElement("button");
        btn.textContent = "Eliminar";
        btn.className = "btn btn-danger btn-sm";

        btn.addEventListener("click", () => eliminarConsulta(c.id));

        li.appendChild(texto);
        li.appendChild(btn);

        lista.appendChild(li);
    });
}

// ❌ eliminar
function eliminarConsulta(id) {
    consultas = consultas.filter(c => c.id !== id);
    guardarLocal();
    renderConsultas();
}

// ⚙️ init
document.addEventListener("DOMContentLoaded", () => {
    cargarLocal();
    renderConsultas();

    document
        .getElementById("contactForm")
        .addEventListener("submit", enviarWhatsApp);
});