const startButton = document.querySelector('button');
const gameScreen = document.getElementById('game-screen');
const board = document.getElementById('board');
const turnElement = document.getElementById('turn');
const currentPlayerElement = document.getElementById('currentPlayer');
const modal = document.getElementById('modal');
const winnerMessage = document.getElementById('winnerMessage');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

function startGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
    updateTurnDisplay();
    startButton.style.display = 'none';
    gameScreen.style.display = 'block';
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return null;
}

function checkTie() {
    return !gameBoard.includes('');
}

function handleClick(index) {
    if (!gameActive || gameBoard[index] !== '') {
        return;
    }

    gameBoard[index] = currentPlayer;
    renderBoard();

    const winner = checkWinner();
    if (winner) {
        gameActive = false;
        showModal(`Player ${winner} wins! 🎉`);
    } else if (checkTie()) {
        gameActive = false;
        showModal('It\'s a tie!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnDisplay();
    }
}

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value;
        cell.addEventListener('click', () => handleClick(index));
        board.appendChild(cell);
    });
}

function updateTurnDisplay() {
    currentPlayerElement.textContent = currentPlayer;
    turnElement.classList.remove('animate');
    void turnElement.offsetWidth;
    turnElement.classList.add('animate');
}

function celebrateWinner() {
    board.classList.add('celebrate');
}

function showModal(message) {
    winnerMessage.innerHTML = '';
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('visible');
        celebrateWinner();
        displayWinnerMessage(message);
        showPlayAgainButton();
    }, 1000); // Delay showing modal for 1 second
}

function displayWinnerMessage(message) {
    const winnerMessageElement = document.createElement('p');
    winnerMessageElement.classList.add('winner-message');
    winnerMessageElement.innerHTML = message;
    winnerMessage.appendChild(winnerMessageElement);
    animateWinnerMessage(winnerMessageElement);
}

function animateWinnerMessage(element) {
    element.classList.add('animate__animated', 'animate__zoomIn', 'animate__delay-1s');
    setTimeout(() => {
        element.classList.remove('animate__zoomIn');
        element.classList.add('animate__zoomOut');
    }, 3000); // Delay before removing the zoom-in animation
}

function showPlayAgainButton() {
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.classList.add('play-again'); // Add the play-again class
    playAgainButton.addEventListener('click', () => {
        closeModal();
        startGame();
    });
    winnerMessage.appendChild(playAgainButton);
}

function closeModal() {
    modal.classList.remove('visible');
    modal.style.display = 'none';
    board.classList.remove('celebrate');
    startButton.style.display = 'block';
    gameScreen.style.display = 'none';
    startGame(); // Start a new game when closing the modal
}

startButton.addEventListener('click', startGame);



