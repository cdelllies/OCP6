let params = {
  'gridSize': 10,
  'maxGuns': 4
}

let blankCase = { 'x': [], 'y': [] }

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
      colorCase('red', this.x, this.y)
    } else {
      imgCase('brigitte.png', this.x, this.y)
    }
  }
  move() {

  }
}

class Gun {
  constructor(x, y) {
    this.location = new Location(x, y)
  }
}

class Location {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  checkNeighbors(radius) {

  }
  change(x, y) {

  }
}



const colorCase = (color, x, y) => {
  let plateCase = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
  plateCase.setAttribute('style', `background-color : ${color}`)
}

const imgCase = (name, x, y) => {
  let plateCase = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
  let img = document.createElement('img')
  img.setAttribute('src', `assets/img/${name}`)
  plateCase.appendChild(img)
}

const createPlayers = () => {
  playerStore.push(new Player('red'))
  playerStore.push(new Player('blue'))
}

const board = new Board

createPlayers();