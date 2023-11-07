//Tercera entrega

let canvasJuego = document.querySelector(".canvas-juego");
let context = canvasJuego.getContext("2d");
// console.log("context",context);
let canvasWidth = canvasJuego.width;
let canvasHeight = canvasJuego.height;
const imageData = context.createImageData(canvasWidth, canvasHeight);
// Esto es del pop up
const startGameButton = document.getElementById("start-game");

const backgroundImage = new Image();
backgroundImage.src = 'assets/img/juego/FondoJuego.png';

// const sonidoVictoria = new Audio('ruta/al/archivo-de-sonido.mp3');


let isMouseDown;
let ultimaFichaClickeada;

let matriz;
let timer;
let fichas;
let turno;
let PosYFinDeLaMatriz;

let Ganador;

canvasJuego.addEventListener('mousedown', onMouseDown, false);
canvasJuego.addEventListener('mouseup', onMouseUp, false);
canvasJuego.addEventListener('mousemove', onMouseMove, false);

let anchoCasilla = 50; // solo modificar este.. y se actualiza el otro al toque
let altoCasilla = anchoCasilla;

//logica para mostrar el timer restante
let tiempoRestante;

let fichaTerminoDeCaer;

let botonReiniciar;
let botonSonido;
let botonCambiarConfiguracion;

let opcionesDeFichaJug1 = document.querySelectorAll(".opciones-jug-1");
let opcionesDeFichaJug2 = document.querySelectorAll(".opciones-jug-2");

let fichaSeleccionadaJugador1 = opcionesDeFichaJug1[0];
let fichaSeleccionadaJugador2 = opcionesDeFichaJug2[1];
let fichaInvalidadJug1 = opcionesDeFichaJug1[1];
let fichaInvalidadJug2 = opcionesDeFichaJug2[0];


// Agrega un event listener de clic a cada elemento
opcionesDeFichaJug1.forEach((elemento) => {
    elemento.addEventListener("click", function () {
        nombreDelJugador2Actual = fichaSeleccionadaJugador2.getAttribute("data-name");
        nombreFichaNueva = elemento.getAttribute("data-name");

        if (nombreDelJugador2Actual != nombreFichaNueva) {
            cambiarFocusFicha(elemento, fichaSeleccionadaJugador1, opcionesDeFichaJug2);
            fichaSeleccionadaJugador1 = elemento;
            quitarOpcionAlOtroJugador(elemento);
        }
    });
});

// Agrega un event listener de clic a cada elemento
opcionesDeFichaJug2.forEach((elemento) => {
    elemento.addEventListener("click", function () {
        nombreDelJugador1Actual = fichaSeleccionadaJugador1.getAttribute("data-name");
        nombreFichaNueva = elemento.getAttribute("data-name");

        if (nombreDelJugador1Actual != nombreFichaNueva) {
            cambiarFocusFicha(elemento, fichaSeleccionadaJugador2, opcionesDeFichaJug1);
            fichaSeleccionadaJugador2 = elemento;
            quitarOpcionAlOtroJugador(elemento);
        }
    });
});

function cambiarFocusFicha(elemento, fichaJugadorAnterior, ArrayDelOtroJugador) {
    fichaJugadorAnterior.classList.remove("agregarResplandorAFicha");
    elemento.classList.add("agregarResplandorAFicha");
    quitarOpcionAlOtroJugador(elemento, ArrayDelOtroJugador);
}

function quitarOpcionAlOtroJugador(elemento, ArrayDelOtroJugador) {
    ArrayDelOtroJugador.forEach((fichaDelArray) => {
        if (elemento.getAttribute("data-name") == fichaDelArray.getAttribute("data-name")) {
            fichaDelArray.classList.add("quitarOpcionDeFicha");
        }
        else {
            fichaDelArray.classList.remove("quitarOpcionDeFicha");
        }
    });
}


//Configuracion del juego antes de jugar.
const popup = document.querySelector(".popup")
const fichaJugador1Select = document.getElementById("fichaJugador1");
const fichaJugador2Select = document.getElementById("fichaJugador2");
const XEnLineaSelect = document.getElementById("XEnLinea");
let fichaJugador1Seleccionada;
let fichaJugador2Seleccionada;
let XEnLineaSeleccionado;


