// var rows = 4; // מספר השורות בלוח המשחק
// var columns = 4; // מספר העמודות בלוח המשחק
// var imageOrder = []; // מערך המכיל את הסדר הנכון של התמונות
// var clickCount = 0; // סופר כמה פעמים לחצו על תמונות  
// var mixExecuted = false; // משתנה שמציין אם פונקצית mix כבר הופעלה או לא
// var gameOver = false; // משתנה שמציין אם המשחק נגמר או לא
// var isGameFinished = false; // משתנה כדי לציין אם המשחק נגמר או לא
// var canClick = false; // משתנה כדי לציין אם ניתן ללחוץ על הלוח או לא

// // פונקציה שמסדרת את התמונה בסדר הנכון
// window.onload = function () {
//   imageOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "-1"];
//   for (let r = 0; r < rows; r++) {
//     for (let c = 0; c < columns; c++) {
//       let tile = document.createElement("img");
//       tile.id = r.toString() + c.toString();
//       tile.src = `${imageOrder.shift()}.jpg`;
//       document.querySelector("#board").append(tile); // הוספת האלמנט תמונה ללוח המשחק
//       if (!gameOver) {
//         tile.addEventListener("click", () => isEnableChange(tile.id));
//       }
//     }
//   }
// };

// // כפתור לערבוב התמונות
// const btnS = document.getElementById("shuffle");
// btnS.addEventListener("click", mix);

// // פונקציה שמפעילה את המנגינה בעת לחיצת הכפתור shuffle
// function playAudio() {
//   let music = document.getElementById("audio1");
//   music.play();
// }

// // פונקציה שמערבבת את התמונות בצורה שיהיה ניתן להחזיר את התמונה למצב המקורי שלה
// function mix() {
//   if (!mixExecuted) {
//     canClick = true; // מאפשר הזזת תמונות רק אחרי לחיצה על shuffle
//     let element = document.getElementById("board");
//     while (element.firstChild) {
//       element.removeChild(element.firstChild); // כדי לנקות את הלוח שהתמונות בו מסודרות ללוח שהתמונות מעורבבות ויתנקה
//     }
//     let shuffleArray = [
//       ["8", "3", "2", "10", "12", "6", "1", "15", "7", "11", "9", "13", "14", "-1", "4", "5"],
//       ["4", "10", "-1", "14", "5", "11", "6", "1", "2", "13", "7", "8", "15", "12", "3", "9"],
//       ["4", "15", "7", "6", "3", "5", "9", "14", "12", "11", "1", "8", "10", "2", "13", "-1"],
//       ["7", "1", "4", "12", "11", "-1", "3", "9", "13", "10", "15", "6", "5", "8", "2", "14"],
//       ["-1", "15", "8", "7", "14", "13", "11", "1", "12", "10", "9", "2", "5", "6", "4", "3"],
//       ["13", "5", "-1", "2", "11", "4", "10", "12", "8", "7", "1", "9", "6", "3", "14", "15"],
//       ["1", "9", "11", "6", "7", "10", "8", "15", "4", "5", "-1", "2", "13", "14", "3", "12"],
//       ["1", "7", "2", "9", "13", "4", "15", "-1", "3", "5", "6", "10", "8", "14", "11", "12"],
//       ["11", "15", "12", "4", "14", "-1", "13", "1", "6", "10", "3", "5", "2", "9", "7", "8"],
//       ["3", "1", "14", "10", "12", "7", "11", "-1", "5", "15", "9", "6", "2", "4", "8", "13"]
//     ];

//     let arrayRandom = shuffleArray[parseInt(Math.random() * shuffleArray.length)];
//     for (let r = 0; r < rows; r++) {
//       for (let c = 0; c < columns; c++) {
//         let tile = document.createElement("img");
//         tile.id = r.toString() + c.toString();
//         tile.src = arrayRandom.shift() + ".jpg";
//         document.getElementById("board").append(tile); // פונקציה שבודקת האם ההזה אפשרית
//         if (!gameOver) {
//           tile.addEventListener("click", () => isEnableChange(tile.id)); // פונקציה שבודקת האם השחקן ניצח
//         }
//       }
//       playAudio(); //שהמוזיקה תפעל במידה והוא לוחצף על הכפתור 'shuffle'
//     }

