class Bullet {
    constructor(ctx,bulletX, bulletY, bulletW, bulletH) {

        this.ctx = ctx 
        this.bulletX = bulletX +40
        this.bulletY = bulletY -80
        this.bulletW = bulletW
        this.bulletH = bulletH
        this.bulletVel = 40

        this.bulletSize = 3
    }
    
    drawBullet() {
    
        this.bulletImg = new Image()
        this.bulletImg.src = 'images/misil.png'

        this.ctx.drawImage(this.bulletImg, this.bulletX, this.bulletY, this.bulletW, this.bulletH)
        this.moveBullets ()
    }

    moveBullets() {
        this.bulletY -= this.bulletVel
        
    }

}