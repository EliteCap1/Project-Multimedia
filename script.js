document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const canvas = document.getElementById('clock-canvas');
    const ctx = canvas.getContext('2d');
    
    // Variabile pentru starea aplicatiei
    let currentTheme = 'theme-light';
    let isVoiceEnabled = false;
    let lastMinute = new Date().getMinutes();

  

    // Adauga zero in fata daca numarul e mai mic de 10
    function pad(num) {
        return String(num).padStart(2, '0');
    }

    // Functia care transforma textul în sunet
    function speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    }

    // Functia care schimba tema vizuala
    function switchTheme(newTheme) {
        body.classList.remove('theme-light', 'theme-dark', 'theme-rainbow');
        body.classList.add(newTheme);
        currentTheme = newTheme;
        drawClock();
    }

    function drawClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Verificam daca trebuie sa vorbeasca 
        if (minutes !== lastMinute) {
            lastMinute = minutes;
            if (isVoiceEnabled) {
                speak(`It is ${hours} ${minutes}`);
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = 'bold 50px "Times New Roman"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Alegem culoarea în functie de tema
        if (currentTheme === 'theme-light') {
            ctx.fillStyle = '#111';
        } else {
            ctx.fillStyle = '#fff';
        }

        const timeString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        ctx.fillText(timeString, canvas.width / 2, canvas.height / 2);
    }

    
    // Setam ceasul sa se actualizeze la fiecare secunda
    setInterval(drawClock, 1000);
    drawClock();

    // Butoanele de tema
    document.getElementById('btn-dark').onclick = () => switchTheme('theme-dark');
    document.getElementById('btn-light').onclick = () => switchTheme('theme-light');
    document.getElementById('btn-rainbow').onclick = () => switchTheme('theme-rainbow');

    // Butonul de voce
    const btnVoice = document.getElementById('btn-voice');
    btnVoice.onclick = () => {
        isVoiceEnabled = !isVoiceEnabled;
        
        if (isVoiceEnabled) {
            btnVoice.textContent = "🔊 Voice ON";
            btnVoice.className = "voice-on";
            speak("Voice activated");
        } else {
            btnVoice.textContent = "🔇 Enable Voice";
            btnVoice.className = "voice-off";
        }
    };
});