import { useState } from "react";

function App() {
  const [color, setColor] = useState("#ffffff");

  const changeColor = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    if (!tab || !tab.id) return;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
      }
    });
  };

  return (
    <div>
      <input 
        type="color" 
        value={color} 
        onChange={(e) => setColor(e.target.value)} 
      />
      <button 
        className='h-20px w-45px rounded-md' 
        onClick={changeColor}
      >
        Click Me
      </button>
    </div>
  );
}

export default App;