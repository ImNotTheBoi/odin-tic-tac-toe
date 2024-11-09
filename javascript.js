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
    board[1][1] = 0
    function markCell(row, column) {
        if (board[row][column] === 0) {
            return roundCondition()
        }
    }
    
    function roundCondition() {
        const availableCells = (board.map((row, rowIndex) => (row.filter((column, columnIndex) => column === "0")).join())).join("")
        const markedCells = board.flat().map((x, xIndex) => x === "X" ? xIndex + 1 : -1).filter((x) => x!= -1).join("")
        const winCondition = /[1-3]{3}|[4-6]{3}|[7-9]{3}|(?=.*3)(?=.*6)(?=.*9)|(?=.*2)(?=.*5)(?=.*8)|(?=.*3)(?=.*6)(?=.*9)|(?=.*1)(?=.*5)(?=.*9)|(?=.*3)(?=.*5)(?=.*7)/   
        
        if (availableCells !== "") {
            return "tie"
        }
        
        if (winCondition.test(markedCells)) {
            return "win"
        }
        
        return "continue"
    } 
    return {
        board,
        markCell,
        roundCondition
    }
})()

const gameController = (function(player1Name, player2Name) {
    let players = [
        {name: player1Name, symbol: "X", score: 0},
        {name: player2Name, symbol: "O", score: 0}
    ]
    const board = gameBoard.board
    let markedCell = gameBoard.markCell(1, 1)
    let activePlayer = players[0]   

    if (markedCell) {
        let currentSymbol = players[0].symbol
        console.log(board)
        switch (markedCell) {
            case "win":
                players[0].symbol = players[1].symbol
                players[1].symbol = currentSymbol
                activePlayer.score++
                break
            case "tie":
                players[0].symbol = players[1].symbol
                players[1].symbol = currentSymbol
            case "continue":
                break
        }
    }
})()