
document.addEventListener('DOMContentLoaded', () => {

    const bodyElement = document.body;
    const btnDark = document.getElementById('btn-dark');
    const btnLight = document.getElementById('btn-light');
    const btnRainbow = document.getElementById('btn-rainbow');
    let prevTheme = '';
    let currentTheme = 'theme-light';

    function switchTheme(theme) {
        bodyElement.classList.remove('theme-light', 'theme-dark', 'theme-rainbow');
        bodyElement.classList.add(theme);
        prevTheme = currentTheme;
        currentTheme = theme;
        drawClock(); 
    }

    if (btnDark) {
        btnDark.addEventListener('click', () => switchTheme('theme-dark'));
    }
    if (btnLight) {
        btnLight.addEventListener('click', () => switchTheme('theme-light'));
    }
    if (btnRainbow) {
        btnRainbow.addEventListener('click', () => switchTheme('theme-rainbow'));
    }

    // Selecting the canvas from the html
    const canvas = document.getElementById('clock-canvas');
    const ctx = canvas.getContext('2d');

    // Arrow Function for adding 0 in front
    const pad = (num) => String(num).padStart(2, '0');

    function drawClock() {
        // Get current time
        const now = new Date();
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
        const timeString = `${hours}:${minutes}:${seconds}`;

        // Erase the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //We modify the theme if necessary
        
        if(prevTheme !== currentTheme){

            ctx.font = 'bold 50px "Times New Roman"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Chose text color based on theme
            if (currentTheme === 'theme-light') {
                ctx.fillStyle = '#111'; 
            } 
            else if (currentTheme === 'theme-dark') {
                ctx.fillStyle = '#FFF'; 
            } 
            else if (currentTheme === 'theme-rainbow') {
                ctx.fillStyle = '#111';
            }

            
        }
        ctx.fillText(timeString, canvas.width / 2, canvas.height / 2);
    }
    //Starting the clock
    setInterval(drawClock, 1000);
    drawClock();
});