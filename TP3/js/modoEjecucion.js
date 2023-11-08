"use strict";

// menu desplegable----------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  let navIcon = document.getElementById('nav-icon1');

  if (navIcon) {
    navIcon.addEventListener('click', function () {
      navIcon.classList.toggle('open');
    });
  }
});

const navIcon = document.getElementById('nav-icon1'),
  menu = document.getElementById('menu');

navIcon.addEventListener('click', (e) => {
  menu.classList.toggle('active');
})


// menu usuario

const usuarioLogueado = document.querySelector('.usuario-logueado');
const menuUsuario = document.querySelector('.cont-menu-user');

usuarioLogueado.addEventListener('click', function () {

  menuUsuario.classList.toggle('active-user');
  // le tuve que agregar esto porque si no, molesta al mobile first
  // tiene por defecto hide cuando carga, y con eso se la saco
  menuUsuario.classList.toggle('hide');
});


//FUNCION HOME

const logoHeader = document.querySelectorAll('.logo');
const logoFooter = document.querySelectorAll('.logoSuperJuegos');
const contMenu = document.querySelectorAll('.cont-menu');


logoHeader.forEach(function (item) {
  item.addEventListener('click', redirigirAHome);
})

logoFooter.forEach(function (item) {
  item.addEventListener('click', redirigirAHome);
})
contMenu.forEach(function (item) {
  item.addEventListener('click', redirigirAHome);
})


function redirigirAHome() {

  // Redirige a la página home
  window.location.href = "home.html";
}

//FUNCION BOTON FAVORITO
const corazon = document.querySelector('.corazon-botonera');

corazon.addEventListener('click', function () {
  corazon.classList.toggle('favorito');
});





