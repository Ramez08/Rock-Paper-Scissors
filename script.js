const selectionButtons = document.querySelectorAll('[data-selection]') // Selecting all elements with the 'data-selection' attribute
const finalColumn = document.querySelector('[data-final-column]') // Selecting the element with the 'data-final-column' attribute
const computerScoreSpan = document.querySelector('[data-computer-score]') // Selecting the element with the 'data-computer-score' attribute
const yourScoreSpan = document.querySelector('[data-your-score]') // Selecting the element with the 'data-your-score' attribute
const SELECTIONS = [
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
]

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection // Getting the value of the 'data-selection' attribute
    const selection = SELECTIONS.find(selection => selection.name === selectionName) // Finding the corresponding selection object
    makeSelection(selection) // Making a selection
  })
})

function makeSelection(selection) {
  const computerSelection = randomSelection() // Generating a random computer selection
  const yourWinner = isWinner(selection, computerSelection) // Checking if the player wins
  const computerWinner = isWinner(computerSelection, selection) // Checking if the computer wins

  addSelectionResult(computerSelection, computerWinner) // Adding the computer's selection to the result
  addSelectionResult(selection, yourWinner) // Adding the player's selection to the result

  if (yourWinner) incrementScore(yourScoreSpan) // Incrementing the player's score if they win
  if (computerWinner) incrementScore(computerScoreSpan) // Incrementing the computer's score if it wins
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1 // Incrementing the score by 1 and updating the score span
}

function addSelectionResult(selection, winner) {
  const div = document.createElement('div') // Creating a new div element
  div.innerText = selection.emoji // Setting the inner text of the div to the emoji of the selection
  div.classList.add('result-selection') // Adding the 'result-selection' class to the div
  if (winner) div.classList.add('winner') // Adding the 'winner' class to the div if it is a winning selection
  finalColumn.after(div) // Inserting the div after the final column
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name // Checking if the selection beats the opponent's selection
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length) // Generating a random index within the range of the selections array
  return SELECTIONS[randomIndex] // Returning a random selection from the array
}