//     var progressBar = document.querySelector('.progress-bar');
//     var progressBarFilled = document.createElement('div');
//     progressBarFilled.classList.add('progress-bar-filled');
//     progressBar.appendChild(progressBarFilled);

//     var duration = 300; // משך הזמן בשניות (5 דקות)

//     setTimeout(function () {
//       if (!isGameFinished) {
//         showGameOver(); // פונקציה שבסוף הטיימר מופיע לחצן ובו רשום שנפסלת והאם אתה רוצה לנסות שוב
//       }
//     }, duration * 1000);

//     mixExecuted = true; // מעדכן את המשתנה לכן כך שהפונקציה לערבוב לא תתבצע פעמיים
//   }
// }

// // פונקציה שבודקת האם הוא שכן ואפשר להוזיזו(ע"י לחיצה בעכבר)
// function isEnableChange(id) {
//   if (gameOver || !canClick) { // 
//     return; // המשחק נגמר או שאי אפשר להוזיז את התמונות בלוח המשחק ולכן אין צורך להיכנס לפונקציה
//   }

//   const row = parseInt(id[0]);
//   const col = parseInt(id[1]);
//   const topNeighbor = (row > 0) ? `${row - 1}${col}` : null; // משתנה לשכן העליון של התמונה
//   const bottomNeighbor = (row < rows - 1) ? `${row + 1}${col}` : null; // משתנה לשכן התחתון של התמונה
//   const leftNeighbor = (col > 0) ? `${row}${col - 1}` : null; // משתנה לשכן השמאלי של התמונה
//   const rightNeighbor = (col < columns - 1) ? `${row}${col + 1}` : null; // משתנה לשכן הימני של התמונה

//   if (topNeighbor != null) {
//     changeNeighbor(topNeighbor, id);
//   }
//   if (bottomNeighbor != null) {
//     changeNeighbor(bottomNeighbor, id);
//   }
//   if (leftNeighbor != null) {
//     changeNeighbor(leftNeighbor, id);
//   }
//   if (rightNeighbor != null) {
//     changeNeighbor(rightNeighbor, id);
//   }
//   clickCount++;
//   win(); // בדיקה אם השחקן ניצח
// }

// // פונקציה שמבצעת את ההחלפה בין שתי תמונות על פי זהוי
// function changeNeighbor(id, idOrginal) {
//   const img = document.getElementById(id);
//   const src = img.src;
//   const segments = src.split("/"); // מפצל על פי הסימן '/' ה
//   const filename = segments[segments.length - 1]; // משיג את שם הקובץ של התמונה
//   if (filename == "-1.jpg") {
//     const imgOrginal = document.getElementById(idOrginal);
//     const imgToChange = document.getElementById(id);
//     imgToChange.src = imgOrginal.src; // החלפת התמונה של השכן בתמונה המקורית
//     imgOrginal.src = "-1.jpg"; // החלפת התמונה המקורית בתמונת השכן
//   }
// }

// // (עיצוב) לחצן "game over" שנפעל בסוף הטיימר
// function showGameOver() {
//   var gameOverElement = document.createElement("div");
//   gameOverElement.id = "game-over";
//   gameOverElement.style.color = "white";
//   gameOverElement.style.backgroundColor = "rgb(112, 193, 216)";
//   gameOverElement.style.fontSize = "32px";
//   gameOverElement.style.borderRadius = "50px";
//   gameOverElement.style.width = "200px";
//   gameOverElement.style.height = "120px";
//   gameOverElement.style.lineHeight = "60px";
//   gameOverElement.style.textAlign = "center";
//   gameOverElement.style.position = "fixed";
//   gameOverElement.style.top = "50%";
//   gameOverElement.style.left = "50%";
//   gameOverElement.style.transform = "translate(190%, -10%)";
//   gameOverElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
//   gameOverElement.style.padding = "20px";
//   gameOverElement.style.textTransform = "uppercase";

//   var gameTextElement = document.createElement("div");
//   gameTextElement.textContent = "Game Over";
//   gameTextElement.style.fontSize = "30px";
//   gameTextElement.style.fontWeight = "bold";

