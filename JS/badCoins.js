class BadCoins extends Coins {
constructor(ctx, posCoinX, posCoinY, coinSizeW, coinSizeH, velCoin){
super(ctx, posCoinX, posCoinY, coinSizeW, coinSizeH, velCoin)
this.velCoinX = 10
this.coinGravity = .4
}
drawBadCoin() { 
    this.badCoinImg = new Image()
    this.badCoinImg.src = 'images/badCoin.png'
    
    this.ctx.drawImage(this.badCoinImg, this.posCoinX, this.posCoinY, this.coinSizeW, this.coinSizeH)
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