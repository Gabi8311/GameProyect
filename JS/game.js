const myGame = {
    name: 'Space Invaders drunk',
    description: 'First Proyect on Ironhack',
    version: '1.0',
    author: 'Laura Sanchez, Andres Barros y Gabriel Moreno',
    license: undefined,
    canvasDom: undefined,
    ctx: undefined,
    background1: undefined,
    spriteBg: undefined,
    interval: undefined,
    badCoinCounter: undefined,
    enemys: [],
    enemysStrong: [],
    goodCoins: [],
    badCoins: [],
    scoreLife: 3,
    player1: undefined,
    score: 0,
    timer: 60,
    killed: undefined,
    generateCoin: undefined,
    frames: 0,
    counter: 0, //CONTADOR PARA LOS ENEMYGOS DE 3 DISPAROS
    numRandom: 0,
    keyCaps: {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        SHOOT: 32,
    },

    canvasSize: {
        w: innerWidth,
        h: innerHeight,
        bgPosX: 0,
        bgPosY: 0
    },

    init(id) {
        this.canvasDom = document.getElementById(id)
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
        this.ctx = this.canvasDom.getContext('2d')
        this.player1 = new SpritePlayer(this.ctx, innerWidth / 2, innerHeight - 150, 100, 100)

        this.spriteBg = new BgSprite(this.ctx, 0, 0, this.canvasSize.w, this.canvasSize.h, 5)

        // player.initPlayer()
        this.setEventListeners()
        background.initBackground()

        this.start()

    },

    setEventListeners() {

        document.onkeydown = e => {
            if (this.badCoinCounter <= 100) {

                e.keyCode === 39 ? this.player1.moveNave('left') : null
                e.keyCode === 37 ? this.player1.moveNave('right') : null
                e.keyCode === 40 ? this.player1.moveNave('up') : null
                e.keyCode === 38 ? this.player1.moveNave('down') : null
                e.keyCode === 32 ? this.player1.shoot(this.ctx) : null
                
            } else {
                e.keyCode === 37 ? this.player1.moveNave('left') : null
                e.keyCode === 39 ? this.player1.moveNave('right') : null
                e.keyCode === 38 ? this.player1.moveNave('up') : null
                e.keyCode === 40 ? this.player1.moveNave('down') : null
                e.keyCode === 32 ? this.player1.shoot(this.ctx) : null
                this.badCoinCounter = undefined

            }
        }

    },

    start() {

        this.interval = setInterval(() => {
            if (this.badCoinCounter === 0) {

                this.badCoinCounter = undefined
            }
            this.clearScreen()

            this.frames++
            this.badCoinCounter--

            console.log(this.badCoinCounter)

            background.drawBackground(this.ctx)


            this.spriteBg.drawAsteroid()

            this.player1.drawSpritePlayer(this.frames)


            console.log(this.player1.bullets)
            this.drawScore()
            this.drawTime()

            this.player1.bullets.forEach((elm) => elm.drawBullet())

            this.enemys.forEach(elm => elm.drawEnemy())

            this.enemysStrong.forEach(elm => elm.drawStrongEnemy())

            this.goodCoins.forEach(elm => elm.drawGoodCoin())

            this.badCoins.forEach(elm => elm.drawBadCoin())

            this.player1.clearBullets()

            if (this.scoreLife === 0 || this.timer === 0) {
                //this.gameOver()
            }
            this.drawScoreLife()

            this.generateEnemys()
            this.collisions()
            this.clearEnemy()
            this.clearCoins()


        }, 60)

    },
    gameOver() {

        let myImage = new Image()
        myImage.src = 'images/GameOver.png'
        myImage.onload = () => this.ctx.drawImage(myImage, innerWidth / 2 - 200, innerHeight / 2 - 100, 400, 200)
        clearInterval(this.interval)

    },
    drawScoreLife() {

        let heart

        if (this.scoreLife === 3) {
            heart = new Image()
            heart.src = 'images/healNave3.png'
            this.ctx.drawImage(heart, innerWidth - 140, 10, 120, 50)

        } else if (this.scoreLife === 2) {
            heart = new Image()
            heart.src = 'images/healNave2.png'
            this.ctx.drawImage(heart, innerWidth - 140, 10, 80, 50)

        } else if (this.scoreLife === 1) {

            heart = new Image()
            heart.src = 'images/healNave1.png'
            this.ctx.drawImage(heart, innerWidth - 140, 10, 40, 50)

        } else {

            this.gameOver()
        }

    },
    drawScore() {
        this.ctx.font = "32px Times New Roman";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("Score: " + this.score, 50, 50);
    },
    drawTime() {
        this.ctx.font = "32px Times New Roman";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Timer: " + this.timer, innerWidth / 2 - 50, 50);
        this.frames % 16 === 0 ? this.timer-- : null
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    generateEnemys() {

        this.frames % 20 === 0 ? this.enemys.push(new Enemy(this.ctx, this.generateRandom(window.innerWidth - 100, 0), 0, 70, 70, 10)) : null
        //SEGUNDA CREACION DE ENEMYS
        this.frames % 36 === 0 ? this.enemysStrong.push(new StrongEnemy(this.ctx, this.generateRandom(window.innerWidth - 100, 0), 0, 100, 100, 10, this.generateRandom(6, 2))) : null

    },

    generateRandom(max, min) {

        this.numRandom = Math.floor(Math.random() * (max - min) + min)

        return this.numRandom
    },

    clearEnemy() {

        this.enemys = this.enemys.filter((ene) => ene.posEnemyY <= innerHeight);
    },


    clearCoins() {

        this.goodCoins = this.goodCoins.filter((good) => good.posCoinY <= innerHeight);
        this.badCoins = this.badCoins.filter((bad) => bad.posCoinY <= innerHeight);

    },

    collisions() {

        // COLISION ENEMY- BULLET
        this.enemys.forEach(enemy1 => {
            this.player1.bullets.forEach(bullet1 => {

                if (enemy1.posEnemyX < bullet1.bulletX + bullet1.bulletW &&
                    enemy1.posEnemyX + enemy1.enemyW - 30 > bullet1.bulletX &&
                    enemy1.posEnemyY < bullet1.bulletY + 100 + bullet1.bulletH &&
                    enemy1.enemyH + enemy1.posEnemyY > bullet1.bulletY + 100) {

                    this.generateCoin = this.generateRandom(11, 1)
                    this.generateCoin <= 4 ? this.badCoins.push(new BadCoins(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 20, 20, 10)) : null

                    this.generateCoin > 4 ? this.goodCoins.push(new Coins(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 20, 20, 10)) : null

                    this.player1.bullets.pop()

                    enemy1.posEnemyY = 10000

                }

            })

        })

        //COLISION ENEMY-PLAYER
        this.enemys.forEach(enemy1 => {

            if (enemy1.posEnemyX < this.player1.playerPosX + this.player1.playerW &&
                enemy1.posEnemyX + enemy1.enemyW - 40 > this.player1.playerPosX &&
                enemy1.posEnemyY < this.player1.playerPosY + 50 + this.player1.playerH &&
                enemy1.enemyH + enemy1.posEnemyY > this.player1.playerPosY + 50) {

                this.player1.playerPosX = innerWidth / 2,
                    this.player1.playerPosY = innerHeight - 100
                this.scoreLife--
                enemy1.posEnemyY = 10000

            }

        })

        //COLISION ENEMYSTRONG-PLAYER
        this.enemysStrong.forEach(enemy1 => {

            if (enemy1.posEnemyX < this.player1.playerPosX + this.player1.playerW &&
                enemy1.posEnemyX + enemy1.enemyW - 40 > this.player1.playerPosX &&
                enemy1.posEnemyY < this.player1.playerPosY + 50 + this.player1.playerH &&
                enemy1.enemyH + enemy1.posEnemyY > this.player1.playerPosY + 50) {

                this.player1.playerPosX = innerWidth / 2,
                    this.player1.playerPosY = innerHeight - 100
                this.scoreLife--
                enemy1.posEnemyY = 10000
            }

        })

        //ESTO HACE QUE SE MUERAN DE TRES DISPAROS
        this.enemysStrong.forEach(enemy1 => {
            this.player1.bullets.forEach(bullet1 => {

                if (enemy1.posEnemyX < bullet1.bulletX + bullet1.bulletW &&
                    enemy1.posEnemyX + enemy1.enemyW - 30 > bullet1.bulletX &&
                    enemy1.posEnemyY < bullet1.bulletY + 100 + bullet1.bulletH &&
                    enemy1.enemyH + enemy1.posEnemyY > bullet1.bulletY + 100) {

                    enemy1.health--
                    //this.counter++
                    bullet1.bulletY = -100


                    if (enemy1.health === 0) {
                        this.generateCoin = this.generateRandom(6, 1)
                        this.generateCoin === 5 ? this.badCoins.push(new BadCoins(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 20, 20, 10)) : null

                        this.generateCoin != 5 ? this.goodCoins.push(new Coins(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 20, 20, 10)) : null
                        enemy1.posEnemyY = 10000
                    }

                }

            })
        })
        //COLISION MONEDA-PLAYER

        this.goodCoins.forEach(enemy1 => {

            if (enemy1.posCoinX < this.player1.playerPosX + this.player1.playerW &&
                enemy1.posCoinX + enemy1.coinSizeW > this.player1.playerPosX &&
                enemy1.posCoinY < this.player1.playerPosY + this.player1.playerH &&
                enemy1.coinSizeH + enemy1.posCoinY > this.player1.playerPosY) {

                enemy1.posCoinY = 10000
                this.score += 10
                if ((this.timer + 5) >= 60) {
                    this.timer = 60
                } else {
                    this.timer += 5
                }

            }

        })

        //COLISION BADMONEDA-PLAYER

        this.badCoins.forEach(enemy1 => {

            if (enemy1.posCoinX < this.player1.playerPosX + this.player1.playerW &&
                enemy1.posCoinX + enemy1.coinSizeW > this.player1.playerPosX &&
                enemy1.posCoinY < this.player1.playerPosY + this.player1.playerH &&
                enemy1.coinSizeH + enemy1.posCoinY > this.player1.playerPosY) {



                this.badCoinCounter = 100
                enemy1.posCoinY = 10000

            }

        })
    }

}







