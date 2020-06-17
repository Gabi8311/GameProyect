class StrongEnemy extends Enemy { 

    constructor(ctx, posEnemyX, posEnemyY, enemyW, enemyH, velEnemy, health) { 

        super(ctx, posEnemyX, posEnemyY, enemyW, enemyH, velEnemy)

        this.health = health
        this.strongEnemyImg = new Image()
        this.strongEnemyImg.src = 'images/Fantasma.png'
        this.strongEnemyImg.frames = 10
        this.strongEnemyImg.framesIndex = 0
    }

    drawStrongEnemy(frames) { 
        
        this.ctx.drawImage(this.strongEnemyImg,
            this.strongEnemyImg.framesIndex * Math.floor(this.strongEnemyImg.width / this.strongEnemyImg.frames),
            0,
            Math.floor(this.strongEnemyImg.width / this.strongEnemyImg.frames),
            this.strongEnemyImg.height,
            this.posEnemyX,
            this.posEnemyY,
            this.enemyW,
            this.enemyH)

       
        this.animateEnemy(frames)
    }
    animateEnemy(frames) {
        if (frames % 2 == 0) {
            this.strongEnemyImg.framesIndex++
        }

        if (this.strongEnemyImg.framesIndex > this.strongEnemyImg.frames - 1) {
            this.strongEnemyImg.framesIndex = 0
        }

        this.moveStrongEnemy()

    }

    moveStrongEnemy() {
        this.posEnemyY += this.velEnemy

    }
}