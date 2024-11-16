var rows = 4;
var columns = 4;
var imageOrder = [];
var clickCount = 0;
var mixExecuted = false;
var gameOver = false;
var isGameFinished = false; // משתנה כדי לציין אם המשחק נגמר או לא
var canClick = true; // משתנה כדי לציין אם ניתן ללחוץ על הלוח או לא

// פונקציה שמסדרת את התמונה בסדר הנכון
window.onload = function () {
  imageOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "-1"];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r.toString() + c.toString();
      tile.src = imageOrder.shift() + ".jpg";
      document.getElementById("board").append(tile);
      if (!gameOver) {
        tile.addEventListener("click", () => isEnableChange(tile.id));
      }
    }
  }
};

// כפתור לערבוב התמונות
const btnS = document.getElementById("shuffle");
btnS.addEventListener("click", mix);

// פונקציה שמפעילה את המנגינה בעת לחיצת הכפתור shuffle
function playAudio() {
  let music = document.getElementById("audio1");
  music.play();
}

// פונקציה שמערבבת את התמונות בצורה שיהיה ניתן להחזיר את התמונה למצב המקורי שלה
function mix() {
  if (!mixExecuted) {
    let element = document.getElementById("board");
    while (element.firstChild) {
      element.removeChild(element.firstChild); // כדי לנקות את הלוח שהתמונות בו מסודרות ללוח שהתמונות מעורבבות ויתנקה
    }
    let shuffleArray = [
      ["8", "3", "2", "10", "12", "6", "1", "15", "7", "11", "9", "13", "14", "-1", "4", "5"],
      ["4", "10", "-1", "14", "5", "11", "6", "1", "2", "13", "7", "8", "15", "12", "3", "9"],
      ["4", "15", "7", "6", "3", "5", "9", "14", "12", "11", "1", "8", "10", "2", "13", "-1"],
      ["7", "1", "4", "12", "11", "-1", "3", "9", "13", "10", "15", "6", "5", "8", "2", "14"],
      ["-1", "15", "8", "7", "14", "13", "11", "1", "12", "10", "9", "2", "5", "6", "4", "3"],
      ["13", "5", "-1", "2", "11", "4", "10", "12", "8", "7", "1", "9", "6", "3", "14", "15"],
      ["1", "9", "11", "6", "7", "10", "8", "15", "4", "5", "-1", "2", "13", "14", "3", "12"],
      ["1", "7", "2", "9", "13", "4", "15", "-1", "3", "5", "6", "10", "8", "14", "11", "12"],
      ["11", "15", "12", "4", "14", "-1", "13", "1", "6", "10", "3", "5", "2", "9", "7", "8"],
      ["3", "1", "14", "10", "12", "7", "11", "-1", "5", "15", "9", "6", "2", "4", "8", "13"]
    ];

    let arrayRandom = shuffleArray[parseInt(Math.random() * shuffleArray.length)];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        let tile = document.createElement("img");
        tile.id = r.toString() + c.toString();
        tile.src = arrayRandom.shift() + ".jpg";
        document.getElementById("board").append(tile); // פונקציה שבודקת האם ההזה אפשרית
        if (!gameOver) {
          tile.addEventListener("click", () => isEnableChange(tile.id)); // פונקציה שבודקת האם השחקן ניצח
        }
      }
      playAudio();
    }

    var progressBar = document.querySelector('.progress-bar');
    var progressBarFilled = document.createElement('div');
    progressBarFilled.classList.add('progress-bar-filled');
    progressBar.appendChild(progressBarFilled);

    var duration = 300; // משך הזמן בשניות (5 דקות)

    setTimeout(function () {
      if (!isGameFinished) {
        showGameOver(); // פונקציה שבסוף הטיימר מופיע לחצן ובו רשום שנפסלת והאם אתה רוצה לנסות שוב
      }
    }, duration * 1000);

    mixExecuted = true;
  }
}

