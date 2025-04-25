document.addEventListener("DOMContentLoaded", () => {
    const focusToggle = document.querySelector("#focus");
    const linksToggle = document.querySelector("#links-toggle");
    const todoToggle = document.querySelector("#todo-toggle");
    const linksContainer = document.querySelector("#links");
    const todoContainer = document.querySelector("#todo");

    const focusClick = () => {
        if (linksToggle.classList.contains("hidden") && todoToggle.classList.contains("hidden")) {
            // Fade in and remove the hidden class
            linksToggle.classList.remove("hidden");
            todoToggle.classList.remove("hidden");
            linksToggle.classList.add("fade-in");
            todoToggle.classList.add("fade-in");
            focusToggle.classList.remove("focus-active");

            // Exit full screen 
            document.exitFullscreen();

            // Remove the fade-in class after the animation
            setTimeout(() => {
                linksToggle.classList.remove("fade-in");
                todoToggle.classList.remove("fade-in");
            }, 300); // Match the CSS transition duration
        } else {
            // Fade out and add the hidden class
            linksToggle.classList.add("fade-out");
            todoToggle.classList.add("fade-out");
            focusToggle.classList.add("focus-active");
            linksContainer.classList.add("hidden");
            todoContainer.classList.add("hidden");

            // Fullscreen 
            document.documentElement.requestFullscreen()

            // Add the hidden class after the animation
            setTimeout(() => {
                linksToggle.classList.add("hidden");
                todoToggle.classList.add("hidden");
                linksToggle.classList.remove("fade-out");
                todoToggle.classList.remove("fade-out");
            }, 300); // Match the CSS transition duration
        }
    };

    // Exit focus mode when fullscreen is exited
    const exitFocusMode = () => {
        if (!document.fullscreenElement) {
            // Remove focus-active class
            focusToggle.classList.remove("focus-active");

            // Unhide the toggles
            linksToggle.classList.remove("hidden");
            todoToggle.classList.remove("hidden");
        }
    };

    focusToggle.addEventListener("click", focusClick);
    document.addEventListener("fullscreenchange", exitFocusMode);

});

