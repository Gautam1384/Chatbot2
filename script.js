let btn = document.querySelector(".microphone-button");
let recognition;
let isMicrophoneOn = false;

// Initialize Speech Recognition
const initializeRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            console.log("Speech recognition started...");
        };

        recognition.onresult = (e) => {
            if (e.results.length > 0) {
                let spokenText = e.results[0][0].transcript.toLowerCase().trim();
                console.log("Recognized Text:", spokenText);
                handleCommands(spokenText);
            }
        };

        recognition.onerror = (err) => {
            console.error("Speech Recognition Error:", err.error);
            if (err.error === "no-speech") {
                speakFunc("I couldn't hear you clearly. Please try again.");
            }
        };

        recognition.onend = () => {
            if (isMicrophoneOn) {
                console.log("Microphone is on. Restarting recognition...");
                recognition.start(); // Restart recognition automatically if mic is on
            } else {
                console.log("Microphone is off.");
            }
        };
    } else {
        alert("Your browser does not support voice input!");
    }
};

// Speak Function
const speakFunc = (input) => {
    let speakInput = new SpeechSynthesisUtterance(input);
    speakInput.rate = 1.2;
    speakInput.lang = 'en-HI';
    speakInput.volume = 1;
    window.speechSynthesis.speak(speakInput);
    console.log("Bot Response:", input);
};

// Greeting Function
const greetingFunc = () => {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 0 && hour < 12) {
        return "Good Morning Sir!";
    } else if (hour >= 12 && hour < 16) {
        return "Good Afternoon Sir!";
    } else {
        return "Good Evening Sir!";
    }
};

// Handle User Commands
const handleCommands = (command) => {
    console.log("Processing Command:", command);

    const greetings = ["hi", "hello", "hey"];
   for(let greet of greetings){
    if(command.includes(greet)){
        let greeting=greetingFunc();
        speakFunc(`Hello! ${greeting} How can I help you?`);
        return;
    }
};
console.log("Unrecognized command:",command);
}
// Start Voice Input
const startVoiceInput = () => {
    if (recognition) {
        recognition.start();
    } else {
        console.error("Speech Recognition not initialized.");
    }
};

// Stop Voice Input
const stopVoiceInput = () => {
    if (recognition) {
        recognition.stop();
        console.log("Speech recognition stopped.");
    }
};

// Button Event Listeners
btn.onmousedown = () => {
    if (!isMicrophoneOn) {
        isMicrophoneOn = true;
        btn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i>';
        speakFunc("Microphone is now on. You can speak.");
        startVoiceInput();
    }
};

btn.onmouseup = () => {
    if (isMicrophoneOn) {
        isMicrophoneOn = false;
        btn.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
        speakFunc("Microphone is now off.");
        stopVoiceInput();
    }
};

// Initialize Speech Recognition on Page Load
window.onload = () => {
    initializeRecognition();
};