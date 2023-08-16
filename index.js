const voiceSelector = document.getElementById('voiceSelector');
const textInput = document.getElementById('textInput');
const speakButton = document.getElementById('speakButton');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const cancelButton = document.getElementById('cancelButton');

// Initialize speech synthesis
const synth = window.speechSynthesis;

function populateVoiceList() {
    const voices = synth.getVoices();
    voiceSelector.innerHTML = '';

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelector.appendChild(option);
    });
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

speakButton.addEventListener('click', () => {
    const selectedVoice = voiceSelector.selectedOptions[0].getAttribute('data-name');
    const selectedLang = voiceSelector.selectedOptions[0].getAttribute('data-lang');
    const textToSpeak = textInput.value;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    utterance.voice = synth.getVoices().find(voice => voice.name === selectedVoice && voice.lang === selectedLang);
    synth.speak(utterance);
});

pauseButton.addEventListener('click', () => {
    synth.pause();
});

resumeButton.addEventListener('click', () => {
    synth.resume();
});

cancelButton.addEventListener('click', () => {
    synth.cancel();
});
