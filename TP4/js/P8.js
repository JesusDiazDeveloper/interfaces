let containerP8 = document.querySelector(".containerFocus")
let personajeLilaP8 = document.querySelector(".personajeLilaP8 ")
let personajeRojoP8 = document.querySelector(".personajeRojoP8 ")
let personajeNegroP8 = document.querySelector(".personajeNegrP8 ")
let parallax8 = document.querySelector(".parallax8");

let arregloDeSpiders = document.querySelectorAll(".personajeFocusChico");

arregloDeSpiders.forEach(element => {
    element.addEventListener('mouseover', () => cambiarAFocus(element));
});

arregloDeSpiders.forEach(element => {
    element.addEventListener('mouseleave', () => quitarAFocus(element));
});

function cambiarAFocus(element) {
    if(element.dataset.name == "rojo"){
        personajeLilaP8.classList.add("difuminado");
        personajeLilaP8.classList.remove("scale");
        personajeNegroP8.classList.add("difuminado");
        personajeNegroP8.classList.remove("scale");
        personajeRojoP8.classList.remove("difuminado");
        personajeRojoP8.classList.add("scale");
        personajeRojoP8.style.backgroundSize = "auto 100%";
        parallax8.style.backgroundImage = "url('assets/images/fondoP8Azul.png')";
    }
    else if(element.dataset.name == "lila"){
        personajeRojoP8.classList.add("difuminado");
        personajeRojoP8.classList.remove("scale");
        personajeNegroP8.classList.add("difuminado");
        personajeNegroP8.classList.remove("scale");
        personajeLilaP8.classList.remove("difuminado");
        personajeLilaP8.classList.add("scale");
        parallax8.style.backgroundImage = "url('assets/images/FondoP8Rosa.png')";
    }
    else {
        personajeLilaP8.classList.add("difuminado");
        personajeLilaP8.classList.remove("scale");
        personajeRojoP8.classList.add("difuminado");
        personajeRojoP8.classList.remove("scale");
        personajeNegroP8.classList.remove("difuminado");
        personajeNegroP8.classList.add("scale");
        parallax8.style.backgroundImage = "url('assets/images/fondoP8Negro.png')";
    }
}


function quitarAFocus(){
    parallax8.style.backgroundImage = "url('assets/images/FondoP8Blanco.png')";
    arregloDeSpiders.forEach(spider =>{
        spider.classList.remove("scale");
        spider.classList.remove("difuminado");
    })
}
