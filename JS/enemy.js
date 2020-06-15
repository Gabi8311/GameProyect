class Enemy{
    constructor(ctx,posEnemyX,posEnemyY,enemyW,enemyH,velEnemy){
        this.ctx=ctx
        this.posEnemyX = posEnemyX
        this.posEnemyY = posEnemyY
        this.enemyW = enemyW
        this.enemyH = enemyH
        this.velEnemy = velEnemy 

    }

    drawEnemy() {
        this.enemyImg = new Image()
        this.enemyImg.src = 'images/enemy.png'

        this.ctx.drawImage(this.enemyImg, this.posEnemyX, this.posEnemyY, this.enemyW, this.enemyH)
        this.moveEnemy ()
    }

    moveEnemy() {
        this.posEnemyY += this.velEnemy

    }








}