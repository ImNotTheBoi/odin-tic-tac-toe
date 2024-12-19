const gameBoard = (function () {
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
            displayController.displayBoard(board.flat())
            return roundCondition(symbol)
        }
    }

    function roundCondition(symbol) {
        const availableCells = board.flat().map((x, xIndex) => x === 0 ? xIndex + 1 : -1).filter((x) => x != -1).join("")
        const markedCells = board.flat().map((x, xIndex) => x === symbol ? xIndex + 1 : -1).filter((x) => x != -1).join("")
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

const gameController = (function () {
    const buttons = (document.querySelectorAll(".buttons > button"))
    let players = [
        { name: "player1", symbol: "X", score: 0 },
        { name: "player2", symbol: "O", score: 0 }
    ]
    let activePlayer = players[0]

    function start(player1Name, player2Name) {
        [...buttons].forEach((element) => { element.disabled = false })
        players[0].name = player1Name
        players[1].name = player2Name
        displayController.displayScore("reset")
        gameBoard.newBoard()
        console.log(`${players[0].name} = ${players[0].symbol}`)
        console.log(`${players[1].name} = ${players[1].symbol}`)
    }

    function restart() {
        [...buttons].forEach((element) => { element.disabled = true })
        players = [
            { name: "player1", symbol: "X", score: 0 },
            { name: "player2", symbol: "O", score: 0 }
        ]
        activePlayer = players[0]
    }

    function pickCell(index) {
        const markCell = gameBoard.markCell(index, activePlayer.symbol)
        if (markCell) { checkRoundCondition(markCell) }
    }

    function checkRoundCondition(markedCell) {
        switch (markedCell) {
            case "tie":
                console.log(`It's a tie!`)
                gameBoard.newBoard()
                break
            case "win":
                activePlayer.score++
                displayController.displayScore(players.indexOf(activePlayer))
                if (activePlayer.score === 3) { break }
                gameBoard.newBoard()
                console.log(`${activePlayer.name} wins`)
                break
        }

        if (activePlayer.score != 3) {
            console.log(activePlayer.symbol)
            console.log(players[1])
            if (activePlayer === players[0]) { activePlayer = players[1] }
            else if (activePlayer === players[1]) { activePlayer = players[0] }
            console.log(`${activePlayer.name} turn`)
        }

        else {
            console.log(`${activePlayer.name} wins the game`)
            restart()
        }
    }

    function setupButtonControls() {
        [...buttons].forEach((element, index) => {
            element.addEventListener('click', function buttonSetup() {
                pickCell(index)
            })
        })
    }

    setupButtonControls()

    return {
        start,
        restart
    }
})()

const displayController = (function () {
    const buttons = document.querySelectorAll(".buttons button")
    const player1 = document.querySelector(".player1Name")
    const player2 = document.querySelector(".player2Name")
    const player1Score = document.querySelector(".player1Score")
    const player2Score = document.querySelector(".player2Score")
    const startButton = document.querySelector(".startButton")

    function displayBoard(board) {
        for (let i = 0; i < board.length; i++) {
            buttons[i].textContent = board[i]
        }
    }

    function displayScore(playerIndex) {
        switch (playerIndex) {
            case 0:
                player1Score.textContent++
                break
            case 1:
                player2Score.textContent++
                break
            case "reset":
                player1Score.textContent = 0
                player2Score.textContent = 0
                break
        }
    }

    function setupStartButton() {
        startButton.addEventListener('click', () => {
            if (startButton.textContent == "Restart") {
                gameController.restart()
                startButton.textContent = "Start"
            }
            else {
                let player1Name = document.querySelector(".player1Input").value
                let player2Name = document.querySelector(".player2Input").value
                player1.textContent = player1Name
                player2.textContent = player2Name
                startButton.textContent = "Restart"
                gameController.start(player1Name, player2Name)
            }
        })
    }

    setupStartButton()

    return {
        displayBoard,
        displayScore
    }
})()
