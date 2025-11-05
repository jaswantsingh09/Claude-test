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
