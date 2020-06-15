const player = {
    player: undefined,
    playerWidth: 80,
    playerHeight: 90,
    vel: 10,
    posX: 0,
    posY: 800,

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
        dir === 'right' && this.posX <= myGame.canvasSize.w-80 ? this.posX += this.vel : null

    },

    shoot(){

        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, Bullet.w, Bullet.h))

    }


}

