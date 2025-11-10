// Jaswant Singh's GitHub-Themed Terminal Portfolio JavaScript

// Matrix Background Effect
function initMatrixBackground() {
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#3fb950';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Terminal Commands Animation
const commands = [
    'python train_model.py --epochs=100',
    'git status',
    'docker-compose up genai-service',
    'npm run build:production',
    'kubectl apply -f deployment.yml',
    'git commit -m "feat: add RAG implementation"',
    'pytest tests/ --cov=src',
    'aws s3 sync ./build s3://intelligaia-prod',
    'git push origin feature/genai-solution'
];

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-command');

function typeCommand() {
    if (!typingElement) return;

    const currentCommand = commands[commandIndex];

    if (isDeleting) {
        typingElement.textContent = currentCommand.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentCommand.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === currentCommand.length) {
        typeSpeed = 2500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
        typeSpeed = 500;
    }

    setTimeout(typeCommand, typeSpeed);
}

// Start animations
window.addEventListener('load', () => {
    initMatrixBackground();
    setTimeout(typeCommand, 1000);
});

// Smooth Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Tab Highlighting
const tabs = document.querySelectorAll('.terminal-tab');
const sections = document.querySelectorAll('.terminal-section');

function updateActiveTab() {
    let currentSection = '';
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    tabs.forEach(tab => {
        tab.classList.remove('active');
        const href = tab.getAttribute('href');
        if (href === `#${currentSection}`) {
            tab.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveTab);

// Animated Counters
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

// Intersection Observer for Stat Counters
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.stat-value').forEach(stat => {
    statObserver.observe(stat);
});

// Animate Terminal Windows on Scroll
const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.terminal-window').forEach(window => {
    terminalObserver.observe(window);
});

// Animate Branch Items on Hover
document.querySelectorAll('.branch-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease';
    });

    item.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Animate Commit Cards on Scroll
const commitObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.commit-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    commitObserver.observe(card);
});

// Terminal Form Submission with Animation
const terminalForm = document.querySelector('.terminal-form');
if (terminalForm) {
    terminalForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Create terminal output effect
        const submitButton = this.querySelector('button');
        const originalText = submitButton.innerHTML;

        // Simulate git push process
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Pushing to remote...';
        submitButton.disabled = true;

        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Successfully pushed!';
            submitButton.style.background = 'var(--terminal-green)';

            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'command-line';
                successMessage.style.color = 'var(--terminal-green)';
                successMessage.innerHTML = `
                    <span class="prompt">john-dev@portfolio</span>
                    <span class="path">~</span>
                    <span class="dollar">$</span>
                    <span class="command">echo "Message sent successfully! ✓"</span>
                `;

                this.appendChild(successMessage);

                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                    successMessage.remove();
                }, 3000);
            }, 1000);
        }, 2000);
    });
}

// Tech Badge Click Animation
document.querySelectorAll('.tech-badge').forEach(badge => {
    badge.addEventListener('click', function() {
        // Create a console.log effect
        const tech = this.textContent;
        console.log(`%c> Exploring ${tech}...`, 'color: #3fb950; font-family: monospace; font-size: 14px;');

        // Visual feedback
        this.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const terminalNav = document.querySelector('.terminal-nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        terminalNav.classList.toggle('mobile-active');

        // Add mobile styles dynamically
        if (terminalNav.classList.contains('mobile-active')) {
            terminalNav.style.position = 'fixed';
            terminalNav.style.top = '80px';
            terminalNav.style.left = '0';
            terminalNav.style.right = '0';
            terminalNav.style.background = 'var(--gh-bg-secondary)';
            terminalNav.style.padding = '1rem';
            terminalNav.style.boxShadow = 'var(--shadow-lg)';
            terminalNav.style.zIndex = '999';
        } else {
            terminalNav.style.position = '';
            terminalNav.style.top = '';
            terminalNav.style.left = '';
            terminalNav.style.right = '';
            terminalNav.style.background = '';
            terminalNav.style.padding = '';
            terminalNav.style.boxShadow = '';
        }
    });

    // Close mobile menu when clicking a link
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (terminalNav.classList.contains('mobile-active')) {
                terminalNav.classList.remove('mobile-active');
                terminalNav.style.position = '';
                terminalNav.style.top = '';
                terminalNav.style.left = '';
                terminalNav.style.right = '';
                terminalNav.style.background = '';
                terminalNav.style.padding = '';
                terminalNav.style.boxShadow = '';
            }
        });
    });
}

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);

    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated!
        console.log('%c┌────────────────────────────────────┐', 'color: #3fb950; font-family: monospace;');
        console.log('%c│  🎮 KONAMI CODE ACTIVATED! 🎮     │', 'color: #3fb950; font-family: monospace;');
        console.log('%c│  You are a true developer! 💚     │', 'color: #3fb950; font-family: monospace;');
        console.log('%c└────────────────────────────────────┘', 'color: #3fb950; font-family: monospace;');

        // Add matrix rain effect
        addMatrixRain();
        konamiCode = [];
    }
});

