

class Ficha extends Figura {


    constructor(posX, posY, imagen, context, radius, jugador, personajeSeleccionado) {
        super(posX, posY, imagen, context)
        this.radius = radius;
        this.jugador = jugador;
        this.posicionInicialX = posX;
        this.posicionInicialY = posY;
        this.estaFija = false;
        this.image = null;
        this.personajeSeleccionado = personajeSeleccionado;
        this.seleccionarImagenDeFicha(personajeSeleccionado);
        this.resaltadoEstilo = "#FF0000";
        this.ImageIsLoaded = false;
        this.brilloExterior = false;
    }

    // reimplemento el draw de figura, no necesito poner Overrride
    draw() {
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.strokeStyle = "black";
        this.context.lineWidth = 2;

        // terminar el resaltado.
        if (this.resaltado === true) {
            this.context.save(); // Guardar el estado actual del contexto
            this.context.strokeStyle = this.resaltadoEstilo;
            this.context.shadowColor = "rgb(255, 255, 0)";
            this.context.shadowBlur = 20; // Ajusta el valor para cambiar la intensidad del brillo
            this.context.strokeStyle = "yellow";
            this.context.lineWidth = 15;
            // Dibuja el círculo con el brillo
            this.context.beginPath();
            this.context.arc(this.posX, this.posY, this.radius - (this.radius * 0.15), 0, 2 * Math.PI);
            this.context.stroke();
            this.context.closePath();
            this.context.restore(); // Restaurar el estado del contexto
        }

        this.context.stroke();
        this.context.closePath();

        if (this.image) {
            // Verifica si la imagen está cargada antes de intentar dibujarla.
            if (this.image.complete) {
                // Dibujar la imagen en el círculo
                this.context.drawImage(
                    this.image,
                    this.posX - this.radius,
                    this.posY - this.radius,
                    this.radius * 2,
                    this.radius * 2
                );
            }
        }
        if (this.brilloExterior) {
            this.context.save(); // Guardar el estado actual del contexto
            this.context.shadowColor = "rgb(255, 255, 0)";
            this.context.shadowBlur = 10; // Ajusta el valor para cambiar la intensidad del brillo
            this.context.strokeStyle = "yellow";
            this.context.lineWidth = 2;
            // Dibuja el círculo con el brillo
            this.context.beginPath();
            this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
            this.context.stroke();
            this.context.closePath();
            this.context.restore(); // Restaurar el estado del contexto
        }
    }

    setBrilloExterior(brillar) {
        this.brilloExterior = brillar;
    }

    getRadius() {
        return this.radius;
    }

    getJugador() {
        return this.jugador;
    }
    getEstaFija() {
        return this.estaFija;
    }
    setEstaFija(estaFija) {
        return this.estaFija = estaFija;
    }


    isPointInside(x, y) { // minuto 11:34
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    getPosInicialX() {
        return this.posicionInicialX;
    }
    getPosInicialY() {
        return this.posicionInicialY;
    }

    estaEnLaPosicionIncial() {
        return this.posicionInicialX == this.posX && this.posicionInicialY == this.posY;
    }
    setImage(image) {
        this.image = image;
    }

    getImageIsLoaded() {
        return this.ImageIsLoaded;
    }
    seleccionarImagenDeFicha(personajeSeleccionado) {
        let image = new Image();
        switch (personajeSeleccionado) {
            case "fichaTomy":
                image.src = "assets/img/juego/FichaTomy.png";
                break;
            case "fichaDally":
                image.src = "assets/img/juego/FichaDally.png";
                break;
            case "fichaPuchi":
                image.src = "assets/img/juego/FichaPuchi.png";
                break;
            case "fichaAyudanteDeSanta":
                image.src = "assets/img/juego/FichaAyudanteDeSanta.png";
                break;
            case "fichaBolaDeNieve":
                image.src = "assets/img/juego/FichaBolaDeNieve.png";
                break;
            default:
                image.src = "assets/img/juego/FichaPuchi.png";
                break;
        }
        // como la carga de la imagen es asincronica, tengo que esperar a que carge para setearla.
        image.onload = () => {
            this.setImage(image);
            this.ImageIsLoaded = true;
        };
    }

    equals(otroObjeto) {
        if (otroObjeto instanceof Ficha) {
            return this.getJugador() === otroObjeto.getJugador();
        }
        return false;
    }
}

console.log("cargo Ficha");