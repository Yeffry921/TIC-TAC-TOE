const Game = (() => {
    const form = document.querySelector('.form');
    const player1InputName = document.querySelector('.player1');
    const player2InputName = document.querySelector('.player2');
    const container = document.querySelector('.container');
    const gridItems = document.querySelectorAll('.grid-item');
    const message = document.querySelector('.message');
    const restart = document.querySelector('.restart');
    const gridContainer = document.querySelector('.grid-container');
    const nameDisplay = document.querySelector('.nameDisplay');

    const ArrayBoard = Array.from(gridItems);
    let player1Tag = 'X';
    let player2Tag = 'O';
    let currentPlayer = player1Tag;
    let turnMessage = 'Player 1\'s turn';
    let winningTag = '';
    let gameBoard = [];

    const checkMatch = (array) => {
        let matchTag = array[0].textContent;
        return array.every((boardItem) => boardItem.textContent === matchTag)
    }

    const printWinner = () => {
        if (winningTag === 'X') {
            message.appendChild(generateElement('p', 'Game Over Player 1 has won'));
        } else if (winningTag === 'O') {
            message.appendChild(generateElement('p', 'Game over :Player 2 has won'));
        }
    }

    const checkWinner = () => {
        if (gameBoard.length > 3) {
            checkRows()
            checkColumns()
            //checkDiagonal()
            if (winningTag !== '') {
                printWinner()
            }
        }
    }

    const checkRows = () => {
        let firstRow = ArrayBoard.slice(0, 3);
        let secondRow = ArrayBoard.slice(3, 6);
        let thirdRow = ArrayBoard.slice(6, 9)

        if (checkMatch(firstRow) === true) {
            winningTag = firstRow[0].textContent;

        } else if (checkMatch(secondRow) === true) {
            winningTag = secondRow[0].textContent;

        } else if (checkMatch(thirdRow) === true) {
            winningTag = thirdRow[0].textContent;

        }
    }

    const checkColumns = () => {

        let column1 = ArrayBoard.filter((board) => board.getAttribute('data-id').includes('1-1'))
        let column2 = ArrayBoard.filter((board) => board.getAttribute('data-id').includes('2-2'))
        let column3 = ArrayBoard.filter((board) => board.getAttribute('data-id').includes('3-3'))

        if (checkMatch(column1) === true) {
            winningTag = column1[0].textContent;

        } else if (checkMatch(column2) === true) {
            winningTag = column2[0].textContent;

        } else if (checkMatch(column3) === true) {
            winningTag = column3[0].textContent;
        }

    }

    const addToBoard = (e) => {
        if (!e.target.textContent) {
            gameBoard.push(currentPlayer);
            e.target.textContent = currentPlayer;
        }
    }

    const switchPlayer = () => {
        if (currentPlayer === player1Tag) {
            currentPlayer = player2Tag;
        } else if (currentPlayer === player2Tag) {
            currentPlayer = player1Tag;
        }
    }

    const playGame = () => {
        gridItems.forEach((boards) => {
            boards.addEventListener('click', (e) => {
                if (boards.textContent === '') {
                    addToBoard(e);
                    switchPlayer();
                    checkWinner();
                }
            })
        })
    }

    const generateElement = (element, text) => {
        let elemtGen = document.createElement(element);
        elemtGen.textContent = text;
        return elemtGen;
    }

    const displayNames = (e) => {
        e.preventDefault();

        const player1P = generateElement('p', player1InputName.value);
        const player2P = generateElement('p', player2InputName.value);
        
        nameDisplay.append(player1P, player2P);
        form.reset();

        toggleHidden(message);
        toggleHidden(form);
        playGame();
    }

    const toggleHidden = (element) => {
        element.classList.toggle('hide');
    }

    const restartGame = () => {
        gridItems.forEach((item) => {
            item.textContent = '';
        })
        nameDisplay.textContent = '';
        winningTag = '';
        gameBoard = [];
        currentPlayer = player1Tag;
        
        toggleHidden(form);
    }

    form.addEventListener('submit', displayNames);
    restart.addEventListener('click', restartGame);

    return {
        generateElement,
    }

})();