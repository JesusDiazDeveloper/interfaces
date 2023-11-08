class Boton extends Figura {

    constructor(posX, posY, fill, context, width, height,imagesrc) {
        super(posX , posY, fill, context)
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imagesrc;
    }
    //Metodo que llama a su padre draw() para dibujar un boton en el contexto del canvas con una imagen, en la posicion posX y posY, con el width y heght especificados, con un grosor de linea de 1 pixel.
    draw() {
        super.draw();
        this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        this.context.lineWidth =  1;
    }

    //Metodo que se utiliza para determinar si un punto con coordenadas (x, y) está dentro de los límites del botón. 
    isPointInside(x,y){
        return !(x<this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height) 
    }
}
