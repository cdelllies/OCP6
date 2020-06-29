class Case {
    constructor() {
        this.setPosition()
    }
    checkPos(scope = 0) {
        let coordinates = []
        coordinates.push({ "x": this.x, "y": this.y })
        for (scope; scope > 0; scope--) {
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
            if (board.getSpecialCase(el.x, el.y) === null) {
                console.log("ok")
            } else {
                console.log("changing pos")
                return this.setPosition(this.checkPos(scope))
            }
        }
    }
    setPosition(callback = null) {
        this.x = rand(10)
        console.log(this.x)
        this.y = rand(10)
        console.log(this.y)
        return callback
    }
}

class Player extends Case {
    constructor(color) {
        super()
        this.isWalkable = false
        this.type = Player
        super.checkPos(1)
        board.setSpecialCase(this)
        if (board.playerStore.length != 0) {
            colorCase('red', this.x, this.y)
        } else {
            imgCase('brigitte.png', this.x, this.y)
        }
    }
}

class Void extends Case {
    constructor() {
        super()
        this.isWalkable = false
        this.type = Void
        super.checkPos()
        board.setSpecialCase(this)
    }
}