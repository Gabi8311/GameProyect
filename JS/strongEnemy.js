class StrongEnemy extends Enemy { 

    constructor(ctx, posEnemyX, posEnemyY, enemyW, enemyH, velEnemy, health) { 

        super(ctx, posEnemyX, posEnemyY, enemyW, enemyH, velEnemy)

        this.health = health
   
    }



    drawStrongEnemy() { 
        this.strongEnemyImg = new Image()
        this.strongEnemyImg.src = 'images/enemy2.png'
        this.ctx.drawImage(this.strongEnemyImg, this.posEnemyX, this.posEnemyY, this.enemyW, this.enemyH)
        this.moveStrongEnemy ()
    }
    moveStrongEnemy() {
        this.posEnemyY += this.velEnemy

    }
}