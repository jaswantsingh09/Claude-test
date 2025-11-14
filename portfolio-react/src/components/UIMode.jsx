import { useState, useEffect, useRef } from 'react';
import './UIMode.css';

const UIMode = ({ onSwitchMode }) => {
  const [activeSection, setActiveSection] = useState('home');
  const canvasRef = useRef(null);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const charSize = 14;
    const columns = canvas.width / charSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#3fb950';
      ctx.font = `${charSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * charSize, drops[i] * charSize);

        if (drops[i] * charSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ui-mode">
      {/* Background Effects */}
      <div className="background-effects">
        <canvas ref={canvasRef} id="matrix-bg"></canvas>
        <div className="grid-overlay"></div>
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>

      {/* Header */}
      <header className="terminal-header">
        <div className="terminal-controls">
          <span className="control-btn close"></span>
          <span className="control-btn minimize"></span>
          <span className="control-btn maximize"></span>
        </div>
        <div className="terminal-title">jaswant@intelligaia: ~/portfolio</div>
        <nav className="terminal-nav">
          <a href="#home" className={`terminal-tab ${activeSection === 'home' ? 'active' : ''}`}>~/home</a>
          <a href="#about" className={`terminal-tab ${activeSection === 'about' ? 'active' : ''}`}>cat README.md</a>
          <a href="#skills" className={`terminal-tab ${activeSection === 'skills' ? 'active' : ''}`}>git branch</a>
          <a href="#projects" className={`terminal-tab ${activeSection === 'projects' ? 'active' : ''}`}>git log</a>
          <a href="#contact" className={`terminal-tab ${activeSection === 'contact' ? 'active' : ''}`}>git remote</a>
        </nav>
      </header>

      {/* Mode Switch Button */}
      <button className="mode-switch-btn" onClick={onSwitchMode}>
        <i className="fas fa-terminal"></i> Switch to Terminal Mode
      </button>

      {/* Hero Section */}
      <section id="home" className="hero terminal-section">
        <div className="container">
          <div className="terminal-window glow-effect">
            <div className="terminal-header-bar">
              <div className="header-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="header-title">bash — jaswant@intelligaia</div>
            </div>
            <div className="terminal-body">
              <div className="command-line">
                <span className="prompt">jaswant@intelligaia</span>
                <span className="path">~</span>
                <span className="dollar">$</span>
                <span className="command">cat intro.txt</span>
              </div>
              <div className="output">
                <pre className="ascii-art">
{`    _                              _     ____  _             _
   | | __ _ _____      ____ _ _ __ | |_  / ___|(_)_ __   __ _| |__
_  | |/ _\` / __\\ \\ /\\ / / _\` | '_ \\| __| \\___ \\| | '_ \\ / _\` | '_ \\
| |_| | (_| \\__ \\\\ V  V / (_| | | | | |_   ___) | | | | | (_| | | | |
\\___/ \\__,_|___/ \\_/\\_/ \\__,_|_| |_|\\__| |____/|_|_| |_|\\__, |_| |_|
                                                          |___/`}
                </pre>
                <div className="typing-output">
                  <p className="role"><span className="git-green">▶</span> Sr. Software Engineer @ Intelligaia</p>
                  <p className="role"><span className="git-green">▶</span> GenAI & Full Stack Specialist</p>
                  <p className="role"><span className="git-green">▶</span> Cloud Architecture Expert</p>
                </div>
              </div>

              <div className="command-line">
                <span className="prompt">jaswant@intelligaia</span>
                <span className="path">~</span>
                <span className="dollar">$</span>
                <span className="command">echo $EXPERTISE</span>
              </div>
              <div className="output">
                <p><span className="git-gray"># GenAI | RAGs | Agentic AI | LLMs</span></p>
                <p><span className="git-gray"># MERN Stack | Flutter | AWS | GCP</span></p>
                <p><span className="git-gray"># Building intelligent, scalable solutions</span></p>
              </div>

              <div className="cta-buttons">
                <a href="#projects" className="git-btn primary">
                  <i className="fas fa-code-branch"></i> View Projects
                </a>
                <a href="#contact" className="git-btn secondary">
                  <i className="fas fa-envelope"></i> Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about terminal-section">
        <div className="container">
          <div className="section-header">
            <h2 className="terminal-section-title">
              <span className="prompt">$</span> cat README.md
            </h2>
          </div>

          <div className="terminal-window glow-effect">
            <div className="terminal-header-bar">
              <div className="header-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="header-title">README.md</div>
            </div>
            <div className="terminal-body">
              <div className="readme-content">
                <h3 className="git-header"># About Me</h3>
                <p className="readme-text">
                  I'm a <span className="git-blue">Senior Software Engineer</span> at Intelligaia with a passion for building
                  cutting-edge solutions using <span className="git-green">GenAI</span>, <span className="git-green">RAGs</span>, and
                  <span className="git-green"> Agentic AI systems</span>.
                </p>
                <p className="readme-text">
                  My expertise spans across the full technology stack, from designing robust cloud architectures
                  to crafting seamless user experiences. I specialize in transforming complex challenges into
                  elegant, scalable solutions that drive real business impact.
                </p>

                <h3 className="git-header">## Core Values</h3>
                <div className="values-grid">
                  <div className="value-card">
                    <div className="value-icon">🚀</div>
                    <h4>Innovation</h4>
                    <p>Pushing boundaries with GenAI and cutting-edge tech</p>
                  </div>
                  <div className="value-card">
                    <div className="value-icon">⚡</div>
                    <h4>Performance</h4>
                    <p>65% speed improvements through optimization</p>
                  </div>
                  <div className="value-card">
                    <div className="value-icon">💡</div>
                    <h4>Impact</h4>
                    <p>$100K+ cost savings via intelligent automation</p>
                  </div>
                  <div className="value-card">
                    <div className="value-icon">🎯</div>
                    <h4>Excellence</h4>
                    <p>Clean code, best practices, continuous learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills terminal-section">
        <div className="container">
          <div className="section-header">
            <h2 className="terminal-section-title">
              <span className="prompt">$</span> git branch --list
            </h2>
          </div>

          <div className="terminal-window glow-effect">
            <div className="terminal-header-bar">
              <div className="header-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="header-title">branches</div>
            </div>
            <div className="terminal-body">
              <div className="skills-grid">
                <SkillBranch name="GenAI & LLMs" active />
                <SkillBranch name="RAGs" />
                <SkillBranch name="Agentic AI" />
                <SkillBranch name="React.js" />
                <SkillBranch name="Node.js" />
                <SkillBranch name="Flutter" />
                <SkillBranch name="Python" />
                <SkillBranch name="AWS" />
                <SkillBranch name="GCP" />
                <SkillBranch name="Docker" />
                <SkillBranch name="MongoDB" />
                <SkillBranch name="PostgreSQL" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects terminal-section">
        <div className="container">
          <div className="section-header">
            <h2 className="terminal-section-title">
              <span className="prompt">$</span> git log --oneline
            </h2>
          </div>

          <div className="projects-grid">
            <ProjectCard
              hash="a7f32bc"
              title="GenAI RAG System"
              description="Built intelligent document retrieval system using LangChain and vector databases"
              impact="100K+"
              impactDesc="cost savings"
              files={{ added: 45, modified: 12, deleted: 3 }}
              tech={['Python', 'LangChain', 'Pinecone', 'OpenAI']}
            />
            <ProjectCard
              hash="3e9d421"
              title="Agentic AI Platform"
              description="Multi-agent system for automated workflow orchestration"
              impact="3 FTE"
              impactDesc="reduction"
              files={{ added: 67, modified: 23, deleted: 8 }}
              tech={['Python', 'CrewAI', 'FastAPI', 'Redis']}
            />
            <ProjectCard
              hash="f8c5a9e"
              title="E-commerce Platform"
              description="Full-stack MERN application with real-time features"
              impact="65%"
              impactDesc="performance boost"
              files={{ added: 89, modified: 34, deleted: 12 }}
              tech={['React', 'Node.js', 'MongoDB', 'Socket.io']}
            />
            <ProjectCard
              hash="b4e7d33"
              title="Mobile Health App"
              description="Cross-platform Flutter app for healthcare management"
              impact="10K+"
              impactDesc="active users"
              files={{ added: 124, modified: 45, deleted: 18 }}
              tech={['Flutter', 'Firebase', 'Node.js', 'MongoDB']}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact terminal-section">
        <div className="container">
          <div className="section-header">
            <h2 className="terminal-section-title">
              <span className="prompt">$</span> git remote -v
            </h2>
          </div>

          <div className="terminal-window glow-effect">
            <div className="terminal-header-bar">
              <div className="header-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="header-title">remotes</div>
            </div>
            <div className="terminal-body">
              <div className="remotes-list">
                <RemoteLink icon="fab fa-linkedin" name="linkedin" url="https://linkedin.com/in/jaswant-singh009" />
                <RemoteLink icon="fab fa-github" name="github" url="https://github.com/jaswantsingh009" />
                <RemoteLink icon="fas fa-envelope" name="email" url="mailto:jaswant@intelligaia.com" />
                <RemoteLink icon="fab fa-twitter" name="twitter" url="https://twitter.com/jaswantsingh" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Skill Branch Component
