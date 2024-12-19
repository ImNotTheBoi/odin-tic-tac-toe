const gameBoard = (function() {
    const rows = 3
    const columns = 3
    const board = []
    
    function newBoard() {
        for (let i = 0; i < rows; i++) {
            board[i] = []
            for (let j = 0; j < columns; j++) {
              board[i].push(0)
            }
        }
        displayController.displayBoard(board.flat())
        console.log(board)
    }

    function markCell(index, symbol) {
        if (board.flat()[index] === 0) {        
            if (index < 3) {
                board[0][index] = symbol
            }
            else if (index < 6) {
                board[1][index - 3] = symbol
            }
            else if (index < 9) {
                board[2][index - 6] = symbol
            }
            console.log(board)
            displayController.displayBoard(board.flat())
            return roundCondition(symbol)
        }
    }

    function roundCondition(symbol) {
        const availableCells = board.flat().map((x, xIndex) => x === 0 ? xIndex + 1 : -1).filter((x) => x!= -1).join("")
        const markedCells = board.flat().map((x, xIndex) => x === symbol ? xIndex + 1 : -1).filter((x) => x!= -1).join("")
        const winCondition = /[1-3]{3}|[4-6]{3}|[7-9]{3}|(?=.*1)(?=.*4)(?=.*7)|(?=.*2)(?=.*5)(?=.*8)|(?=.*3)(?=.*6)(?=.*9)|(?=.*1)(?=.*5)(?=.*9)|(?=.*3)(?=.*5)(?=.*7)/   
        if (winCondition.test(markedCells)) {
            return "win"
        }
        
        if (!availableCells) {
            return "tie"
        }
        return "continue"
    } 
    return {
        markCell,
        newBoard
    }
})()

const gameController = (function() {
    const buttons = (document.querySelectorAll(".buttons > button"))
    let players = [
        {name: "player1", symbol: "X", score: 0},
        {name: "player2", symbol: "O", score: 0}
    ]
    let activePlayer = players[0]

    function start(player1Name, player2Name) {
        players[0].name = player1Name
        players[1].name = player2Name
        gameBoard.newBoard()
        console.log(`${players[0].name} = ${players[0].symbol}`)
        console.log(`${players[1].name} = ${players[1].symbol}`)
        buttonControls()
    }

    function pickedCell(index) {
        const markedCell = gameBoard.markCell(index, activePlayer.symbol)
        if (markedCell) {
            switch (markedCell) {
                case "tie":
                    gameBoard.newBoard()
                    console.log(`It's a tie!`)
                    break
                case "win":
                    activePlayer.score++
                    gameBoard.newBoard()
                    console.log(`${activePlayer.name} wins`) 
                    break
            }

            if (activePlayer === players[0]) {activePlayer = players[1]}
            else if (activePlayer === players[1]) {activePlayer = players[0]}
            console.log(`${activePlayer.name} turn`)
        }
    }

    function buttonControls() {
        [...buttons].forEach((element, index) => {
            element.addEventListener('click', () => {
              pickedCell(index)
            })
          })
    }
    return {
        start
    }
})()

const displayController = (function() {
    const buttons = document.querySelectorAll(".buttons button")
    function displayBoard(board) {
        for (let i = 0; i < board.length; i++) {
            buttons[i].textContent = board[i]
        }
    }
    return {
        displayBoard
    }
})()

gameController.start("TheBoi", "TheGurl")