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

    // método para dibujar la ficha en el canvas, llama a su padre super.draw(), beginPath() inicia un nuevo trazado en el contexto de la ficha,
    // context.arc() dibuja un circulo, strokeStyle establece la linea de color negro y lineWidth hace que la misma tenga un grosor de 2 pixeles.
        draw() {
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.strokeStyle = "white";
        this.context.lineWidth =1 ;

        //si el resaltado es true le agrega un brillo
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
        //cierra el camino actual en el contexto que se inicio con beginPath()
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
    
    //metodo que setea el brilloExterior 
    setBrilloExterior(brillar) {
        this.brilloExterior = brillar;
    }
    //metodo que obtiene el radio de la ficha
    getRadius() {
        return this.radius;
    }

    //metodo que obtiene el jugador de la ficha
    getJugador() {
        return this.jugador;
    }

    //metodo que obtiene si la ficha esta fija
    getEstaFija() {
        return this.estaFija;
    }

    //metodo que setea si la ficha esta fija
    setEstaFija(estaFija) {
        return this.estaFija = estaFija;
    }

    //Metodo que se utiliza para determinar si un punto con coordenadas (x, y) está dentro de los límites del botón. 
    isPointInside(x, y) { 
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    //metodo que obtiene la posicion inicial x de la ficha
    getPosInicialX() {
        return this.posicionInicialX;
    }

     //metodo que obtiene la posicion inicial y de la ficha
    getPosInicialY() {
        return this.posicionInicialY;
    }

    estaEnLaPosicionIncial() {
        return this.posicionInicialX == this.posX && this.posicionInicialY == this.posY;
    }

    //método que setea la imagen de la ficha
    setImage(image) {
        this.image = image;
    }

    //método booleano que obtiene si la imagen de la ficha se cargo por completo
    getImageIsLoaded() {
        return this.ImageIsLoaded;
    }

    //método asociado a cargar la imagen asociada al personaje seleccionado, instancia una imagen y la carga segun la seleccionada.
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

    //método que compara si la ficha es igual a otro objeto. Si el objeto pasado como argumento es otra ficha y ambas fichas tienen el mismo jugador, se considera que son iguales y devuelve true.  
    equals(otroObjeto) {
        if (otroObjeto instanceof Ficha) {
            return this.getJugador() === otroObjeto.getJugador();
        }
        return false;
    }
}