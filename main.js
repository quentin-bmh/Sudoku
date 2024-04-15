document.addEventListener('DOMContentLoaded', function() {
    const boutons = document.querySelectorAll('.carre button');

    boutons.forEach(bouton => {
        bouton.addEventListener('click', function() {
            const nouveauTexte = prompt('Entrez le nombre à ajouter dans ce bouton :');
            if (nouveauTexte !== null) {
                this.textContent = nouveauTexte;
            }
        });
    });
});
