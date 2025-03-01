

document.addEventListener("DOMContentLoaded", function () {
    const skillBars = document.querySelectorAll(".skill-bar");

    skillBars.forEach(bar => {
        const percent = bar.getAttribute("data-percent");
        setTimeout(() => {
            bar.style.width = percent + "%";
        }, 500);
    });
});

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseover", () => {
        card.style.boxShadow = "0px 0px 20px rgba(48, 213, 200, 0.8)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.boxShadow = "none";
    });
});
