import { useState } from 'react';
import ModeSelector from './components/ModeSelector';
import UIMode from './components/UIMode';
import TerminalMode from './components/TerminalMode';
import './App.css';

function App() {
  const [mode, setMode] = useState(null); // null, 'ui', or 'terminal'

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleSwitchMode = () => {
    if (mode === 'ui') {
      setMode('terminal');
    } else if (mode === 'terminal') {
      setMode('ui');
    }
  };

  return (
    <div className="app">
      {mode === null && <ModeSelector onModeSelect={handleModeSelect} />}
      {mode === 'ui' && <UIMode onSwitchMode={handleSwitchMode} />}
      {mode === 'terminal' && <TerminalMode onSwitchMode={handleSwitchMode} />}
    </div>
  );
}

export default App;
