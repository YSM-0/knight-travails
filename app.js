import gameBoard from "./gameboard.js";

class Node {
    constructor(position, distance = 0, previous = null) {
        this.x = parseInt(position.slice(1,2))
        this.y = parseInt(position.slice(3,4))
        this.previous = previous
        this.distance = distance
    }

    getPosition() {
        return `[${this.x},${this.y}]`
    }
}

const board = new gameBoard()

const button = document.querySelector('.sub-button')

const posibilities = [[1,2], [2,1], [-1,2], [-2,1], [1,-2], [2,-1], [-1,-2], [-2,-1]]

const visited = new Set()

function populateTree(node, end) {
    const start = node.getPosition()

    let queue = []
    let previous = null

    queue.push(node)

    visited.add(start)

    while (queue.length) {
        const currentNode = queue.shift()
        const distance = currentNode.distance

        if (currentNode.getPosition() == end) return currentNode

        for (const posibility of posibilities) {
            const xNext = currentNode.x + posibility[0]
            const yNext = currentNode.y + posibility[1]
            const position = `[${xNext},${yNext}]`
            const newNode = new Node(position, distance + 1, currentNode)

            if (visited.has(position)) continue
            if (xNext > 7 || xNext < 0 || yNext > 7 || yNext < 0) continue

            queue.push(newNode)
            visited.add(position)
            previous = currentNode
        }
    }
}

function getPath(node) {
    const gameBoard = document.querySelector('.board')
    let path = []
    let currentNode = node
    let previous = null
    let xPath  = null
    let yPath = null
    let rowArray = []
    let count = 1

    path.unshift(node.getPosition())

    while (currentNode.previous !== null) {
        previous = currentNode.previous
        path.unshift(previous.getPosition())
        currentNode = currentNode.previous

        xPath = previous.x
        yPath = previous.y

        for (const node of gameBoard.childNodes) {
            rowArray.unshift(node)
        }

        const row = rowArray[yPath]
        const square = row.childNodes[xPath]

        board.setPath(square, count)
        count++
    }

    return `You made it in ${node.distance} moves. Here's your path: ${path}.`
}

board.createBoard(8)

button.addEventListener('click', () => {
    const end = document.querySelector('.end').value
    const gameBoard = document.querySelector('.board')
    let resultNode = null
    let xFinal = null
    let yFinal = null
    let rowArray = []

    if (end.slice(1,2) > 7 || end.slice(3,4) > 7) throw new Error('max [7,7]')

    board.end = end
    board.rootNode = new Node(board.start)

    resultNode = populateTree(board.rootNode, end)

    xFinal = resultNode.x
    yFinal = resultNode.y

    for (const node of gameBoard.childNodes) {
        rowArray.unshift(node)
    }

    const path = getPath(resultNode)

    const row = rowArray[yFinal]
    const square = row.childNodes[xFinal]
    console.log(xFinal, yFinal, row, square)
    board.setKnight(square, resultNode.getPosition())

    console.log(path)
})