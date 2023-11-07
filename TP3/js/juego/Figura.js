class Figura {
    constructor(posX, posY, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.resaltado = false;
    }

    setFill(fill) {
        this.fill = fill;
    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }
    
    setPosition(x,y){
        this.posX = x ; 
        this.posY = y ; 
    }

    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    getFill() {
        return this.fill;
    }

    draw() {
        this.context.fillStyle = this.fill;
    }

    setResaltado (resaltado){
        this.resaltado = resaltado;
    }

    isPointInside(x,y){}

    
}
