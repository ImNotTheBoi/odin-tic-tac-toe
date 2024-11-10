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
        let currentSymbol = activePlayer.symbol
        const markedCell = gameBoard.markCell(index, currentSymbol)
        if (markedCell) {
            switch (markedCell) {
                case "win":
                    players[0].symbol = players[1].symbol
                    players[1].symbol = currentSymbol
                    activePlayer.score++
                    gameBoard.newBoard()
                    console.log(`${activePlayer.name} wins`)
                    console.log(`${players[0].name} = ${players[0].symbol}`)
                    console.log(`${players[1].name} = ${players[1].symbol}`)
                    console.log(`${activePlayer.name} turn`)
                    break
                case "tie":
                    players[0].symbol = players[1].symbol
                    players[1].symbol = currentSymbol
                    gameBoard.newBoard()
                    console.log(`It's a tie!`)
                    console.log(`${players[0].name} = ${players[0].symbol}`)
                    console.log(`${players[1].name} = ${players[1].symbol}`)
                    console.log(`${activePlayer.name} turn`)
                    break
                case "continue":
                    if (activePlayer === players[0]) {activePlayer = players[1]}
                    else if (activePlayer === players[1]) {activePlayer = players[0]}
                    console.log(`${activePlayer.name} turn`)
                    break
            }
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

gameController.start("TheBoi", "TheGurl")