import { useState } from 'react';
import './ModeSelector.css';

const ModeSelector = ({ onModeSelect }) => {
  const [hoveredMode, setHoveredMode] = useState(null);

  return (
    <div className="mode-selector-container">
      <div className="mode-selector-content">
        <div className="mode-selector-header">
          <pre className="ascii-logo">
{`
   ██╗ █████╗ ███████╗██╗    ██╗ █████╗ ███╗   ██╗████████╗
   ██║██╔══██╗██╔════╝██║    ██║██╔══██╗████╗  ██║╚══██╔══╝
   ██║███████║███████╗██║ █╗ ██║███████║██╔██╗ ██║   ██║
██ ██║██╔══██║╚════██║██║███╗██║██╔══██║██║╚██╗██║   ██║
╚█████║██║  ██║███████║╚███╔███╔╝██║  ██║██║ ╚████║   ██║
 ╚════╝╚═╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝
`}
          </pre>
          <h1 className="mode-selector-title">Jaswant Singh</h1>
          <p className="mode-selector-subtitle">Sr. Software Engineer @ Intelligaia</p>
          <p className="mode-selector-description">
            Choose your preferred experience mode
          </p>
        </div>

        <div className="mode-options">
          <div
            className={`mode-card ${hoveredMode === 'ui' ? 'hovered' : ''}`}
            onClick={() => onModeSelect('ui')}
            onMouseEnter={() => setHoveredMode('ui')}
            onMouseLeave={() => setHoveredMode(null)}
          >
            <div className="mode-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h2 className="mode-title">UI Mode</h2>
            <p className="mode-description">
              Visual portfolio with beautiful design, animations, and interactive elements
            </p>
            <ul className="mode-features">
              <li>✨ Beautiful visual design</li>
              <li>🎨 Smooth animations</li>
              <li>📱 Responsive layout</li>
              <li>🎯 Easy navigation</li>
            </ul>
            <div className="mode-hint">Click to enter</div>
          </div>

          <div
            className={`mode-card ${hoveredMode === 'terminal' ? 'hovered' : ''}`}
            onClick={() => onModeSelect('terminal')}
            onMouseEnter={() => setHoveredMode('terminal')}
            onMouseLeave={() => setHoveredMode(null)}
          >
            <div className="mode-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
            </div>
            <h2 className="mode-title">Terminal Mode</h2>
            <p className="mode-description">
              Full terminal experience with git commands and interactive CLI
            </p>
            <ul className="mode-features">
              <li>💻 Full terminal interface</li>
              <li>⚡ Git command support</li>
              <li>🔍 Tab autocomplete</li>
              <li>📝 Command history</li>
            </ul>
            <div className="mode-hint">Click to enter</div>
          </div>
        </div>

        <div className="mode-selector-footer">
          <p className="mode-footer-text">
            <span className="prompt">$</span> You can switch modes anytime
          </p>
        </div>
      </div>

      {/* Background effects */}
      <div className="mode-bg-grid"></div>
      <div className="mode-bg-orb mode-bg-orb-1"></div>
      <div className="mode-bg-orb mode-bg-orb-2"></div>
    </div>
  );
};

export default ModeSelector;
