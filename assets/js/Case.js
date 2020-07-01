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
        console.log(coordinates)
        return coordinates
    }
    setPosition(check = false, scope = 0) {
        this.x = rand(10)
        this.y = rand(10)
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

class Player extends Case {
    constructor(color) {
        super()
        this.isWalkable = false
        this.type = Player
        this.gun = new Gun(1, false)
        board.gunStore.push(this.gun)
        this.id = board.playerStore.length + 1
        this.path = []
        super.checkPos(1)
        board.setSpecialCase(this)
        super.imgCase(`p${this.id}.png`)
        this.displayGun()
    }
    displayGun() {
        let img = document.querySelector(`#gun${this.id}`)
        img.setAttribute('src', `assets/img/${this.gun.img}`)
        let desc = document.querySelector(`#gun${this.id}name`)
        desc.innerHTML = this.gun.name
    }
    getPath() {
        let coordinates = super.neighbors(3)
        console.log(coordinates)
        coordinates.splice(4, 1)
        console.log(coordinates)
        for (let i = 0; i < coordinates.length; i++) {
            const el = coordinates[i];
            console.log(el.length)
            for (let j = 0; j < el.length; j++) {
                const el2 = el[j];
                let currentCase = board.getSpecialCase(el2.x, el2.y)
                if (currentCase != null && !currentCase.isWalkable || el2.x > 9 || el2.y > 9 || el2.x < 0 || el2.y < 0) {
                    console.log('cant walk here')
                    el.splice(j)
                }
            }
        }
        return coordinates
    }
    displayPath() {
        let path = this.getPath()
        this.path = path[0].concat(path[1]).concat(path[2]).concat(path[3])
        this.path.forEach(el => {
            super.setClass("selected", el.x, el.y)
        });
    }
    move(x, y) {
        this.path.push({ x: this.x, y: this.y })
        this.x = x
        this.y = y
        this.sanitize()
        super.imgCase(`p${this.id}.png`)
        this.path = []
        board.refreshGuns()
        console.log("here")
        board.turn()
        this.checkGun()
    }
    sanitize() {
        console.log(this.path)
        this.path.forEach(el => {
            let currentCase = document.querySelector(`[data-x="${el.x}"][data-y="${el.y}"]`)
            currentCase.innerHTML = ""
            currentCase.setAttribute("class", "w")
        });
    }
    checkGun() {
        for (let index = 0; index < board.gunStore.length; index++) {
            const gun = board.gunStore[index];
            if (this.x === gun.x && this.y === gun.y) {
                console.log("hello there")
                console.log(gun)
                console.log(this.gun)
                this.gun.x = this.x
                this.gun.y = this.y
                this.gun = gun
                gun.x = -1
                gun.y = -1
                this.displayGun()
                return
            }
        }
    }

}


class Void extends Case {
    constructor() {
        super()
        this.isWalkable = false
        this.type = Void
        super.checkPos()
        super.setClass("b")
        super.rmClass("w")
        board.setSpecialCase(this)
    }
}

class Gun extends Case {
    constructor(id, visible = true) {
        super()
        this.isWalkable = true
        this.type = Gun
        this.img = `${id}.png`
        if (visible) {
            super.checkPos()
            board.setSpecialCase(this)
            this.displayGun()
        } else {
            this.x = -1
            this.y = -1
        }
        switch (id) {
            case 1:
                this.name = "Ampli"
                this.damages = 10
                break;
            case 2:
                this.name = "Pacificateur"
                this.damages = 30
                break;
            case 3:
                this.name = "Pulseur"
                this.damages = 20
                break;
            case 4:
                this.name = "Pistolet Mitrailleur"
                this.damages = 25
                break;

            default:
                break;
        }
    }
    displayGun() {
        super.imgCase(this.img)
    }
}