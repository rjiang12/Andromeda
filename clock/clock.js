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
});