class BadCoins extends Coins {
constructor(ctx, posCoinX, posCoinY, coinSizeW, coinSizeH, velCoin){
super(ctx, posCoinX, posCoinY, coinSizeW, coinSizeH, velCoin)
this.velCoinX = 10
this.coinGravity = .4
this.badCoinImg = new Image()
this.badCoinImg.src = 'images/RedCoins.png'
this.badCoinImg.frames = 6
this.badCoinImg.framesIndex = 0
}
drawBadCoin(frames) { 
   
        this.ctx.drawImage(this.badCoinImg, this.badCoinImg.framesIndex * Math.floor(this.badCoinImg.width / this.badCoinImg.frames),
            0,
            Math.floor(this.badCoinImg.width / this.badCoinImg.frames),
            this.badCoinImg.height,
            this.posCoinX,
            this.posCoinY,
            this.coinSizeW,
            this.coinSizeH)
        
        this.animate(frames) 
            
    }

    animate(frames) { 
        if (frames % 2 == 0) { 
            this.badCoinImg.framesIndex ++
        }

        if (this.badCoinImg.framesIndex > this.badCoinImg.frames - 1) { 
            this.badCoinImg.framesIndex = 0
        }
        this.moveBadCoin()
    }
   
moveBadCoin() { 
    this.posCoinX += this.velCoinX
     this.posCoinY += this.velCoin

    this.posCoinY > myGame.canvasSize.h - this.coinSizeH ? this.velCoinY *= -1 : null
    this.posCoinX > myGame.canvasSize.w - this.coinSizeW ? this.velCoinX *= -1 : null
    this.posCoinY < myGame.canvasSize.h + this.coinSizeH ? this.velCoinY *= 1 : null
    this.posCoinX <= 0+this.coinSizeW/2 ? this.velCoinX += this.velCoin : null
 }

}