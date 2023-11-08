

class Matriz {


    constructor(posX, posY, context, fill, anchoCasilla, altoCasilla, xEnLinea = 4) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.cantColumnas = xEnLinea + 3;
        this.cantFilas = xEnLinea + 2;
        this.casillas = [];
        this.casillasFantasma = [];
        this.matrizLogica = [];
        this.xEnLinea = xEnLinea;
        this.MAXFILA = this.cantFilas;
        this.MAXCOLUMNA = this.cantColumnas;
        this.anchoCasilla = anchoCasilla;
        this.altoCasilla = altoCasilla
        this.crearMatrizLogica();
    }

    draw() {
        //Hago esto porque si no, al hacer draw varias veces, se carga el arreglo. Asi lo limpio cada vez.
        this.casillas = [];
        this.casillasFantasma = [];

        for (let j = 0; j < this.cantFilas; j++) {
            for (let i = 0; i < this.cantColumnas; i++) {
                this.casillas.push(new Casilla(this.posX + i * anchoCasilla, this.posY + j * altoCasilla, "red", context, anchoCasilla, altoCasilla, "assets/img/juego/casillaVacia.png"))
            }
        }

        for (let i = 0; i < this.cantColumnas; i++) {
            this.casillasFantasma.push(new Casilla(this.posX + i * anchoCasilla, this.posY - altoCasilla, "rgba(0, 0, 255, 0.1)", context, anchoCasilla, altoCasilla, "assets/img/juego/flechaAbajo.png"))
        }

        this.drawMatriz()

    }

    drawMatriz() {
        for (let i = 0; i < this.casillas.length; i++) {
            this.casillas[i].draw();
        }
        for (let i = 0; i < this.casillasFantasma.length; i++) {
            this.casillasFantasma[i].draw();
        }
    }

    // este metodo retorna null si no pudo poner la ficha, 
    // o un objeto con fila : pos Y e y columna : pos X si pudo poner la ficha, 
    // siendo este objeto la posicion donde coloco la ficha
    verificarSiFichaEntroALamatriz(ficha) {
        if (ficha) {
            let x = ficha.getPosX();
            let y = ficha.getPosY();

            let columna = -1;

            for (let i = 0; i < this.casillasFantasma.length; i++) {
                let casilla = this.casillasFantasma[i];
                if (casilla.isPointInside(x, y)) {
                    columna = i;
                    let fila = this.verificarSiLugarEnEsaColumna(columna);
                    if (fila != -1) {
                        this.ponerFichaEnMatrizLogica(ficha, fila, columna);
                        return { fila: fila, columna: columna };
                    }
                    else {
                        return null;
                    }
                }
            }
        }
        return null;

    }

    // Parte Logica: 

    // Crear la matriz
    crearMatrizLogica() {
        this.matrizLogica = new Array(this.cantFilas);
        for (let i = 0; i < this.cantFilas; i++) {
            this.matrizLogica[i] = new Array(this.cantColumnas);
        }
        this.llenarMatrizConCeros();
        this.MAXFILA = this.cantFilas;
        this.MAXCOLUMNA = this.cantColumnas;
    }

    mostrarMatrizLogica() {
        // console.log("--------------------------");
        // for (let fila = 0; fila < this.MAXFILA; fila++) {
        //     this.mostrarArreglo(this.matrizLogica[fila]);
        // }
    }

    mostrarArreglo(arr) {
        console.log(arr);
    }

    llenarMatrizConCeros() {
        for (var i = 0; i < this.matrizLogica.length; i++) {
            for (var j = 0; j < this.matrizLogica[i].length; j++) {
                this.matrizLogica[i][j] = 0;
            }
        }
    }

    verificarSiLugarEnEsaColumna(columna) { //7
        let filaParaVerificar = this.MAXFILA - 1;

        while (filaParaVerificar >= 0 && this.matrizLogica[filaParaVerificar][columna] != 0) {
            filaParaVerificar--;
        }

        if (filaParaVerificar < 0) {
            return -1;
        }
        else {
            return filaParaVerificar;
        }
    }

    ponerFichaEnMatrizLogica(ficha, fila, columna) {
        this.matrizLogica[fila][columna] = ficha;
    }

    verificarSiHayGanador(ficha, fila, columna) {

        if (this.checkearTodaLaMatrizLogica(ficha, fila, columna)) {
            return true;
        }
        return false;

    }
    // recibe la matriz y el numero del jugador
    checkearTodaLaMatrizLogica(ficha, fila, columna) {

        return this.#checkHorizontal(ficha, fila, columna)
            || this.#checkVertical(ficha, fila, columna)
            || this.#checkDiagonals(ficha, fila, columna);
    }
    #checkHorizontal(ficha, fila, columna) {
        let contador = 1;
        let columnaParaLaDerecha = columna;
        let fichasAcumuladas = [];
        fichasAcumuladas.push(ficha);

        while (contador < this.xEnLinea
            && this.#filaYColumnaSonValidas(fila, columnaParaLaDerecha + 1)
            && this.matrizLogica[fila][columnaParaLaDerecha + 1] != 0
            && this.matrizLogica[fila][columnaParaLaDerecha + 1].equals(ficha)) {
            fichasAcumuladas.push(this.matrizLogica[fila][columnaParaLaDerecha + 1]);
            contador++;
            columnaParaLaDerecha++;
        }
        let columnaParaLaIzquierda = columna;
        while (contador < this.xEnLinea
            && this.#filaYColumnaSonValidas(fila, columnaParaLaIzquierda - 1)
            && (this.matrizLogica[fila][columnaParaLaIzquierda - 1]) != 0
            && (this.matrizLogica[fila][columnaParaLaIzquierda - 1]).equals(ficha)) {
            fichasAcumuladas.push(this.matrizLogica[fila][columnaParaLaIzquierda - 1]);
            contador++;
            columnaParaLaIzquierda--;
        }

        this.mostrarMatrizLogica();
        if (contador == this.xEnLinea) {
            this.#resaltarFichasGanadoras(fichasAcumuladas);
            return true
        }
        return false;

    }

    #checkVertical(ficha, fila, columna) {
        let contador = 1;
        let filaParaArriba = fila;
        let fichasAcumuladas = [];
        fichasAcumuladas.push(ficha);

        while (contador < this.xEnLinea
            && this.#filaYColumnaSonValidas(filaParaArriba + 1, columna)
            && this.matrizLogica[filaParaArriba + 1][columna] != 0
            && this.matrizLogica[filaParaArriba + 1][columna].equals(ficha)) {
            fichasAcumuladas.push(this.matrizLogica[filaParaArriba + 1][columna]);
            contador++;
            filaParaArriba++;
        }

        if (contador == this.xEnLinea) {
            this.#resaltarFichasGanadoras(fichasAcumuladas);
            return true
        }
        return false;

    }

    #checkDiagonals(ficha, fila, columna) {

        let contador1 = 1;
        let filaParaLaDerechaYArriba = fila;
        let columnaParaLaDerechaYArriba = columna;
        let fichasAcumuladas = [];
        fichasAcumuladas.push(ficha);

        while (contador1 < this.xEnLinea &&
            this.#filaYColumnaSonValidas(filaParaLaDerechaYArriba + 1, columnaParaLaDerechaYArriba + 1)
            && this.matrizLogica[filaParaLaDerechaYArriba + 1][columnaParaLaDerechaYArriba + 1] != 0
            && this.matrizLogica[filaParaLaDerechaYArriba + 1][columnaParaLaDerechaYArriba + 1].equals(ficha)) {
            fichasAcumuladas.push(this.matrizLogica[filaParaLaDerechaYArriba + 1][columnaParaLaDerechaYArriba + 1]);
            contador1++;
            filaParaLaDerechaYArriba++;
            columnaParaLaDerechaYArriba++;
        }

        let columnaParaLaIzquierdaYAbajo = columna;
        let filaParaLaIzquierdaYAbajo = fila;
        while (
            contador1 < this.xEnLinea
            && this.#filaYColumnaSonValidas(filaParaLaIzquierdaYAbajo - 1, columnaParaLaIzquierdaYAbajo - 1)
            && this.matrizLogica[filaParaLaIzquierdaYAbajo - 1][columnaParaLaIzquierdaYAbajo - 1] != 0
            && this.matrizLogica[filaParaLaIzquierdaYAbajo - 1][columnaParaLaIzquierdaYAbajo - 1].equals(ficha)) {
            fichasAcumuladas.push(this.matrizLogica[filaParaLaIzquierdaYAbajo - 1][columnaParaLaIzquierdaYAbajo - 1]);
            contador1++;
            filaParaLaIzquierdaYAbajo--;
            columnaParaLaIzquierdaYAbajo--;
        }

        if (contador1 == this.xEnLinea) {
            this.#resaltarFichasGanadoras(fichasAcumuladas);
            return true
        }

        //vacio el arreglo para que no tome las fichas de la otra diagonal
        fichasAcumuladas = [];
        fichasAcumuladas.push(ficha);

        let contador2 = 1;
        let filaParaLaDerechaYAbajo = fila;
        let columnaParaLaDerechaYAbajo = columna;

        while (contador1 < this.xEnLinea
            && this.#filaYColumnaSonValidas(filaParaLaDerechaYAbajo + 1, columnaParaLaDerechaYAbajo - 1)
            && this.matrizLogica[filaParaLaDerechaYAbajo + 1][columnaParaLaDerechaYAbajo - 1] != 0
            && this.matrizLogica[filaParaLaDerechaYAbajo + 1][columnaParaLaDerechaYAbajo - 1].equals(ficha)) {
            fichasAcumuladas.push(this.matrizLogica[filaParaLaDerechaYAbajo + 1][columnaParaLaDerechaYAbajo - 1]);
            contador2++;
            columnaParaLaDerechaYAbajo--;
            filaParaLaDerechaYAbajo++;
        }

        let columnaParaLaIzquierdaYArriba = columna;
        let filaParaLaIzquierdaYArriba = fila;

        while (contador1 < this.xEnLinea
            && this.#filaYColumnaSonValidas(filaParaLaIzquierdaYArriba - 1, columnaParaLaIzquierdaYArriba + 1)
            && (this.matrizLogica[filaParaLaIzquierdaYArriba - 1][columnaParaLaIzquierdaYArriba + 1]) != 0
            && (this.matrizLogica[filaParaLaIzquierdaYArriba - 1][columnaParaLaIzquierdaYArriba + 1]).equals(ficha)) {
            fichasAcumuladas.push(this.matrizLogica[filaParaLaIzquierdaYArriba - 1][columnaParaLaIzquierdaYArriba + 1]);
            contador2++;
            columnaParaLaIzquierdaYArriba++;
            filaParaLaIzquierdaYArriba--;
        }

        if (contador2 == this.xEnLinea) {
            this.#resaltarFichasGanadoras(fichasAcumuladas);
            return true
        }

        return false;

    }

    #filaYColumnaSonValidas(fila, columna) {
        if (fila < 0 || fila >= this.MAXFILA) {
            return false;
        }
        if (columna < 0 || columna >= this.MAXCOLUMNA) {
            return false;
        }
        return true;
    }
    verificarEmpate() {
        let fila = 0;
        for (let i = 0; i < this.MAXCOLUMNA; i++) {
            if (this.matrizLogica[fila][i] == 0) {
                return false;
            }
        }
        return true;
    }
    #resaltarFichasGanadoras(fichasAcumuladas) {
        console.log(fichasAcumuladas);
        for (let ficha of fichasAcumuladas) {
            ficha.resaltado = true;
            ficha.resaltadoEstilo = "#FFFF00"; 
        }
    }

}
