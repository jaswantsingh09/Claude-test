import { useState, useEffect } from 'react';
import ModeSelector from './components/ModeSelector';
import UIMode from './components/UIMode';
import TerminalMode from './components/TerminalMode';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [mode, setMode] = useState(null); // null, 'ui', or 'terminal'
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'dark'
    return localStorage.getItem('theme') || 'dark';
  });

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

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

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app">
      <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
      {mode === null && <ModeSelector onModeSelect={handleModeSelect} theme={theme} />}
      {mode === 'ui' && <UIMode onSwitchMode={handleSwitchMode} theme={theme} />}
      {mode === 'terminal' && <TerminalMode onSwitchMode={handleSwitchMode} theme={theme} />}
    </div>
  );
}

export default App;
