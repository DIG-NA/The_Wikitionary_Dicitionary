

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
