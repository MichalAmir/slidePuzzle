var rows = 4;
var columns = 4;
var imageOrder = [];
var clickCount = 0;
var mixExecuted = false;
var gameOver = false;
var isGameFinished = false;
var canClick = false;
var progressIntervalId = null;
var gameTimerId = null;


function styleButton(button, styleClass) {
  button.classList.add(styleClass);
}


function getCurrentUser() {
  return localStorage.getItem('slidePuzzleUser');
}

function getScores() {
  try {
    return JSON.parse(localStorage.getItem('slidePuzzleScores') || '{}');
  } catch (e) {
    return {};
  }
}

function getUserScore(username) {
  const scores = getScores();
  return scores[username] || 0;
}

function addScoreToUser(username, points) {
  if (!username) return;
  const scores = getScores();
  scores[username] = (scores[username] || 0) + points;
  localStorage.setItem('slidePuzzleScores', JSON.stringify(scores));
}


function buildSolvedBoard() {
  imageOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "-1"];
  var board = document.querySelector('#board');
  if (!board) return;
  board.innerHTML = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement('img');
      tile.id = r.toString() + c.toString();
      let value = imageOrder.shift();
      tile.src = value + '.jpg';
      tile.addEventListener('click', () => handleTileClick(tile.id));
      board.appendChild(tile);
    }
  }
}

window.addEventListener('load', function () {
  buildSolvedBoard();
  var btnS = document.getElementById('shuffle');
  if (btnS) btnS.addEventListener('click', mix);
});


function playAudio() {
  try {
    var music = document.getElementById('audio1');
    if (!music) return;
    music.currentTime = 0;
    music.play().catch(err => console.warn('Audio play prevented', err));
  } catch (e) { console.warn('playAudio error', e); }
}

function mix() {
  if (mixExecuted) return;
  var board = document.getElementById('board');
  if (!board) return;
  board.innerHTML = '';

  var shuffleArray = [
    ["8", "3", "2", "10", "12", "6", "1", "15", "7", "11", "9", "13", "14", "-1", "4", "5"],
    ["4", "10", "-1", "14", "5", "11", "6", "1", "2", "13", "7", "8", "15", "12", "3", "9"],
    ["4", "15", "7", "6", "3", "5", "9", "14", "12", "11", "1", "8", "10", "2", "13", "-1"],
    ["7", "1", "4", "12", "11", "-1", "3", "9", "13", "10", "15", "6", "5", "8", "2", "14"]
  ];

  var arrayRandom = shuffleArray[Math.floor(Math.random() * shuffleArray.length)].slice();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement('img');
      tile.id = r.toString() + c.toString();
      let value = arrayRandom.shift();
      tile.src = value + '.jpg';
      tile.addEventListener('click', () => handleTileClick(tile.id));
      board.appendChild(tile);
    }
  }

  playAudio();

  var progressBar = document.querySelector('.progress-bar');
  var duration = 300;
  if (progressBar) {
    var existing = progressBar.querySelector('.progress-bar-filled');
    if (existing) existing.remove();
    var progressBarFilled = document.createElement('div');
    progressBarFilled.className = 'progress-bar-filled';
    progressBarFilled.style.width = '0%';
    progressBarFilled.style.height = '100%';
    progressBarFilled.style.background = 'linear-gradient(90deg,#1976d2,#42a5f5)';
    progressBar.appendChild(progressBarFilled);
    var startTime = Date.now();
    progressIntervalId = setInterval(function () {
      var elapsed = Date.now() - startTime;
      var pct = Math.min(100, (elapsed / (duration * 1000)) * 100);
      progressBarFilled.style.width = pct + '%';
      if (pct >= 100) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
    }, 200);
  }

  gameTimerId = setTimeout(function () {
    if (!isGameFinished) showGameOver();
  }, duration * 1000);

  canClick = true;
  mixExecuted = true;
}

/* ===== תנועת אריח ===== */
function handleTileClick(id) {
  if (gameOver || !canClick) return;
  const row = parseInt(id[0], 10);
  const col = parseInt(id[1], 10);
  const neighbors = [];
  if (row > 0) neighbors.push(`${row - 1}${col}`);
  if (row < rows - 1) neighbors.push(`${row + 1}${col}`);
  if (col > 0) neighbors.push(`${row}${col - 1}`);
  if (col < columns - 1) neighbors.push(`${row}${col + 1}`);
  for (let neighborId of neighbors) changeNeighbor(neighborId, id);
  clickCount++;
  checkWin();
}

