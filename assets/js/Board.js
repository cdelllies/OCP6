class Board {
    constructor() {
        this.playerStore = []
        this.gunStore = []
        this.specialCases = []
        this.fight = false
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
        for (let index = 0; index < params.void; index++) {
            new Void
        }
        for (let index = 0; index < params.maxGuns; index++) {
            board.gunStore.push(new Gun(rand(5, 2)))
        }
        this.playerStore.push(new Player())
        this.playerStore.push(new Player())
        this.storePos()
        this.turn();
    }
    getSpecialCase(x, y) {
        for (let index = 0; index < this.specialCases.length; index++) {
            let el = this.specialCases[index]
            if (el.x === x && el.y === y) {
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
        } else if (el.tagName === "BUTTON") {
            let playerId = el.dataset.player
            board.playerStore[playerId - 1].action = el.dataset.action
            board.fightController(playerId)
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
    refresh() {
        this.gunStore.forEach(gun => {
            let currentCase = document.querySelector(`[data-x="${gun.x}"][data-y="${gun.y}"]`)
            if (gun.x === -1) {
                return
            } else if (currentCase.innerHTML == "") {
                gun.display()
            }
        })

    }
    storePos() {
        this.pos1 = [this.playerStore[0].x, this.playerStore[0].y]
        //let pos2 = [this.playerStore[1].x, this.playerStore[1].y]
    }
    turn() {
        if (this.playerStore[0].x === this.pos1[0] && this.playerStore[0].y === this.pos1[1]) {
            this.playerStore[0].displayPath()
        } else {
            this.playerStore[1].displayPath()
        }
        this.storePos()
    }
    changeHealth(id) {
        let text = document.querySelector(`#health${id}label`)
        let bar = document.querySelector(`#health${id}`)
        text.innerHTML = `Vie : ${board.playerStore[id - 1].health} / 100`
        bar.value = board.playerStore[id - 1].health
    }
    fightController(id) {
        if (this.playerStore[0].action === null || this.playerStore[1].action === null) {
            if (id == 1) {
                this.playerStore[1].selectFight(false)
                this.playerStore[0].selectFight(true)
            } else {
                this.playerStore[0].selectFight(false)
                this.playerStore[1].selectFight(true)
            }
        } else {
            let player1 = this.playerStore[0]
            let player2 = this.playerStore[1]

            player1.selectFight(true)
            player2.selectFight(true)

            let power1 = player1.gun.damages
            let power2 = player2.gun.damages

            if (player1.action === "attack") {
                if (player2.action === "attack") {
                    player2.health -= power1
                    player1.health -= power2
                } else {
                    player2.health -= power2 / 2
                }
            } else {
                if (player2.action === "attack") {
                    player1.health -= power2 / 2
                }
            }
            this.changeHealth(1)
            this.changeHealth(2)
            if (player1.health <= 0 || player2.health <= 0) {
                alert(`Partie finie ${(player1.health < player2.health) ? 'Le joueur 1' : 'Le joueur 2'} a perdu`)
                $('#body').addClass('blur')
                $('#endPopup').css("visibility", 'visible')
            } else {
                player1.action = null
                player2.action = null
                this.turn()
            }
        }
    }
}