// Pintar el canvas y manejar el inicio
{
    let botonPlayParaComenzarElJuego = document.querySelector(".btn-play ");
    let contenedorJuegoPrevioAJugar = document.querySelector(".contenedor-interior");

    // botonPlayParaComenzarElJuego.addEventListener("click", () => {
    //     contenedorJuegoPrevioAJugar.classList.add("oculto");
    //     canvasJuego.classList.remove("oculto");
    //     crearJuego();
    // })

    //Despues cambiar y dejar el click de arriba!!


    document.addEventListener("DOMContentLoaded", () => {
        contenedorJuegoPrevioAJugar.classList.add("oculto");
        // // canvasJuego.classList.remove("oculto");
        // timerInterval = setInterval(actualizarTiempo, 1000); // Llama a actualizarTiempo cada segundo
        // setTimeout(function () { drawAll(); }, 100); // vuelve a dibujar para que carguen imagenes 
        // crearJuego(); // Crea las fichas y tablero
    });

    startGameButton.addEventListener("click", empezarAJugar);

    function empezarAJugar() {

        isMouseDown = false;
        ultimaFichaClickeada = null;
        matriz = new Matriz(0, 0, context, "red", 0, 0, 0, 0);
        timer = new Timer();
        fichas = [];
        turno = 1;
        Ganador = 0;
        tiempoRestante = 300
        fichaTerminoDeCaer = false


        // canvasJuego.classList.remove("oculto");
        // fichaJugador1Seleccionada = fichaJugador1Select.value;
        fichaJugador1Seleccionada = fichaSeleccionadaJugador1.getAttribute("data-name");
        fichaJugador2Seleccionada = fichaSeleccionadaJugador2.getAttribute("data-name");
        XEnLineaSeleccionado = parseInt(XEnLineaSelect.value);
        canvasJuego.classList.remove("oculto");
        popup.classList.add("oculto");
        timerInterval = setInterval(actualizarTiempo, 1000); // Llama a actualizarTiempo cada segundo indefinidamente
        setTimeout(function () { drawAll(); }, 500); // vuelve a dibujar para que carguen imagenes 
        setTimeout(function () { drawAll(); }, 1000); // vuelve a dibujar para que carguen imagenes 
        setTimeout(function () { drawAll(); }, 1500); // vuelve a dibujar para que carguen imagenes 
        setTimeout(function () { drawAll(); }, 3000); // vuelve a dibujar para que carguen imagenes 
        crearJuego(); // Crea las fichas y tablero

    }

    function crearJuego() {
        let cantidadDeFichas = ((XEnLineaSeleccionado * 10) + 2) / 2
        crearFichasJugador(1, cantidadDeFichas);
        crearFichasJugador(2, cantidadDeFichas);
        crearMatriz();
        crearBotones();
    }

}

//dibujar las fichas
{
    function drawAll() {

        clearCanvas();

        matriz.draw();
        // mostrarTurnoDelJugador();
        timer.drawTimer(tiempoRestante, canvasWidth);

        drawBotones();

        let ficha;
        if (Ganador != 0) {
            mostrarGanador(Ganador)
        }
        for (let i = 0; i < fichas.length; i++) {
            ficha = fichas[i];
            if (Ganador != 0) {
                ficha.setBrilloExterior(false);
            }
            else if (ficha.getJugador() == turno && ficha.estaEnLaPosicionIncial()) {
                ficha.setBrilloExterior(true);
            }
            else {
                ficha.setBrilloExterior(false);
            }
            ficha.draw();
        }

    }

    function crearBotones() {
        botonCambiarConfiguracion = new Boton(canvasWidth - 120, 30, 'red', context, 50, 50, "assets/img/juego/IconoAjustes.png");
        botonReiniciar = new Boton(canvasWidth - 190, 30, 'red', context, 50, 50, "assets/img/juego/IconoReiniciar.png");
        botonSonido = new Boton(canvasWidth - 260, 30, 'red', context, 50, 50, "assets/img/juego/IconoSonido.png");
    }

    function drawBotones() {
        if (botonReiniciar != null) {
            botonReiniciar.draw();
        }
        if (botonSonido != null) {
            botonSonido.draw();
        }
        if (botonCambiarConfiguracion != null) {
            botonCambiarConfiguracion.draw();
        }
    }

    function crearFichasJugador(numeroDelJugador, cantidad) {
        let contador = 0;
        let limite = 15;
        let anchoFicha = anchoCasilla;
        let posX;

        if (numeroDelJugador === 1)
            posX = 100;
        else
            posX = canvasWidth - 100;


        let aux = 0;
        for (let i = 0; i < cantidad; i++) {

            if (contador <= limite) {
                addFicha(posX, (20 * aux + 300), numeroDelJugador);
                contador++;
                aux++;
            }
            else {
                if (numeroDelJugador === 1)
                    posX += anchoFicha;
                else
                    posX -= anchoFicha;
                aux = 0;
                limite += 15;
                addFicha(posX, (20 * aux + 300), numeroDelJugador);
                contador++;
            }
        }

    }

    function addFicha(posX, posY, numeroDelJugador) {
        let ficha;
        if (numeroDelJugador === 1) {
            ficha = new Ficha(posX, posY, "", context, altoCasilla / 2, numeroDelJugador, fichaJugador1Seleccionada);
        }
        else {
            ficha = new Ficha(posX, posY, "", context, altoCasilla / 2, numeroDelJugador, fichaJugador2Seleccionada);

        }
        fichas.push(ficha);

    }

    function clearCanvas() {
        
        

        // context.fillStyle = '#97CAEF';
        // context.fillStyle = '#FFFFFF'; //blanco
        // context.fillStyle = '#8e58ee'; // Violeta
        // context.fillStyle = '#4da5fe'; //celeste
        // context.fillStyle = '#ffef53'; //amarillo este no, es feo
        
        // context.fillRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

    }

    //Dibujar Matriz 
    function crearMatriz() {
        let cantC = XEnLineaSeleccionado + 3;
        let cantF = XEnLineaSeleccionado + 2;
        let posX = (canvasWidth - (cantC * anchoCasilla)) / 2;
        let posY = 180;

        PosYFinDeLaMatriz = posY + (altoCasilla * cantF);

        matriz = new Matriz(posX, posY, context, "", anchoCasilla, altoCasilla, XEnLineaSeleccionado);
    }

}




