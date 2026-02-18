browser.runtime.onMessage.addListener((request) => {
  if (request.action === "playTTS") {
    play3(request.text, request.language);
    return true;
  }
});

// background.js
async function play3(text, language) {
  return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const audio = new Audio(reader.result); // base64 dataURL
        audio.play();
        resolve();
      };
      reader.onerror = reject;
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = reject;
    xhr.open("GET", `https://translate.google.com/translate_tts?ie=UTF-8&tl=${language}&client=dict-chrome-ex&ttsspeed=0.5&q=${encodeURIComponent(text)}`);
    xhr.responseType = "blob";
    xhr.send();
  });
}