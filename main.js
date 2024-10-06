/** @type {HTMLAnchorElement[]} */
const listItems = document.querySelectorAll(".list-group-item");

let draggedItem;
const sudokuInitial = [];
const sudokuFinal = [];
const getSudokuSolution = [];

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
  const carres = document.querySelectorAll(".sudoku-container button");
  const newElement = document.createElement("a");
  newElement.href = "#";
  newElement.classList.add("list-group-item", "list-group-item-action");
  newElement.textContent = text;
  carres[positionSolution].style.backgroundColor='rgba(255,255,255, 0.8)';
  giveSolution = false;
  scanSudoku();
  compareSudoku();
  isSudokuComplete();
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
    getSudokuSolution.push(sudokuSolution);
    // console.log(sudokuSolution);
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
  getSudokuSolution.length=0;
});
mediumBtn.addEventListener("click", () => {
  currentDifficulty = 32;
  generateSudokuWithCurrentDifficulty();
  getSudokuSolution.length=0;
});
hardBtn.addEventListener("click", () => {
  currentDifficulty = 28;
  generateSudokuWithCurrentDifficulty();
  getSudokuSolution.length=0;
});
demonBtn.addEventListener("click", () => {
  currentDifficulty = 25;
  generateSudokuWithCurrentDifficulty();
  getSudokuSolution.length=0;
});
generateSudokuWithCurrentDifficulty();

/*Funtion finished*/
function isSudokuComplete(){
  let complete = true;
  for(let i=0; i<81; i++){
    if(sudokuFinal[i] == ''){
      complete = false;
      return;
    }
  }
  if(complete == true){
    IsSudokuValid();
  }
}

function IsSudokuValid() {
  let valid = true;
  for(let i=0; i<81; i++){
    if(getSudokuSolution[0][i]!=sudokuFinal[i]){
      valid = false;
      showResultF();
    }
  }
  if(valid == true){
    showResultV();
  }
  console.log(sudokuFinal);
}

function showResultF() {
  const resC = document.querySelector(".correctA");
  resC.classList.add("hidden");
  const resI = document.querySelector(".incorrectA");
  resI.classList.remove("hidden");

}
function showResultV() {
  const resI = document.querySelector(".incorrectA");
  resI.classList.add("hidden");
  const resC = document.querySelector(".correctA");
  resC.classList.remove("hidden");
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



/*Funtion finished*/
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

// boutons fonctionnalitées

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
    // console.log(listMove);
  } else {
    // console.log("Aucun mouvement à annuler");
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
  return sudokuFinal;
}

const listMove = [];
let nbrCasesVides = 0;
let nbrCasesFausses = 0;
let nbrCasesCorrectes = 0;
let posIndice = 0;
let giveSolution = false;
let positionSolution = -1;
function compareSudoku(){
  for(let i=0; i<80; i++){
    if(sudokuInitial[i] != sudokuFinal[i]){
      // console.log(sudokuFinal[i]);
      const existingMove = listMove.find(move => move[0] === i);
      if (!existingMove) {
        listMove.push([i, sudokuFinal[i]]);        
      }
    }
  }
  for (let i = 0; i < 81; i++) {
    sudokuInitial[i] = sudokuFinal[i];
  }
  // console.log(listMove);
}

function giveHint() {
  nbrCasesVides = 0;
  nbrCasesFausses = 0;
  nbrCasesCorrectes = 0;

  // Si `giveSolution` est `false`, nous devons trouver une nouvelle case pour donner un indice.
  if (!giveSolution) {
    scanSudoku();
    getNbrCases();
    positionSolution = posIndice; // Conserver l'indice trouvé pour le prochain clic
  }

  const carres = document.querySelectorAll(".sudoku-container button");

  // Vérifiez que `positionSolution` est valide
  if (positionSolution >= 0 && positionSolution < 81) {
    // Si `giveSolution` est `false`, coloriez la case
    if (!giveSolution) {
      if (sudokuFinal[positionSolution] == "") {
        carres[positionSolution].style.backgroundColor = 'blue'; // Case vide
      } else if (getSudokuSolution[0][positionSolution] != sudokuFinal[positionSolution]) {
        carres[positionSolution].style.backgroundColor = 'red'; // Case incorrecte
      }
      giveSolution = true;
    } else {
      if(sudokuFinal[positionSolution] ==getSudokuSolution[0][positionSolution]){
        carres[positionSolution].style.backgroundColor='rgba(255,255,255, 0.8)';
      }
      // Si `giveSolution` est `true`, afficher la solution dans la case.
      if (sudokuFinal[positionSolution] == "" || getSudokuSolution[0][positionSolution] != sudokuFinal[positionSolution]) {
        carres[positionSolution].textContent = getSudokuSolution[0][positionSolution];
        carres[positionSolution].style.backgroundColor='rgba(255,255,255, 0.8)';
        sudokuFinal[positionSolution] = getSudokuSolution[0][positionSolution];
        listMove.push([positionSolution, getSudokuSolution[0][positionSolution]]);
        // compareSudoku();
        isSudokuComplete();
      }
      giveSolution = false;
    }
  }
}

function getNbrCases() {
  let casesVidesIndices = [];
  let casesFaussesIndices = [];
  let casesCorrectesIndices = [];

  for (let i = 0; i < 81; i++) {
    if (sudokuFinal[i] == "") {
      nbrCasesVides += 1;
      casesVidesIndices.push(i);
    } else if (getSudokuSolution[0][i] != sudokuFinal[i]) {
      nbrCasesFausses += 1;
      casesFaussesIndices.push(i);
    } else {
      nbrCasesCorrectes += 1;
      casesCorrectesIndices.push(i);
    }
  }

  // Choisissez aléatoirement un indice parmi les cases vides ou incorrectes
  const allHintIndices = [...casesVidesIndices, ...casesFaussesIndices];
  if (allHintIndices.length > 0) {
    posIndice = allHintIndices[Math.floor(Math.random() * allHintIndices.length)];
  } else {
    posIndice = -1; // Si aucune case ne nécessite un indice
  }

  // Logs pour déboguer
  // console.log("le nombre de cases incorrectes est de " + nbrCasesFausses);
  // console.log("le nombre de cases correctes est de " + nbrCasesCorrectes);
  // console.log("le nombre de cases vides est de " + nbrCasesVides);
  // console.log("la position de l'indice sera " + posIndice);
  if (posIndice !== -1) {
    // console.log("Valeur de la solution pour l'indice sélectionné: " + getSudokuSolution[0][posIndice]);
  }
}

document.querySelector('#eraser').addEventListener('click', function() {
  erase();
});

function erase() {
  const carres = document.querySelectorAll('.sudoku-container button');

  // Fonction de rappel pour effacer le texte du bouton et mettre à jour listMove
  function handleErase(event) {
    const bouton = event.target;
    const index = Array.from(carres).indexOf(bouton);

    // Effacer le texte du bouton
    if (bouton.getAttribute('data-fixed') === 'true') {
      return;
    }else{
      bouton.textContent = "";
      sudokuFinal[index] = "";
      const moveIndex = listMove.findIndex(move => move[0] === index);
      if (moveIndex !== -1) {
        listMove.splice(moveIndex, 1);
      }
    }
    carres.forEach(b => b.removeEventListener('click', handleErase));
  }
  carres.forEach(bouton => bouton.addEventListener('click', handleErase));
}







