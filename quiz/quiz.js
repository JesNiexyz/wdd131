// ===== GAME DATA =====
    const questions = {
      "Joseph Smith and the Restoration": [
        { question: "In what year did Joseph Smith receive the First Vision?", answer: "1820", points: 100 },
        { question: "Who visited Joseph Smith and revealed the location of the golden plates?", answer: "Moroni", points: 200 },
        { question: "Where was the Church officially organized?", answer: "Fayette, New York", points: 300 },
        { question: "Which priesthood did Joseph Smith receive from Peter, James, and John?", answer: "Melchizedek Priesthood", points: 400 },
        { question: "What was the name of the newspaper Joseph edited in Nauvoo?", answer: "Times and Seasons", points: 500 }
      ],
      "Doctrine and Covenants": [
        { question: "Which section outlines the Word of Wisdom?", answer: "Section 89", points: 100 },
        { question: "Which section was revealed in Liberty Jail?", answer: "Sections 121–123", points: 200 },
        { question: "What section introduced the law of tithing?", answer: "Section 119", points: 300 },
        { question: "Which section was revealed during the Kirtland Temple dedication?", answer: "Section 110", points: 400 },
        { question: "Which section organized the First Presidency?", answer: "Section 81", points: 500 }
      ],
      "Early Pioneer": [
        { question: "What year did the Saints begin migration to Utah?", answer: "1847", points: 100 },
        { question: "Which trail did Saints follow west?", answer: "Mormon Trail", points: 200 },
        { question: "What settlement was built in Arizona?", answer: "Snowflake", points: 300 },
        { question: "Which group crossed Hole-in-the-Rock?", answer: "San Juan Expedition", points: 400 },
        { question: "Which Utah region welcomed Scandinavian immigrants?", answer: "Sanpete County", points: 500 }
      ],
      "Guess the Prophet": [
        { question: "He oversaw the Kirtland Temple dedication.", answer: "Joseph Smith", points: 100 },
        { question: "He led the Saints to Salt Lake Valley.", answer: "Brigham Young", points: 200 },
        { question: "He issued the Second Manifesto.", answer: "Joseph F. Smith", points: 300 },
        { question: "He started the 'Every Member a Missionary' push.", answer: "David O. McKay", points: 400 },
        { question: "He announced priesthood for all worthy men in 1978.", answer: "Spencer W. Kimball", points: 500 }
      ],
      "Grab Bag": [
        { question: "Which temple marked expansion into Europe?", answer: "Swiss Temple", points: 100 },
        { question: "Which country had growth after 1978?", answer: "Brazil", points: 200 },
        { question: "What program helped members become self-reliant?", answer: "Perpetual Education Fund", points: 300 },
        { question: "What was the first African temple?", answer: "Johannesburg South Africa Temple", points: 400 },
        { question: "Which prophet announced temples in Russia and India?", answer: "Russell M. Nelson", points: 500 }
      ]
    };

    // ===== GLOBAL VARIABLES =====
    let players = [];
    let currentExpandedPanel = null;

    // ===== UTILITY FUNCTIONS =====
  function updateLocalStorage() {
  try {
    localStorage.setItem("finalPlayers", JSON.stringify(players));
    console.log("Player data stored in localStorage:", players);
  } catch (error) {
    console.error("Failed to store player data:", error);
  }
}

    // ===== GAME BOARD CREATION =====
    function createGameBoard() {
      const board = document.querySelector(".board");
      board.innerHTML = "";

      const categories = Object.keys(questions);

      // Create category headers
      for (let i = 0; i < categories.length; i++) {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category";
        categoryDiv.textContent = categories[i];
        board.appendChild(categoryDiv);
      }

      // Create question panels
      for (let qIndex = 0; qIndex < 5; qIndex++) {
        for (let cIndex = 0; cIndex < categories.length; cIndex++) {
          const category = categories[cIndex];
          const question = questions[category][qIndex];

          const panel = document.createElement("div");
          panel.className = "panel";
          panel.textContent = `$${question.points}`;

          panel.dataset.category = category;
          panel.dataset.points = question.points;

          board.appendChild(panel);
        }
      }
    }

    // ===== PANEL EXPANSION LOGIC =====
    function expandPanel(panel) {
      const category = panel.dataset.category;
      const points = parseInt(panel.dataset.points);
      
      const questionObj = questions[category].find(q => q.points === points);
      if (!questionObj) return;

      document.getElementById('backdrop').classList.add('show');
      panel.originalContent = panel.innerHTML;
      panel.classList.add('expanded');
      
      panel.innerHTML = `
        <div class="panel-content">
          <div class="question-text">${questionObj.question}</div>
          <div class="answer-section">
            <div class="answer-box">
              <label for="user-answer">Type your answer for reference:</label>
              <input type="text" id="user-answer" placeholder="Your answer..." />
            </div>
            <p class="instructions">
              Press <strong>Enter</strong> to reveal the correct answer.
              Then use <strong>+</strong> or <strong>−</strong> to update your score.
            </p>
            <div class="overlay-answer hidden">${questionObj.answer}</div>
          </div>
          <div class="controls">
            <label for="player-select">Who answered?</label>
            <select id="player-select">
              ${players.map((p, i) => `<option value="${i}">${p.name}</option>`).join('')}
            </select>
            <div class="score-controls">
              <button class="minus-btn" onclick="updateScore(-1, ${points})">−</button>
              <span class="player-score">0</span>
              <button class="plus-btn" onclick="updateScore(1, ${points})">+</button>
            </div>
          </div>
          <button class="close-btn" onclick="closePanel()">Close</button>
        </div>
      `;

      currentExpandedPanel = panel;
    }

    function closePanel() {
      if (!currentExpandedPanel) return;

      document.getElementById('backdrop').classList.remove('show');
      currentExpandedPanel.classList.remove('expanded');
      currentExpandedPanel.classList.add('used');
      currentExpandedPanel.innerHTML = '✓';
      currentExpandedPanel = null;
      updateLocalStorage();
    }

    // ===== SCORING SYSTEM =====
    function updateScore(change, points) {
      if (players.length === 0) return;

      const select = document.getElementById("player-select");
      const playerIndex = select ? parseInt(select.value) : 0;

      players[playerIndex].score += change * points;

      showScoreboard();
      updateLocalStorage();
    }

    function changeScore(index, change) {
      if (!currentExpandedPanel) return;
      
      const points = parseInt(currentExpandedPanel.dataset.points);
      players[index].score += change * points;
      
      document.getElementById(`score-${index}`).textContent = players[index].score;
      updateLocalStorage();
    }

    // ===== PLAYER MANAGEMENT =====
    function showScoreboard() {
      const board = document.querySelector(".scoreboard");
      board.innerHTML = "";

      for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const box = document.createElement("div");
        box.classList.add("score-block");
        
        box.innerHTML = `
          <span class="player-name">${player.name}</span>
          <button onclick="changeScore(${i}, -1)">−</button>
          <span class="player-score" id="score-${i}">$${player.score}</span>
          <button onclick="changeScore(${i}, 1)">+</button>
        `;
        
        board.appendChild(box);
      }
    }

    // ===== EVENT LISTENERS =====
    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("panel") && 
          !event.target.classList.contains("used") && 
          !event.target.classList.contains("expanded")) {
        expandPanel(event.target);
      }
    });

    document.getElementById('backdrop').addEventListener('click', closePanel);

    document.addEventListener("keydown", function (event) {
      if (event.code === "Enter" && currentExpandedPanel) {
        event.preventDefault();
        const answerDiv = currentExpandedPanel.querySelector(".overlay-answer");
        if (answerDiv) {
          answerDiv.classList.remove("hidden");
        }
      }
      
      if (event.code === "Escape" && currentExpandedPanel) {
        closePanel();
      }
    });

    document.querySelectorAll(".setup-btn").forEach(function (button) {
      button.addEventListener("click", function () {
        const num = parseInt(button.dataset.players);
        
        players = [];
        
        for (let i = 0; i < num; i++) {
          players.push({ name: `Player ${i + 1}`, score: 0 });
        }
        
        showScoreboard();
        document.querySelector(".player-setup").style.display = "none";
        updateLocalStorage();
      });
    });

  
  document.querySelector(".final-jeopardy-link").addEventListener("click", function(event) {
  localStorage.setItem("finalPlayers", JSON.stringify(players));
  // Let the link navigate after saving
});

    // ===== GAME INITIALIZATION =====
    createGameBoard();