//   var tryAgainButton = document.createElement("button");
//   tryAgainButton.textContent = "Try Again";
//   tryAgainButton.style.fontSize = "18px";
//   tryAgainButton.style.padding = "10px 20px";
//   tryAgainButton.style.marginTop = "10px";
//   tryAgainButton.style.backgroundColor = "black";
//   tryAgainButton.style.color = "white";
//   tryAgainButton.style.border = "none";
//   tryAgainButton.style.borderRadius = "5px";
//   tryAgainButton.addEventListener("click", function () {
//     location.reload();  // טעינת הדף מחדש בלחיצה על הכפתור "Try Again"
//   });

//   gameOverElement.appendChild(gameTextElement);
//   gameOverElement.appendChild(tryAgainButton);

//   var body = document.getElementsByTagName("body")[0];
//   body.appendChild(gameOverElement);

//   gameOver = true; // כאשר הטיימר מסתיים, משנים את המשתנה לכן כך שלא יהיה ניתן להשתמש בפונקצית isEnableChange
//   canClick = false; // כאשר המשחק נגמר, אסור ללחוץ על הלוח
// }

// function win() {
//   const imageOrder2 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "-1"];
//   let isWin = true;

//   for (let i = 0; i < imageOrder2.length; i++) {
//     const tile = document.getElementById("board").children[i];
//     const src = tile.src;
//     const segments = src.split("/");  // מפצל על פי הסימן '/' ה
//     const filename = segments[segments.length - 1]; // שם הקובץ במקום האחרון
//     const expectedImage = imageOrder2[i] + ".jpg";

//     if (filename !== expectedImage) {
//       isWin = false; //  אם שם התמונה לא תואם לשם התמונה המקורית אז לא ניצחת ותצא
//       break;
//     }
//   }

//   if (isWin && clickCount >= 16) {
//     setTimeout(function () {
//       alert("You win!");
//       isGameFinished = true; // המשחק נגמר, נעדכן את המשתנה
//     }, 1000);
//     canClick = false; // כאשר המשחק נגמר, אסור ללחוץ על הלוח
//   }
// }

var rows = 4; // מספר השורות בלוח המשחק
var columns = 4; // מספר העמודות בלוח המשחק
var imageOrder = []; // מערך המכיל את הסדר הנכון של התמונות
var clickCount = 0; // סופר כמה פעמים לחצו על תמונות
var mixExecuted = false; // משתנה שמציין אם פונקצית mix כבר הופעלה או לא
var gameOver = false; // משתנה שמציין אם המשחק נגמר או לא
var isGameFinished = false; // משתנה כדי לציין אם המשחק נגמר או לא
var canClick = false; // מושבת עד שמפעילים 'Shuffle'
var gameTimerId = null; // id for the game timeout so we can clear it when player wins
var progressIntervalId = null; // id for progress animation interval so we can clear it

// User / score helpers (persisted in localStorage)
function getCurrentUser() { return localStorage.getItem('slidePuzzleUser'); }
function getScores() { try { return JSON.parse(localStorage.getItem('slidePuzzleScores') || '{}'); } catch (e) { return {}; } }
function getUserScore(username) { const scores = getScores(); return scores[username] || 0; }
function addScoreToUser(username, points) { if (!username) return; const scores = getScores(); scores[username] = (scores[username] || 0) + points; localStorage.setItem('slidePuzzleScores', JSON.stringify(scores)); }

// build solved board (called on load and after reload)
function buildSolvedBoard() {
  imageOrder = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","-1"];
  var board = document.querySelector('#board');
  if (!board) return;
  board.innerHTML = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement('img');
      tile.id = r.toString() + c.toString();
      tile.src = imageOrder.shift() + '.jpg';
      tile.addEventListener('click', () => isEnableChange(tile.id));
      board.appendChild(tile);
    }
  }
}

window.addEventListener('load', function(){
  buildSolvedBoard();
  // connect shuffle button
  var btnS = document.getElementById('shuffle');
  if (btnS) btnS.addEventListener('click', mix);
});

// safe audio play
function playAudio(){
  try{
    var music = document.getElementById('audio1');
    if(!music) return;
    try{ music.currentTime = 0; }catch(e){}
    var p = music.play();
    if(p && typeof p.then === 'function') p.catch(function(err){ console.warn('Audio play prevented', err); });
  }catch(e){ console.warn('playAudio error', e); }
}

