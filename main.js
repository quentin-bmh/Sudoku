/** @type {HTMLAnchorElement[]} */
const listItems = document.querySelectorAll('.list-group-item');

let draggedItem;

const addBorder = (target) => {
    if (target != draggedItem) {
        target.classList.add('border', 'border-2', 'border-primary');
    }
}

const removeBorder = (target) => {
    if (target != draggedItem) {
        target.classList.remove('border', 'border-2', 'border-primary');
    }
}

const addBackgroundA = (target) => {
    target.classList.add('bg-danger');
}

const addBackgroundD = (target) => {
    target.classList.add('bg-success');
}

const handleDragStart = (e) => {
    const target = e.target;
    const text = e.target.textContent;
    target.style.opacity = 0.5;
    draggedItem = target;
    e.dataTransfer.setData("text/plain", text);
    const newElement = document.createElement('a');
    newElement.href = "#";
    newElement.classList.add('list-group-item', 'list-group-item-action');
    newElement.textContent = text.trim();
}

const handleDragEnter = (e) => {
    addBorder(e.target);
}

const handleDragOver = (e) => {
    e.preventDefault();
}

const handleDragLeave = (e) => {
    removeBorder(e.target);
}

const handleDragEnd = (e) => {
    const target = e.target;
    target.style.opacity = 1;
}

const handleDrop = (e) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text/plain");
    e.target.textContent = text;
    const newElement = document.createElement('a');
    newElement.href = "#";
    newElement.classList.add('list-group-item', 'list-group-item-action');
    newElement.textContent = text;
}

listItems.forEach(listItem => {
    listItem.addEventListener('dragstart', handleDragStart);
    listItem.addEventListener('dragenter', handleDragEnter);
    listItem.addEventListener('dragover', handleDragOver);
    listItem.addEventListener('dragleave', handleDragLeave);
    listItem.addEventListener('dragend', handleDragEnd);
    listItem.addEventListener('drop', handleDrop);
});

function IsSudokuValid() {
    const sudoku = [];
    const carres = document.querySelectorAll('.sudoku-container .carre');

    carres.forEach(carre => {
        const boutons = carre.querySelectorAll('button');
        if (boutons.length > 0) {
            boutons.forEach(bouton => {
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
    const resC = document.querySelector('.correctA');
    const resI = document.querySelector('.incorrectA');
    if (count != 405) {
        resI.classList.remove('hidden');
        resC.classList.add('hidden');
    } else {
        resC.classList.remove('hidden');
        resI.classList.add('hidden');
    }
}

function eraseSudoku() {
    const carres = document.querySelectorAll('.sudoku-container');
    carres.forEach(carre => {
        const boutons = carre.querySelectorAll('button');
        if (boutons.length > 0) {
            boutons.forEach(bouton => {
                bouton.textContent = "";
            });
        }
    });
}

async function loadSudokuSolutions() {
    try {
        const response = await fetch('sudoku.json');
        if (!response.ok) {
            throw new Error('Failed to load sudoku solutions');
        }
        const sudokuSolutions = await response.json();
        return sudokuSolutions;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Générer un sudoku avec un niveau de difficulté spécifique
async function generateSudoku(difficulty) {
    eraseSudoku();
    const sudokuContainer = document.getElementById('sudokuContainer');
    const buttons = sudokuContainer.querySelectorAll('.list-group-item ');

    try {
        const sudokuSolutions = await loadSudokuSolutions();
        if (sudokuSolutions.length === 0) {
            throw new Error('No sudoku solutions loaded');
        }

        const randomIndex = Math.floor(Math.random() * sudokuSolutions.length);
        const sudokuSolution = sudokuSolutions[randomIndex];

        // Générer un tableau d'indices uniques pour les chiffres aléatoires
        const randomIndices = getRandomIndices(difficulty);

        randomIndices.forEach((index) => {
            buttons[index].textContent = sudokuSolution[index];
        });
    } catch (error) {
        console.error(error);
    }
}

// Fonction pour générer des indices uniques aléatoires
function getRandomIndices(count) {
    const indices = [];
    while (indices.length < count) {
        const index = Math.floor(Math.random() * 81);
        if (!indices.includes(index)) {
            indices.push(index);
        }
    }
    indices.droppable = false;
    return indices;
}

// Stocker le niveau de difficulté sélectionné
let currentDifficulty = 35; // Par défaut, easy level

// Générer un sudoku avec le niveau de difficulté actuel
function generateSudokuWithCurrentDifficulty() {
    generateSudoku(currentDifficulty);
}

// Sélectionnez chaque bouton par son ID
const easyBtn = document.getElementById('easyBtn');
const mediumBtn = document.getElementById('mediumBtn');
const hardBtn = document.getElementById('hardBtn');
const demonBtn = document.getElementById('demonBtn');
const generateBtn = document.getElementById('generateBtn'); // Ajout du bouton de génération

// Ajoutez un gestionnaire d'événements à chaque bouton de niveau de difficulté
easyBtn.addEventListener('click', () => {
    currentDifficulty = 35; // Mettre à jour le niveau de difficulté actuel
    generateSudokuWithCurrentDifficulty(); // Générer un sudoku avec le nouveau niveau de difficulté
});

mediumBtn.addEventListener('click', () => {
    currentDifficulty = 32;
    generateSudokuWithCurrentDifficulty();
});

hardBtn.addEventListener('click', () => {
    currentDifficulty = 28;
    generateSudokuWithCurrentDifficulty();
});

demonBtn.addEventListener('click', () => {
    currentDifficulty = 25;
    generateSudokuWithCurrentDifficulty();
});

// Ajouter un gestionnaire d'événements au bouton "generateSudoku"
generateBtn.addEventListener('click', () => {
    generateSudokuWithCurrentDifficulty(); // Générer un nouveau sudoku avec le niveau de difficulté actuel
});

// Appel initial pour afficher un sudoku avec le niveau de difficulté par défaut
generateSudokuWithCurrentDifficulty(); // Niveau de difficulté par défaut : easy