// Matrix Rain Effect (Easter Egg)
function addMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#3fb950';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const interval = setInterval(draw, 33);

    // Remove after 5 seconds
    setTimeout(() => {
        clearInterval(interval);
        canvas.style.opacity = '0';
        canvas.style.transition = 'opacity 1s';
        setTimeout(() => canvas.remove(), 1000);
    }, 5000);
}

// Console ASCII Art
console.log('%c', 'font-size: 1px;');
console.log('%c┌───────────────────────────────────────────────────────┐', 'color: #3fb950; font-family: monospace; font-size: 12px;');
console.log('%c│                                                       │', 'color: #3fb950; font-family: monospace; font-size: 12px;');
console.log('%c│  👋 Welcome to Jaswant Singh\'s Portfolio             │', 'color: #3fb950; font-family: monospace; font-size: 12px;');
console.log('%c│  Sr. Software Engineer @ Intelligaia                 │', 'color: #ff6b6b; font-family: monospace; font-size: 12px;');
console.log('%c│                                                       │', 'color: #3fb950; font-family: monospace; font-size: 12px;');
console.log('%c│  $ whoami                                             │', 'color: #58a6ff; font-family: monospace; font-size: 12px;');
console.log('%c│  GenAI & Full Stack Specialist                       │', 'color: #d29922; font-family: monospace; font-size: 12px;');
console.log('%c│  RAGs | Agentic AI | LLMs | MERN | AWS | GCP        │', 'color: #d29922; font-family: monospace; font-size: 12px;');
console.log('%c│                                                       │', 'color: #3fb950; font-family: monospace; font-size: 12px;');
console.log('%c│  💰 Impact: $100K+ saved | 3 FTE reduced             │', 'color: #2ea043; font-family: monospace; font-size: 12px;');
console.log('%c│  ⚡ Performance: 3.2s → 1.1s page load               │', 'color: #2ea043; font-family: monospace; font-size: 12px;');
console.log('%c│                                                       │', 'color: #3fb950; font-family: monospace; font-size: 12px;');
console.log('%c│  🔍 Try the Konami Code for a surprise! 🎮          │', 'color: #d29922; font-family: monospace; font-size: 12px;');
console.log('%c│                                                       │', 'color: #3fb950; font-family: monospace; font-size: 12px;');
console.log('%c└───────────────────────────────────────────────────────┘', 'color: #3fb950; font-family: monospace; font-size: 12px;');

// Add typing indicator to form inputs
const formInputs = document.querySelectorAll('.terminal-form input, .terminal-form textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--terminal-green)';
        this.style.boxShadow = '0 0 0 3px rgba(63, 185, 80, 0.1)';
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        }
    });

    input.addEventListener('input', function() {
        // Add typing sound effect (optional - commented out)
        // new Audio('path-to-keyboard-sound.mp3').play();
    });
});

// Contribution Graph Animation
document.querySelectorAll('.contribution-day').forEach((day, index) => {
    setTimeout(() => {
        day.style.opacity = '0';
        day.style.transform = 'scale(0)';
        day.style.transition = 'all 0.3s ease';

        setTimeout(() => {
            day.style.opacity = '1';
            day.style.transform = 'scale(1)';
        }, 50);
    }, index * 50);
});

