class SpritePlayer { 

    constructor(ctx, playerPosX, playerPosy, playerW, playerH) { 
        this.ctx = ctx
        this.playerPosX = playerPosX
        this.playerPosy = playerPosy
        this.playerW = playerW
        this.playerH = playerH
        this.image = new Image()
        this.image.src = 'images/pruebaNave.png'
        this.velPlayer = 5
        this.image.frames = 4
        this.image.framesIndex =0

    }

    drawSpritePlayer(frames) { 
        this.ctx.drawImage(this.image, this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height/2,
            this.playerPosX,
            this.playerPosy,
            this.playerW,
            this.playerH)
        
        
        this.animate(frames)
        
            
    }

    animate(frames) { 
        if (frames % 5 == 0) { 
            this.image.framesIndex ++
        }

        if (this.image.framesIndex > this.image.frames - 1) { 
            this.image.framesIndex = 0
        }
    }

    






}

