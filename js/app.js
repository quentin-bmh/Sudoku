// const helpContainer = document.querySelector(".help-container");
// const helpTriggers = document.querySelectorAll(".help-trigger");
// const settingsContainer = document.querySelector(".settings-container");
// const settingsTriggers = document.querySelectorAll(".settings-trigger");

// // Événements pour les déclencheurs d'aide
// helpTriggers.forEach(trigger => trigger.addEventListener("click", () => {
//   toggleModal('help');
// }));

// // Événements pour les déclencheurs des paramètres
// settingsTriggers.forEach(trigger => trigger.addEventListener("click", () => {
//   toggleModal('settings');
// }));

// function toggleModal(type) {
//   if (type === 'help') {
//     helpContainer.classList.toggle("active");
//     settingsContainer.classList.remove("active"); // Masque les paramètres si l'aide est affichée
//   } else if (type === 'settings') {
//     settingsContainer.classList.toggle("active");
//     helpContainer.classList.remove("active"); // Masque l'aide si les paramètres sont affichés
//   }
// }










// const helpDiv = document.getElementById('help');
// const settingsDiv = document.getElementById('settings');
// const helpButton = document.getElementById('helpButton');
// const settingsButton = document.getElementById('settingsButton');
// const closeHelpButton = document.getElementById('closeHelp');
// const closeSettingsButton = document.getElementById('closeSettings');

// // Gestion de l'ouverture de la div "help"
// helpButton.addEventListener('click', () => {
//     helpDiv.hidden = false;
//     settingsDiv.hidden = true; // Fermer la div settings si elle est ouverte
// });

// // Gestion de l'ouverture de la div "settings"
// settingsButton.addEventListener('click', () => {
//     settingsDiv.hidden = false;
//     helpDiv.hidden = true; // Fermer la div help si elle est ouverte
// });

// // Gestion de la fermeture des divs avec les boutons "Fermer"
// closeHelpButton.addEventListener('click', () => {
//     helpDiv.hidden = true;
// });

// closeSettingsButton.addEventListener('click', () => {
//     settingsDiv.hidden = true;
// });


// const endgame = document.getElementById("endGame");
// const game = document.getElementById("game");
// function displayChange(){
//   if(game.style.display != "none"){
//     game.style.display = "none";
//     endgame.style.display = "flex";
//   }else if(endgame.style.display="flex"){
//     game.style.display = "flex";
//     endgame.style.display = "none";
//     tempsP.innerHTML="00:00";
//   }

// }
sayHello();