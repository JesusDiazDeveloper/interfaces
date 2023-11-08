//Tercera entrega

let canvasJuego = document.querySelector(".canvas-juego");
let context = canvasJuego.getContext("2d");
let canvasWidth = canvasJuego.width;
let canvasHeight = canvasJuego.height;

const imageData = context.createImageData(canvasWidth, canvasHeight);
// pop up
const startGameButton = document.getElementById("start-game");

const backgroundImage = new Image();
backgroundImage.src = 'assets/img/juego/FondoJuego.png';

let sonidoHabilitado = true;

const imagenTurno = new Image();
imagenTurno.src = "assets/img/juego/flechaAbajo.png";
imagenTurno.onload = function () {

};

const sonidoVictoria = new Audio('assets/sounds/victorySound.mp3');

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

let anchoCasilla = 50; 
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


// Agrega un event listener de click a cada elemento
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

// Agrega un event listener de click a cada elemento
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

//cambia el foco o la atención visual de una ficha de un jugador a otra.
function cambiarFocusFicha(elemento, fichaJugadorAnterior, ArrayDelOtroJugador) {
    fichaJugadorAnterior.classList.remove("agregarResplandorAFicha");
    elemento.classList.add("agregarResplandorAFicha");
    quitarOpcionAlOtroJugador(elemento, ArrayDelOtroJugador);
}

//activa o desactiva opciones en elementos del otro jugador basándose en una propiedad común ("data-name") entre el elemento que ha cambiado de foco y los elementos del otro jugador
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

    botonPlayParaComenzarElJuego.addEventListener("click", () => {
        contenedorJuegoPrevioAJugar.classList.add("oculto");
        canvasJuego.classList.remove("oculto");
        crearJuego();
    })

    //Despues cambiar y dejar el click de arriba!!


    // document.addEventListener("DOMContentLoaded", () => {
    //     contenedorJuegoPrevioAJugar.classList.add("oculto");
    //     // // canvasJuego.classList.remove("oculto");
    //     // timerInterval = setInterval(actualizarTiempo, 1000); // Llama a actualizarTiempo cada segundo
    //     // setTimeout(function () { drawAll(); }, 100); // vuelve a dibujar para que carguen imagenes 
    //     // crearJuego(); // Crea las fichas y tablero
    // });

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

    //inicializa los componentes para empezar a jugar, crea las fichas de cada jugador, crea la matriz y crea los botones
    function crearJuego() {
        let cantidadDeFichas = ((XEnLineaSeleccionado * 10) + 2) / 2
        crearFichasJugador(1, cantidadDeFichas);
        crearFichasJugador(2, cantidadDeFichas);
        crearMatriz();
        crearBotones();
    }

}

