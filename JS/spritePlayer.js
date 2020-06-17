class SpritePlayer { 

    constructor(ctx, playerPosX, playerPosY, playerW, playerH) { 
        this.ctx = ctx
        this.playerPosX = playerPosX
        this.playerPosY = playerPosY
        this.playerW = playerW
        this.playerH = playerH
        this.image = new Image()
        this.image.src = 'images/naveFuegoo.png'
        this.velPlayer = 5
        this.image.frames = 4
        this.image.framesIndex =0
        this.bullets= []
    }

    drawSpritePlayer(frames) { 
        this.ctx.drawImage(this.image, this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.playerPosX,
            this.playerPosY,
            this.playerW,
            this.playerH)
        
        this.animate(frames) 
            
    }

    animate(frames) { 
        if (frames % 2 == 0) { 
            this.image.framesIndex ++
        }

        if (this.image.framesIndex > this.image.frames - 1) { 
            this.image.framesIndex = 0
        }

    }

    moveNave(dir) {
        dir === 'left' && this.playerPosX >= 0 ? this.playerPosX -= this.velPlayer : null
        dir === 'right' && this.playerPosX <= myGame.canvasSize.w - 80 ? this.playerPosX += this.velPlayer : null
        dir === 'up' && this.playerPosY >= 500 ? this.playerPosY : this.playerPosY += this.velPlayer
        dir === 'down' && this.playerPosY <= innerHeight - this.playerH ? this.playerPosY : this.playerPosY -= this.velPlayer
    }

    shoot(ctx) {

        this.bullets.push(new Bullet(ctx, this.playerPosX, this.playerPosY, 25, 60))

    }

    clearBullets() {

        this.bullets = this.bullets.filter((ene) => ene.bulletY >= -100);

    }

}

