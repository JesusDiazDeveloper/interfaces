
class Timer extends Figura {

    constructor(posX, posY, imagen, context) {
        super(posX, posY, imagen, context)
        this.image = new Image();
        this.setImage();
        this.resaltadoEstilo = "#FF0000";
    }

    setImage() {
        this.image.src = "assets/img/juego/Timer.png";
    }

    //Timer
    drawTimer(tiempoRestante , canvasWidth) {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        const tiempoFormateado = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

        let imageWidth = this.image.width;

        context.font = "bold 30px 'Courier New', Courier, monospace";
        context.textAlign = "left";

        context.fillStyle = "yellow";
        context.fillStyle = "black";
        context.drawImage(this.image, (canvasWidth / 2 - imageWidth /2), 40); 
        
        context.fillText(`${tiempoFormateado}`, (canvasWidth / 2 - imageWidth /2) + 80, 70);
    }

}