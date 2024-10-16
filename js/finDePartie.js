
// Référence aux éléments
const helpDiv = document.getElementById('help');
const settingsDiv = document.getElementById('settings');
const helpButton = document.getElementById('helpButton');
const settingsButton = document.getElementById('settingsButton');
const closeHelpButton = document.getElementById('closeHelp');
const closeSettingsButton = document.getElementById('closeSettings');

// Gestion de l'ouverture de la div "help"
helpButton.addEventListener('click', () => {
    helpDiv.hidden = false;
    settingsDiv.hidden = true; // Fermer la div settings si elle est ouverte
});

// Gestion de l'ouverture de la div "settings"
settingsButton.addEventListener('click', () => {
    settingsDiv.hidden = false;
    helpDiv.hidden = true; // Fermer la div help si elle est ouverte
});

// Gestion de la fermeture des divs avec les boutons "Fermer"
closeHelpButton.addEventListener('click', () => {
    helpDiv.hidden = true;
});

closeSettingsButton.addEventListener('click', () => {
    settingsDiv.hidden = true;
});



// Sélectionne tous les boutons par leur classe
const easyButtons = document.getElementsByClassName("easyBtn");
const mediumButtons = document.getElementsByClassName("mediumBtn");
const hardButtons = document.getElementsByClassName("hardBtn");
const demonButtons = document.getElementsByClassName("demonBtn");

// Fonction pour ajouter un événement de clic à chaque bouton d'une collection
function addClickEventToButtons(buttons, difficulty, timeText, difficultyLabel) {
    Array.from(buttons).forEach(button => {
        button.addEventListener("click", () => {
            displayChange();
            currentDifficulty = difficulty;
            generateSudokuWithCurrentDifficulty();
            getSudokuSolution.length = 0;
            closeResult();
            gameEnded = false;
            tempsE.innerHTML = timeText;
            difficulty.innerHTML = difficultyLabel;
        });
    });
}

// Ajout des événements à chaque niveau de difficulté
addClickEventToButtons(easyButtons, 35, "10 minutes", "facile");
addClickEventToButtons(mediumButtons, 32, "15 minutes", "moyen");
addClickEventToButtons(hardButtons, 28, "20 minutes", "difficile");
addClickEventToButtons(demonButtons, 25, "25 minutes", "demon");