function mix() {
  if (mixExecuted) return;
  var board = document.getElementById('board');
  if (!board) return;
  board.innerHTML = '';

  var shuffleArray = [
    ["8","3","2","10","12","6","1","15","7","11","9","13","14","-1","4","5"],
    ["4","10","-1","14","5","11","6","1","2","13","7","8","15","12","3","9"],
    ["4","15","7","6","3","5","9","14","12","11","1","8","10","2","13","-1"],
    ["7","1","4","12","11","-1","3","9","13","10","15","6","5","8","2","14"],
    ["-1","15","8","7","14","13","11","1","12","10","9","2","5","6","4","3"],
    ["13","5","-1","2","11","4","10","12","8","7","1","9","6","3","14","15"],
    ["1","9","11","6","7","10","8","15","4","5","-1","2","13","14","3","12"],
    ["1","7","2","9","13","4","15","-1","3","5","6","10","8","14","11","12"],
    ["11","15","12","4","14","-1","13","1","6","10","3","5","2","9","7","8"],
    ["3","1","14","10","12","7","11","-1","5","15","9","6","2","4","8","13"]
  ];

  var arrayRandom = shuffleArray[Math.floor(Math.random() * shuffleArray.length)].slice();
  for (let r = 0; r < rows; r++){
    for (let c = 0; c < columns; c++){
      let tile = document.createElement('img');
      tile.id = r.toString() + c.toString();
      tile.src = arrayRandom.shift() + '.jpg';
      tile.addEventListener('click', () => isEnableChange(tile.id));
      board.appendChild(tile);
    }
  }

  // play music once
  playAudio();

  // progress bar and timer
  var progressBar = document.querySelector('.progress-bar');
  var duration = 300;
  if (progressBar){
    var existing = progressBar.querySelector('.progress-bar-filled'); if(existing) existing.remove();
    var progressBarFilled = document.createElement('div');
    progressBarFilled.className = 'progress-bar-filled';
    progressBarFilled.style.width = '0%'; progressBarFilled.style.height = '100%';
    progressBarFilled.style.background = 'linear-gradient(90deg,#1976d2,#42a5f5)';
    progressBar.appendChild(progressBarFilled);

    var startTime = Date.now();
    progressIntervalId = setInterval(function(){
      var elapsed = Date.now() - startTime;
      var pct = Math.min(100, (elapsed / (duration * 1000)) * 100);
      progressBarFilled.style.width = pct + '%';
      if (pct >= 100){ clearInterval(progressIntervalId); progressIntervalId = null; }
    }, 200);
  }

  gameTimerId = setTimeout(function(){ if(!isGameFinished) showGameOver(); }, duration * 1000);

  // enable clicks after shuffle
  canClick = true;
  mixExecuted = true;
}

// Add small UI wrapper used by the Shuffle button (some pages call animateShuffle() inline).
function animateShuffle(){
  var btn = document.getElementById('shuffle');
  var oldText = btn ? btn.textContent : null;
  if (btn){ btn.disabled = true; btn.textContent = 'Shuffling...'; }
  // small timeout so the UI shows the disabled state before heavy work
  setTimeout(function(){
    try{ mix(); }catch(e){ console.warn('mix error', e); }
    setTimeout(function(){ if (btn){ btn.disabled = false; btn.textContent = oldText || 'Shuffle'; } }, 700);
  }, 60);
}

function isEnableChange(id){
  if (gameOver || !canClick) return;
  const row = parseInt(id[0]); const col = parseInt(id[1]);
  const topNeighbor = (row > 0) ? `${row-1}${col}` : null;
  const bottomNeighbor = (row < rows-1) ? `${row+1}${col}` : null;
  const leftNeighbor = (col > 0) ? `${row}${col-1}` : null;
  const rightNeighbor = (col < columns-1) ? `${row}${col+1}` : null;

  if (topNeighbor) changeNeighbor(topNeighbor, id);
  if (bottomNeighbor) changeNeighbor(bottomNeighbor, id);
  if (leftNeighbor) changeNeighbor(leftNeighbor, id);
  if (rightNeighbor) changeNeighbor(rightNeighbor, id);
  clickCount++;
  win();
}

