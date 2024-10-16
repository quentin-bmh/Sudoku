const cells = 3; // Taille de la grille (3x3)
    const mosaicLoader = document.querySelector('.mosaic-loader');
    let numbers = Array.from({ length: cells * cells }, (_, index) => index + 1);

    // Fonction pour mélanger les nombres
    function shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    // Fonction pour générer les cellules dynamiquement
    function generateCells() {
      mosaicLoader.innerHTML = ''; // Réinitialiser la grille
      numbers = shuffleArray(numbers); // Mélanger les nombres

      for (let i = 0; i < cells; i++) {
        for (let j = 0; j < cells; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.textContent = numbers[i * cells + j]; // Insérer les chiffres mélangés
          mosaicLoader.appendChild(cell);
        }
      }
    }

    // Générer les cellules une première fois
    generateCells();

    // Changer les cellules à chaque intervalle pour simuler un chargement continu
    setInterval(() => {
      generateCells();
    }, 1500);