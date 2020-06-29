class Board {
    constructor() {
        this.playerStore = []
        this.specialCases = []
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
                id++;
                tr.appendChild(td)
            }
            table.appendChild(tr)
        }
        table.classList.add('center')
        document.querySelector('#app').appendChild(table)
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
}