function changeNeighbor(id, idOriginal){
  const img = document.getElementById(id);
  if(!img) return;
  const segments = img.src.split('/');
  const filename = segments[segments.length-1];
  if (filename === '-1.jpg'){
    const imgOriginal = document.getElementById(idOriginal);
    const imgToChange = document.getElementById(id);
    imgToChange.src = imgOriginal.src;
    imgOriginal.src = '-1.jpg';
  }
}

// (עיצוב) לחצן "game over" שנפעל בסוף הטיימר
function showGameOver(){
  // avoid duplicate overlays
  if (document.getElementById('game-over-overlay')) return;

  // stop timers and progress
  if (gameTimerId){ clearTimeout(gameTimerId); gameTimerId = null; }
  if (progressIntervalId){ clearInterval(progressIntervalId); progressIntervalId = null; }
  var progressBar = document.querySelector('.progress-bar');
  if (progressBar){ var filled = progressBar.querySelector('.progress-bar-filled'); if (filled && filled.parentNode) filled.parentNode.removeChild(filled); }

  // pause audio if playing
  try { var music = document.getElementById('audio1'); if (music && !music.paused) music.pause(); } catch(e){}

  // disallow further interaction
  canClick = false; gameOver = true;

  // build overlay
  const overlay = document.createElement('div'); overlay.id = 'game-over-overlay';
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '10000', opacity: '0', transition: 'opacity 240ms ease'
  });

  const card = document.createElement('div');
  Object.assign(card.style, {
    width: 'min(92%, 540px)', background: '#fff', borderRadius: '12px', padding: '22px', boxShadow: '0 12px 40px rgba(0,0,0,0.25)', textAlign: 'center', fontFamily: 'Segoe UI, Roboto, Arial, sans-serif'
  });

  const title = document.createElement('h2'); title.textContent = "Time's up!";
  Object.assign(title.style, { margin: '0 0 8px', fontSize: 'clamp(18px,3vw,24px)', color: '#111' });

  const msg = document.createElement('p');
  msg.textContent = 'Your time has expired. Would you like to try again?';
  Object.assign(msg.style, { margin: '0 0 18px', color: '#444', fontSize: '15px' });

  const actions = document.createElement('div'); Object.assign(actions.style, { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' });

  const retryBtn = document.createElement('button'); retryBtn.textContent = 'Try Again';
  Object.assign(retryBtn.style, { background: 'linear-gradient(90deg,#1976d2,#42a5f5)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' });
  retryBtn.addEventListener('click', function(){
    // remove overlay then reload
    overlay.style.opacity = '0';
    setTimeout(function(){ location.reload(); }, 180);
  });

  const homeBtn = document.createElement('button'); homeBtn.textContent = 'Go to Homepage';
  Object.assign(homeBtn.style, { background: 'transparent', color: '#1976d2', border: '1px solid #1976d2', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' });
  homeBtn.addEventListener('click', function(){ overlay.style.opacity = '0'; setTimeout(function(){ window.location.href = '../html/homepage.html'; }, 160); });

  const closeBtn = document.createElement('button'); closeBtn.textContent = 'Close';
  Object.assign(closeBtn.style, { background: '#e0e0e0', color: '#222', border: 'none', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer' });
  closeBtn.addEventListener('click', function(){ overlay.style.opacity = '0'; setTimeout(function(){ if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 160); });

  actions.appendChild(retryBtn); actions.appendChild(homeBtn); actions.appendChild(closeBtn);
  card.appendChild(title); card.appendChild(msg); card.appendChild(actions);
  overlay.appendChild(card);
  document.body.appendChild(overlay);

  // animate in
  setTimeout(function(){ overlay.style.opacity = '1'; }, 20);

  // Auto-focus the retry button for accessibility
  setTimeout(function(){ try{ retryBtn.focus(); }catch(e){} }, 250);
}

function showWinMessage(moves){
  if (document.getElementById('win-overlay')) return;
  var points = 0; if (moves > 300) points = 15; else if (moves > 200) points = 25; else points = 40;
  var username = getCurrentUser(); if (username) addScoreToUser(username, points);
  const totalScore = username ? getUserScore(username) : null;

  const overlay = document.createElement('div');
  overlay.id = 'win-overlay';
  Object.assign(overlay.style, { position:'fixed', top:'0', left:'0', width:'100%', height:'100%', background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:'9999', opacity:'0', transition:'opacity 300ms ease' });

  const card = document.createElement('div');
  Object.assign(card.style, { width:'min(95%,520px)', background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 10px 30px rgba(0,0,0,0.2)', textAlign:'center', fontFamily:"Segoe UI, Roboto, Arial, sans-serif" });

  const title = document.createElement('h2'); title.textContent = 'You win!'; Object.assign(title.style, { margin:'0 0 8px', fontSize:'clamp(20px,3vw,28px)', color:'#222' });
  const info = document.createElement('p'); info.style = 'margin:0 0 12px;color:#444;font-size:16px';
  var infoText = 'Great job — moves: ' + (typeof moves === 'number' ? moves : clickCount) + '.';
  infoText += ' You earned ' + points + ' points.';
  if (username) infoText += ' Total score (' + username + '): ' + totalScore + ' pts.'; else infoText += ' Connect to save your score.';
  info.textContent = infoText;

  const actions = document.createElement('div'); Object.assign(actions.style, { display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' });
  const playBtn = document.createElement('button'); playBtn.textContent = 'Play Again'; Object.assign(playBtn.style, { background:'linear-gradient(90deg,#1976d2,#42a5f5)', color:'#fff', border:'none', padding:'10px 18px', borderRadius:'6px', cursor:'pointer', fontWeight:'700', fontSize:'16px' }); playBtn.addEventListener('click', function(){ location.reload(); });
  const closeBtn = document.createElement('button'); closeBtn.textContent = 'Go to homepage'; Object.assign(closeBtn.style, { background:'transparent', color:'#1976d2', border:'1px solid #1976d2', padding:'10px 18px', borderRadius:'6px', cursor:'pointer', fontWeight:'700', fontSize:'16px' }); closeBtn.addEventListener('click', function(){ overlay.style.opacity='0'; setTimeout(function(){ window.location.href = '../html/homepage.html'; },200); });
  actions.appendChild(playBtn); actions.appendChild(closeBtn);

  if (!username){ const connectBtn = document.createElement('button'); connectBtn.textContent = 'Connect'; Object.assign(connectBtn.style, { background:'#6b6b6b', color:'#fff', border:'none', padding:'10px 18px', borderRadius:'6px', cursor:'pointer', fontWeight:'700' }); connectBtn.addEventListener('click', function(){ overlay.style.opacity='0'; setTimeout(function(){ window.location.href = '../html/nameuser.html'; },200); }); actions.appendChild(connectBtn); }

  card.appendChild(title); card.appendChild(info); card.appendChild(actions); overlay.appendChild(card); document.body.appendChild(overlay);
  setTimeout(function(){ overlay.style.opacity='1'; },20);
  setTimeout(function(){ if (document.getElementById('win-overlay')){ overlay.style.opacity='0'; setTimeout(function(){ if (overlay.parentNode) overlay.parentNode.removeChild(overlay); },300); } }, 30000);
}

function win(){
  const imageOrder2 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","-1"];
  let isWin = true;
  for (let i=0;i<imageOrder2.length;i++){
    const tile = document.getElementById('board').children[i];
    if(!tile){ isWin = false; break; }
    const segments = tile.src.split('/'); const filename = segments[segments.length-1]; const expectedImage = imageOrder2[i] + '.jpg';
    if (filename !== expectedImage){ isWin = false; break; }
  }
  if (isWin && clickCount >= 16){
    if (gameTimerId){ clearTimeout(gameTimerId); gameTimerId = null; }
    if (progressIntervalId){ clearInterval(progressIntervalId); progressIntervalId = null; }
    var progressBar = document.querySelector('.progress-bar'); if (progressBar){ var filled = progressBar.querySelector('.progress-bar-filled'); if (filled && filled.parentNode) filled.parentNode.removeChild(filled); }
    try { var music = document.getElementById('audio1'); if (music && !music.paused) music.pause(); } catch(e){}
    canClick = false; isGameFinished = true;
    setTimeout(function(){ showWinMessage(clickCount); },700);
  }
}

