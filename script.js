// Función para enviar consulta por WhatsApp
function enviarWhatsApp(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const vehiculo = document.getElementById('vehiculo').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Validar campos requeridos
    if (!nombre || !email || !mensaje) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
    
    // Construir mensaje para WhatsApp
    const texto = `Hola, vengo de la web Eme Detailing.%0A%0A*Datos de contacto:*%0ANombre: ${nombre}%0AEmail: ${email}%0AVehículo: ${vehiculo}%0A%0A*Consulta:*%0A${mensaje}`;
    
    const numero = '56959863089';
    const url = `https://wa.me/${numero}?text=${texto}`;
    
    // Abrir WhatsApp en nueva pestaña
    window.open(url, '_blank');
    
    // Opcional: Limpiar formulario después del envío
    document.getElementById('contactForm').reset();
}

// Asignar evento al formulario cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', enviarWhatsApp);
    }
});