const SkillBranch = ({ name, active }) => (
  <div className="branch-item">
    <span className="branch-icon">{active ? '* ' : '  '}</span>
    <span className={`branch-name ${active ? 'active' : ''}`}>{name}</span>
  </div>
);

// Project Card Component
const ProjectCard = ({ hash, title, description, impact, impactDesc, files, tech }) => (
  <div className="project-card terminal-window glow-effect">
    <div className="project-header">
      <span className="commit-hash">{hash}</span>
      <span className="branch-tag">main</span>
    </div>
    <h3 className="project-title">{title}</h3>
    <p className="project-description">{description}</p>
    <div className="impact-badge">
      <span className="impact-value">{impact}</span>
      <span className="impact-label">{impactDesc}</span>
    </div>
    <div className="file-changes">
      <span className="additions">+{files.added}</span>
      <span className="modifications">~{files.modified}</span>
      <span className="deletions">-{files.deleted}</span>
    </div>
    <div className="tech-stack">
      {tech.map((t, i) => (
        <span key={i} className="tech-badge">{t}</span>
      ))}
    </div>
  </div>
);

// Remote Link Component
const RemoteLink = ({ icon, name, url }) => (
  <a href={url} className="remote-link" target="_blank" rel="noopener noreferrer">
    <span className="remote-icon">
      <i className={icon}></i>
    </span>
    <span className="remote-name">{name}</span>
    <span className="remote-url">{url}</span>
  </a>
);

export default UIMode;
