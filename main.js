/** @type {HTMLAnchorElement[]} */
const listItems = document.querySelectorAll('.list-group-item');


let draggedItem;
/**
 * @type {HTMLElement}
 */
const addBorder = (target)=>{
    if(target != draggedItem){
        target.classList.add('border' , 'border-2', 'border-primary');
    }
    
}

const removeBorder = (target)=>{
    if(target != draggedItem){
        target.classList.remove('border' , 'border-2', 'border-primary');
    }
}
const addBackgroundA = (target)=>{
    target.classList.add('bg-danger');
}
const addBackgroundD = (target)=>{
    target.classList.add('bg-success');
}

//ajout de la js Doc
/**
 * 
 * @param {DragEvent} e 
 */
const handleDragStart = (e) =>{
    /**@type {HTMLAnchorElement} */
    const target = e.target;
    const text = e.target.textContent;
    target.style.opacity=0.5;
    draggedItem = target;
    e.dataTransfer.setData("text/plain", text);
    const newElement = document.createElement('a');
    newElement.href = "#";
    newElement.classList.add('list-group-item', 'list-group-item-action');
    newElement.textContent = text.trim();

}
//ajout de la js Doc
/**
 * 
 * @param {DragEvent} e 
 */
const handleDragEnter = (e)=>{
    addBorder(e.target);
}
/**
 * 
 * @param {DragEvent} e 
 */
const handleDragOver = (e)=>{
    e.preventDefault();
}

/**
 * 
 * @param {DragEvent} e 
 */
const handleDragLeave = (e)=>{
    removeBorder(e.target);
}
/**
 * @param {DragEvent} e
 */
const handleDragEnd = (e)=>{
    const target = e.target;
    target.style.opacity=1;
}
/**
 * 
 * @param {DragEvent} e 
 */
const handleDrop = (e)=>{
    e.preventDefault();
    const text = e.dataTransfer.getData("text/plain");
        e.target.textContent = text;
    const newElement = document.createElement('a');
    newElement.href = "#";
    newElement.classList.add('list-group-item', 'list-group-item-action');
    newElement.textContent = text;
}

listItems.forEach(listItem =>{
    listItem.addEventListener('dragstart', handleDragStart);
    listItem.addEventListener('dragenter', handleDragEnter);
    listItem.addEventListener('dragover', handleDragOver);
    listItem.addEventListener('dragleave', handleDragLeave);    
    listItem.addEventListener('dragend', handleDragEnd);
    listItem.addEventListener('drop', handleDrop);
});

function IsSudokuValid(){
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
        console.log(sudoku[i]);
        count += sudoku[i];
    }
    const resC = document.querySelector('.correctA');
    const resI = document.querySelector('.incorrectA');
    console.log(count);
    if(count !=405){
        resI.classList.remove('hidden');
        resC.classList.add('hidden');
    }
    else{
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

async function generateSudoku() {
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
        

        // Générer un tableau d'indices uniques pour les 35 chiffres aléatoires
        const randomIndices = getRandomIndices(35);

        randomIndices.forEach((index) => {
            buttons[index].textContent = sudokuSolution[index];
        });
    } catch (error) {
        console.error(error);
    }
}

// Fonction pour générer des indices uniques aléatoires
function getRandomIndices(count) {
    /**@type {HTMLAnchorElement} */
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

generateSudoku();



// Sélectionnez chaque bouton par son ID
const easyBtn = document.getElementById('easyBtn');
const mediumBtn = document.getElementById('mediumBtn');
const hardBtn = document.getElementById('hardBtn');
const demonBtn = document.getElementById('demonBtn');

// Ajoutez un gestionnaire d'événements à chaque bouton
easyBtn.addEventListener('click', () => {
    generateSudoku(5); // Générer avec 35 chiffres pour easy level
});

mediumBtn.addEventListener('click', () => {
    generateSudoku(3); // Générer avec 32 chiffres pour medium level
});

hardBtn.addEventListener('click', () => {
    generateSudoku(2); // Générer avec 28 chiffres pour hard level
});

demonBtn.addEventListener('click', () => {
    generateSudoku(1); // Générer avec 25 chiffres pour demon level
});




