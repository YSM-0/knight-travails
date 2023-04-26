class gameBoard {
    constructor(size) {
        this.size = size
        this.start = ''
        this.end = ''
        this.rootNode = null
    }

    createBoard(size = this.size) {
        const gameSection = document.querySelector('.game-section')
        const boardContainer = document.createElement('div')
        let toggle = true
        let y = size - 1
        let x = 0

        gameSection.appendChild(boardContainer)
        boardContainer.classList.add('board')


        for (let i = 0; i < size; i++) {
            const row = document.createElement('div')

            row.classList.add('row', y)
            x = 0
            y--

            boardContainer.appendChild(row)
            for (let j = 0; j < size; j++) {
                const square = document.createElement('div')
                
                if (toggle == true) {
                    square.classList.add('white')
                    toggle = false
                }
                else if (toggle == false) {
                    square.classList.add('black')
                    toggle = true
                }

                square.classList.add('square', x)
                row.appendChild(square)

                square.addEventListener('click', (event) => {
                    const square = event.target
                    const squareClassString = square.className
                    const rowClassString = square.parentNode.className
                    const thisx = squareClassString.slice(-1)
                    const thisy = rowClassString.slice(-1)
                    const position = `[${thisx},${thisy}]`

                    this.setKnight(square, position)
                }, 1)

                x++
            }
            if (toggle == true) {
                toggle = false
            }
            else if (toggle == false) {
                toggle = true
            }
        }
    }

    setKnight(square, position) {
        const squares = document.querySelectorAll('.square')
        const knightImage = document.createElement('img')
        const startInput = document.querySelector('.start')

        squares.forEach((square) => {
            if (square.childNodes.length > 0) {
                square.removeChild(square.childNodes[0])
            }
        })

        square.appendChild(knightImage)
        knightImage.setAttribute('src', '/assets/knight.svg')

        startInput.value = position
        this.start = position
    }

    setPath(square, count) {
        square.classList.add('path')
    }
}


export default gameBoard