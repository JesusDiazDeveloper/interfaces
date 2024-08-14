"use strict";

const imagenesContainer = document.querySelector(".imagenes-container");
const prevButton = document.querySelector(".boton-izq");
const nextButton = document.querySelector(".boton-der");
var imagen = document.querySelector(".imagenes-container .img");
let anchoDeLaImagen;
let numeroDeImagenActual = 0;
let cantidadDeImagenes = document.querySelectorAll(".imagenes-container .img").length;
//Barra de carga

const loader = document.querySelector(".loader");
const elementosAOcultarParaLoader = document.querySelectorAll(".ocultar-para-el-loader")
//constantes para usar
const mostrar = "show";
const ocultar = "hide";

const overlay = document.querySelector(".overlay");

document.addEventListener('DOMContentLoaded', function () {
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)";

  elementosAOcultarParaLoader.forEach(function(elemento) {
    elemento.classList.add(ocultar);
});

  overlay.classList.remove(ocultar);

  loader.classList.remove(ocultar);
  loader.classList.add(mostrar);

  window.scrollTo(0, 0);

  setTimeout( ()=> {
    
    loader.classList.remove(mostrar);
    loader.classList.add(ocultar);
    
    elementosAOcultarParaLoader.forEach(function(elemento) {
      elemento.classList.remove(ocultar);
      overlay.classList.add(ocultar);
  });
  }, 5000)

});












nextButton.addEventListener("click", () => {
  anchoDeLaImagen = imagen.offsetWidth;

  // Incrementa el contador
  numeroDeImagenActual++;

  // Si hemos llegado al final, volvemos a la primera imagen
  if (numeroDeImagenActual >= cantidadDeImagenes) {
    numeroDeImagenActual = 0;
  }

  // Calcula la posición de desplazamiento
  const targetScrollLeft = numeroDeImagenActual * anchoDeLaImagen;
  imagenesContainer.scrollLeft = targetScrollLeft;

});


prevButton.addEventListener("click", () => {
  anchoDeLaImagen = imagen.offsetWidth;

  // Decrementa el contador
  numeroDeImagenActual--;

  // Si estamos en la primera imagen, vamos a la última
  if (numeroDeImagenActual < 0) {
    numeroDeImagenActual = cantidadDeImagenes - 1; // Cambia 2 por el número total de imágenes - 1
  }

  const targetScrollLeft = numeroDeImagenActual * anchoDeLaImagen;
  imagenesContainer.scrollLeft = targetScrollLeft;
});
// FUNCION CAMBIA  ESTILO CARRITO

// Obtener todas las tarjetas
const tarjetas = document.querySelectorAll('.slide');

// Función para alternar el contenido del carrito
function toggleCarrito(event) {
  const tarjeta = event.currentTarget; // La tarjeta actual que recibió el clic
  const iconoCarrito = tarjeta.querySelector('.icono-carrito img');
  let carritoVacio = iconoCarrito.alt === 'icono carrito'; // Verificar si el carrito está vacío

  if (carritoVacio) {
    iconoCarrito.src = 'assets/img/carrito.svg';
    iconoCarrito.alt = 'icono carrito agregado';
  } else {
    iconoCarrito.src = 'assets/img/iconos/icono-carrito.svg';
    iconoCarrito.alt = 'icono carrito';
  }
}

// Agregar el evento clic a todas las tarjetas
tarjetas.forEach(function (tarjeta) {
  tarjeta.addEventListener('click', toggleCarrito);
});





// carusel 2
const carousel = document.querySelector('.carousel');
const slide = document.querySelector(".carousel .slideCarruselScroll");
const botonDerecha = document.querySelector('.boton-derecha2');
const botonIzquierda = document.querySelector('.boton-izquierda');


let numeroDeSlideActual = 0;
let todasLasSlides = document.querySelectorAll(".carousel .slideCarruselScroll");
let cantidadDeSlides = todasLasSlides.length;

const anchoDeSlide = slide.offsetWidth + 15 + 15;

botonDerecha.addEventListener('click', () => {


  numeroDeSlideActual++;

  let windowWidth = window.innerWidth;

  if (windowWidth < 992) {
    // con esto hago que vaya hasta la ultima
    if (numeroDeSlideActual >= cantidadDeSlides) {
      numeroDeSlideActual = 0;
    }
  }
  else {
    // con esto hago que corte antes y muestre solo las necesarias
    if (numeroDeSlideActual >= cantidadDeSlides - 4) {
      numeroDeSlideActual = 0;
    }
  }

  // Calcula la posición de desplazamiento
  const targetScrollLeft = numeroDeSlideActual * anchoDeSlide;
  carousel.scrollLeft = targetScrollLeft;

  todasLasSlides.forEach(elemento => {
    setTimeout(() => {
      elemento.classList.add('skew-animation');
    }, 100);


    setTimeout(() => {
      elemento.classList.remove('skew-animation');
    }, 500);
  });


});



botonIzquierda.addEventListener('click', () => {

  // Incrementa el contador
  numeroDeSlideActual--;

  if (numeroDeSlideActual < 0) {
    //aca hace que se valla a el final -1.. o sea 8-1 = 7 
    numeroDeSlideActual = cantidadDeSlides - 5;
  }

  // Calcula la posición de desplazamiento
  const targetScrollLeft = numeroDeSlideActual * anchoDeSlide;
  carousel.scrollLeft = targetScrollLeft;

  todasLasSlides.forEach(elemento => {
    setTimeout(() => {
      elemento.classList.add('skew-animation-left'); // Quita el punto (.) antes de 'skew-animation'
    }, 100); // 1000 milisegundos (1 segundo)

    // Quita la clase después de otro segundo (2 segundos en total)
    setTimeout(() => {
      elemento.classList.remove('skew-animation-left'); // Quita el punto (.) antes de 'skew-animation'
    }, 500); // 2000 milisegundos (2 segundos en total)
  });

});

//FUNCION  CLICK JUGAR DE LA CARD
const botonJugar = document.getElementById('botonJugarTomy');

botonJugar.addEventListener("click", function () {
  window.location.href = "modoEjecucion.html";
});

