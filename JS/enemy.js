class Enemy{
    constructor(ctx,posEnemyX,posEnemyY,enemyW,enemyH,velEnemy){
        this.ctx=ctx
        this.posEnemyX = posEnemyX
        this.posEnemyY = posEnemyY
        this.enemyW = enemyW
        this.enemyH = enemyH
        this.velEnemy = velEnemy 
        this.enemyImg = new Image()
        this.enemyImg.src = 'images/monstruito.png'
        this.enemyImg.frames = 4
        this.enemyImg.framesIndex = 0
        
    }
    
    drawEnemy(frames) {
        
        this.ctx.drawImage(this.enemyImg,
            this.enemyImg.framesIndex * Math.floor(this.enemyImg.width / this.enemyImg.frames),
            0,
            Math.floor(this.enemyImg.width / this.enemyImg.frames),
            this.enemyImg.height,
            this.posEnemyX,
            this.posEnemyY,
            this.enemyW,
            this.enemyH)
        
        //this.moveEnemy 
        this.animateEnemy (frames)
        
    }
    animateEnemy(frames) { 
        if (frames % 2 == 0) {
            this.enemyImg.framesIndex++
        }

        if (this.enemyImg.framesIndex > this.enemyImg.frames - 1) {
            this.enemyImg.framesIndex = 0
        }

        this.moveEnemy ()

    }

    moveEnemy() {
        this.posEnemyY += this.velEnemy

    }

}


