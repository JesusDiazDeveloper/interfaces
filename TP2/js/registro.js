"use strict";
// Botones
const botonRegistrarse = document.querySelector(".boton-registrarse");
const botonCerrarFormulario = document.querySelector(".boton-cerrar");
const botonIniciarSesion = document.querySelector(".boton-iniciar-sesion");
const botonGoogle = document.querySelector(".boton-google");
const botonFacebook = document.querySelector(".boton-facebook");
const botonRegistrarseEnviarFormulario = document.querySelector(".boton-registrarse-enviar");
const botonIniciarSesionIrAlHome = document.querySelector(".boton-inicio-sesion-enviar ");
const mensajeGeneralFormulario = document.querySelector("#aaaddd");
document.addEventListener("keydown", manejarTeclaPresionada);

// Contenedor y overlay
const ContenedorDelFormulario = document.querySelector(
  ".formulario-contenedor"
);
const overlay = document.querySelector(".overlay");

//formularioss
const formRegistro = document.querySelector(".form-registro");
const formIniciarSesion = document.querySelector(".form-iniciar-sesion");
const cualquieraDeLosFormularios = document.querySelectorAll(".formulario-contenedor form");
const mensajeDeRegistroExitoso = document.querySelector(".mensaje-registro-con-exito");
const botonMensajeDeRegistroExitosoIrAlHome = document.querySelector(".boton-exito-al-home");


//Barra de carga
const loader = document.querySelector(".loader");

//constantes para usar
const mostrar = "show";
const ocultar = "hide";

// Abre el form de registro
botonRegistrarse.addEventListener("click", () => {
  ContenedorDelFormulario.classList.remove(ocultar);
  overlay.classList.remove(ocultar);
  formRegistro.classList.remove(ocultar);

  ContenedorDelFormulario.classList.add(mostrar);
  overlay.classList.add(mostrar);
  formRegistro.classList.add(mostrar);
});

// cierra el formulario
botonCerrarFormulario.addEventListener("click", cerrarFormulario);

// Muestra la animacion con cualquiera de los formularios
function irAlHome() {
    console.log("en ir al home ");
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";

  ContenedorDelFormulario.classList.add(ocultar);
  overlay.classList.remove(mostrar);

  loader.classList.remove(ocultar);
  loader.classList.add(mostrar);

  window.scrollTo(0, 0);

  setTimeout(function () {
    window.location.href = "home.html";
  }, 5000);
}

//Abre el form de inciciar sesion
botonIniciarSesion.addEventListener("click", () => {
  ContenedorDelFormulario.classList.remove(ocultar);
  overlay.classList.remove(ocultar);
  formIniciarSesion.classList.remove(ocultar);

  ContenedorDelFormulario.classList.add(mostrar);
  overlay.classList.add(mostrar);
  formIniciarSesion.classList.add(mostrar);
});

botonGoogle.addEventListener("click", () => {
  window.location.href = "home.html";
});

botonFacebook.addEventListener("click", () => {
  window.location.href = "home.html";
});

// Función para manejar el evento de tecla presionada
function manejarTeclaPresionada(event) {
  if (event.key === "Escape") {
    cerrarFormulario(); // Llama a la función para cerrar el formulario
  }
}

function cerrarFormulario() {
  ContenedorDelFormulario.classList.add(ocultar);
  overlay.classList.add(ocultar);
  formRegistro.classList.add(ocultar);
  formIniciarSesion.classList.add(ocultar);
  mensajeDeRegistroExitoso.classList.add(ocultar);
  
  ContenedorDelFormulario.classList.remove(mostrar);
  overlay.classList.remove(mostrar);
  formRegistro.classList.add(ocultar);
  formIniciarSesion.classList.remove(mostrar);
  mensajeDeRegistroExitoso.classList.remove(mostrar);
}

formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    // alert('hola');
  formRegistro.classList.remove("show");
  formRegistro.classList.add("hide");
  
  mensajeGeneralFormulario.classList.add("hide");

  mensajeDeRegistroExitoso.classList.remove("hide");

  window.scrollTo(0, 0);
});

botonMensajeDeRegistroExitosoIrAlHome.addEventListener('click', ()=>{
    
    irAlHome();
})
formIniciarSesion.addEventListener('submit', (e)=>{
    e.preventDefault();
    irAlHome();
})