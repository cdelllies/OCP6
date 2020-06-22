let params = {
  'gridSize': 10,
  'maxGuns': 4
}
let gunsStore = []
let playerStore = []

const rand = (max, min = 0) => {
  return Math.floor(Math.random() * max) + min
}

class Player {
  constructor(color) {
    this.x = rand(10)
    this.y = rand(10)
    console.log(this.x + " " + this.y)
    this.color = color
    if (playerStore.length != 0) {

    }
    colorCase(color, this.x, this.y)
  }
}

class Gun {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}


const drawBoard = () => {
  let id = 0
  let guns = 0
  const table = document.createElement('table')
  table.setAttribute('id', 'chessBoard')
  for (let i = 0; i < params.gridSize; i++) {
    const tr = document.createElement('tr')
    for (let j = 0; j < params.gridSize; j++) {
      const td = document.createElement('td')
      if (rand(10) == 1) {
        td.className = 'b'
      } else if (rand(20) == 1 && guns < params.maxGuns) {
        gunsStore.push(new Gun(i, j))
        guns++
        let img = document.createElement('img')
        img.setAttribute('src', 'gun.png')
        td.appendChild(img)
        td.className = 'g'
      } else {
        td.className = 'w'
      }
      td.setAttribute('data-x', i)
      td.setAttribute('data-y', j)
      td.setAttribute('id', id)
      id++;
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }
  table.classList.add('center')
  document.body.appendChild(table)
}

const colorCase = (color, x, y) => {
  let plateCase = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
  plateCase.setAttribute('style', `background-color : ${color}`)
}

const createPlayers = () => {
  playerStore.push(new Player('red'))
  playerStore.push(new Player('blue'))
}



drawBoard();
createPlayers();