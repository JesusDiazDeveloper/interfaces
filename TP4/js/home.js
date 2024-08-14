"use strict";

//COMPORTAMIENTO P1

let edificiosIzq = document.getElementById("edificiosIzq");
let edificiosDer = document.getElementById("edificiosDer");
let edificiosAtras = document.getElementById("edificiosAtras");
let spiderLila = document.getElementById("spiderLila");
let spiderNegro = document.getElementById("spiderNegro");
let spiderRojo = document.getElementById("spiderRojo");
let sogaDer = document.getElementById("sogaDer");
let sogaIzq = document.getElementById("sogaIzq");
let cieloP1 = document.getElementById("cieloP1");
let spiderRojoContainer = document.querySelector(".contenedorSpideyRojo")
let spiderNegroContainer = document.querySelector(".contenedorSpideyNegro")

document.addEventListener('scroll', function () {
  let scrollPosition = window.scrollY;

  if (scrollPosition > 20 && scrollPosition < 480) {
    edificiosIzq.style.top = (scrollPosition + 330) * 0.5 + 'px';
    edificiosIzq.style.scale = 1 + scrollPosition / 1000;
    edificiosAtras.style.bottom = (-scrollPosition - 0) * 0.3 + 'px';
    edificiosDer.style.top = (scrollPosition + 230) * 0.5 + 'px';
    edificiosDer.style.scale = 1 + scrollPosition / 1000;
  }

  // Mueve los personajes de la parte inicial
  if (scrollPosition < 600) {
    spiderRojoContainer.style.transform = `translate(${-scrollPosition * 0.2}px, ${-scrollPosition * 0.5}px )`;
    spiderNegroContainer.style.transform = `translate(${scrollPosition * 0.2}px, ${-scrollPosition * 0.5}px )`;
    spiderLila.style.transform = `translate(${-scrollPosition * 0.2}px, ${-scrollPosition * 0.5}px )`;
  }

}
);



document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function (){
    edificiosIzq.style.opacity=1;
    edificiosDer.style.opacity=1;
    edificiosAtras.style.opacity=1;
    spiderNegroContainer.style.opacity=1;
    spiderRojoContainer.style.opacity=1;
    spiderLila.style.opacity=1;



    


  }, 6000)

});



const ocultar = "hide";
const mostrar = "show";
const body = document.body;

let contenedorPaginaEntera = document.querySelector(".contenedorPaginaEntera")

const loaderContainer = document.querySelector(".loader-container");
const loader = document.querySelector(".loader");
const contenedorLogoHeader = document.querySelector(".contenedorLogoHeader");

const aranas = document.querySelectorAll('.aranaInicio');


// Loader + pantalla inicial
document.addEventListener('DOMContentLoaded', function () {

  body.style.overflow = "hidden";

  loader.classList.add(mostrar);

  setTimeout(() => {
    body.style.overflow = "auto";
    loader.classList.remove(mostrar);
    loader.classList.add(ocultar);
    loader.style.display = "none";
    loaderContainer.style.display = "none";
    contenedorPaginaEntera.style.display = "block";

    // Oculta cada araña
    aranas.forEach(arana => {
      arana.style.display = "none";
    });
  }, 5000);
});

// Para trabajar
// document.addEventListener('DOMContentLoaded', function () {

//   body.style.overflow = "auto";
//   loader.classList.remove(mostrar);
//   loader.classList.add(ocultar);
//   loader.style.display = "none";
//   loaderContainer.style.display = "none";
//   contenedorPaginaEntera.style.display = "block";

//   // Oculta cada araña
//   aranas.forEach(arana => {
//     arana.style.display = "none";
//   });
// });



// COMPORTAMIENTO P2 DUENDE

let personajeDuendeVerde = document.getElementById("personajeDuendeVerde");

document.addEventListener('scroll', function () {
  let scrollPosition = window.scrollY;
  if (scrollPosition > 10) {

    personajeDuendeVerde.style.top = -scrollPosition * 0.2 + 'px';
  }
})


// //COMPORTAMIENTO P3

let contenedoresGameplayMasTexto = document.querySelectorAll(".contenedorgameplayMasTexto");

