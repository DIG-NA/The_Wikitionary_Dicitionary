const content = document.getElementById("content");

document.getElementById("btn").addEventListener("click", async () => {
  const word = document.getElementById("input").value.trim();
  if (!word) return;

  const htmlString = await tryfun(word);
  parsing(htmlString);

  content.scrollTop = 0;
});


document.getElementById("input").addEventListener("keydown", async (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    e.stopPropagation();

    const input = document.getElementById("input");
    const word = input.value.trim();
    if (!word) return;

    const htmlString = await tryfun(word);
    parsing(htmlString);

    content.scrollTop = 0;
  }
})

function parsing(htmlString) {
  const Parser = new DOMParser();

  // Parse the HTML safely
  const doc = Parser.parseFromString(htmlString, 'text/html');

  content.replaceChildren();
  for (const node of doc.body.childNodes) {
    content.appendChild(node.cloneNode(true)); // safe clone
  }
}

document.getElementById("audiobtn").addEventListener("click", () => {
  try {
    browser.runtime.sendMessage({
      action: "playTTS",
      text: input.value,
      language: "en"
    });
  } catch (error) {
    console.log(error);
  }
})

addRippleEffect(document.getElementById("audiobtn"));
addRippleEffect(document.getElementById("btn"));