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
        dir === 'right' && this.posX <= myGame.canvasSize.w - 80 ? this.posX += this.vel : null

    },

    shoot(ctx) {


        this.bullets.push(new Bullet(ctx, this.posX, this.posY, 100, 100))


    },

    clearBullets() {//Esto hay que arreglarlo con el filter
        // this.bullets.forEach(elm => {
        //     if (elm.bulletY <= -100) {
        //         this.bullets.pop(elm)
           
        //     }
        // })
        this.bullets = this.bullets.filter((ene) => ene.bulletY >= -100);

    }
}




