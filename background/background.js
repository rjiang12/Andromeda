document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.querySelector(".stars");
    const numStars = 350; // Adjust this number for more or fewer stars

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 5 + 2}s`; // Random duration between 2s and 7s
        star.style.animationDelay = `${Math.random() * 5}s`; // Random delay between 0s and 5s
        starsContainer.appendChild(star);
    }

    const movingStarsContainer = document.querySelector(".moving-stars");
    const numMovingStars = 5; // Adjust this number for more or fewer moving stars

    for (let i = 0; i < numMovingStars; i++) {
        const movingStar = document.createElement("div");
        movingStar.classList.add("moving-star");
        movingStar.style.top = `${Math.random() * 100}vh`;
        movingStar.style.left = `${Math.random() * 100}vw`;
        movingStar.style.animationDuration = `${Math.random() * 10 + 10}s`; // Random duration between 5s
        movingStarsContainer.appendChild(movingStar);
    }
});
