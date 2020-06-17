class BgSprite  {

    constructor(ctx, posAstX, posAstY, astSizeW, astSizeH, astVel) {
        this.ctx = ctx
        this.posAstX = posAstX
        this.posAstY = posAstY
        this.astSizeW = astSizeW
        this.astSizeH = astSizeH
        this.astVel = astVel
    }


    drawAsteroid() {
        

    this.astImage = new Image()
    this.astImage.src = 'images/asteroids.png'
        
    //this.astImage.onload = () => {
      this.ctx.drawImage(
        this.astImage,
        this.posAstX,
        this.posAstY,
        innerWidth,
        innerHeight
      );
      this.ctx.drawImage(
        this.astImage,
        this.posAstX,
        this.posAstY - innerHeight,
        innerWidth,
        innerHeight
      );
    //};
    this.moveImage();
  }

  moveImage() {
    if (this.posAstY >= innerHeight) {
      this.posAstY = -1;
    }
    this.posAstY += this.astVel;
  }

}