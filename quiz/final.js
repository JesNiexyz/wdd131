let players = [];

// Load players from localStorage
function loadPlayersFromStorage() {
  try {
    const storedPlayers = localStorage.getItem("finalPlayers");
    if (storedPlayers) {
      const parsedPlayers = JSON.parse(storedPlayers);
      if (Array.isArray(parsedPlayers) && parsedPlayers.length > 0) {
        players = parsedPlayers;
        return true;
      }
    }
  } catch (error) {
    console.log("localStorage not available or error loading players:", error);
  }
  return false;
}

// Display players and input boxes for wagers
function displayPlayers() {
  const container = document.getElementById("players-container");
  container.innerHTML = "";

  if (players.length === 0) {
    document.getElementById("no-players-message").style.display = "block";
    document.getElementById("reveal-answer-btn").style.display = "none";
    return;
  }

  players.forEach((player, index) => {
    const box = document.createElement("div");
    box.classList.add("player-box");
    box.innerHTML = `
      <p><strong>${player.name}</strong> (Score: $${player.score})</p>
      <label>Wager: </label>
      <input type="number" id="wager-${index}" min="0" max="${player.score}" placeholder="0" />
      <br/><br/>
      <label for="answer-${index}">Your Answer:</label>
      <input type="text" id="answer-${index}" placeholder="Type your answer..." />
      <br/><br/>
      <label id="correct-label-${index}" style="display:none;">Correct? 
        <input type="checkbox" id="correct-${index}" />
      </label>
    `;
    container.appendChild(box);
  });

  document.getElementById("reveal-answer-btn").style.display = "block";
  document.getElementById("submit-results-btn").style.display = "none";
}

// Step 1: Reveal the answer and show correct checkboxes
function revealAnswerStep() {
  let hasErrors = false;
  players.forEach((player, index) => {
    const wagerInput = document.getElementById(`wager-${index}`);
    const wager = parseInt(wagerInput.value) || 0;
    if (wager < 0 || wager > player.score) {
      wagerInput.style.borderColor = "red";
      hasErrors = true;
    } else {
      wagerInput.style.borderColor = "#ccc";
    }
  });
  if (hasErrors) return;

  document.getElementById("reveal-answer").style.display = "block";
  players.forEach((player, index) => {
    document.getElementById(`correct-label-${index}`).style.display = "inline";
  });
  document.getElementById("reveal-answer-btn").style.display = "none";
  document.getElementById("submit-results-btn").style.display = "block";
}

// Step 2: Handle results and adjust scores
function handleResultsStep() {
  const finalDiv = document.getElementById("final-scores");
  finalDiv.innerHTML = "";

  players.forEach((player, index) => {
    const wagerInput = document.getElementById(`wager-${index}`);
    const correctBox = document.getElementById(`correct-${index}`);
    const wager = parseInt(wagerInput.value) || 0;
    const originalScore = player.score;
    if (correctBox.checked) {
      player.score += wager;
    } else {
      player.score -= wager;
    }
    const result = document.createElement("div");
    result.innerHTML = `
      <strong>${player.name}</strong>: 
      ${originalScore} ${correctBox.checked ? '+' : '-'} ${wager} = 
      <strong>$${player.score}</strong>
    `;
    finalDiv.appendChild(result);
  });

  // Sort and show winner
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winnerDiv = document.createElement("div");
  winnerDiv.className = "winner";
  if (sortedPlayers.length > 0) {
    winnerDiv.innerHTML = `🎉 Winner: ${sortedPlayers[0].name} with $${sortedPlayers[0].score}! 🎉`;
  } else {
    winnerDiv.innerHTML = `No winner. No players found.`;
  }
  finalDiv.appendChild(winnerDiv);

  document.getElementById("submit-results-btn").style.display = "none";
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  if (!loadPlayersFromStorage()) {
    document.getElementById("no-players-message").style.display = "block";
  } else {
    displayPlayers();
  }

  document.getElementById("reveal-answer-btn").addEventListener("click", revealAnswerStep);
  document.getElementById("submit-results-btn").addEventListener("click", handleResultsStep);
});