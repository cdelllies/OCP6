class Gun extends Case {
    constructor(id, visible = true) {
        super()
        this.isWalkable = true
        this.type = Gun
        this.img = `${id}.png`
        if (visible) {
            super.checkPos()
            board.setSpecialCase(this)
            this.display()
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
    display() {
        super.imgCase(this.img)
    }
}