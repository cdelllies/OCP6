class Case {
    constructor() {
        this.setPosition()
    }
    checkPos(scope = 0) {
        let coordinates = []
        coordinates.push({ "x": this.x, "y": this.y })
        for (let iterations = scope; iterations > 0; iterations--) {
            coordinates.push({
                "x": this.x + scope,
                "y": this.y
            })
            coordinates.push({
                "x": this.x - scope,
                "y": this.y
            })
            coordinates.push({
                "x": this.x,
                "y": this.y + scope
            })
            coordinates.push({
                "x": this.x,
                "y": this.y - scope
            })
        }

        for (let isSpecial = 0; isSpecial < coordinates.length; isSpecial++) {
            const el = coordinates[isSpecial];
            if (board.getSpecialCase(el.x, el.y) !== null) {
                this.setPosition(true, scope)
                return
            }
        }
    }
    setPosition(check = false, scope = 0) {
        this.x = rand(10)
        this.y = rand(10)
        console.log(`x: ${this.x} & y: ${this.y}`)
        if (check) {
            this.checkPos(scope)
        }
    }
}

class Player extends Case {
    constructor(color) {
        super()
        this.isWalkable = false
        this.type = Player
        this.gun = new Gun(1, false)
        this.id = board.playerStore.length + 1
        super.checkPos(1)
        board.setSpecialCase(this)
        imgCase(`p${this.id}.png`, this.x, this.y)
        this.displayGun()
    }
    displayGun() {
        let img = document.querySelector(`#gun${this.id}`)
        img.setAttribute('src', `assets/img/${this.gun.img}`)
        let desc = document.querySelector(`#gun${this.id}name`)
        desc.innerHTML = this.gun.name
    }
}

class Void extends Case {
    constructor() {
        super()
        this.isWalkable = false
        this.type = Void
        super.checkPos()
        this.setClass("b")
        board.setSpecialCase(this)
    }
    setClass(cssClass) {
        let plateCase = document.querySelector(`[data-x="${this.x}"][data-y="${this.y}"]`)
        plateCase.setAttribute('class', cssClass)
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
            imgCase(this.img, this.x, this.y)
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
}