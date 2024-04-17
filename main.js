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
    newElement.draggable = true;
    newElement.textContent = text.trim();
    addBackgroundD(newElement);
    const actionLog = document.getElementById('MvtElmtD');
    actionLog.appendChild(newElement);

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
    newElement.draggable = true;
    newElement.textContent = text;
    addBackgroundA(newElement);
    const actionLog = document.getElementById('MvtElmtA');
    actionLog.appendChild(newElement);
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
    if(count !=45){
        resI.classList.remove('hidden');
        resC.classList.add('hidden');
    }
    else{
        resC.classList.remove('hidden');
        resI.classList.add('hidden');
    }

}

function eraseSudoku() {
    const carres = document.querySelectorAll('.sudoku-container .carre');
    carres.forEach(carre => {
        const boutons = carre.querySelectorAll('button');
        if (boutons.length > 0) {
            boutons.forEach(bouton => {
                bouton.textContent = "";
            });
        }
    });
}




