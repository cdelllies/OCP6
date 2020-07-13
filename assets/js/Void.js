class Void extends Case {
    constructor() {
        super()
        this.isWalkable = false
        this.type = Void
        super.setClass("b")
        super.checkPos()
        super.rmClass("w")
        board.setSpecialCase(this)
    }
}