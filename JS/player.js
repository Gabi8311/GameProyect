const player = {

    player: undefined,
    playerWidth: 80,
    playerHeight: 90,
    vel: 10,
    posX: 0,
    posY: window.innerHeight-150,

    bullets: [],

    initPlayer() {
        this.player = new Image()
        this.player.src = 'images/nave.png'

        this.posX = myGame.canvasSize.w / 2 - 30


    },

    drawPlayer(ctx) {
        ctx.drawImage(this.player, this.posX, this.posY, this.playerWidth, this.playerHeight)
    },

    moveNave(dir) {
        dir === 'left' && this.posX >= 0 ? this.posX -= this.vel : null
        dir === 'right' && this.posX <= myGame.canvasSize.w - 80 ? this.posX += this.vel : null
        dir === 'up' && this.posY  >= 500 ? this.posY : this.posY +=this.vel
        dir === 'down' && this.posY <= innerHeight-this.playerHeight ? this.posY : this.posY -=this.vel
    },

    shoot(ctx) {


        this.bullets.push(new Bullet(ctx, this.posX, this.posY, 100, 100))


    },

    clearBullets() {
        
        this.bullets = this.bullets.filter((ene) => ene.bulletY >= -100);

    }
}




