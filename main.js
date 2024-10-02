/** @type {HTMLAnchorElement[]} */
const listItems = document.querySelectorAll(".list-group-item");

let draggedItem;


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
  if(target.closest('.carrePropal') && target.tagName.toLowerCase()=== 'button'){
    alert("vous ne pouvez pas drop sur les boutons de proposition");
    return;
  }
  const text = e.dataTransfer.getData("text/plain");
  if (/^[1-9]$/.test(text)) {
    target.textContent = text;
  } else {
    alert("vous ne pouvez pas drag and drop votre contenu, il doit être entre 1 et 9");
  }
  const newElement = document.createElement("a");
  newElement.href = "#";
  newElement.classList.add("list-group-item", "list-group-item-action");
  newElement.textContent = text;
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

    const randomIndices = getRandomIndices(difficulty);

    randomIndices.forEach((index) => {
      buttons[index].textContent = sudokuSolution[index];
    });
  } catch (error) {
    console.error(error);
  }
}
/*Funtion not finished*/
function IsSudokuValid() {
  const sudoku = [];
  const carres = document.querySelectorAll(".sudoku-container .list-group-item");

  carres.forEach((carre) => {
    const boutons = carre.querySelectorAll("button");
    if (boutons.length > 0) {
      boutons.forEach((bouton) => {
        const contenu = bouton.textContent.trim();
        const nombre = parseInt(contenu);
        if (!isNaN(nombre)) {
          sudoku.push(nombre);
        } else {
          sudoku.push(0);
        }
      });
    }
  });

  let count = 0;
  for (let i = 0; i < sudoku.length; i++) {
    count += sudoku[i];
  }
  const resC = document.querySelector(".correctA");
  const resI = document.querySelector(".incorrectA");
  if (count != 405) {
    resI.classList.remove("hidden");
    resC.classList.add("hidden");
  } else {
    resC.classList.remove("hidden");
    resI.classList.add("hidden");
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


