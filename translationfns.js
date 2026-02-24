

async function tryfun(selectedText) {

  // first try calling wikifn using lowercase text
  let result = await WikitionaryHtmlFn(selectedText.toLowerCase());

  // if it doesn't work try the first letter capitalized text
  if (result == "undefined") {
    const textUpperCase = selectedText.charAt(0).toUpperCase() + selectedText.slice(1);
    result = await WikitionaryHtmlFn(textUpperCase);

    if (result == "undefined") {
      result = "no such entry in Wikitionary.";
    }
  }

  // console.log(result);
  return result;
}


// HTML fun
async function WikitionaryHtmlFn(text) {

  const link = `https://en.wiktionary.org/w/api.php?action=query&format=json&prop=extracts&titles=${text}`;
  try {
    const response = await fetch(link, { redirect: "follow" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    // return data["query"]["pages"] || "no avalible data"
    const extract = findValueByKey(data, "extract");

    // console.log(extract);

    // input.value = findValueByKey(data,"title") ;

    // console.log(data);
    const parser = new DOMParser();
    const doc = parser.parseFromString(extract, 'text/html');
    const container = document.createElement('div');

    // basicaly the error happens in the next line 
    // because some parts of the wikitionary provided html is broken, not full
    // container.innerHTML = doc.body.innerHTML;
    // that's why the below line is the best implementaion to the malformed html
    for (const node of doc.body.childNodes) {
      container.appendChild(node.cloneNode(true));
    }

     // Hide empty elements with CSS
  const style = document.createElement('style');
  style.textContent = `
    li:empty, dd:empty, dl:empty, p:empty, div:empty { display: none; }
    ul:empty, ol:empty { display: none; }
  `;
  container.appendChild(style);

    // cleaning(container);
    return container.innerHTML;

  } catch (error) {

    console.error("translation failed:", error);
    return "an extension error occured ";
  }
}

function cleaning(container) {

  // removing pronunciation list
  const removepronunciationlist = container.querySelector('h3[data-mw-anchor="Pronunciation"] + ul');
  if (removepronunciationlist) removepronunciationlist.remove();

  // removing pronunciation 
  const removepronunciation = container.querySelector('h3[data-mw-anchor="Pronunciation"]');
  if (removepronunciation) removepronunciation.remove();
}

function findValueByKey(obj, keyToFind) {
  if (obj.hasOwnProperty(keyToFind)) {
    return obj[keyToFind];
  }

  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "object" && value !== null) {
      const result = findValueByKey(value, keyToFind);
      if (result !== undefined) return result;
    }
  }
}



function addRippleEffect(button) {
  button.addEventListener('click', function(e) {
    // Create ripple element
    const ripple = document.createElement('span');
    
    // Get click position relative to button
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Style the ripple
    Object.assign(ripple.style, {
      position: 'absolute',
      left: x + 'px',
      top: y + 'px',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: 'rgb(255, 255, 255)',
      transform: 'translate(-50%, -50%) scale(0)',
      pointerEvents: 'none',
      transition: 'transform 0.6s ease-out, opacity 0.6s ease-out'
    });
    
    // Make button relatively positioned
    if (getComputedStyle(this).position === 'static') {
      this.style.position = 'relative';
    }
    this.style.overflow = 'hidden';
    
    // Add to button
    this.appendChild(ripple);
    
    // Trigger animation
    requestAnimationFrame(() => {
      ripple.style.transform = 'translate(-50%, -50%) scale(15)';
      ripple.style.opacity = '0';
    });
    
    // Remove after animation
    setTimeout(() => ripple.remove(), 600);
  });
}