contenedoresGameplayMasTexto.forEach((contenedor) => {
  window.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;
    if (scrollPosition > 1100) {
      contenedor.classList.add("animacionCards");
    } else {
      contenedor.classList.remove("animacionCards");
      contenedor.classList.add("desaparecer");
    }
  });
});



// COMPORTAMIENTO P4

let P4card1 = document.querySelector(".P4card1")
let P4card2 = document.querySelector(".P4card2")
let P4card3 = document.querySelector(".P4card3")

document.addEventListener('scroll', function () {
  let scrollPosition = window.scrollY;
  if ((scrollPosition > 2000) && (scrollPosition < 3000)) {
    P4card1.style.top = -scrollPosition * 0.2 + 550 + 'px';
    P4card2.style.top = -scrollPosition * 0.2 + 550 + 'px';
    P4card3.style.top = -scrollPosition * 0.2 + 550 + 'px';
  }
})


// COMPORTAMIENTO P6
let contenedorImagenP6AAA = document.querySelector(".imagenCarrusel");
let inicio = 3800;
let P6Imagen1 = document.querySelector(".P6imagen1");
let P6Imagen2 = document.querySelector(".P6imagen2");
let P6Imagen3 = document.querySelector(".P6imagen3");
let P6Imagen4 = document.querySelector(".P6imagen4");

document.addEventListener("scroll", () => {

  function ocultar() {

    document.querySelectorAll(".contenedorTextoParallax6").forEach((element) => {
      element.classList.remove("fade-in-active");
    });

    document.querySelectorAll(".imagenCarrusel").forEach((element) => {
      element.classList.remove("desactivar");
      element.classList.remove("mostrar");
    })
  }

  if (window.scrollY < inicio) {
    ocultar();
    P6Imagen1.classList.add("desactivar");
    P6Imagen2.classList.add("desactivar");
    P6Imagen3.classList.add("desactivar");
    P6Imagen4.classList.add("desactivar");
  }

  // 1
  if (window.scrollY > inicio) {
    ocultar();
    P6Imagen1.classList.add("mostrar");
    P6Imagen2.classList.add("desactivar");
    P6Imagen3.classList.add("desactivar");
    P6Imagen4.classList.add("desactivar");
    document.querySelector(".P6texto1").classList.add("fade-in-active");
  }

  // 2
  if (window.scrollY > (inicio + 170) && window.screenY < (inicio + 500)) {
    ocultar();
    P6Imagen1.classList.add("mostrar");
    P6Imagen2.classList.add("desactivar");
    P6Imagen3.classList.add("desactivar");
    P6Imagen4.classList.add("desactivar");
    document.querySelector(".P6texto1").classList.add("fade-in-active");
    document.querySelector(".P6texto2").classList.add("fade-in-active");
  }

  // 3
  if (window.scrollY > (inicio + 500) && window.screenY < (inicio + 900)) {
    ocultar();
    P6Imagen1.classList.add("desactivar");
    P6Imagen2.classList.add("mostrar");
    P6Imagen3.classList.add("desactivar");
    P6Imagen4.classList.add("desactivar");
    document.querySelector(".P6texto2").classList.add("fade-in-active");
  }
  //4 
  if (window.scrollY > (inicio + 850) && window.scrollY < (inicio + 1300)) {
    ocultar();
    P6Imagen1.classList.add("desactivar");
    P6Imagen2.classList.add("desactivar");
    P6Imagen3.classList.add("mostrar");
    P6Imagen4.classList.add("desactivar");
    document.querySelector(".P6texto3").classList.add("fade-in-active");
  }
  //final 
  if (window.scrollY > (inicio + 1250)) {
    ocultar();
    P6Imagen1.classList.add("desactivar");
    P6Imagen2.classList.add("desactivar");
    P6Imagen3.classList.add("desactivar");
    P6Imagen4.classList.add("mostrar");
    document.querySelector(".P6texto4").classList.add("fade-in-active");
  }

  //final final
  if (window.scrollY > 5500) {
    ocultar();
    P6Imagen1.classList.add("desactivar");
    P6Imagen2.classList.add("desactivar");
    P6Imagen3.classList.add("desactivar");
    P6Imagen4.classList.add("desactivar");
  }

});

