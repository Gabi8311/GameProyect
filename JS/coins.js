class Coins { 
    constructor(ctx, posCoinX, posCoinY, coinSizeW, coinSizeH, velCoin) { 
        this.ctx = ctx
        this.posCoinX = posCoinX
        this.posCoinY = posCoinY
        this.coinSizeW = coinSizeW
        this.coinSizeH = coinSizeH
        this.velCoin = 5

    }
    drawGoodCoin() {
        
        this.goodCoinImg = new Image()
        this.goodCoinImg.src = 'images/goodCoin.png'
        
        this.ctx.drawImage(this.goodCoinImg, this.posCoinX, this.posCoinY, this.coinSizeW, this.coinSizeH)
        this.moveCoin()
        
    }
    
    
    moveCoin() { 
        this.posCoinY += this.velCoin
    }
    
}