// eventos
function onMouseDown(e) {
    isMouseDown = true;

    verificarSiSeClickeoAlgunBoton(e.offsetX, e.offsetY);


    if (ultimaFichaClickeada != null) {
        ultimaFichaClickeada.setResaltado(false);
        ultimaFichaClickeada = null;
    }

    let figuraClickeada = encontrarFiguraClickeada(e.offsetX, e.offsetY);

    if (figuraClickeada != null
        && figuraClickeada.getJugador() === turno
        && !figuraClickeada.getEstaFija()) {
        ultimaFichaClickeada = figuraClickeada;
    }

    drawAll();
}

function encontrarFiguraClickeada(x, y) {
    for (let i = 0; i < fichas.length; i++) {
        const element = fichas[i];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

function verificarSiSeClickeoAlgunBoton(x, y) {
    if (botonReiniciar.isPointInside(x, y)) {
        console.log("Click en el Boton de Reiniciar");
        clearCanvas();
        clearInterval(timerInterval);
        empezarAJugar();
    }

    if (botonCambiarConfiguracion.isPointInside(x, y)) {
        canvasJuego.classList.add("oculto");
        popup.classList.remove("oculto");
    }
}

function onMouseMove(e) {
    if (isMouseDown &&
        ultimaFichaClickeada != null
        && !ultimaFichaClickeada.getEstaFija()) {
        ultimaFichaClickeada.setPosition(e.offsetX, e.offsetY);
        drawAll();
    }
}

function onMouseUp(e) {
    isMouseDown = false;
    const fichaSoltada = encontrarFiguraClickeada(e.offsetX, e.offsetY);

    //le saco el resaltado
    if (fichaSoltada && !fichaSoltada.getEstaFija()) {
        fichaSoltada.setResaltado(false);

        drawAll();

        let fichaEntroEnLaMatriz = matriz.verificarSiFichaEntroALamatriz(fichaSoltada);
        if (fichaEntroEnLaMatriz != null) {
            cambiarTurno();
            // animateFichaToInitialPosition(fichaSoltada,fichaSoltada.getPosX(), calcularY(fichaEntroEnLaMatriz.columna))
            let filaDondeSePusoLaFicha = fichaEntroEnLaMatriz.fila;
            let columnaDondeSePusoLaFicha = fichaEntroEnLaMatriz.columna;

            if (matriz.verificarSiHayGanador(fichaSoltada, filaDondeSePusoLaFicha, columnaDondeSePusoLaFicha)) {
                // lanzar confeti 
                mostrarGanador(fichaSoltada.getJugador());
            }

            fichaSoltada.setEstaFija(true);
            animateFichaToInitialPosition(fichaSoltada, calcularX(columnaDondeSePusoLaFicha), calcularY(filaDondeSePusoLaFicha), true);
            //setTimeout(function () { cambiarTurno(); }, 400);

        } else {
            // Vuelvo la ficha hacia su posición inicial
            animateFichaToInitialPosition(fichaSoltada,
                fichaSoltada.getPosInicialX(), fichaSoltada.getPosInicialY(), false);
        }
    }
}

// Calcula la posicion Y a partir de la Y donde se genero la matriz(parte de arriba) +
// altoCasilla que seria el alto de 1 ficha porque cuando es 0 quier que minimo entre en la matriz+ 
// la fila donde se puso en la matriz logica* altoDeLaFicha + 30 (mitad de una ficha) para que se centre 
function calcularY(filaDondeSePusoLaFicha) {

    let resultado = matriz.posY + filaDondeSePusoLaFicha * altoCasilla + altoCasilla / 2;
    return resultado;
}

function calcularX(columnaDondeSePusoLaFicha) {
    resultado = matriz.posX + columnaDondeSePusoLaFicha * anchoCasilla + anchoCasilla / 2;
    return resultado
}
// funcion que anima la ficha al caer, 
function animateFichaToInitialPosition(ficha, finalX, finalY, rebotar) {

    const currentX = ficha.getPosX();
    const currentY = ficha.getPosY();

    const animationDuration = 400; // Duración de la animación en milisegundos
    const bounceDuration = 200; // Duración del rebote en milisegundos

    const framesPerSecond = 60;
    const totalFrames = (animationDuration / 1000) * framesPerSecond;
    const bounceFrames = (bounceDuration / 1000) * framesPerSecond;

    const xStep = (finalX - currentX) / totalFrames;
    const yStep = (finalY - currentY) / totalFrames;

    let currentFrame = 0;

    function animate() {
        currentFrame++;
        if (currentFrame <= totalFrames) {
            const newX = currentX + xStep * currentFrame;
            const newY = currentY + yStep * currentFrame;

            ficha.setPosition(newX, newY);
            drawAll();

            if (currentFrame === totalFrames && rebotar == true) { // solo rebota si fue puesto dentro de la matriz, si no, no
                // Realiza el rebote una vez al final de la animación
                animateBounce(finalX, finalY);
            } else {
                requestAnimationFrame(animate);
            }
        }
    }
    //controla el efecto de rebote al final de la animacion
    function animateBounce(finalX, finalY) {
        let currentBounceFrame = 0;
        function bounce() {
            currentBounceFrame++;
            if (currentBounceFrame <= bounceFrames) {
                const bounceY = finalY - 40 * Math.sin((currentBounceFrame / bounceFrames) * Math.PI);
                ficha.setPosition(finalX, bounceY);
                drawAll();
                requestAnimationFrame(bounce);

            } else {
                drawAll();
            }
        }
        bounce();
    }
    animate();

}







//funcion que muestra de quien es el turno para jugar
// function mostrarTurnoDelJugador() {
//     // context.fillStyle = "black"; // Color del texto
//     // context.font = "bold 20px Tahoma";
//     // context.textAlign = "right";
//     // context.fillText(`Es tu turno, Jugador ${turno}`, canvasWidth / 2, canvasHeight / 11);
// }
// Función para cambiar el turno
function cambiarTurno() {
    turno = (turno === 1) ? 2 : 1; // Alternar entre "1" y "2"
}


//Timer
// function drawTimer(tiempoRestante) {
//     const minutos = Math.floor(tiempoRestante / 60);
//     const segundos = tiempoRestante % 60;
//     const tiempoFormateado = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
//     let imageWidth;
//     context.font = "bold 30px 'Courier New', Courier, monospace";
//     context.textAlign = "left";
//     context.fillStyle = "black";

//     // Dibuja la imagen debajo del texto
//     const image = new Image();
//     image.src = "assets/img/juego/Timer.png"; 
//     image.onload = function () {
//         imageWidth = (image.width / 2);
//         context.drawImage(image, canvasWidth / 2 - imageWidth, 40); 
//         context.fillText(`${tiempoFormateado}`, canvasWidth / 2 - imageWidth + 80, 70);
//     };
// }

function actualizarTiempo() {
    if (tiempoRestante > 0) {
        tiempoRestante--; // Restar un segundo
        timer.drawTimer(tiempoRestante, canvasWidth);

    } else {
        console.log("se termino el tiempo");
        clearInterval(timerInterval); // Detener el temporizador
    }
}

function mostrarGanador(ganador) {
    console.log("Entro en mostrar Ganador y ganador es: " + ganador);
    Ganador = ganador;
    const texto = `Ganador: Jugador ${ganador}`;

    const imageCopa = new Image();
    imageCopa.src = "assets/img/juego/ImagenCopa.png";
    imageCopa.onload = function () {

        //Dibujo el cuadro de Ganador
        context.fillStyle = "yellow";
        context.fillRect((canvasWidth / 2) - 300, (PosYFinDeLaMatriz + 10), 600, 50);

        //Dibujo los trofeos
        context.drawImage(imageCopa, (canvasWidth / 2) - 300, (PosYFinDeLaMatriz + 10));
        context.drawImage(imageCopa, ((canvasWidth / 2) + 300) - imageCopa.width, (PosYFinDeLaMatriz + 10));

        //Escribo el texto
        context.font = "40px 'Baloo', Courier, monospace";
        context.textAlign = "center";
        context.fillStyle = "black";
        context.fillText(texto, canvasWidth / 2, PosYFinDeLaMatriz + 50);
        clearInterval(timerInterval);

    };
}

console.log("cargo Main");

// minuto 19 de Practica - Formas (POO y Eventos) explica lo del clear
