const myGame = {
    name: 'Space Invaders drunk',
    description: 'First Proyect on Ironhack',
    version: '1.0',
    author: 'Laura Sanchez, Andres Barros y Gabriel Moreno',
    license: undefined,
    canvasDom: undefined,
    ctx: undefined,
    background1: undefined,
    enemys: [],
    player1: undefined,
    score: undefined,
    primerabala: undefined,
    frames: 0,
    numRandom: 0,
    keyCaps: {
        RIGHT: 37,
        LEFT: 39,
        SHOOT: 32
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
        


        background.initBackground()
        player.initPlayer()
        this.setEventListeners()


        this.start()

    },

    setEventListeners() {
        document.onkeydown = e => {

            e.keyCode === 37 ? player.moveNave('left') : null
            e.keyCode === 39 ? player.moveNave('right') : null
            e.keyCode === 32 ? player.shoot(this.ctx) : null
        }

    },


    start() {

        setInterval(() => {
            this.frames ++
        
            background.drawBackground(this.ctx)
            player.drawPlayer(this.ctx)

            player.bullets.forEach((elm) => elm.drawBullet())
            player.clearBullets()

            this.enemys.forEach(elm => elm.drawEnemy())

            //console.log(this.frames)
            this.generateEnemys ()
            console.log(this.enemys)
            console.log(player.bullets)
            this.collisions ()
            this.clearEnemy ()
            


        }, 60)

    },

    generateEnemys() { 
        this.frames % 20 === 0 ? this.enemys.push(new Enemy(this.ctx, this.generateRandom (window.innerWidth,0),0,100,100,10)): null
        
    },

    generateRandom(max,min) { 
        this.numRandom = Math.floor(Math.random() * (max - min)+ min)
        
        console.log (this.numRandom)
        return this.numRandom
    },
   
    clearEnemy() {
       
        this.enemys = this.enemys.filter((ene) => ene.posEnemyY<= window.innerHeight);
    },

    collisions() { 

        this.enemys.forEach(enemy1 => {
            player.bullets.forEach(bullet1 => {
                
                if (enemy1.posEnemyX < bullet1.bulletX + bullet1.bulletW &&
                    enemy1.posEnemyX + enemy1.enemyW-30 > bullet1.bulletX &&
                    enemy1.posEnemyY < bullet1.bulletY+100 + bullet1.bulletH &&
                    enemy1.enemyH + enemy1.posEnemyY > bullet1.bulletY + 100) {
                    
                    
                    enemy1.posEnemyY = 1000
                    bullet1.bulletY = -100

                   
                    
                }
            })
        }  ) 

      
    }

}





    // (enemy1.posEnemyX < bullet1.bulletX + bullet1.bulletW &&
    //     enemy1.posEnemyX + enemy1.enemyW > bullet1.bulletX &&
    //     enemy1.posEnemyY < bullet1.bulletY + bullet1.bulletH &&
    //     enemy1.enemyH + enemy1.posEnemyY > bullet1.bulletY)

