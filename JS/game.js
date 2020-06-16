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
    enemys: [],
    enemysStrong: [],
    goodCoins: [],
    badCoins: [],
    player1: undefined,
    score: undefined,
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
        this.player1 = new SpritePlayer(this.ctx, innerWidth / 2, innerHeight -150 , 100, 100)
        
        this.spriteBg = new BgSprite (this.ctx, 0, 0, this.canvasSize.w, this.canvasSize.h, 5)
        
        // player.initPlayer()
        this.setEventListeners()
        background.initBackground()

        this.start()

    },
    // clearScreen() {
    //     this.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    //   },
    setEventListeners() {
        
        document.onkeydown = e => {

            e.keyCode === 37 ? this.player1.moveNave('left') : null
            e.keyCode === 39 ? this.player1.moveNave('right') : null
            e.keyCode === 38 ? this.player1.moveNave('up') : null
            e.keyCode === 40 ? this.player1.moveNave('down') : null
            e.keyCode === 32 ? this.player1.shoot(this.ctx) : null
        }

    },

    start() {

        setInterval(() => {
            this.clearScreen ()

            this.frames++

            background.drawBackground(this.ctx)

            this.spriteBg.drawAsteroid()

            this.player1.drawSpritePlayer(this.frames)
            
            //player.drawPlayer(this.ctx)
            console.log (this.player1.bullets)

            this.player1.bullets.forEach((elm) => elm.drawBullet())

            this.enemys.forEach(elm => elm.drawEnemy())
            
            this.enemysStrong.forEach(elm => elm.drawStrongEnemy())
            
            this.goodCoins.forEach(elm => elm.drawGoodCoin())
            
            this.badCoins.forEach(elm => elm.drawBadCoin())

            this.player1.clearBullets()
            
            this.generateEnemys()
            this.collisions()
            this.clearEnemy()
            this.clearCoins()
            
        }, 60)

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

                    this.generateCoin = this.generateRandom(6, 1)
                    this.generateCoin === 5 ? this.badCoins.push(new BadCoins(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 20, 20, 10)) : null

                    this.generateCoin != 5 ? this.goodCoins.push(new Coins(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 20, 20, 10)) : null

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

            }

        })

        //COLISION BADMONEDA-PLAYER

        this.badCoins.forEach(enemy1 => {

            if (enemy1.posCoinX < this.player1.playerPosX + this.player1.playerW &&
                enemy1.posCoinX + enemy1.coinSizeW > this.player1.playerPosX &&
                enemy1.posCoinY < this.player1.playerPosY + this.player1.playerH &&
                enemy1.coinSizeH + enemy1.posCoinY > this.player1.playerPosY) {

                enemy1.posCoinY = 10000

            }

        })
    }

}







