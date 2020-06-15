const keyCaps = {
    setEventListeners() {
        document.onkeydown = e => {

            e.keyCode === 37 ? player.moveNave('left') : null
            e.keyCode === 39 ? player.moveNave('right') : null
            e.keyCode === 32 ? player.shoot() : null
        }

    }
}