# 🚀 GitHub-Themed Terminal Portfolio

> A creative developer portfolio that combines GitHub's dark theme UI with terminal aesthetics, featuring git command-styled sections and smooth animations.

![Version](https://img.shields.io/badge/version-2.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

## ✨ Creative Features

### 🎨 GitHub Dark Theme Design
- **Authentic GitHub Colors**: Uses actual GitHub dark theme color palette
- **Terminal Aesthetics**: Monospace fonts and command-line interface styling
- **Window Controls**: Mac-style terminal window controls (close, minimize, maximize)
- **GitHub Contribution Graph**: Animated contribution grid like the real GitHub
- **Commit Graph Visualization**: Git log-style project showcase

### 💻 Git Command-Based Navigation
Each section creatively uses git commands:
- **`~/home`** - Hero section with ASCII art and typing commands
- **`cat README.md`** - About section styled as a markdown file
- **`git branch --all`** - Skills organized as git branches
- **`git log --graph`** - Projects displayed as commit history
- **`git remote -v`** - Contact information as remote connections

### 🎭 Interactive Elements
- **Terminal Typing Effect**: Auto-types realistic terminal commands
- **Animated Counters**: GitHub-style statistics with smooth counting
- **Branch Hover Effects**: Interactive tech stack branches
- **Commit Cards**: Projects with file changes, insertions, and deletions
- **Form Submission**: Mimics `git push` with loading and success states
- **Particle Effects**: Subtle animations on hover

### 🎮 Easter Eggs
- **Console Messages**: ASCII art welcome message in browser console
- **Konami Code**: Hidden Matrix rain effect (↑ ↑ ↓ ↓ ← → ← → B A)
- **Tech Badge Clicks**: Console logs when exploring technologies
- **Performance Logging**: Portfolio load time displayed in console

## 🛠️ Technologies Used

- **HTML5** - Semantic structure with terminal-inspired markup
- **CSS3** - GitHub dark theme variables, smooth animations, responsive design
- **JavaScript (ES6+)** - Interactive features and creative animations
- **Font Awesome** - Icon library
- **No Dependencies** - Pure vanilla JavaScript for optimal performance

## 📦 Quick Start

### Clone the Repository

```bash
$ git clone https://github.com/yourusername/portfolio.git
$ cd portfolio
```

### Run Locally

#### Option 1: Direct Browser
```bash
# Simply open in browser
$ open index.html  # macOS
$ xdg-open index.html  # Linux
$ start index.html  # Windows
```

#### Option 2: Local Server (Recommended)
```bash
# Using Python 3
$ python -m http.server 8000

# Using Node.js
$ npx http-server

# Using PHP
$ php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 🎨 Customization Guide

### 1. Personal Information

**Update Names and Titles:**
```html
<!-- index.html -->
<title>your-name @ ~/portfolio</title>
<div class="terminal-title">your-name@portfolio: ~/projects</div>
<span class="prompt">your-name@portfolio</span>
```

**About Section (lines 174-182):**
```javascript
const developer = {
  name: "Your Name",
  role: "Your Role",
  location: "Your Location",
  experience: "X+ years",
  // ... add your info
};
```

### 2. Color Scheme

The portfolio uses authentic GitHub colors defined in CSS variables:

```css
/* styles.css - lines 10-24 */
:root {
    --gh-bg-primary: #0d1117;    /* Main background */
    --gh-bg-secondary: #161b22;  /* Card background */
    --gh-green: #238636;         /* Primary accent */
    --terminal-green: #3fb950;   /* Terminal green */
    --terminal-blue: #58a6ff;    /* Links and commands */
    /* Customize these to match your preferred theme */
}
```

### 3. Skills (Git Branches)

**Add/Edit Branches (lines 251-314 in index.html):**
```html
<div class="branch-item">
    <span class="branch-icon">*</span>
    <span class="branch-name">main/your-skill</span>
    <div class="tech-stack">
        <span class="tech-badge react">Your Tech</span>
        <!-- Add more badges -->
    </div>
</div>
```

**Available Tech Badge Classes:**
`js`, `react`, `vue`, `ts`, `html`, `css`, `node`, `python`, `go`, `django`, `express`, `graphql`, `mongo`, `postgres`, `redis`, `mysql`, `firebase`, `docker`, `k8s`, `aws`, `gcp`, `git`, `vscode`, etc.

### 4. Projects (Git Commits)

**Update Commit Cards (lines 352-545 in index.html):**
```html
<div class="commit-card">
    <div class="commit-header">
        <div class="commit-hash">abc1234</div>
        <div class="commit-branch">
            <span class="branch-tag main">main</span>
            <span class="branch-tag feature">feature/your-project</span>
        </div>
    </div>
    <div class="commit-body">
        <h3>Your Project Name</h3>
        <p class="commit-message">
            <span class="git-green">feat:</span> Description
        </p>
        <div class="commit-details">
            <p>Detailed description...</p>
            <div class="file-changes">
                <span class="files-changed">
                    <i class="fas fa-file-code"></i> X files changed
                </span>
                <span class="insertions">
                    <i class="fas fa-plus"></i> Y insertions
                </span>
                <span class="deletions">
                    <i class="fas fa-minus"></i> Z deletions
                </span>
            </div>
            <!-- Add tech stack and links -->
        </div>
    </div>
</div>
```

### 5. Contact Information

**Update Remote URLs (lines 573-600 in index.html):**
```html
<div class="remote-item">
    <span class="remote-name">origin</span>
    <a href="your-github-url" class="remote-url">
        <i class="fab fa-github"></i> github.com/yourusername
    </a>
    <span class="remote-type">(fetch)</span>
</div>
```

### 6. Terminal Commands

**Customize Typing Commands (script.js - lines 4-14):**
```javascript
const commands = [
    'your command 1',
    'your command 2',
    'git status',
    // Add your favorite commands
];
```

## 🚀 Features Breakdown

### Navigation
- Fixed terminal-style header with Mac window controls
- Tab-based navigation using git command names
- Active tab highlighting on scroll
- Mobile-responsive with floating menu button

### Hero Section
- ASCII art name display
- Animated terminal typing effect
- GitHub-style statistics cards
- Contribution graph animation
- Graph bar visualizations

### About Section
- Styled as `cat README.md` output
- Markdown-style formatting
- Syntax-highlighted code blocks
- Experience timeline with icons
- Animated list items

### Skills Section
- Displayed as `git branch --all` output
- Active branch indicator
- Tech badges with hover effects
- Smooth slide animations
- Categorized by tech stack

### Projects Section
- Formatted as `git log --graph` output
- Commit hash styling
- Branch tags (main/feature)
- File change statistics
- Insertions/deletions counters
- Live demo and code links

### Contact Section
- Styled as `git remote -v` output
- Social links as remote repositories
- Terminal-style contact form
- Animated form submission (simulates `git push`)
- Success feedback

## 🎭 Animations & Effects

### On Load
- Fade-in terminal windows
- ASCII art reveal
- Graph bar growth animation
- Contribution grid population

### On Scroll
- Active tab highlighting
- Animated counter numbers
- Staggered commit card reveals
- Smooth section transitions

### On Hover
- Glow effects on buttons
- Transform effects on cards
- Tech badge pulse animation
- Particle bursts on stat cards

### On Interaction
- Terminal typing effect
- Form submission animation
- Branch hover effects
- Window focus borders

## 📱 Responsive Design

- **Desktop (1280px+)**: Full terminal layout with all features
- **Tablet (768px - 1279px)**: Adapted layout, stacked sections
- **Mobile (< 768px)**: Compact design, floating menu, optimized typography

## ⚡ Performance

- **No External Dependencies**: Vanilla JavaScript only
- **Optimized Animations**: Uses `transform` and `opacity`
- **Lazy Loading**: Intersection Observer for scroll animations
- **Efficient Rendering**: RequestAnimationFrame for smooth animations
- **Minimal Bundle**: ~30KB total (HTML + CSS + JS)

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)
- ⚠️ IE11 (not supported - uses modern ES6+)

## 📝 Deployment

### GitHub Pages

```bash
$ git init
$ git add .
$ git commit -m "feat: initialize portfolio"
$ git branch -M main
$ git remote add origin https://github.com/yourusername/portfolio.git
$ git push -u origin main
```

Then enable GitHub Pages in repository settings.

### Netlify

```bash
# Install Netlify CLI
$ npm install -g netlify-cli

# Deploy
$ netlify deploy --prod
```

### Vercel

```bash
# Install Vercel CLI
$ npm install -g vercel

# Deploy
$ vercel --prod
```

## 🎯 Advanced Customization

### Add New Tech Badges

Add to `styles.css` (around line 565):

```css
.tech-badge.yourtech {
    background: #color20;
    color: #color;
    border-color: #color;
}
```

### Modify Animations

Customize animation durations in `styles.css` (lines 864-912):

```css
@keyframes yourAnimation {
    from { /* start state */ }
    to { /* end state */ }
}
```

### Add Terminal Commands

Extend the typing commands in `script.js`:

```javascript
const commands = [
    ...commands,
    'your new command'
];
```

## 🐛 Troubleshooting

**Animations not working?**
- Check if JavaScript is enabled
- Ensure using a modern browser
- Check console for errors

**Layout issues?**
- Clear browser cache
- Check viewport meta tag
- Verify CSS is loaded

**Icons not showing?**
- Check Font Awesome CDN connection
- Verify internet connection
- Check browser console for 404 errors

## 📄 License

MIT License - feel free to use this portfolio for personal or commercial projects!

## 🤝 Contributing

Found a bug or want to contribute? Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💡 Inspiration

This portfolio was inspired by:
- GitHub's dark theme and design language
- Terminal/command-line interfaces
- Git workflow and commands
- Developer tools and IDEs

## 📧 Contact

**GitHub**: [@yourusername](https://github.com/yourusername)
**Email**: your.email@example.com
**LinkedIn**: [Your Name](https://linkedin.com/in/yourprofile)

---

<div align="center">

**Built with ❤️ and ☕ using Git commands**

`$ git commit -m "feat: created awesome portfolio"`

`$ git push origin main`

⭐ Star this repo if you find it useful!

</div>
