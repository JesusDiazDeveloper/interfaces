"use strict";

// menu desplegable----------------------------------------
let navIcon = document.getElementById('nav-icon1');
let logoHeader = document.querySelector("#logoHeader");
let logoHeaderMini = document.querySelector("#logoHeaderMini");


// Menu Hamburguesa
//Es la X 
{
  document.addEventListener("DOMContentLoaded", function () {

    if (navIcon) {
      navIcon.addEventListener('click', function () {
        navIcon.classList.toggle('open');
      });
    }
  });

  // es el menu 
  document.addEventListener('DOMContentLoaded', function () {
    const navIcon = document.getElementById('nav-icon1');
    const menu = document.getElementById('menu');
    const l1 = document.querySelector('.l1');
    const l2 = document.querySelector('.l2');
    const l3 = document.querySelector('.l3');
    const l4 = document.querySelector('.l4');

    navIcon.addEventListener('click', function () {
      menu.classList.toggle('menu-abierto');
      l1.classList.toggle('animacion1');
      l2.classList.toggle('animacion2');
      l3.classList.toggle('animacion3');
      l4.classList.toggle('animacion4');
    });
  });
}



// Tamaño original de la imagen
const originalWidthOfLogoHeader = logoHeader.width;
const originalHeightOfLogoHeader = logoHeader.height;
// Tamaño mínimo al hacer scroll hacia abajo
let minWidthOfLogoHeader = 133;
let minHeightOfLogoHeader = 68;

document.addEventListener('scroll', function () {

  let scrollPosition = window.scrollY;
  
  // Reducción del tamaño al hacer scroll hacia abajo
  let scale = Math.max(minWidthOfLogoHeader / originalWidthOfLogoHeader, minHeightOfLogoHeader / originalHeightOfLogoHeader);

  // Ajusta el tamaño de la imagen en función de la posición del scroll
  logoHeader.style.width = originalWidthOfLogoHeader * (1 - scale * scrollPosition / 25) + 'px';
  logoHeader.style.height = originalHeightOfLogoHeader * (1 - scale * scrollPosition / 25) + 'px';


  // Ajusta la posición superior de la imagen para mantenerla fija en la parte superior
  logoHeader.style.top = Math.min(0, -scrollPosition) + 'px';

  // Ajusta la posición del logoHeader cuando el scroll llega a 80
  if (scrollPosition >= 80) {
    logoHeader.style.display = "none";
    logoHeaderMini.style.display = "block";
  }
  else {
    logoHeader.style.display = "block";
    logoHeaderMini.style.display ="none";
  }

});