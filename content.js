// Create the floating "Translate" button
const button = document.createElement('button');
button.textContent = ' 🔍 | WD!';
Object.assign(button.style, {
  position: 'absolute',
  display: 'none',
  zIndex: 9999,
  padding: '10px 10px',
  borderRadius: '6px',
  fontSize: '12.5px',
  cursor: 'pointer',
  color: '#f5f5f5',
  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  background: 'linear-gradient(145deg, #111, #1c1c1c)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  transform: "translateX(-50%)",
});

document.body.appendChild(button);

// Create the floating translation window
const popup = document.createElement('div');
Object.assign(popup.style, {
  position: 'absolute',
  display: 'none',
  zIndex: 10000,
  width: '500px',
  maxHeight: '400px',
  padding: '18px 22px',
  borderRadius: '14px',
  background: 'linear-gradient(145deg, #111, #1c1c1c)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  transition: 'opacity 0.25s ease, transform 0.25s ease',
  flexDirection: 'column',
  boxSizing: 'border-box',
});
document.body.appendChild(popup);

// shadow-dom
const host = document.createElement('div');
document.body.appendChild(host);
const shadow = host.attachShadow({ mode: 'open' });

// Listen for text selection
document.addEventListener('mouseup', (e) => {
  if (popup.contains(e.target) || button.contains(e.target) || host.contains(e.target)) return;

  const selection = window.getSelection();
  if (!selection.isCollapsed) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    button.style.top = `${rect.top + window.scrollY - 40}px`;
    // button.style.left = `${rect.right + window.scrollX}px`;
    button.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
    shadow.appendChild(button);
    button.style.display = 'block';
    popup.style.display = 'none'; // Hide popup when reselecting
  } else {
    button.style.display = 'none';
    popup.style.display = 'none';
  }
});

// Create the search container
const search = document.createElement('search');

const form = document.createElement('div');
form.style.margin = "0"; // avoid default browser margin

const input = document.createElement('input');
Object.assign(input.style, {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "#1a1a1a",
  color: "white",
  flex: "1",
  boxSizing: 'border-box',
});

form.appendChild(input);
search.appendChild(form);

input.addEventListener("keydown",async (e)=> {
  e.preventDefault;
  e.stopPropagation;
  if (e.key==='Enter') {
    const htmlString = await tryfun(input.value);
  parsingsafely(htmlString);
  }
});

// Create a wrapper that holds search + small button horizontally
const wrapper = document.createElement("div");
Object.assign(wrapper.style, {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
  width: "100%",
  marginBottom: "15px",
  boxSizing:'border-box',
});

// Create the small button
const smollbutton = document.createElement("button");
Object.assign(smollbutton.style, {
  padding: "6px 10px",
  borderRadius: "6px",
  background: "linear-gradient(145deg, #111, #1c1c1c)",
  border: "1px solid rgba(255,255,255,0.15)",
  color: "#f5f5f5",
  cursor: "pointer",
  fontSize: "14px",
  flexShrink: "0"
});
smollbutton.textContent = ">";

smollbutton.addEventListener("click", async () => {
  const htmlString = await tryfun(input.value);
  parsingsafely(htmlString);
  console.log("smoll button pressed");
});

const container = document.createElement('div');
Object.assign(container.style, {
  color: '#f5f5f5',
  fontFamily: `'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
  fontSize: '14px',
  lineHeight: '1.3',
  overflowY: 'auto', // allows vertical scrolling
  overflowX: 'hidden', // avoid horizontal overflow
  scrollbarWidth: 'thin',
  scrollbarColor: '#888 #1c1c1c',
  flex: '1 1 auto', // grow/shrink to fill remaining popup height
  minHeight: '0', // CRUCIAL for flex children to be scrollable
  boxSizing: 'border-box',
});

// When button is clicked → show translation popup
button.addEventListener('click', async () => {
  const selectedText = window.getSelection().toString().trim();
  if (!selectedText) return;

  const htmlString = await tryfun(selectedText);
  parsingsafely(htmlString);

  // position near the selected text
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
  popup.style.left = `${rect.right + window.scrollX + 5}px`;
 
  popup.style.display = 'flex';
  button.style.display = 'none';
  container.scrollTop = 0;
});


async function parsingsafely(htmlString) {

  // Parse the HTML safely
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  container.replaceChildren();
  for (const node of doc.body.childNodes) {
    container.appendChild(node.cloneNode(true)); // safe clone
  }

  wrapper.replaceChildren(search, smollbutton);
  popup.replaceChildren(wrapper, container);
  shadow.appendChild(popup);
}

// function debugShowPopup(reason, popup) {
//     console.log("%c[POPUP SHOWN] " + reason, "color: lime; font-weight: bold;");
//     console.log("popup.innerHTML:", popup.innerHTML);
// }


new MutationObserver(() => {
    if (popup.style.display === "block") {
        debugShowPopup("MutationObserver detected visibility change", popup);
    }
}).observe(popup, { attributes: true, attributeFilter: ['style'] });