// Graph Bars Animation
document.querySelectorAll('.graph-bar').forEach((bar, index) => {
    setTimeout(() => {
        bar.style.opacity = '0';
        bar.style.transform = 'scaleY(0)';
        bar.style.transformOrigin = 'bottom';
        bar.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            bar.style.opacity = '1';
            bar.style.transform = 'scaleY(1)';
        }, 50);
    }, index * 100);
});

// Add glow effect to action buttons
document.querySelectorAll('.action-btn, .git-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 20px rgba(63, 185, 80, 0.4)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Terminal cursor blink
const cursor = document.querySelector('.cursor-blink');
if (cursor) {
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
}

// Add particle effect on hover for stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        createParticles(e.pageX, e.pageY);
    });
});

function createParticles(x, y) {
    const colors = ['#3fb950', '#58a6ff', '#d29922'];

    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let px = x;
        let py = y;
        let opacity = 1;

        function animate() {
            px += vx;
            py += vy;
            opacity -= 0.02;

            particle.style.left = px + 'px';
            particle.style.top = py + 'px';
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }

        animate();
    }
}

// Performance: Lazy load animations
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            lazyObserver.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '50px'
});

document.querySelectorAll('.terminal-section').forEach(section => {
    lazyObserver.observe(section);
});

// Log portfolio load time
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`%c✓ Portfolio loaded in ${loadTime}ms`, 'color: #3fb950; font-family: monospace; font-weight: bold;');
});

// Add realistic terminal focus effect
document.querySelectorAll('.terminal-window').forEach(window => {
    window.addEventListener('click', function() {
        // Remove focus from all windows
        document.querySelectorAll('.terminal-window').forEach(w => {
            w.style.borderColor = 'var(--gh-border)';
        });

        // Add focus to clicked window
        this.style.borderColor = 'var(--terminal-green)';
        this.style.transition = 'border-color 0.3s';
    });
});

console.log('%c> Jaswant Singh\'s Portfolio initialized successfully! 🚀', 'color: #3fb950; font-family: monospace; font-size: 14px; font-weight: bold;');
console.log('%c> Building the future with GenAI & Cloud Architecture 🧠☁️', 'color: #58a6ff; font-family: monospace; font-size: 12px;');

// ==================== INTERACTIVE TERMINAL ====================

class InteractiveTerminal {
    constructor() {
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');
        this.suggestions = document.getElementById('autocomplete-suggestions');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentSuggestionIndex = -1;

        this.commands = {
            'help': {
                desc: 'Show available commands',
                exec: () => this.showHelp()
            },
            'clear': {
                desc: 'Clear terminal',
                exec: () => this.clearTerminal()
            },
            'whoami': {
                desc: 'Show developer info',
                exec: () => this.whoami()
            },
            'pwd': {
                desc: 'Show current role',
                exec: () => this.pwd()
            },
            'ls': {
                desc: 'List projects',
                exec: () => this.ls()
            },
            'git log': {
                desc: 'Show work history',
                exec: () => this.gitLog()
            },
            'git status': {
                desc: 'Show current status',
                exec: () => this.gitStatus()
            },
            'git branch': {
                desc: 'List skill branches',
                exec: () => this.gitBranch()
            },
            'git remote': {
                desc: 'Show social links',
                exec: () => this.gitRemote()
            },
            'git config --list': {
                desc: 'Show configuration',
                exec: () => this.gitConfig()
            },
            'git diff': {
                desc: 'Show impact metrics',
                exec: () => this.gitDiff()
            },
            'git show --stat': {
                desc: 'Show detailed stats',
                exec: () => this.gitShowStat()
            },
            'cat skills.txt': {
                desc: 'Show skills',
                exec: () => this.catSkills()
            },
            'cat achievements.txt': {
                desc: 'Show achievements',
                exec: () => this.catAchievements()
            },
            'echo $ROLE': {
                desc: 'Show role',
                exec: () => this.echoRole()
            },
            'echo $EXPERTISE': {
                desc: 'Show expertise',
                exec: () => this.echoExpertise()
            },
            'skills': {
                desc: 'Quick skills overview',
                exec: () => this.catSkills()
            },
            'achievements': {
                desc: 'Quick achievements view',
                exec: () => this.catAchievements()
            },
            'contact': {
                desc: 'Show contact info',
                exec: () => this.contact()
            },
            'sudo make me a sandwich': {
                desc: 'Easter egg',
                exec: () => this.easterEgg()
            }
        };

        this.init();
    }