function changeNeighbor(id, idOriginal) {
  const img = document.getElementById(id);
  if (!img) return;
  const filename = img.src.split('/').pop();
  if (filename === '-1.jpg') {
    const imgOriginal = document.getElementById(idOriginal);
    img.src = imgOriginal.src;
    imgOriginal.src = '-1.jpg';
  }
}


function showGameOver() {
  if (document.getElementById('game-over-overlay')) return;
  clearTimeout(gameTimerId);
  clearInterval(progressIntervalId);

  const overlay = document.createElement('div');
  overlay.id = 'game-over-overlay';
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.55)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: '10000', opacity: '0', transition: 'opacity 240ms ease'
  });

  const card = document.createElement('div');
  Object.assign(card.style, {
    width: 'min(92%, 540px)', background: '#fff', borderRadius: '12px',
    padding: '22px', boxShadow: '0 12px 40px rgba(0,0,0,0.25)', textAlign: 'center'
  });

  const title = document.createElement('h2');
  title.textContent = "Time's up!";
  const msg = document.createElement('p');
  msg.textContent = 'Your time has expired. Would you like to try again?';

  const actions = document.createElement('div');
  Object.assign(actions.style, { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' });

  const retryBtn = document.createElement('button');
  retryBtn.textContent = 'Try Again';
  retryBtn.onclick = () => location.reload();

  const homeBtn = document.createElement('button');
  homeBtn.textContent = 'Go to Homepage';
  homeBtn.onclick = () => (window.location.href = '../../assets/pages/homepage.html');

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.onclick = () => overlay.remove();

  styleButton(retryBtn, 'primary');
  styleButton(homeBtn, 'outline');
  styleButton(closeBtn, 'neutral');

  actions.append(retryBtn, homeBtn, closeBtn);
  card.append(title, msg, actions);
  overlay.append(card);
  document.body.append(overlay);
  setTimeout(() => (overlay.style.opacity = '1'), 20);

  canClick = false;
  gameOver = true;
}


function showWinMessage(moves) {
  if (document.getElementById('win-overlay')) return;

  var points = moves > 300 ? 15 : moves > 200 ? 25 : 40;
  const username = getCurrentUser();
  if (username) addScoreToUser(username, points);
  const totalScore = username ? getUserScore(username) : null;

  const overlay = document.createElement('div');
  overlay.id = 'win-overlay';
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.45)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: '9999', opacity: '0', transition: 'opacity 300ms ease'
  });

  const card = document.createElement('div');
  Object.assign(card.style, {
    width: 'min(95%,520px)', background: '#fff', borderRadius: '12px',
    padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', textAlign: 'center'
  });

  const title = document.createElement('h1');
  title.textContent = 'You win!';
  const info = document.createElement('p');
  info.textContent = `Great job  .${username ? ` Total score  ${totalScore} pts.` : ' Connect to save your score.'}`;

  const actions = document.createElement('div');
  Object.assign(actions.style, { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' });

  const playBtn = document.createElement('button');
  playBtn.textContent = 'Play Again';
  playBtn.onclick = () => location.reload();

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Go to Homepage';
  closeBtn.onclick = () => (window.location.href = '../../assets/pages/homepage.html');

  styleButton(playBtn, 'primary');
  styleButton(closeBtn, 'outline');

  actions.append(playBtn, closeBtn);

  if (!username) {
    const connectBtn = document.createElement('button');
    connectBtn.textContent = 'Connect';
    connectBtn.onclick = () => (window.location.href = '../../assets/pages/homepage.html');
    styleButton(connectBtn, 'neutral');
    actions.append(connectBtn);
  }

  card.append(title, info, actions);
  overlay.append(card);
  document.body.append(overlay);
  setTimeout(() => (overlay.style.opacity = '1'), 20);
  setTimeout(() => overlay.remove(), 30000);

  canClick = false;
  isGameFinished = true;
}


function checkWin() {
  const targetOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "-1"];
  const board = document.getElementById('board');
  if (!board) return;
  let isWin = Array.from(board.children).every((tile, i) =>
    tile.src.split('/').pop() === targetOrder[i] + '.jpg'
  );

  if (isWin && clickCount >= 16) {
    clearTimeout(gameTimerId);
    clearInterval(progressIntervalId);
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      const filled = progressBar.querySelector('.progress-bar-filled');
      if (filled) filled.remove();
    }
    const music = document.getElementById('audio1');
    if (music && !music.paused) music.pause();
    setTimeout(() => showWinMessage(clickCount), 700);
  }
}

