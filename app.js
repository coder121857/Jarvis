const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.volume = 1;
    textSpeak.pitch = 1;
    window.speechSynthesis.speak(textSpeak);
}

function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});

function calculate(expression) {
    try {
        const result = math.evaluate(expression);
        speak(`The result is ${result}`);
    } catch (error) {
        speak("Sorry, I couldn't calculate that. Please provide a valid expression.");
    }
}

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes("open instagram")) {
        window.open("https://www.instagram.com", "_blank");
        speak("Opening Instagram...");
    } 
    else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } 
    else if (message.includes("open chat gpt")) {
        window.open("https://chatgpt.com", "_blank");
        speak("Opening CHATGPT...");
    }
    else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(message.replace("wikipedia", "").trim())}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak(time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleDateString();
        speak(date);
    } else if (message.includes('calculator')) {
        speak("What calculation would you like to perform?");
        recognition.start(); // Listen for the calculation command
    } else if (message.includes('calculate')) {
        const expression = message.replace('calculate', '').trim();
        if (expression) {
            calculate(expression);
        } else {
            speak("I didn't catch that. What would you like to calculate?");
        }
    } else {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        speak("I found some information for " + message + " on Google.");
    }
}
