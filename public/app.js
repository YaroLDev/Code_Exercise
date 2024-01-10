document.getElementById('start-record-btn').addEventListener('click', startRecording);
document.getElementById('stop-record-btn').addEventListener('click', stopRecording);
document.getElementById('send-btn').addEventListener('click', sendMessage);

let recognition;
let isRecording = false;

function startRecording() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function() {
        isRecording = true;
        document.getElementById('start-record-btn').disabled = true;
        document.getElementById('stop-record-btn').disabled = false;
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('text').value = transcript;
    };

    recognition.onend = function() {
        if (isRecording) {
            recognition.start();
        }
    };

    recognition.start();
}

function stopRecording() {
    isRecording = false;
    recognition.stop();
    document.getElementById('start-record-btn').disabled = false;
    document.getElementById('stop-record-btn').disabled = true;
}

function sendMessage() {
    const message = document.getElementById('text').value;
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML += `<p>${message}</p>`;
    document.getElementById('text').value = '';
}