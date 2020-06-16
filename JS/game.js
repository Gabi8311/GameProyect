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
        w: window.innerWidth,
        h: window.innerHeight,
        bgPosX: 0,
        bgPosY: 0
    },

    init(id) {
        this.canvasDom = document.getElementById(id)
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
        this.ctx = this.canvasDom.getContext('2d')

        this.spriteBg = new BgSprite (this.ctx, 0, 0, this.canvasSize.w, this.canvasSize.h, 5)

        this.player1 = new SpritePlayer(this.ctx, innerWidth/2,innerHeight-150 , 100, 100)
        
        

        background.initBackground()
        player.initPlayer()
        this.setEventListeners()


        this.start()

    },

    setEventListeners() {
        document.onkeydown = e => {

            e.keyCode === 37 ? player.moveNave('left') : null
            e.keyCode === 39 ? player.moveNave('right') : null
            e.keyCode === 38 ? player.moveNave('up') : null
            e.keyCode === 40 ? player.moveNave('down') : null
            e.keyCode === 32 ? player.shoot(this.ctx) : null
        }

    },


    start() {

        setInterval(() => {

            this.frames++

            background.drawBackground(this.ctx)

            this.spriteBg.drawAsteroid()
            this.player1.drawSpritePlayer(this.frames)
            
            //player.drawPlayer(this.ctx)

            player.bullets.forEach((elm) => elm.drawBullet())

            player.clearBullets()


            this.enemys.forEach(elm => elm.drawEnemy())

            this.enemysStrong.forEach(elm => elm.drawStrongEnemy())

            this.goodCoins.forEach(elm => elm.drawGoodCoin())


            this.badCoins.forEach(elm => elm.drawBadCoin())

            this.generateEnemys()
            this.collisions()
            this.clearEnemy()
            this.clearCoins()

        }, 60)

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

        this.enemys = this.enemys.filter((ene) => ene.posEnemyY <= window.innerHeight);
    },


    clearCoins() {

        this.goodCoins = this.goodCoins.filter((good) => good.posCoinY <= innerHeight);
        this.badCoins = this.badCoins.filter((bad) => bad.posCoinY <= innerHeight);

    },



    collisions() {

        // COLISION ENEMY- BULLET
        this.enemys.forEach(enemy1 => {
            player.bullets.forEach(bullet1 => {

                if (enemy1.posEnemyX < bullet1.bulletX + bullet1.bulletW &&
                    enemy1.posEnemyX + enemy1.enemyW - 30 > bullet1.bulletX &&
                    enemy1.posEnemyY < bullet1.bulletY + 100 + bullet1.bulletH &&
                    enemy1.enemyH + enemy1.posEnemyY > bullet1.bulletY + 100) {

                    this.generateCoin = this.generateRandom(6, 1)
                    this.generateCoin === 5 ? this.badCoins.push(new BadCoins(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 20, 20, 5)) : null

                    this.generateCoin != 5 ? this.goodCoins.push(new Coins(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 20, 20, 5)) : null




                    player.bullets.pop()


                    enemy1.posEnemyY = 10000



                    this.killed = true

                }

            })
        })

        //COLISION ENEMY-PLAYER
        this.enemys.forEach(enemy1 => {


            if (enemy1.posEnemyX < player.posX + player.playerWidth &&
                enemy1.posEnemyX + enemy1.enemyW - 40 > player.posX &&
                enemy1.posEnemyY < player.posY + 50 + player.playerHeight &&
                enemy1.enemyH + enemy1.posEnemyY > player.posY + 50) {


                player.posX = window.innerWidth / 2,
                    player.posY = window.innerHeight - 100


            }

        })


        //COLISION ENEMYSTRONG-PLAYER
        this.enemysStrong.forEach(enemy1 => {


            if (enemy1.posEnemyX < player.posX + player.playerWidth &&
                enemy1.posEnemyX + enemy1.enemyW - 40 > player.posX &&
                enemy1.posEnemyY < player.posY + 50 + player.playerHeight &&
                enemy1.enemyH + enemy1.posEnemyY > player.posY + 50) {

                player.posX = window.innerWidth / 2,
                    player.posY = window.innerHeight - 100


            }

        })

        //ESTO HACE QUE SE MUERAN DE TRES DISPAROS
        this.enemysStrong.forEach(enemy1 => {
            player.bullets.forEach(bullet1 => {

                if (enemy1.posEnemyX < bullet1.bulletX + bullet1.bulletW &&
                    enemy1.posEnemyX + enemy1.enemyW - 30 > bullet1.bulletX &&
                    enemy1.posEnemyY < bullet1.bulletY + 100 + bullet1.bulletH &&
                    enemy1.enemyH + enemy1.posEnemyY > bullet1.bulletY + 100) {

                    enemy1.health--
                    //this.counter++
                    bullet1.bulletY = -100


                    if (enemy1.health === 0) {
                        this.generateCoin = this.generateRandom(6, 1)
                        this.generateCoin === 5 ? this.badCoins.push(new BadCoins(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 20, 20, 5)) : null

                        this.generateCoin != 5 ? this.goodCoins.push(new Coins(this.ctx, enemy1.posEnemyX, enemy1.posEnemyY, 20, 20, 5)) : null
                        enemy1.posEnemyY = 10000
                    }

                }


            })
        })
        //COLISION MONEDA-PLAYER

        this.goodCoins.forEach(enemy1 => {


            if (enemy1.posCoinX < player.posX + player.playerWidth &&
                enemy1.posCoinX + enemy1.coinSizeW > player.posX &&
                enemy1.posCoinY < player.posY + player.playerHeight &&
                enemy1.coinSizeH + enemy1.posCoinY > player.posY) {

                enemy1.posCoinY = 10000

            }

        })
        //COLISION BADMONEDA-PLAYER

        this.badCoins.forEach(enemy1 => {


            if (enemy1.posCoinX < player.posX + player.playerWidth &&
                enemy1.posCoinX + enemy1.coinSizeW > player.posX &&
                enemy1.posCoinY < player.posY + player.playerHeight &&
                enemy1.coinSizeH + enemy1.posCoinY > player.posY) {

                enemy1.posCoinY = 10000

            }

        })
    }

}







