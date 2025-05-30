document.addEventListener("DOMContentLoaded", () => {
    const clockElement = document.getElementById("clock");
    const updateClock = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        clockElement.textContent = `${hours}:${minutes} ${ampm}`;
    };
    updateClock();
    setInterval(updateClock, 1000);

    const greetingElement = document.getElementById("greeting");
    const updateGreeting = () => {
        const now = new Date();
        const hours = now.getHours();
        let greeting = "Good morning";
        if (hours >= 12 && hours < 18) {
            greeting = "Good afternoon";
        } else if (hours >= 18) {
            greeting = "Good evening";
        }
        greetingElement.textContent = greeting;
    }
    updateGreeting();
    setInterval(updateGreeting, 1000 * 3600);
});