import { useState, useEffect, useRef } from 'react';
import { blogStorage } from '../utils/blogStorage';
import './TerminalMode.css';

const TerminalMode = ({ onSwitchMode }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const commands = {
    'help': { desc: 'Show available commands' },
    'clear': { desc: 'Clear terminal' },
    'whoami': { desc: 'Show developer info' },
    'pwd': { desc: 'Print working directory' },
    'ls': { desc: 'List projects' },
    'ls blogs': { desc: 'List all blog posts' },
    'git log': { desc: 'Show work history' },
    'git status': { desc: 'Show current status' },
    'git branch': { desc: 'List skill branches' },
    'git remote': { desc: 'Show social links' },
    'git config --list': { desc: 'Show configuration' },
    'git diff': { desc: 'Show impact metrics' },
    'git show --stat': { desc: 'Show detailed stats' },
    'cat skills.txt': { desc: 'Display skills' },
    'cat achievements.txt': { desc: 'Display achievements' },
    'cat blogs': { desc: 'List all blogs with details' },
    'echo $ROLE': { desc: 'Print role variable' },
    'echo $EXPERTISE': { desc: 'Print expertise variable' },
    'skills': { desc: 'Quick alias for cat skills.txt' },
    'achievements': { desc: 'Quick alias for achievements' },
    'blogs': { desc: 'Quick alias for cat blogs' },
    'contact': { desc: 'Show contact information' },
    'sudo make me a sandwich': { desc: 'Easter egg' },
  };

  useEffect(() => {
    const welcome = {
      type: 'welcome',
      content: `
╔══════════════════════════════════════════════════════════════╗
║  Welcome to Jaswant Singh's Interactive Portfolio Terminal  ║
║  Type 'help' to see available commands                      ║
║  Type 'git log' to see work history                         ║
║  Press TAB for autocomplete, ↑↓ for command history         ║
╚══════════════════════════════════════════════════════════════╝
      `
    };
    setOutput([welcome]);
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const addOutput = (content, type = 'info') => {
    setOutput(prev => [...prev, { type, content }]);
  };

  const executeCommand = (cmd) => {
    // Echo command
    addOutput(`jaswant@intelligaia:~$ ${cmd}`, 'echo');

    const normalizedCmd = cmd.toLowerCase().trim();

    switch (normalizedCmd) {
      case 'clear':
        setOutput([]);
        break;

      case 'help':
        const helpText = Object.entries(commands)
          .map(([cmd, info]) => `  <span class="cmd-name">${cmd.padEnd(25)}</span><span class="cmd-desc">— ${info.desc}</span>`)
          .join('\n');
        addOutput(`<div class="help-output">Available commands:\n\n${helpText}\n\nTip: Press TAB for autocomplete, ↑↓ for history</div>`);
        break;

      case 'whoami':
        addOutput(`<div class="output-info">
╔══════════════════════════════════════════════════════════════╗
║                    DEVELOPER PROFILE                         ║
╚══════════════════════════════════════════════════════════════╝

<span class="output-success">Name:</span>     Jaswant Singh
<span class="output-success">Role:</span>     Sr. Software Engineer
<span class="output-success">Company:</span>  Intelligaia
<span class="output-success">Location:</span> India

<span class="output-success">Specializations:</span>
  • GenAI & Large Language Models (LLMs)
  • Retrieval-Augmented Generation (RAGs)
  • Agentic AI Systems
  • Full Stack Development (MERN)
  • Mobile Development (Flutter)
  • Cloud Architecture (AWS, GCP)

<span class="output-warning">Fun Fact:</span> Saved clients $100K+ through AI automation! 🤖💰
</div>`);
        break;

      case 'pwd':
        addOutput('<span class="output-success">/home/jaswant/portfolio/sr-software-engineer</span>');
        break;

      case 'ls':
        addOutput(`<div class="output-info">
<span class="dir">📁 genai-rag-system/</span>
<span class="dir">📁 agentic-ai-platform/</span>
<span class="dir">📁 ecommerce-platform/</span>
<span class="dir">📁 mobile-health-app/</span>
<span class="file">📄 README.md</span>
<span class="file">📄 skills.txt</span>
<span class="file">📄 achievements.txt</span>
</div>`);
        break;

      case 'git log':
        addOutput(`<div class="git-log">
<span class="commit-hash">commit a7f32bc</span> <span class="branch">(main)</span>
Author: Jaswant Singh <jaswant@intelligaia.com>
Date:   2024

    <span class="commit-msg">GenAI RAG System - Document Retrieval Intelligence</span>

    Built intelligent document retrieval using LangChain and vector databases
    • Impact: $100K+ cost savings
    • Tech: Python, LangChain, Pinecone, OpenAI

<span class="commit-hash">commit 3e9d421</span>
Author: Jaswant Singh <jaswant@intelligaia.com>
Date:   2024

    <span class="commit-msg">Agentic AI Platform - Workflow Orchestration</span>

    Multi-agent system for automated workflow orchestration
    • Impact: 3 FTE reduction
    • Tech: Python, CrewAI, FastAPI, Redis

<span class="commit-hash">commit f8c5a9e</span>
Author: Jaswant Singh <jaswant@intelligaia.com>
Date:   2024

    <span class="commit-msg">E-commerce Platform - Real-time Features</span>

    Full-stack MERN application with real-time capabilities
    • Impact: 65% performance boost (3.2s → 1.1s)
    • Tech: React, Node.js, MongoDB, Socket.io

<span class="commit-hash">commit b4e7d33</span>
Author: Jaswant Singh <jaswant@intelligaia.com>
Date:   2023

    <span class="commit-msg">Mobile Health App - Healthcare Management</span>

    Cross-platform Flutter app for healthcare
    • Impact: 10K+ active users
    • Tech: Flutter, Firebase, Node.js, MongoDB
</div>`);
        break;

      case 'git status':
        addOutput(`<div class="git-status">
On branch <span class="branch-name">main</span>

Your status:
  <span class="git-green">● Currently employed at Intelligaia</span>
  <span class="git-green">● Building GenAI & AI Agent solutions</span>
  <span class="git-green">● Open to interesting opportunities</span>

nothing to commit, working tree clean
</div>`);
        break;

      case 'git branch':
        addOutput(`<div class="git-branch">
  <span class="branch-active">* main</span>
  <span class="branch-item">feature/genai-llms</span>
  <span class="branch-item">feature/rags</span>
  <span class="branch-item">feature/agentic-ai</span>
  <span class="branch-item">feature/react</span>
  <span class="branch-item">feature/nodejs</span>
  <span class="branch-item">feature/flutter</span>
  <span class="branch-item">feature/python</span>
  <span class="branch-item">feature/aws</span>
  <span class="branch-item">feature/gcp</span>
  <span class="branch-item">feature/docker</span>
  <span class="branch-item">feature/mongodb</span>
  <span class="branch-item">feature/postgresql</span>
</div>`);
        break;

      case 'git remote':
        addOutput(`<div class="git-remote">
<span class="remote-name">linkedin</span>    https://linkedin.com/in/jaswant-singh009 (fetch)
<span class="remote-name">github</span>      https://github.com/jaswantsingh009 (fetch)
<span class="remote-name">email</span>       mailto:jaswant@intelligaia.com (push)
<span class="remote-name">twitter</span>     https://twitter.com/jaswantsingh (fetch)
</div>`);
        break;

      case 'git config --list':
        addOutput(`<div class="git-config">
user.name=Jaswant Singh
user.email=jaswant@intelligaia.com
user.role=Sr. Software Engineer
user.company=Intelligaia
user.location=India
core.expertise=GenAI, RAGs, Agentic AI, Full Stack
core.passion=Building intelligent solutions
core.achievement=100K+ cost savings through AI
core.editor=vscode
core.shell=/bin/bash
</div>`);
        break;

      case 'git diff':
        addOutput(`<div class="git-diff">
<span class="diff-header">diff --git a/before b/after</span>
<span class="diff-index">index 1234567..89abcdef 100644</span>
<span class="diff-file">--- a/metrics/performance</span>
<span class="diff-file">+++ b/metrics/performance</span>

<span class="deletion">- Average load time: 3.2s</span>
<span class="addition">+ Average load time: 1.1s</span>
<span class="git-green">  Improvement: 65% faster ⚡</span>

<span class="deletion">- Monthly infrastructure cost: $150K</span>
<span class="addition">+ Monthly infrastructure cost: $50K</span>
<span class="git-green">  Savings: $100K+ per month 💰</span>

<span class="deletion">- Manual processes: 3 FTE</span>
<span class="addition">+ Automated processes: 0 FTE</span>
<span class="git-green">  Efficiency: 3 FTE reduction 🤖</span>
</div>`);
        break;

      case 'git show --stat':
        addOutput(`<div class="git-stat">
<span class="commit-hash">commit a7f32bc</span>
Author: Jaswant Singh <jaswant@intelligaia.com>

    Recent Career Statistics

 Projects Completed           | 25+ <span class="git-green">████████████████████</span>
 Cost Savings Generated       | $100K+ <span class="git-green">██████████████████████</span>
 Performance Improvements     | 65% <span class="git-green">█████████████</span>
 Team Efficiency Gains        | 3 FTE <span class="git-green">██████</span>
 Active Users Impacted        | 10K+ <span class="git-green">████████████████████</span>
 Technologies Mastered        | 15+ <span class="git-green">███████████████</span>
 Years of Experience          | 5+ <span class="git-green">██████████</span>
</div>`);
        break;

      case 'cat skills.txt':
      case 'skills':
        addOutput(`<div class="cat-output">
<span class="section-title">══ TECHNICAL SKILLS ══</span>

<span class="skill-category">🤖 AI & Machine Learning:</span>
  • GenAI & Large Language Models (LLMs)
  • Retrieval-Augmented Generation (RAGs)
  • Agentic AI Systems
  • LangChain, OpenAI, Anthropic
  • Vector Databases (Pinecone, Weaviate)

<span class="skill-category">💻 Full Stack Development:</span>
  • React.js, Next.js, Vue.js
  • Node.js, Express.js
  • MongoDB, PostgreSQL, Redis
  • RESTful APIs, GraphQL

<span class="skill-category">📱 Mobile Development:</span>
  • Flutter (iOS & Android)
  • React Native
  • Firebase, Supabase

<span class="skill-category">☁️ Cloud & DevOps:</span>
  • AWS (Lambda, EC2, S3, CloudFront)
  • GCP (Cloud Functions, App Engine)
  • Docker, Kubernetes
  • CI/CD (GitHub Actions, Jenkins)

<span class="skill-category">🛠️ Tools & Practices:</span>
  • Git, GitHub, GitLab
  • Agile, Scrum
  • Test-Driven Development
  • Microservices Architecture
</div>`);
        break;

      case 'cat achievements.txt':
      case 'achievements':
        addOutput(`<div class="cat-output">
<span class="section-title">══ KEY ACHIEVEMENTS ══</span>

<span class="achievement">🏆 Cost Optimization Champion</span>
   Reduced infrastructure costs by $100K+ annually through
   intelligent caching and GenAI-powered optimization

<span class="achievement">⚡ Performance Wizard</span>
   Improved application load times by 65% (3.2s → 1.1s)
   through React optimization and lazy loading strategies

<span class="achievement">🤖 Automation Expert</span>
   Built Agentic AI system that eliminated 3 FTE worth
   of manual work through intelligent automation

<span class="achievement">📈 Scale Master</span>
   Architected solutions serving 10K+ concurrent users
   with 99.9% uptime and sub-second response times

<span class="achievement">🎯 Innovation Leader</span>
   Pioneered GenAI and RAG implementations at Intelligaia
   establishing new standards for AI-powered solutions
</div>`);
        break;

      case 'echo $role':
        addOutput('<span class="output-success">Sr. Software Engineer @ Intelligaia</span>');
        break;

      case 'echo $expertise':
        addOutput('<span class="output-success">GenAI | RAGs | Agentic AI | MERN | Flutter | AWS | GCP</span>');
        break;

      case 'contact':
        addOutput(`<div class="contact-output">
<span class="section-title">══ CONTACT INFORMATION ══</span>

<span class="contact-item">📧 Email:</span>     jaswant@intelligaia.com
<span class="contact-item">💼 LinkedIn:</span>  linkedin.com/in/jaswant-singh009
<span class="contact-item">🐙 GitHub:</span>    github.com/jaswantsingh009
<span class="contact-item">🐦 Twitter:</span>   twitter.com/jaswantsingh
<span class="contact-item">📍 Location:</span>  India
<span class="contact-item">🌐 Status:</span>    Open to interesting opportunities
</div>`);
        break;

      case 'ls blogs':
        const blogsListShort = blogStorage.getBlogs();
        const blogsList = blogsListShort.map(blog =>
          `<span class="dir">📝 ${blog.slug}.md</span>`
        ).join('\n');
        addOutput(`<div class="output-info">
${blogsList}

<span class="git-gray"># ${blogsListShort.length} blog posts total</span>
<span class="git-gray"># Use 'cat blogs' for detailed list</span>
</div>`);
        break;

      case 'cat blogs':
      case 'blogs':
        const allBlogs = blogStorage.getBlogs();
        if (allBlogs.length === 0) {
          addOutput(`<div class="output-info">
<span class="section-title">══ NO BLOGS YET ══</span>

No blog posts found. Create your first blog in UI mode!
</div>`);
        } else {
          const blogsOutput = allBlogs.map((blog, index) => {
            const featured = blog.featured ? '<span class="git-yellow">⭐ FEATURED</span> ' : '';
            return `
<span class="git-green">────────────────────────────────────────────────────────────</span>
${featured}<span class="git-blue">#${index + 1}</span> <span class="commit-hash">${blog.slug}</span>

<span class="output-success">Title:</span>      ${blog.title}
<span class="output-success">Date:</span>       ${blog.date}
<span class="output-success">Read Time:</span>  ${blog.readTime} minutes
<span class="output-success">Views:</span>      ${blog.views}
<span class="output-success">Tags:</span>       ${blog.tags.join(', ')}

<span class="git-gray">${blog.excerpt}</span>`;
          }).join('\n');

          addOutput(`<div class="output-info">
<span class="section-title">══ BLOG POSTS (${allBlogs.length}) ══</span>
${blogsOutput}

<span class="git-green">────────────────────────────────────────────────────────────</span>
<span class="git-gray"># Tip: Create and manage blogs in UI mode</span>
</div>`);
        }
        break;

      case 'sudo make me a sandwich':
        addOutput(`<div class="easter-egg">
<span class="output-warning">🍞 Okay, here's your sandwich! 🥪</span>

        _______________
       |.------------.|
       ||  Jaswant's ||
       ||  Special   ||
       ||  GenAI     ||
       ||  Sandwich! ||
       |'------------'|
       '--------------'

<span class="output-info">Ingredients: Fresh code, AI magic, and a sprinkle of creativity! ✨</span>
</div>`);
        break;

      default:
        addOutput(`<span class="output-error">Command not found: ${escapeHtml(cmd)}
Type 'help' to see available commands.</span>`, 'error');
    }
  };

  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        executeCommand(input.trim());
        setCommandHistory(prev => [...prev, input.trim()]);
        setHistoryIndex(-1);
        setInput('');
        setSuggestions([]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[suggestionIndex]);
        setSuggestions([]);
      } else {
        const matches = Object.keys(commands).filter(cmd =>
          cmd.toLowerCase().startsWith(input.toLowerCase())
        );
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          setSuggestions(matches);
          setSuggestionIndex(0);
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSuggestionIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
      } else if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSuggestionIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
      } else if (historyIndex !== -1) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : -1;
        setHistoryIndex(newIndex);
        setInput(newIndex === -1 ? '' : commandHistory[newIndex]);
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim()) {
      const matches = Object.keys(commands).filter(cmd =>
        cmd.toLowerCase().startsWith(value.toLowerCase())
      );
      if (matches.length > 0 && matches.length <= 10) {
        setSuggestions(matches);
        setSuggestionIndex(0);
      } else {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="terminal-mode" onClick={() => inputRef.current?.focus()}>
      <button className="mode-switch-btn-terminal" onClick={onSwitchMode}>
        <i className="fas fa-palette"></i> Switch to UI Mode
      </button>

      <div className="terminal-container">
        <div className="terminal-window-full">
          <div className="terminal-header-bar">
            <div className="header-dots">
              <span></span><span></span><span></span>
            </div>
            <div className="header-title">jaswant@intelligaia: ~/portfolio — Terminal Mode</div>
            <div className="terminal-hint">Try: help, git log, whoami</div>
          </div>

          <div className="terminal-output-full" ref={outputRef}>
            {output.map((item, index) => (
              <div key={index} className={`output-line ${item.type}`}>
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              </div>
            ))}

            <div className="terminal-input-line">
              <span className="prompt">jaswant@intelligaia</span>
              <span className="path">~</span>
              <span className="dollar">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                autoFocus
                spellCheck="false"
                autoComplete="off"
              />
            </div>

            {suggestions.length > 0 && (
              <div className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`suggestion-item ${index === suggestionIndex ? 'active' : ''}`}
                    onClick={() => {
                      setInput(suggestion);
                      setSuggestions([]);
                      inputRef.current?.focus();
                    }}
                  >
                    <span className="suggestion-cmd">{suggestion}</span>
                    <span className="suggestion-desc">— {commands[suggestion].desc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Commands */}
        <div className="quick-commands">
          <div className="quick-cmd-section">
            <h4><i className="fab fa-git-alt"></i> Git Commands</h4>
            {['git log', 'git status', 'git branch', 'git remote'].map(cmd => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  inputRef.current?.focus();
                }}
                className="quick-cmd-btn"
              >
                {cmd}
              </button>
            ))}
          </div>
          <div className="quick-cmd-section">
            <h4><i className="fas fa-terminal"></i> Info Commands</h4>
            {['whoami', 'skills', 'achievements', 'contact'].map(cmd => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  inputRef.current?.focus();
                }}
                className="quick-cmd-btn"
              >
                {cmd}
              </button>
            ))}
          </div>
          <div className="quick-cmd-section">
            <h4><i className="fas fa-blog"></i> Blog Commands</h4>
            {['blogs', 'ls blogs', 'cat blogs'].map(cmd => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  inputRef.current?.focus();
                }}
                className="quick-cmd-btn"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalMode;
