const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
  modalContainer.classList.toggle("active")
}
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


const endgame = document.getElementById("endGame");
const game = document.getElementById("game");
function displayChange(){
  if(game.style.display != "none"){
    game.style.display = "none";
    endgame.style.display = "flex";
  }else if(endgame.style.display="flex"){
    game.style.display = "flex";
    endgame.style.display = "none";
    tempsP.innerHTML="00:00";
  }

}