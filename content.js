// Create the floating "Translate" button
const button = document.createElement('button');
Object.assign(button.style, {
  position: 'absolute',
  display: 'none',
  zIndex: 9999,
  padding: '8px 8px',
  borderRadius: '8px',
  fontSize: '12.5px',
  cursor: 'pointer',
  color: '#f5f5f5',
  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  background: 'linear-gradient(145deg, #111, #1c1c1c)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  transform: "translateX(-50%)",
});

const svg = `
<svg viewBox="0 0 24 24" width="18" height="18"
     fill="none" stroke="currentColor" stroke-width="2"
     xmlns="http://www.w3.org/2000/svg">
  <circle cx="11" cy="11" r="7"/>
  <line x1="16" y1="16" x2="22" y2="22"/>
</svg>
`;

const Parser = new DOMParser();
const doc = Parser.parseFromString(svg, "image/svg+xml");

button.appendChild(doc.documentElement);
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
  borderRadius: '8px',
  background: 'linear-gradient(145deg, #111, #1c1c1c)',
  border: '1px solid rgba(255, 255, 255, 1)',
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
  background: "linear-gradient(145deg, #111, #1c1c1c)",
  color: "white",
  flex: "1",
  boxSizing: 'border-box',
});

form.appendChild(input);
search.appendChild(form);

input.addEventListener("keydown", async (e) => {

  if (e.key === 'Enter') {
    // e.preventDefault();
    // e.stopPropagation();
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
  boxSizing: 'border-box',
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
smollbutton.textContent = "↵";

smollbutton.addEventListener("click", async () => {
  const htmlString = await tryfun(input.value);
  parsingsafely(htmlString);
  // console.log("smoll button pressed");
});


// Create the audio button
const audiobtn = document.createElement("button");
Object.assign(audiobtn.style, {
  padding: "6px 10px",
  borderRadius: "6px",
  background: "linear-gradient(145deg, #111, #1c1c1c)",
  border: "1px solid rgba(255,255,255,0.15)",
  color: "#f5f5f5",
  cursor: "pointer",
  fontSize: "14px",
  flexShrink: "0"
});
audiobtn.textContent = "▶︎ •၊၊||၊|။";

audiobtn.addEventListener("click", async () => {
  try {
    browser.runtime.sendMessage({
      action: "playTTS",
      text: input.value,
      language: "en"
    });
  } catch (error) {
    console.log(error);
  }
});


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

addRippleEffect(button);
addRippleEffect(audiobtn);
addRippleEffect(smollbutton);

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

button.addEventListener('mousedown', async (e) => {
  const selectedText = window.getSelection();
  if (!selectedText) return;
  // console.log(selectedText.toString().trim());

  const htmlString = await tryfun(selectedText.toString().trim());
  parsingsafely(htmlString);

  // position near the selected text
  const range = selectedText.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
  popup.style.left = `${rect.right + window.scrollX + 5}px`;

  popup.style.display = 'flex';
  button.style.display = 'none';
  container.scrollTop = 0;

  input.value=selectedText;
});

async function parsingsafely(htmlString) {

  // Parse the HTML safely
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  container.replaceChildren();
  for (const node of doc.body.childNodes) {
    container.appendChild(node.cloneNode(true)); // safe clone
  }

  wrapper.replaceChildren(search, smollbutton, audiobtn);
  popup.replaceChildren(wrapper, container);
  shadow.appendChild(popup);

  popup.style.display = 'flex';

  container.scrollTop = 0;

}