// פונקציה שבודקת האם הוא שכן ואפשר להוזיזו(ע"י לחיצה בעכבר)
function isEnableChange(id) {
  if (gameOver || !canClick) {
    return; // המשחק נגמר, ולכן אין צורך להיכנס לפונקציה
  }

  const row = parseInt(id[0]);
  const col = parseInt(id[1]);
  const topNeighbor = (row > 0) ? `${row - 1}${col}` : null; // משתנה לשכן העליון של התמונה
  const bottomNeighbor = (row < rows - 1) ? `${row + 1}${col}` : null; // משתנה לשכן התחתון של התמונה
  const leftNeighbor = (col > 0) ? `${row}${col - 1}` : null; // משתנה לשכן השמאלי של התמונה
  const rightNeighbor = (col < columns - 1) ? `${row}${col + 1}` : null; // משתנה לשכן הימני של התמונה

  if (topNeighbor != null) {
    changeNeighbor(topNeighbor, id);
  }
  if (bottomNeighbor != null) {
    changeNeighbor(bottomNeighbor, id);
  }
  if (leftNeighbor != null) {
    changeNeighbor(leftNeighbor, id);
  }
  if (rightNeighbor != null) {
    changeNeighbor(rightNeighbor, id);
  }
  clickCount++;
  win();
}

// פונקציה שמבצעת את ההחלפה בין שתי תמונות על פי זהוי
function changeNeighbor(id, idOrginal) {
  const img = document.getElementById(id);
  const src = img.src;
  const segments = src.split("/"); // מפצל על פי הסימן '/' ה
  const filename = segments[segments.length - 1]; // משיג את שם הקובץ של התמונה
  if (filename == "-1.jpg") {
    const imgOrginal = document.getElementById(idOrginal);
    const imgToChange = document.getElementById(id);
    imgToChange.src = imgOrginal.src; // החלפת התמונה של השכן בתמונה המקורית
    imgOrginal.src = "-1.jpg"; // החלפת התמונה המקורית בתמונת השכן
  }
}

// (עיצוב) לחצן "game over" שנפעל בסוף הטיימר
function showGameOver() {
  var gameOverElement = document.createElement("div");
  gameOverElement.id = "game-over";
  gameOverElement.style.color = "white";
  gameOverElement.style.backgroundColor = "rgb(107, 85, 204)";
  gameOverElement.style.fontSize = "32px";
  gameOverElement.style.borderRadius = "50px";
  gameOverElement.style.width = "200px";
  gameOverElement.style.height = "120px";
  gameOverElement.style.lineHeight = "60px";
  gameOverElement.style.textAlign = "center";
  gameOverElement.style.position = "fixed";
  gameOverElement.style.top = "50%";
  gameOverElement.style.left = "50%";
  gameOverElement.style.transform = "translate(190%, -10%)";
  gameOverElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
  gameOverElement.style.padding = "20px";
  gameOverElement.style.textTransform = "uppercase";

  var gameTextElement = document.createElement("div");
  gameTextElement.textContent = "Game Over";
  gameTextElement.style.fontSize = "30px";
  gameTextElement.style.fontWeight = "bold";

  var tryAgainButton = document.createElement("button");
  tryAgainButton.textContent = "Try Again";
  tryAgainButton.style.fontSize = "18px";
  tryAgainButton.style.padding = "10px 20px";
  tryAgainButton.style.marginTop = "10px";
  tryAgainButton.style.backgroundColor = "black";
  tryAgainButton.style.color = "white";
  tryAgainButton.style.border = "none";
  tryAgainButton.style.borderRadius = "5px";
  tryAgainButton.addEventListener("click", function () {
    location.reload();  // טעינת הדף מחדש בלחיצה על הכפתור "Try Again"
  });

  gameOverElement.appendChild(gameTextElement);
  gameOverElement.appendChild(tryAgainButton);

  var body = document.getElementsByTagName("body")[0];
  body.appendChild(gameOverElement);

  gameOver = true; // כאשר הטיימר מסתיים, משנים את המשתנה לכן כך שלא יהיה ניתן להשתמש בפונקצית isEnableChange
  canClick = false; // כאשר המשחק נגמר, אסור ללחוץ על הלוח
}

function win() {
  const imageOrder2 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "-1"];
  let isWin = true;

  for (let i = 0; i < imageOrder2.length; i++) {
    const tile = document.getElementById("board").children[i];
    const src = tile.src;
    const segments = src.split("/");
    const filename = segments[segments.length - 1];
    const expectedImage = imageOrder2[i] + ".jpg";

    if (filename !== expectedImage) {
      isWin = false;
      break;
    }
  }

  if (isWin && clickCount >= 16) {
    setTimeout(function () {
      alert("You win!");
      isGameFinished = true; // המשחק נגמר, נעדכן את המשתנה
    }, 1000);
    canClick = false; // כאשר המשחק נגמר, אסור ללחוץ על הלוח
  }
}

