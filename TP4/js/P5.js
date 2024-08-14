const personajeNegro = document.getElementById("personajeNegro");
const personajeHulk = document.getElementById("personajeHulk");
const personajeElastigirl= document.getElementById("personajeElastigirl");

const P5containerFluid = document.querySelector(".parallax5");
const P5containerChico = document.querySelector(".contenedorP5");

let mouseDentroSeccion = false;

const XhulkInicial= personajeHulk.clientX;
const YhulkInicial= personajeHulk.clientY;


// listener cuando entra em el div 
P5containerChico.addEventListener("mouseenter", function () {
    mouseDentroSeccion = true;
});


// listener cuando abandona el div
P5containerChico.addEventListener("mouseleave", function () {
    mouseDentroSeccion = false;
    personajeHulk.style.left = XhulkInicial + "px";
    personajeHulk.style.top = YhulkInicial + "px";
});

let objectsToMove = document.querySelectorAll(".object");

document.addEventListener("mousemove", function (e) {
    // Verifica si el mouse está dentro de la sección
    if(mouseDentroSeccion) {
        objectsToMove.forEach(function (move) {
            var moving_value = move.getAttribute("data-value");
            var x = (e.clientX * moving_value) / 250;
            var y = (e.clientY * moving_value) / 250;
            move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
        }
        )
    }
});

