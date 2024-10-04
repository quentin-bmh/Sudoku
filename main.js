/** @type {HTMLAnchorElement[]} */
const listItems = document.querySelectorAll(".list-group-item");

let draggedItem;
const sudokuInitial = [];
const sudokuFinal = [];


/*DRAG AND DROP */
const handleDragLeave = (e) => {};
const handleDragEnter = (e) => {};
const handleDragOver = (e) => {
    e.preventDefault();
  };  
const handleDragEnd = (e) => {
  const target = e.target;
  target.style.opacity = 1;
};

const handleDragStart = (e) => {
  const target = e.target;
  const text = e.target.textContent;
  target.style.opacity = 0.5;
  draggedItem = target;
  e.dataTransfer.setData("text/plain", text);
  const newElement = document.createElement("a");
  newElement.href = "#";
  newElement.classList.add("list-group-item", "list-group-item-action");
  newElement.textContent = text.trim();
};

const handleDrop = (e) => {
  e.preventDefault();
  const target = e.target;  
  //vérifie que la target contient 'data-fixed' pour déterminer si on peut drop un bouton dessus, si oui on ne peut drop, sinon cette case est vide et on peut la remplir
  if (target.getAttribute('data-fixed') === 'true') {
    alert("Vous ne pouvez pas drop sur cette case fixe.");
    return;
  }
  //vérifie si la target du drop fait partie du carré de proposition drag and drop si oui on ne veut pas que la valeur change car c'est à l'aide de ces boutons que l'on remplie le sudoku
  if (target.closest('.carrePropal') && target.tagName.toLowerCase() === 'button') {
    return;
  }
  const text = e.dataTransfer.getData("text/plain");
  //vérifie si ce qui est drop est bien un chiffre compri entre 1 et 9 tout le reste est refusé
  if (/^[1-9]$/.test(text)) {
    target.textContent = text;    
  } else {
    alert("Le contenu que vous essayez de drag and drop doit être un chiffre entre 1 et 9.");
  }
  const newElement = document.createElement("a");
  newElement.href = "#";
  newElement.classList.add("list-group-item", "list-group-item-action");
  newElement.textContent = text;
  scanSudoku();
  compareSudoku()
};


listItems.forEach((listItem) => {
  listItem.addEventListener("dragstart", handleDragStart);
  listItem.addEventListener("dragenter", handleDragEnter);
  listItem.addEventListener("dragover", handleDragOver);
  listItem.addEventListener("dragleave", handleDragLeave);
  listItem.addEventListener("dragend", handleDragEnd);
  listItem.addEventListener("drop", handleDrop);
});

/* Sudoku Fonctions*/
async function loadSudokuSolutions() {
  try {
    const response = await fetch("sudoku.json");
    if (!response.ok) {
      throw new Error("Failed to load sudoku solutions");
    }
    const sudokuSolutions = await response.json();
    //console.log(sudokuSolutions);
    return sudokuSolutions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function generateSudoku(difficulty) {
  eraseSudoku();
  const sudokuContainer = document.getElementById("sudokuContainer");
  const buttons = sudokuContainer.querySelectorAll(".list-group-item ");

  try {
    const sudokuSolutions = await loadSudokuSolutions();
    if (sudokuSolutions.length === 0) {
      throw new Error("No sudoku solutions loaded");
    }

    const randomIndex = Math.floor(Math.random() * sudokuSolutions.length);
    const sudokuSolution = sudokuSolutions[randomIndex];
    //console.log(sudokuSolution);
    const randomIndices = getRandomIndices(difficulty);
    buttons.forEach((button, index) => {
      if (randomIndices.includes(index)) {
        button.textContent = sudokuSolution[index];
        sudokuInitial.push(button.textContent);
        button.style.fontWeight = '800';
        button.style.fontSize ='20px';
        button.style.backgroundColor='rgba(255,255,255,1)';
        button.setAttribute('data-fixed', 'true');
      } else {
        button.textContent = '';
        sudokuInitial.push(0);
        button.style.fontWeight = '700';
        button.style.fontSize ='20px';
        button.style.backgroundColor='rgba(255,255,255, 0.8)';
        button.setAttribute('data-fixed', 'false');
      }
    });
    //console.log(sudokuInitial);
    sudokuFinal.push(sudokuInitial);
    // console.log(sudokuFinal);
  } catch (error) {
    console.error(error);
  }
}

/*Manipulate sudoku dificulty*/
let currentDifficulty = 35;
function generateSudokuWithCurrentDifficulty() {
  generateSudoku(currentDifficulty);
}

const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");
const demonBtn = document.getElementById("demonBtn");

easyBtn.addEventListener("click", () => {
  currentDifficulty = 35; 
  generateSudokuWithCurrentDifficulty();
});
mediumBtn.addEventListener("click", () => {
  currentDifficulty = 32;
  generateSudokuWithCurrentDifficulty();
});
hardBtn.addEventListener("click", () => {
  currentDifficulty = 28;
  generateSudokuWithCurrentDifficulty();
});
demonBtn.addEventListener("click", () => {
  currentDifficulty = 25;
  generateSudokuWithCurrentDifficulty();
});
generateSudokuWithCurrentDifficulty();

/*Funtion finished*/
function IsSudokuValid() {
  const sudoku = [];
  const carres = document.querySelectorAll(".sudoku-container button");
  carres.forEach((bouton, index) => {
    const contenu = bouton.textContent.trim();
    const nombre = parseInt(contenu);
    sudoku.push(!isNaN(nombre) ? nombre : 0);
  });

  // Transformer le tableau linéaire en un tableau 9x9
  const grid = [];
  for (let i = 0; i < 9; i++) {
    grid.push(sudoku.slice(i * 9, i * 9 + 9));
  }

  // Fonction pour vérifier si une liste contient les nombres de 1 à 9 sans répétition
  function isValidGroup(group) {
    const seen = new Set();
    for (const num of group) {
      if (num < 1 || num > 9 || seen.has(num)) {
        return false;
      }
      seen.add(num);
    }
    return true;
  }

  // Vérifier les lignes
  for (let row = 0; row < 9; row++) {
    if (!isValidGroup(grid[row])) {
      showResult(false);
      return;
    }
  }

  // Vérifier les colonnes
  for (let col = 0; col < 9; col++) {
    const column = [];
    for (let row = 0; row < 9; row++) {
      column.push(grid[row][col]);
    }
    if (!isValidGroup(column)) {
      showResult(false);
      return;
    }
  }

  // Vérifier les blocs 3x3
  for (let blockRow = 0; blockRow < 3; blockRow++) {
    for (let blockCol = 0; blockCol < 3; blockCol++) {
      const block = [];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          block.push(grid[blockRow * 3 + row][blockCol * 3 + col]);
        }
      }
      if (!isValidGroup(block)) {
        showResult(false);
        return;
      }
    }
  }
  showResult(true);
}
function showResult(isValid) {
  const resC = document.querySelector(".correctA");
  const resI = document.querySelector(".incorrectA");
  if (isValid) {
    resC.classList.remove("hidden");
    resI.classList.add("hidden");
  } else {
    resC.classList.add("hidden");
    resI.classList.remove("hidden");
  }
}

