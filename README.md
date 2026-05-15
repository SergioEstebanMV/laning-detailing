# Eme Detailing - Página web

Proyecto desarrollado para la asignatura **FrontEnd** (Sumativa 2) de Ingeniería Informática en INACAP.

## 📌 Descripción

Sitio web promocional para un emprendimiento de lavado de autos a domicilio en Maipú. Presenta los servicios, precios, galería de trabajos y un formulario de contacto conectado a WhatsApp.

El proyecto permite registrar consultas de usuarios, almacenarlas localmente y mostrarlas dinámicamente en pantalla mediante JavaScript.

## 🛠️ Tecnologías utilizadas

- **HTML5 semántico**: header, main, section, article, footer y address.
- **CSS3**: variables, flexbox, media queries, hover, focus y transiciones.
- **JavaScript**: validaciones, arreglos, objetos, localStorage, eventos y manipulación del DOM.
- **Bootstrap 5**: sistema de grillas y componentes visuales.
- **Google Fonts**: tipografía Bangers.

## ✨ Características

- Formulario de contacto con validaciones HTML5 y JavaScript.
- Sanitización de entradas para reducir riesgos de XSS.
- Uso de `createElement` y `textContent` para mostrar datos de forma segura.
- Envío de consulta a WhatsApp con `encodeURIComponent`.
- Registro de consultas en un arreglo de objetos.
- Almacenamiento de consultas en `localStorage`.
- Renderizado dinámico de consultas recibidas.
- Botón para eliminar consultas.
- Contador de consultas registradas.
- Diseño responsive con media queries propias.
- Galería horizontal de trabajos.
- Efectos hover y focus para mejorar la experiencia de usuario.

## 🔐 Validaciones y seguridad

El formulario utiliza validaciones tanto en HTML5 como en JavaScript.

Validaciones HTML5 aplicadas:

- Campos obligatorios con `required`.
- Largo mínimo con `minlength`.
- Largo máximo con `maxlength`.
- Validación de email con `type="email"`.

Validaciones JavaScript aplicadas:

- Validación de nombre mediante expresión regular.
- Validación de email mediante expresión regular.
- Validación de tipo de vehículo permitido.
- Validación de largo mínimo y máximo.
- Sanitización de caracteres peligrosos como `<`, `>`, `"`, `'` y `` ` ``.
- Codificación segura del mensaje enviado a WhatsApp mediante `encodeURIComponent`.

Para prevenir vulnerabilidades XSS, los datos ingresados por el usuario no se insertan con `innerHTML`. En su lugar, se utilizan métodos seguros como `createElement`, `textContent` y `appendChild`.

## 📦 Organización de datos

Las consultas se almacenan en un arreglo llamado `consultas`.

Cada consulta se representa como un objeto con la siguiente estructura:

```js
{
    id: Date.now(),
    nombre,
    email,
    vehiculo,
    mensaje
}

El arreglo permite agregar, mostrar, filtrar y eliminar consultas de forma ordenada.

🧠 Uso de IA

Durante el desarrollo del proyecto se utilizó ChatGPT como apoyo para mejorar la calidad del código y aplicar buenas prácticas de seguridad, validación y organización.

Ejemplos de prompts utilizados
1. Sanitización y prevención XSS

Prompt utilizado:

“Genera una función JavaScript para sanitizar entradas y evitar ataques XSS.”

Mejora aplicada:

Se implementó una función sanitizar() para eliminar caracteres peligrosos antes de almacenar o mostrar información en el DOM.

2. Validación de email

Prompt utilizado:

“Genera una expresión regular para validar correos electrónicos en JavaScript.”

Mejora aplicada:

Se incorporó una validación mediante regex para asegurar el formato correcto del email.

3. Refactorización

Prompt utilizado:

“Divide el código JavaScript en funciones reutilizables y modulares.”

Mejora aplicada:

Se separaron responsabilidades en funciones como:

sanitizar()
validarEmail()
validarNombre()
validarVehiculo()
validarFormulario()
guardarLocal()
cargarLocal()
renderConsultas()
eliminarConsulta()
4. Seguridad en enlaces de WhatsApp

Prompt utilizado:

“¿Cómo puedo enviar un mensaje a WhatsApp desde JavaScript de forma segura?”

Mejora aplicada:

Se utilizó encodeURIComponent() para codificar correctamente el mensaje enviado por URL, evitando errores con espacios, tildes o caracteres especiales.

🧠 Razonamiento final sobre uso de IA

Las sugerencias entregadas por ChatGPT no fueron copiadas directamente sin revisión. Se adaptaron al contexto del proyecto, priorizando seguridad, claridad y facilidad de mantención.

La decisión final fue utilizar textContent y createElement en lugar de innerHTML para prevenir XSS. También se decidió separar las validaciones en funciones reutilizables y almacenar las consultas como objetos dentro de un arreglo, lo que permite manipular los datos de forma clara y escalable.

El uso de IA permitió mejorar el proyecto en tres áreas principales:

Seguridad del formulario.
Organización del código.
Mejora de la experiencia de usuario.
📁 Estructura del proyecto
/
├── index.html
├── styles.css
├── script.js
├── README.md
├── logo.jpeg
├── image.png
└── img/
    ├── 1.jpg
    ├── 2.jpg
    ├── 3.jpg
    ├── 4.jpg
    ├── 5.jpg
    ├── 6.jpg
    ├── 7.jpg
    └── 8.jpg
🚀 Cómo ver el sitio

Puedes visitarlo en:

https://[tu-usuario].github.io/[nombre-repositorio]

Para publicarlo en GitHub Pages:

Subir el proyecto a un repositorio de GitHub.
Ir a Settings.
Entrar a Pages.
Seleccionar la rama main.
Guardar los cambios.
📝 Commits principales sugeridos
feat: estructura HTML semántica completa
style: agregar estilos responsive y efectos visuales
feat: agregar formulario con validaciones
feat: registrar consultas con arreglos y objetos
feat: agregar localStorage y render dinámico
security: mejorar sanitización y prevención XSS
docs: documentar uso de IA y buenas prácticas
👨‍💻 Autores

Sergio Mutis, Jaime Romero
Estudiantes de Ingeniería Informática, INACAP.