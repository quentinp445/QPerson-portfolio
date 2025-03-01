// Fonction pour animer les barres de compétences
function animateSkills() {
    const bars = document.querySelectorAll('.skill-bar');
    bars.forEach(bar => {
        const level = bar.getAttribute('data-level'); // Récupère la valeur du niveau
        bar.style.height = level + "%"; // Anime la hauteur de la barre
    });
}

// Déclencher l'animation lorsque la section est visible
document.addEventListener("scroll", () => {
    const p3 = document.querySelector(".p3");
    const position = p3.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (position < screenHeight - 100) {
        animateSkills();
    }
});
