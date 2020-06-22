const rand = (max, min = 1) => {
  return Math.floor(Math.random() * max) + min
}

class Player{
  constructor(){
    this.x = rand(10)
    this.y = rand(10)
  }
}


const drawBoard = () => {
  let id = 0
  let guns = 0
  const table = document.createElement('table')
  table.setAttribute('id', 'chessBoard')
  for (let i = 0; i < 10; i++) {
    const tr = document.createElement('tr')
    for (let j = 0; j < 10; j++) {
      const td = document.createElement('td')
      if (rand(10) == 1) {
        td.className = 'b'
      } else if (rand(20) == 1 && guns < 4) {
        guns++
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

const locatePlayers = () => {
    let player1 = new Player
    colorCase('red', player1.x, player1.y)
    let player2 = new Player
    colorCase('blue', player2.x, player2.y)
}



drawBoard();
locatePlayers();