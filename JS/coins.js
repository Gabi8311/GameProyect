class Coins {
    constructor(ctx, posCoinX, posCoinY, coinSizeW, coinSizeH, velCoin) {
        this.ctx = ctx
        this.posCoinX = posCoinX
        this.posCoinY = posCoinY
        this.coinSizeW = coinSizeW
        this.coinSizeH = coinSizeH
        this.velCoin = velCoin
        this.goodCoinImg = new Image()
        this.goodCoinImg.src = 'images/BlueCoins.png'
        this.goodCoinImg.frames = 6
        this.goodCoinImg.framesIndex = 0

    }
    drawGoodCoin(frames) {

        this.ctx.drawImage(this.goodCoinImg,
            this.goodCoinImg.framesIndex * Math.floor(this.goodCoinImg.width / this.goodCoinImg.frames),
            0,
            Math.floor(this.goodCoinImg.width / this.goodCoinImg.frames),
            this.goodCoinImg.height,
            this.posCoinX,
            this.posCoinY,
            this.coinSizeW,
            this.coinSizeH)
        this.animateCoin (frames)

    }

    animateCoin(frames) {
        if (frames % 2 == 0) {
            this.goodCoinImg.framesIndex++
        }

        if (this.goodCoinImg.framesIndex > this.goodCoinImg.frames - 1) {
            this.goodCoinImg.framesIndex = 0
        }

        this.moveCoin()

    }


    moveCoin() {
        this.posCoinY += this.velCoin
    }

}