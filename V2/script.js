let drawCount = 0; // Variable to store the count of draws
const selectionButtons = document.querySelectorAll('[data-selection]'); // Selecting all the buttons for player selection
const finalColumn = document.querySelector('[data-final-column]'); // Selecting the final column for displaying results
const computerScoreSpan = document.querySelector('[data-computer-score]'); // Selecting the element to display computer's score
const yourScoreSpan = document.querySelector('[data-your-score]'); // Selecting the element to display player's score
const SELECTIONS = [ // Array of available selections with their names, emojis, and the selection they beat
  {
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
  },
  {
    name: 'paper',
    emoji: '✋',
    beats: 'rock'
  },
  {
    name: 'scissors',
    emoji: '✌',
    beats: 'paper'
  }
];

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(selection => selection.name === selectionName);
    makeSelection(selection);
  });
});

function makeSelection(selection) {
  const computerSelection = randomSelection(); // Get a random selection for the computer
  const yourWinner = isWinner(selection, computerSelection); // Check if the player wins
  const computerWinner = isWinner(computerSelection, selection); // Check if the computer wins

  addSelectionResult(computerSelection, computerWinner); // Display the computer's selection and indicate if it's a winner
  addSelectionResult(selection, yourWinner); // Display the player's selection and indicate if it's a winner

  if (!yourWinner && !computerWinner) {
    drawCount++; // Increment the draw count if it's a draw
  }

  if (yourWinner) {
    incrementScore(yourScoreSpan); // Increment the player's score if the player wins
  } else if (computerWinner) {
    incrementScore(computerScoreSpan); // Increment the computer's score if the computer wins
  }
  updateDrawCount(); // Update the display of draw count
}

function updateDrawCount() {
  const drawCountSpan = document.querySelector('[data-draw-count]'); // Selecting the element to display draw count
  drawCountSpan.innerText = drawCount.toString(); // Updating the draw count text
} 

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1; // Incrementing the score by 1 and updating the score text
}

function addSelectionResult(selection, winner) {
  const div = document.createElement('div'); // Creating a new <div> element
  div.innerText = selection.emoji; // Setting the inner text of the div to the emoji of the selection
  div.classList.add('result-selection'); // Adding the class 'result-selection' to the div
  if (winner) div.classList.add('winner'); // Adding the class 'winner' to the div if it's a winner
  finalColumn.after(div); // Inserting the div after the final column
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name; // Checking if the selection beats the opponent's selection
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length); // Generating a random index within the range of available selections
  return SELECTIONS[randomIndex]; // Returning a random selection based on the generated index
}
