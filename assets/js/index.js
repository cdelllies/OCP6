window.board = new Board

window.rand = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min)) + min
}

let buttons = document.querySelectorAll("article button")
buttons.forEach(btn => {
    addEventListener("click", board.eventHandler)
})

board.draw()

function play() {
    document.querySelector('#body').classList.remove('blur')
    document.querySelector('#startPopup').style.visibility = 'hidden'
}