{
    function drawAll() {

        clearCanvas(); //Limpia el lienzo o el área de dibujo
        matriz.draw(); //dibuja el tablero en el canvas
        timer.drawTimer(tiempoRestante, canvasWidth); //dibuja el temporizador en el canvas
        drawBotones(); //dibuja los botones en el canvas
        mostrarTurnoDelJugador();
        
        let ficha;

        //si hay un ganador muestra el ganador en el canvas sino le aplica brillo a las fichas del jugador actual
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

    //crea los botones que se mostraran en el canvas cada boton tiene una ubicacion especifica, un color de fondo, un context, un ancho, una altura y una imagen asociada
    function crearBotones() {
        botonCambiarConfiguracion = new Boton(canvasWidth - 120, 30, 'red', context, 50, 50, "assets/img/juego/IconoAjustes.png");
        botonReiniciar = new Boton(canvasWidth - 190, 30, 'red', context, 50, 50, "assets/img/juego/IconoReiniciar.png");
        botonSonido = new Boton(canvasWidth - 260, 30, 'red', context, 50, 50, "assets/img/juego/IconoSonido.png");
    }

    //dibuja los botones en el canvas solo si se crean los objetos asociados.
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

    //crea fichas para un jugador y distribuye las fichas en una posicion especifica
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
    //agrega una ficha al canvas en una posición determinada (posX, posY) y la asigna a un jugador específico (numeroDelJugador).
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
    //borra el contenido actual del canvas
    function clearCanvas() {
        context.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
    }

    //Dibuja matriz o tablero en el canvas
    function crearMatriz() {
        let cantC = XEnLineaSeleccionado + 3;
        let cantF = XEnLineaSeleccionado + 2;
        let posX = (canvasWidth - (cantC * anchoCasilla)) / 2;
        let posY = 180;

        PosYFinDeLaMatriz = posY + (altoCasilla * cantF);

        matriz = new Matriz(posX, posY, context, "", anchoCasilla, altoCasilla, XEnLineaSeleccionado);
    }
}

// EVENTOS

//se ejecuta cuando el usuario hace click en el canvas 
function onMouseDown(e) {
    isMouseDown = true;
    //verifica si se hizo click 
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
    //  encuentra la ficha clickeada y recibe su x e y del click del mouse las cuales indican la posicion en donde se hizo click
function encontrarFiguraClickeada(x, y) {
    for (let i = 0; i < fichas.length; i++) {
        const element = fichas[i];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}
//determina si el usuario ha hecho clic en alguno de los botones del juego en las coordenadas (x, y) especificadas.
function verificarSiSeClickeoAlgunBoton(x, y) {
    //si hace click en boton reiniciar, reinicia el juego.
    if (botonReiniciar.isPointInside(x, y)) {
        clearCanvas();
        clearInterval(timerInterval);
        empezarAJugar(); 
    }
    //si hace click en el boton configurar, muestra el popup configuracion
    if (botonCambiarConfiguracion.isPointInside(x, y)) {
        canvasJuego.classList.add("oculto");
        popup.classList.remove("oculto");
    }
    if(botonSonido.isPointInside(x,y)){
        sonidoVictoria.pause();
    }

}
//evento que se ejecuta cuando el usuario mueve el mouse sobre el canvas
function onMouseMove(e) {
    if (isMouseDown &&
        ultimaFichaClickeada != null
        && !ultimaFichaClickeada.getEstaFija()) {
        ultimaFichaClickeada.setPosition(e.offsetX, e.offsetY);
        drawAll();
    }
}
//evento que se ejecuta cuando el usuario suelta la ficha despues del arrastre o click
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
            let filaDondeSePusoLaFicha = fichaEntroEnLaMatriz.fila;
            let columnaDondeSePusoLaFicha = fichaEntroEnLaMatriz.columna;

            if (matriz.verificarSiHayGanador(fichaSoltada, filaDondeSePusoLaFicha, columnaDondeSePusoLaFicha)) {
                if(sonidoHabilitado){
                    sonidoVictoria.play();
                }
                mostrarGanador(fichaSoltada.getJugador());
            }

            fichaSoltada.setEstaFija(true);
            animateFichaToInitialPosition(fichaSoltada, calcularX(columnaDondeSePusoLaFicha), calcularY(filaDondeSePusoLaFicha), true);

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

// Anima la ficha al caer , el efecto de rebote se produce solo si se establece rebotar en true.
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


function mostrarTurnoDelJugador() {
    let XdelTurno;
    let YdelTurno = 200;
    let XDeLaFlecha;
    if (turno === 1) {
        XdelTurno = 130;
        XDeLaFlecha = XdelTurno - 30;
    }
    else {
        XdelTurno = (canvasWidth - 140);
        XDeLaFlecha = XdelTurno - 20;
    }

    context.filter = 'saturate(10)'; // Usamos esto para cambiar el color de la imagen
    context.drawImage(imagenTurno, XDeLaFlecha, YdelTurno + 20);
    context.filter = 'none'; // Quitamos el filtro para que no afecte al resto del canvas

    // Dibuja el texto con sombra solo para el texto
    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.font = "bold 20px Baloo";
    context.textAlign = "center";

    // Configura la sombra solo para el texto
    context.shadowColor = "white";
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 3;
    context.shadowBlur = 4;

    context.fillText(`Es tu turno, Jugador ${turno}`, XdelTurno, YdelTurno);

    // Restablece la sombra a "none" después de dibujar el texto
    context.shadowColor = "none";
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;

}
// Función para cambiar el turno
function cambiarTurno() {
    turno = (turno === 1) ? 2 : 1; // Alternar entre "1" y "2"
}

//actualizar el tiempo restante en un temporizador del juego, decrementándolo en un segundo cada vez que se llama, y detiene el temporizador cuando el tiempo alcanza cero.
function actualizarTiempo() {
    if (tiempoRestante > 0) {
        tiempoRestante--; // Restar un segundo
        timer.drawTimer(tiempoRestante, canvasWidth);

    } else {
        clearInterval(timerInterval); // Detener el temporizador
    }
}

//función que se encarga de mostrar un mensaje visual en el canvas para declarar al ganador y resaltar la victoria con imágenes 
//y un fondo amarillo.Ademas también detiene el temporizador para indicar el final de la partida.
function mostrarGanador(ganador) {
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