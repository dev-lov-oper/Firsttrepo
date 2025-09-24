let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let msgContainer = document.querySelector("#msg-container");
let msg = document.querySelector("#msg");

// Track whose turn it is
let turnO = true; // Player O starts (traditionally 'X' starts, but we'll use 'O' for this example)
let count = 0; // To track draw game

// All possible winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Function to reset the game state
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

// Add event listeners to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { // Player O turn
            box.innerText = "O";
            box.classList.add("playerO"); // Add class for specific styling
            turnO = false;
        } else { // Player X turn
            box.innerText = "X";
            box.classList.remove("playerO"); // Ensure 'O' style is removed
            turnO = true;
        }
        
        box.disabled = true; // Disable the box after it's clicked
        count++; // Increment move count
        
        let isWinner = checkWinner();

        // Check for a Draw
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

// Function to handle a Draw
const gameDraw = () => {
    showWinner("It's a Draw!");
}

// Function to disable all boxes (after a win/draw)
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// Function to enable all boxes (on reset/new game)
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("playerO"); // Clear any player-specific styling
    }
}

// Function to display the winner
const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // Check if all three positions are non-empty and equal
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true; // A winner was found
            }
        }
    }
    return false; // No winner yet
}

// Add listeners to New Game and Reset buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

