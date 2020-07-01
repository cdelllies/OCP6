window.board = new Board

window.rand = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min)) + min
}

board.draw()
