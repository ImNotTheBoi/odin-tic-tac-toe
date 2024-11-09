const gameBoard = (function() {
    const rows = 3
    const columns = 3
    const board = []

    // Creates the board cells
    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
          board[i].push(0)
        }
    }
    console.log(board)
    function markCell(row, column) {
        console.log(row, column)
        console.log(board)
        if (board[row][column] === 0) {
            return true
        }
    }
    
    function roundCondition() {
        // const markedCells = board.map((row, rowIndex) => row.filter((column, columnIndex) => column === "X"))
        const markedCells = board.flat().map((x, xIndex) => x === "X" ? xIndex + 1 : -1).filter((x) => x!= -1).join("")
        console.log(board)
        console.log(markedCells)
        const winCondition = /[1-3]{3}|[4-6]{3}|[7-9]{3}|(?=.*3)(?=.*6)(?=.*9)|(?=.*2)(?=.*5)(?=.*8)|(?=.*3)(?=.*6)(?=.*9)|(?=.*1)(?=.*5)(?=.*9)|(?=.*3)(?=.*5)(?=.*7)/   
        if (winCondition.test(markedCells)) {
            console.log("yes")
        }
        // 123
        // 456
        // 789
        // full
        return markedCells
    } 
    return {
        board,
        markCell,
        roundCondition
    }
})()

const gameController = (function() {
    const board = gameBoard.board
    const markCell = gameBoard.markCell
    board[0][1] = "X"
    board[1][1] = "X"
    board[2][1] = "X"
    board[0][2] = "X"
    // if (markCell(1, 2) === true) {
    //     board[1][2] = "X"
    // }
    console.log(gameBoard.board)
    gameBoard.roundCondition()
})()