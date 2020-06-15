class Bullet {
    constructor(ctx, bulletX, bulletY, bulletW, bulletH, bulletVel){
        
        this.ctx = ctx
        this.bulletX = bulletX+40
        this.bulletY = bulletY
        this.bulletW=bulletW
        this.bulletH=bulletH
        this.bulletVel = 40

        this.bulletSize= 3 
    }

    initBullet() {
        this.bullet = new Image ()
        this.bullet.src = 'images/bullet.png'

    }

    drawBullet(){
        this.ctx.drawImage( this.bulletX, this.bulletY, this.bulletW, this.bulletH)
    }


   moveBullets(){
       this.bulletY -=this.bulletVel
   }



}