<div align="center">

# 🧩 Slide Puzzle  
A responsive, lightweight sliding puzzle built with pure **HTML, CSS, and JavaScript**.  
No frameworks, no dependencies – just logic, interactivity, and clean design.  
Shuffle, solve, and beat the clock across devices.

[![Live Demo](https://img.shields.io/badge/🎮-Play_Live_Game-green?style=for-the-badge)](https://mrf182.github.io/SlidePuzzle/)
[![Watch Demo](https://img.shields.io/badge/📽️-Watch_Demo-grey?style=for-the-badge)](https://youtu.be/YOUR_VIDEO_LINK)

![HTML5](https://img.shields.io/badge/HTML5-orange)
![CSS3](https://img.shields.io/badge/CSS3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow)
![Responsive](https://img.shields.io/badge/Responsive-Yes-green)

</div>

---

## 🎯 About the Project

**Slide Puzzle** is a browser-based logic game where you slide image tiles to restore the original picture. The puzzle is randomized at the start, and only legal (adjacent) moves are allowed.

Built completely with **Vanilla JavaScript**, the game includes real-time validation, a win condition check, and mobile-friendly UI – all without using external libraries or frameworks.

---

## 🧩 Key Features

- 🔀 **Auto-shuffle:** Puzzle tiles are shuffled automatically at game start  
- ⏳ **Smart timer:** Timer starts only after the first move  
- 🎯 **Valid moves only:** Only adjacent tiles can be moved into the empty space  
- 🏁 **Win detection:** Shows a popup when the puzzle is completed  
- 🔁 **Instant restart:** Quick Shuffle and Restart buttons  
- 📱 **Fully responsive:** Optimized for both mobile and desktop devices

---

## 🧰 Tech Stack

- **Languages:** HTML5, CSS3, JavaScript (ES6)
- **Layout:** CSS Grid, Flexbox
- **Deployment:** GitHub Pages

## 🧠 Game Logic Highlights

- **Always Solvable Shuffle:**  
  Instead of randomly shuffling tiles (which can lead to unsolvable puzzles), we predefined several valid, solvable board configurations. At game start, one of these preset solvable states is randomly selected. This guarantees every puzzle is solvable while still introducing variety.

- **Win Condition Detection:**  
  The game stores the correct tile order upon initialization. On every valid move, the current tile state is compared to the target configuration. If they match, a victory popup is triggered immediately.

- **Fixed Grid Size (for now):**  
  The current implementation supports a fixed 3x3 grid. Logic is structured to allow for future expansion (e.g., 4x4, 5x5), with planned dynamic adjustments for both rendering and validation.

- **No External Libraries:**  
  The game is built entirely with vanilla JavaScript – all logic and DOM manipulation is handwritten.


## 🚀 Planned Enhancements

- 🔢 **Dynamic Grid Sizes:** Add support for 4x4 and 5x5 modes with scalable logic and layout adjustments.
- 🖼️ **Custom Image Upload:** Allow users to upload an image and generate a personalized puzzle.
- 💾 **Save & Resume:** Use `localStorage` to store the puzzle state and elapsed time.
- ⏱️ **Challenge Mode:** Introduce timed and move-limited modes to increase difficulty.
- 🔊 **Audio Feedback:** Add optional sound effects with mute toggle for UX enhancement.


---

## ⚙️ Run Locally

```bash
git clone https://github.com/mrf182/SlidePuzzle.git
cd SlidePuzzle
# Open index.html in your browser (double-click or drag into browser)


