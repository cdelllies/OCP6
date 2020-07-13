class Case {
    constructor() {
        this.setPosition()
    }
    checkPos(scope = 0) {
        let coordinates
        if (scope === 0) {
            coordinates = []
        } else {
            coordinates = this.neighbors(scope)
            coordinates = coordinates[4]
        }
        coordinates.push({ "x": this.x, "y": this.y })
        for (let isSpecial = 0; isSpecial < coordinates.length; isSpecial++) {
            const el = coordinates[isSpecial];
            if (board.getSpecialCase(el.x, el.y) !== null) {
                this.setPosition(true, scope)
                return
            }
        }
    }
    neighbors(scope = 0) {
        let coordinates = [[], [], [], [], []]
        for (let iterations = 1; iterations <= scope; iterations++) {
            coordinates[0].push({
                "x": this.x + iterations,
                "y": this.y
            })
            coordinates[1].push({
                "x": this.x - iterations,
                "y": this.y
            })
            coordinates[2].push({
                "x": this.x,
                "y": this.y + iterations
            })
            coordinates[3].push({
                "x": this.x,
                "y": this.y - iterations
            })
        }
        coordinates[4] = coordinates[0].concat(coordinates[1]).concat(coordinates[2]).concat(coordinates[3])
        return coordinates
    }
    setPosition(check = false, scope = 0) {
        this.x = rand(params.gridSize)
        this.y = rand(params.gridSize)
        if (check) {
            this.checkPos(scope)
        }
    }
    setClass(cssClass, x = this.x, y = this.y) {
        let plateCase = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
        plateCase.classList.add('class', cssClass)
    }
    rmClass(cssClass, x = this.x, y = this.y) {
        let plateCase = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
        plateCase.classList.remove('class', cssClass)
    }
    imgCase(name) {
        let plateCase = document.querySelector(`[data-x="${this.x}"][data-y="${this.y}"]`)
        let img = document.createElement('img')
        img.setAttribute('src', `assets/img/${name}`)
        img.addEventListener("click", board.eventHandler)
        plateCase.appendChild(img)
    }
}