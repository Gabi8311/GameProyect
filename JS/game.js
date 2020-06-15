const myGame = {
    name: 'Space Invaders drunk',
    description: 'First Proyect on Ironhack',
    version: '1.0',
    author: 'Laura Sanchez, Andres Barros y Gabriel Moreno',
    license: undefined,
    canvasDom: undefined,
    ctx: undefined,
    background1: undefined,
    enemy: undefined,
    player1: undefined,
    score: undefined,
    primerabala: undefined,
    
    

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
        //this.drawBackground('bgimage.png')


        background.initBackground()
        player.initPlayer()
        keyCaps.setEventListeners()
        
        //this.primerabala = new Bullet(this.ctx, undefined, 500, 500, 100, 100, 20)
        //this.primerabala.initBullet ()
        
        this.start()


        


    },

    

    start() {

        setInterval(() => {
            background.drawBackground(this.ctx)
            player.drawPlayer(this.ctx)
            player.bullets.forEach(elm => elm.drawBullet ())
            //this.primerabala.drawBullet ()


        }, 60)

    },

    
}










































// CODIGO POR REVISAR 

//     drawBackground(bgName) {

//         let bgImage = new Image();
//         bgImage.src = `images/${bgName}`;
//         bgImage.onload = () => {
//             this.ctx.drawImage(
//                 bgImage,
//                 this.canvasSize.bgPosX,
//                 this.canvasSize.bgPosY,
//                 innerWidth,
//                 innerHeight
//             );


//         }



//     }
// }
