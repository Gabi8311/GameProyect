
const background = {
    background: undefined,
    bgWidth: window.innerWidth,
    bgHeight: window.innerHeight,
    bgPosX: 0,
    bgPosY: 0,

    initBackground() {
        this.background = new Image()
        this.background.src = 'images/fondoPlaneta.jpg'
    },
    drawBackground(ctx) {
        ctx.drawImage(this.background, this.bgPosX, this.bgPosY, this.bgWidth, this.bgHeight)
    }
}




































// const background = {
//     //ctx: myGame.ctx,
//     bgSize: {

//         bgWidth: window.innerWidth,
//         bgHeight: window.innerHeight,
//     },
//     bgPosition: {
//         x: 0,
//         y: 0
//     },



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