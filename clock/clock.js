document.addEventListener("DOMContentLoaded", () => {
    const clockElement = document.getElementById("clock");
    const greetingElement = document.getElementById("greeting");

    const updateClock = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        clockElement.textContent = `${hours}:${minutes} ${ampm}`;
    };

    const updateGreeting = () => {
        const name = localStorage.getItem("name");
        const now = new Date();
        const hours = now.getHours();
        let greeting = "Good morning";
    
        if (hours >= 12 && hours < 18) {
            greeting = "Good afternoon";
        } else if (hours >= 18) {
            greeting = "Good evening";
        }
    
        if (!name) {
            let nameInput = document.querySelector("#name-input");
            if (!nameInput) {
                nameInput = document.createElement("input");
                nameInput.type = "text";
                nameInput.placeholder = "What is your name?";
                nameInput.id = "name-input";
    
                nameInput.addEventListener("keydown", (event) => {
                    if (event.key === "Enter") {
                        const enteredName = nameInput.value.trim();
                        if (enteredName) {
                            localStorage.setItem("name", enteredName.trim());
                            updateGreeting(); 
                        }
                    }
                });
    
                greetingElement.innerHTML = "";
                greetingElement.appendChild(nameInput);
                nameInput.focus(); 
            }
        } else {
            greetingElement.textContent = `${greeting}, ${name}`;
        }
    };

    updateClock();
    setInterval(updateClock, 1000);

    updateGreeting();
    setInterval(updateGreeting, 1000 * 3600); 
});