/*Funtion finished*/
function eraseSudoku() {
  const carres = document.querySelectorAll(".sudoku-container");
  carres.forEach((carre) => {
    const boutons = carre.querySelectorAll("button");
    if (boutons.length > 0) {
      boutons.forEach((bouton) => {
        bouton.textContent = "";
      });
    }
  });
}



/*Funtion not finished*/
function getRandomIndices(count) {
  const indices = [];
  while (indices.length < count) {
    const index = Math.floor(Math.random() * 81);
    if (!indices.includes(index)) {
      indices.push(index);
    }
  }

  return indices;
}

/* ajout des bordures du sudoku */
function addBorders() {
  const buttons = document.querySelectorAll('.sudoku-container button');
  
  buttons.forEach((button, index) => {
      let row = Math.floor(index / 9);
      let col = index % 9;
      button.style.border = '0px solid black';
      if (col % 3 === 2) {
          button.style.borderRight = '3px solid black';
      }
      if (row % 3 === 2) {
          button.style.borderBottom = '3px solid black';
      }
      if (col === 0) {
          button.style.borderLeft = '3px solid black';
      }
      if (row === 0) {
          button.style.borderTop = '3px solid black';
      }
  });
}
addBorders();

function back() {
  // Vérifier s'il y a des mouvements à annuler
  if (listMove.length > 0) {
    // Récupérer le dernier mouvement ajouté
    const lastMove = listMove.pop();

    // Extraire l'index du dernier mouvement
    const [index] = lastMove;

    // Trouver le bouton correspondant dans le tableau Sudoku
    const sudokuContainer = document.getElementById("sudokuContainer");
    const buttons = sudokuContainer.querySelectorAll(".list-group-item");

    // Annuler le dernier mouvement
    const button = buttons[index];
    if (button.getAttribute('data-fixed') === 'false') {
      button.textContent = ''; // Effacer la valeur entrée par l'utilisateur
    }

    // Mettre à jour le tableau `sudokuFinal` après l'annulation
    sudokuFinal[index] = 0; // Remettre à zéro après avoir supprimé l'entrée de l'utilisateur
    console.log(listMove);
  } else {
    console.log("Aucun mouvement à annuler");
  }
}



function scanSudoku(){
  //vide le tableau
  sudokuFinal.length = 0;
  //parcourt tout le tableau et en fait un scan
  const carres = document.querySelectorAll(".sudoku-container button");
  carres.forEach((bouton) => {
    sudokuFinal.push(bouton.textContent);
  });
  // console.log(sudokuFinal);
  return sudokuFinal;
}

const listMove = [];
function compareSudoku(){
  for(let i=0; i<80; i++){
    if(sudokuInitial[i] != sudokuFinal[i]){
      console.log(sudokuFinal[i]);
      const existingMove = listMove.find(move => move[0] === i);
      if (!existingMove) {
        listMove.push([i, sudokuFinal[i]]);
      }
    }
  }
  for (let i = 0; i < 81; i++) {
    sudokuInitial[i] = sudokuFinal[i];
  }
  console.log(listMove);
}

// function compareSudoku(){
//   let isNewNbr = false;
//   listMove.length=0;
//   for(let i=0; i<81; i++){
//     if(sudokuInitial[i] != sudokuFinal[i]){
//       for(let j=0 ; j<listMove.length; j++){
//         if(listMove[j] != sudokuFinal[i]){
//           isNewNbr=true;
//         }
//       }
//     }
//     if(isNewNbr=true){
//       listMove.push([i,sudokuFinal[i]]);
//     }
//   }
//   console.log(listMove);
// }


