class Figura {

    constructor(posX, posY, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.resaltado = false;
    }

    //Método que setea el color de relleno de la figura
    setFill(fill) {
        this.fill = fill;
    }

    //Devuelve el objeto con las coordenadas x e y de la posicion de la figura
    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }
    //Setea la posicion de la figura con nuevas coordenadas x e y.
    setPosition(x,y){
        this.posX = x ; 
        this.posY = y ; 
    }

    //obtengo pos X de la figura
    getPosX() {
        return this.posX;
    }

    //obtengo pos y de la figura
    getPosY() {
        return this.posY;
    }

    //obtengo el valor fill de la figura, que representa el color de relleno de la figura en ese momento.
    getFill() {
        return this.fill;
    }

    //configura el color de relleno en la figura en el context y se espera que sus hijos lo reimplementen
    draw() {
        this.context.fillStyle = this.fill;
    }

    //seteo el resaltado
    setResaltado (resaltado){
        this.resaltado = resaltado;
    }
    //metodo que reimplementan sus hijos para proporcionar la posicion.
    isPointInside(x,y){}

}