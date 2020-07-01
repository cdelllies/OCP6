class Board {
    constructor() {
        this.playerStore = []
        this.gunStore = []
        this.specialCases = []
        this.draw()
        this.storePos()
        this.turn()
    }
    draw() {
        let id = 0
        const table = document.createElement('table')
        table.setAttribute('id', 'board')
        for (let i = 0; i < params.gridSize; i++) {
            const tr = document.createElement('tr')
            for (let j = 0; j < params.gridSize; j++) {
                const td = document.createElement('td')
                td.className = 'w'
                td.setAttribute('data-x', i)
                td.setAttribute('data-y', j)
                td.setAttribute('id', id)
                td.addEventListener("click", this.eventHandler)
                id++;
                tr.appendChild(td)
            }
            table.appendChild(tr)
        }
        table.classList.add('center')
        document.querySelector('#app').appendChild(table)
        for (let index = 0; index < params.maxVoid; index++) {
            new Void
        }
        for (let index = 0; index < params.maxGuns; index++) {
            this.gunStore.push(new Gun(this.rand(5, 2)))
        }
        this.playerStore.push(new Player('red'))
        this.playerStore.push(new Player('blue'))
    }
    getSpecialCase(x, y) {
        for (let index = 0; index < this.specialCases.length; index++) {
            let el = this.specialCases[index]
            if (el.x === x && el.y === y) {
                console.log(el)
                return el
            }
        }
        return null
    }
    setSpecialCase(content) {
        this.specialCases.push(content)
    }
    updateSpecialCase(x1, y1, x2, y2) {
        let old = this.getSpecialCase(x1, y1)
        old.x = x2
        old.y = y2
    }
    eventHandler(event) {
        let el = event.toElement
        if (el.tagName === "IMG") {
            el = event.path[1]
        }
        if (el.classList.contains("selected")) {
            let x = parseInt(el.getAttribute("data-x"))
            let y = parseInt(el.getAttribute("data-y"))
            if (board.playerStore[0].path.length === 0) {
                board.playerStore[1].move(x, y)
            } else {
                board.playerStore[0].move(x, y)
            }
        }
    }
    refreshGuns() {
        this.gunStore.forEach(gun => {
            let currentCase = document.querySelector(`[data-x="${gun.x}"][data-y="${gun.y}"]`)
            if (gun.x === -1) {
                return
            } else if (currentCase.innerHTML == "") {
                gun.displayGun()
            }
        })
    }
    storePos() {
        this.pos1 = [this.playerStore[0].x, this.playerStore[0].y]
        //let pos2 = [this.playerStore[1].x, this.playerStore[1].y]
    }
    turn() {
        console.log(this.pos1)
        console.log([this.playerStore[0].x, this.playerStore[0].y])
        console.log(this.playerStore[0].x === this.pos1[0] && this.playerStore[0].y === this.pos1[1])
        if (this.playerStore[0].x === this.pos1[0] && this.playerStore[0].y === this.pos1[1]) {
            console.log("there")
            this.playerStore[0].displayPath()
        } else {
            this.playerStore[1].displayPath()
        }
        this.storePos()
    }
    rand() {
        return Math.floor(Math.random() * (max - min)) + min
    }

}