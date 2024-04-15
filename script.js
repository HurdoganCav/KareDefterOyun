//9x9 luk bir tablo olusturdum
const board = document.getElementById("board");

for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("id", `square-${i}-${j}`);
    board.appendChild(square);
  }
  board.appendChild(document.createElement("br"));
}


let move = 1;
let currentRow = 1;
let currentCol = 1;


const allSquares = document.querySelectorAll(".square");


function getValidMoves(row, col) {
  const moves = [
    [row - 2, col - 1],
    [row - 2, col + 1],
    [row - 1, col - 2],
    [row - 1, col + 2],
    [row + 1, col - 2],
    [row + 1, col + 2],
    [row + 2, col - 1],
    [row + 2, col + 1],
  ];

  return moves.filter((move) => {
   
    const [row, col] = move;
    const square = document.getElementById(`square-${row}-${col}`);
    return (
      row >= 1 &&
      row <= 9 &&
      col >= 1 &&
      col <= 9 &&
      !square.classList.contains("clicked")
    );
  });
}

allSquares.forEach((square) => {
  square.addEventListener("click", function () {
   
    if (this.classList.contains("clicked")) {
      return;
    }
   
    if (move !== 1 && !this.classList.contains("highlight")) {
      return;
    }
   
    this.classList.add("clicked");
    this.textContent = move;
    move++;
    currentRow = parseInt(this.getAttribute("id").split("-")[1]);
    currentCol = parseInt(this.getAttribute("id").split("-")[2]);

    
    allSquares.forEach((square) => square.classList.remove("highlight"));
    const validMoves = getValidMoves(currentRow, currentCol);
    validMoves.forEach((move) => {
      const [row, col] = move;
      const squareId = `square-${row}-${col}`;
      const square = document.getElementById(squareId);
      square.classList.add("highlight");
    });

   
    if (validMoves.length === 0) {
      alert("Game over!");
    }
  });
});


