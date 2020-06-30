window.board = new Board

window.rand = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min)) + min
}

window.imgCase = (name, x, y) => {
    let plateCase = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
    let img = document.createElement('img')
    img.setAttribute('src', `assets/img/${name}`)
    plateCase.appendChild(img)
}

window.colorCase = (color, x, y) => {
    let plateCase = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
    plateCase.setAttribute('style', `background-color : ${color}`)
}

const createPlayers = () => {
    board.playerStore.push(new Player('red'))
    board.playerStore.push(new Player('blue'))
}

const createVoid = () => {
    for (let index = 0; index < params.void; index++) {
        new Void
    }
}

const createGuns = () => {
    for (let index = 0; index < params.maxGuns; index++) {
        board.gunStore.push(new Gun(rand(5, 2)))
    }
}

board.draw()

createPlayers();
createVoid();
createGuns();