    init() {
        if (!this.input) return;

        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.input.addEventListener('input', () => this.handleInput());
        this.input.addEventListener('focus', () => this.input.parentElement.style.borderColor = 'var(--terminal-green)');
        this.input.addEventListener('blur', () => {
            this.input.parentElement.style.borderColor = '';
            setTimeout(() => this.hideSuggestions(), 200);
        });

        // Click command reference to execute
        document.querySelectorAll('.ref-cmd').forEach(cmd => {
            cmd.addEventListener('click', () => {
                this.input.value = cmd.textContent;
                this.input.focus();
                this.executeCommand(cmd.textContent);
            });
        });
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = this.input.value.trim();
            if (command) {
                this.executeCommand(command);
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
                this.hideSuggestions();
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autocomplete();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.suggestions.classList.contains('show')) {
                this.navigateSuggestions(-1);
            } else {
                this.navigateHistory(-1);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.suggestions.classList.contains('show')) {
                this.navigateSuggestions(1);
            } else {
                this.navigateHistory(1);
            }
        } else if (e.key === 'Escape') {
            this.hideSuggestions();
        }
    }

    handleInput() {
        const value = this.input.value.toLowerCase();
        if (value.length > 0) {
            this.showSuggestions(value);
        } else {
            this.hideSuggestions();
        }
    }

    showSuggestions(input) {
        const matches = Object.keys(this.commands).filter(cmd =>
            cmd.toLowerCase().startsWith(input)
        );

        if (matches.length === 0) {
            this.hideSuggestions();
            return;
        }

        this.suggestions.innerHTML = matches.map((cmd, index) => `
            <div class="suggestion-item ${index === 0 ? 'active' : ''}" data-cmd="${cmd}">
                <span class="cmd-name">${cmd}</span>
                <span class="cmd-desc">— ${this.commands[cmd].desc}</span>
            </div>
        `).join('');

        this.suggestions.classList.add('show');
        this.currentSuggestionIndex = 0;

        // Add click handlers
        this.suggestions.querySelectorAll('.suggestion-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                this.input.value = item.dataset.cmd;
                this.input.focus();
                this.hideSuggestions();
            });
        });
    }

    hideSuggestions() {
        this.suggestions.classList.remove('show');
        this.currentSuggestionIndex = -1;
    }

    navigateSuggestions(direction) {
        const items = this.suggestions.querySelectorAll('.suggestion-item');
        if (items.length === 0) return;

        items[this.currentSuggestionIndex].classList.remove('active');
        this.currentSuggestionIndex = (this.currentSuggestionIndex + direction + items.length) % items.length;
        items[this.currentSuggestionIndex].classList.add('active');

        this.input.value = items[this.currentSuggestionIndex].dataset.cmd;
    }

    autocomplete() {
        const value = this.input.value.toLowerCase();
        const matches = Object.keys(this.commands).filter(cmd =>
            cmd.toLowerCase().startsWith(value)
        );

        if (matches.length === 1) {
            this.input.value = matches[0];
            this.hideSuggestions();
        } else if (matches.length > 1) {
            this.showSuggestions(value);
        }
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        this.historyIndex = Math.max(0, Math.min(
            this.commandHistory.length,
            this.historyIndex + direction
        ));

        this.input.value = this.commandHistory[this.historyIndex] || '';
    }

    executeCommand(command) {
        // Echo command
        this.addOutput(`
            <div class="command-echo">
                <span class="prompt">jaswant@intelligaia</span>
                <span class="path">~</span>
                <span class="dollar">$</span>
                <span class="command">${this.escapeHtml(command)}</span>
            </div>
        `);

        // Execute
        const cmd = this.commands[command.toLowerCase()];
        if (cmd) {
            cmd.exec();
        } else {
            this.addOutput(`<div class="output-error">Command not found: ${this.escapeHtml(command)}
Type 'help' to see available commands.</div>`);
        }

        // Scroll to bottom
        this.output.scrollTop = this.output.scrollHeight;
    }

    addOutput(html) {
        const div = document.createElement('div');
        div.className = 'command-output';
        div.innerHTML = html;
        this.output.appendChild(div);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ==================== COMMANDS ====================

    showHelp() {
        this.addOutput(`<div class="output-info">
Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="output-success">Git Commands:</span>
  git log              — Show work history and experience
  git status           — Check current status and availability
  git branch           — List all skill branches
  git remote           — Show social media connections
  git config --list    — Display personal configuration
  git diff             — Show impact and improvements
  git show --stat      — Detailed statistics

<span class="output-success">Shell Commands:</span>
  whoami               — Display developer information
  pwd                  — Show current working directory (role)
  ls                   — List all projects
  cat skills.txt       — View skills and technologies
  cat achievements.txt — View key achievements
  echo $ROLE           — Print current role
  echo $EXPERTISE      — Print areas of expertise

<span class="output-success">Quick Commands:</span>
  skills               — Quick skills overview
  achievements         — Quick achievements view
  contact              — Show contact information
  help                 — Show this help message
  clear                — Clear terminal output

<span class="output-warning">Tips:</span>
  • Press TAB for autocomplete
  • Use ↑↓ arrows for command history
  • Click any command in the reference below to execute
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</div>`);
    }

    clearTerminal() {
        this.output.innerHTML = '';
        this.addOutput('<div class="output-success">✓ Terminal cleared</div>');
    }

    whoami() {
        this.addOutput(`<div class="output-info">
╔══════════════════════════════════════════════════════════════╗
║                    DEVELOPER PROFILE                         ║
╚══════════════════════════════════════════════════════════════╝

<span class="output-success">Name:</span>     Jaswant Singh
<span class="output-success">Role:</span>     Sr. Software Engineer
<span class="output-success">Company:</span>  Intelligaia
<span class="output-success">Location:</span> India

<span class="output-success">Education:</span>
  • Computer Science @ Guru Nanak Dev Engineering College

<span class="output-success">Specializations:</span>
  • GenAI & Large Language Models (LLMs)
  • Retrieval-Augmented Generation (RAGs)
  • Agentic AI Systems
  • Full Stack Development (MERN)
  • Mobile Development (Flutter)
  • Cloud Architecture (AWS, GCP)

<span class="output-success">Professional Summary:</span>
  Passionate software engineer specializing in cutting-edge AI
  solutions and scalable cloud architectures. Expert in building
  intelligent systems that deliver measurable business impact.

<span class="output-warning">Fun Fact:</span> Saved clients $100K+ through AI automation! 🤖💰
</div>`);
    }

    pwd() {
        this.addOutput(`<div class="output-info">
/home/jaswant/intelligaia/senior-software-engineer/genai-specialist

<span class="output-success">Current Focus:</span>
  → Building next-generation GenAI solutions
  → Architecting scalable cloud infrastructure
  → Leading AI/ML integration projects
  → Mentoring development teams
</div>`);
    }

    ls() {
        this.addOutput(`<div class="output-info">
total 4 major projects

drwxr-xr-x  <span class="output-success">ai-architecture-assistant/</span>
    Impact: $100K saved, 3 FTE reduced
    Tech: GenAI, RAGs, Python, LangChain, AWS

drwxr-xr-x  <span class="output-success">high-performance-platform/</span>
    Impact: 65% faster (3.2s → 1.1s)
    Tech: React, Node.js, MongoDB, Redis, AWS

drwxr-xr-x  <span class="output-success">scalable-saas-application/</span>
    Impact: Multi-cloud, enterprise-grade
    Tech: React, Node.js, GCP, AWS, Kubernetes

drwxr-xr-x  <span class="output-success">genai-solutions-suite/</span>
    Impact: Intelligent automation
    Tech: LLMs, RAGs, Python, LangChain, API

<span class="output-warning">Tip:</span> Try 'git log' for detailed project history
</div>`);
    }

    gitLog() {
        this.addOutput(`<div class="output-info">
<span class="output-warning">commit</span> <span class="output-success">ai7d9f3</span> (HEAD -> main, origin/main)
Author: Jaswant Singh &lt;jaswant@intelligaia.com&gt;
Date:   2024

    🤖 AI Architecture Assistant

    Revolutionary document validation system with AI-powered
    compliance checking. Achieved remarkable cost savings and
    efficiency improvements for enterprise clients.

    <span class="output-success">Impact:</span> $100K+ saved, 3 FTE reduced
    <span class="output-success">Tech:</span> GenAI, RAGs, LangChain, Python, AWS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="output-warning">commit</span> <span class="output-success">p3rf41c</span>
Author: Jaswant Singh &lt;jaswant@intelligaia.com&gt;
Date:   2023

    ⚡ High-Performance Teaching Platform

    Engineered full-stack platform with aggressive performance
    optimizations. Reduced page load time by 65% through
    intelligent caching and infrastructure improvements.

    <span class="output-success">Performance:</span> 3.2s → 1.1s (65% improvement)
    <span class="output-success">Tech:</span> React, Node.js, MongoDB, Redis, AWS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="output-warning">commit</span> <span class="output-success">saas9b2</span>
Author: Jaswant Singh &lt;jaswant@intelligaia.com&gt;
Date:   2022-2024

    ☁️ Scalable SaaS Application

    Led development of enterprise SaaS with multi-cloud
    architecture. Managed infrastructure across GCP and AWS
    with automated deployments and high availability.

    <span class="output-success">Scale:</span> Enterprise-grade, multi-cloud
    <span class="output-success">Tech:</span> React, Node.js, GCP, AWS, Kubernetes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="output-success">Total commits:</span> 5000+  |  <span class="output-success">Lines added:</span> 50,000+  |  <span class="output-success">Impact:</span> 🚀
</div>`);
    }

    gitStatus() {
        this.addOutput(`<div class="output-success">
On branch main
Your branch is up to date with 'origin/intelligaia'

<span class="output-warning">Current Status:</span>
  ✓ Actively working on GenAI solutions
  ✓ Leading cloud architecture projects
  ✓ Available for collaboration
  ✓ Open to innovative opportunities

<span class="output-warning">Recent Activity:</span>
  modified:   genai-solutions/
  modified:   cloud-architecture/
  new file:   ai-integrations/

<span class="output-success">nothing to commit, working tree clean</span>
(Ready for new challenges and exciting projects!)
</div>`);
    }

    gitBranch() {
        this.addOutput(`<div class="output-info">
<span class="output-success">* main/genai</span>
    GenAI | RAGs | LLMs | Agentic AI | Python | LangChain

  main/frontend
    React | JavaScript | TypeScript | HTML5 | CSS3 | Flutter

  main/backend
    Node.js | Express | Python | GraphQL | REST API

  main/database
    MongoDB | PostgreSQL | Redis | MySQL

  main/cloud
    AWS | GCP | Docker | Kubernetes | CI/CD

  main/tools
    Git | VS Code | Webpack | Jest | Postman | Figma

<span class="output-warning">Active Branch:</span> main/genai (AI/ML Specialization)
<span class="output-success">Total Branches:</span> 6 skill areas
</div>`);
    }

    gitRemote() {
        this.addOutput(`<div class="output-info">
linkedin   https://linkedin.com/in/jaswant-singh009 (fetch)
linkedin   https://linkedin.com/in/jaswant-singh009 (push)

github     https://github.com/jaswantsingh09 (fetch)
github     https://github.com/jaswantsingh09 (push)

email      mailto:jaswant@intelligaia.com (push)

company    https://intelligaia.com (fetch)

<span class="output-success">All remotes configured and ready for connection! 🚀</span>
</div>`);
    }

    gitConfig() {
        this.addOutput(`<div class="output-info">
user.name=Jaswant Singh
user.email=jaswant@intelligaia.com
user.role=Sr. Software Engineer
user.company=Intelligaia
user.location=India
user.education=Computer Science @ Guru Nanak Dev Engineering College

core.expertise=GenAI, RAGs, Agentic AI, LLMs
core.stack=MERN, Flutter, Python
core.cloud=AWS, GCP, Kubernetes
core.focus=Building intelligent, scalable solutions

achievement.costsavings=$100K+
achievement.efficiency=3 FTE reduced
achievement.performance=65% improvement (3.2s → 1.1s)

professional.linkedin=linkedin.com/in/jaswant-singh009
professional.github=github.com/jaswantsingh09
professional.commits=5000+
professional.impact=Enterprise-level 🚀
</div>`);
    }

    gitDiff() {
        this.addOutput(`<div class="output-info">
<span class="output-warning">Showing impact comparison:</span>

<span class="output-success">Before → After</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="output-success">Cost Efficiency:</span>
<span class="output-error">- Manual processes</span>
<span class="output-success">+ AI Architecture Assistant</span>
<span class="output-success">+ $100K+ annual savings</span>
<span class="output-success">+ 3 FTE reduction</span>

<span class="output-success">Performance:</span>
<span class="output-error">- 3.2s page load time</span>
<span class="output-success">+ 1.1s page load time</span>
<span class="output-success">+ 65% improvement</span>
<span class="output-success">+ Better user experience</span>

<span class="output-success">Scalability:</span>
<span class="output-error">- Single cloud dependency</span>
<span class="output-success">+ Multi-cloud architecture</span>
<span class="output-success">+ High availability</span>
<span class="output-success">+ Auto-scaling enabled</span>

<span class="output-success">Technology:</span>
<span class="output-error">- Traditional approaches</span>
<span class="output-success">+ GenAI integration</span>
<span class="output-success">+ RAGs implementation</span>
<span class="output-success">+ Agentic AI systems</span>
</div>`);
    }

    gitShowStat() {
        this.addOutput(`<div class="output-info">
<span class="output-success">═══════════════════════════════════════════════════════════</span>
<span class="output-success">                    CAREER STATISTICS                       </span>
<span class="output-success">═══════════════════════════════════════════════════════════</span>

<span class="output-warning">Total Contributions:</span>
  📊 Commits: 5000+
  📝 Lines of Code: 50,000+
  🎯 Projects Delivered: 15+
  👥 Teams Led: 3

<span class="output-warning">Business Impact:</span>
  💰 Cost Savings: $100K+
  ⚡ Efficiency Gains: 3 FTE reduced
  🚀 Performance Improvement: 65%
  📈 User Growth Supported: 100K+

<span class="output-warning">Technical Expertise:</span>
  🤖 AI/ML Projects: 5+
  ☁️ Cloud Deployments: 10+
  🔧 Full Stack Apps: 8+
  📱 Mobile Apps: 3+

<span class="output-warning">Recognition:</span>
  ⭐ Innovation Award Recipient
  🏆 Best Performance Optimization
  🎓 Team Mentor & Tech Lead
  💡 Patent Applications: In Progress

<span class="output-success">Status: Active Contributor | Always Learning 📚</span>
</div>`);
    }

    catSkills() {
        this.addOutput(`<div class="output-info">
<span class="output-success">╔══════════════════════════════════════════════════╗</span>
<span class="output-success">║              SKILLS & EXPERTISE                  ║</span>
<span class="output-success">╚══════════════════════════════════════════════════╝</span>

<span class="output-warning">🤖 Artificial Intelligence:</span>
  • GenAI & Large Language Models (LLMs)
  • Retrieval-Augmented Generation (RAGs)
  • Agentic AI Systems
  • LangChain Framework
  • Prompt Engineering
  • Vector Databases

<span class="output-warning">💻 Full Stack Development:</span>
  • React, Node.js, Express
  • JavaScript, TypeScript
  • MongoDB, PostgreSQL, Redis
  • RESTful APIs, GraphQL
  • HTML5, CSS3, SASS

<span class="output-warning">📱 Mobile Development:</span>
  • Flutter
  • Cross-platform Apps
  • Responsive Design

<span class="output-warning">☁️ Cloud & DevOps:</span>
  • AWS (EC2, S3, Lambda, etc.)
  • Google Cloud Platform (GCP)
  • Docker & Kubernetes
  • CI/CD Pipelines
  • Infrastructure as Code

<span class="output-warning">🔧 Tools & Practices:</span>
  • Git & Version Control
  • Agile/Scrum
  • Test-Driven Development
  • Code Review & Mentoring
  • System Design

<span class="output-success">Proficiency Level: Senior/Expert ★★★★★</span>
</div>`);
    }

    catAchievements() {
        this.addOutput(`<div class="output-info">
<span class="output-success">╔══════════════════════════════════════════════════╗</span>
<span class="output-success">║            KEY ACHIEVEMENTS                      ║</span>
<span class="output-success">╚══════════════════════════════════════════════════╝</span>

<span class="output-warning">💰 Cost Optimization:</span>
  ✓ Delivered $100K+ in annual cost savings
  ✓ Reduced manual effort by 3 FTE
  ✓ Implemented AI-powered automation
  ✓ ROI achieved within 6 months

<span class="output-warning">⚡ Performance Excellence:</span>
  ✓ Improved page load time by 65%
  ✓ Reduced latency from 3.2s to 1.1s
  ✓ Optimized database queries
  ✓ Implemented intelligent caching

<span class="output-warning">🚀 Technical Innovation:</span>
  ✓ Pioneered AI Architecture Assistant
  ✓ Integrated RAGs for document processing
  ✓ Built scalable GenAI solutions
  ✓ Designed multi-cloud architecture

<span class="output-warning">👥 Leadership & Impact:</span>
  ✓ Led cross-functional teams
  ✓ Mentored junior developers
  ✓ Established best practices
  ✓ Delivered 15+ production projects

<span class="output-warning">🎓 Continuous Learning:</span>
  ✓ Mastered GenAI technologies
  ✓ Certified in cloud platforms
  ✓ Active open-source contributor
  ✓ Tech community participant

<span class="output-success">Impact Score: EXCEPTIONAL 🌟</span>
</div>`);
    }

    echoRole() {
        this.addOutput(`<div class="output-success">
Sr. Software Engineer @ Intelligaia
Specializing in GenAI & Cloud Architecture 🧠☁️
</div>`);
    }

    echoExpertise() {
        this.addOutput(`<div class="output-success">
GenAI | RAGs | Agentic AI | LLMs | MERN | Flutter | AWS | GCP
Building intelligent, scalable solutions that deliver real business value 🚀
</div>`);
    }

    contact() {
        this.addOutput(`<div class="output-info">
<span class="output-success">╔══════════════════════════════════════════════════╗</span>
<span class="output-success">║            CONTACT INFORMATION                   ║</span>
<span class="output-success">╚══════════════════════════════════════════════════╝</span>

<span class="output-warning">📧 Email:</span>
  jaswant@intelligaia.com

<span class="output-warning">💼 LinkedIn:</span>
  https://linkedin.com/in/jaswant-singh009

<span class="output-warning">🐙 GitHub:</span>
  https://github.com/jaswantsingh09

<span class="output-warning">🏢 Company:</span>
  Intelligaia - https://intelligaia.com

<span class="output-success">Status: Open to collaboration and exciting opportunities!</span>
<span class="output-warning">Response Time: Usually within 24 hours ⏰</span>

<span class="output-info">Let's build something amazing together! 🚀</span>
</div>`);
    }

    easterEgg() {
        this.addOutput(`<div class="output-success">
🍞 Making you a sandwich...
🥪 Sandwich ready!

But since I'm a Sr. Software Engineer at Intelligaia,
I made you an AI-powered, cloud-deployed, GenAI-enhanced sandwich
with RAGs on the side! 🤖☁️🥪

Nutritional Info:
  - 100% GenAI goodness
  - Seasoned with AWS & GCP
  - Served on a MERN stack
  - Side of LangChain fries
  - Kubernetes-grade portability

Enjoy! 😄
</div>`);
    }
}

// Initialize Interactive Terminal
if (document.getElementById('terminal-input')) {
    const terminal = new InteractiveTerminal();
    console.log('%c> Interactive Terminal initialized! Type "help" to explore.', 'color: #3fb950; font-family: monospace; font-size: 12px;');
}
