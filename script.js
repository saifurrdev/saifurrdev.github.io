// Matrix Background Effect
class MatrixEffect {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?`~';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];

        this.init();
        this.animate();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);

        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * this.canvas.height;
        }
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = this.fontSize + 'px JetBrains Mono';

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i]);

            if (this.drops[i] > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i] += this.fontSize;
        }

        requestAnimationFrame(() => this.animate());
    }

    resize() {
        this.init();
    }
}

// Typing Animation
class TypeWriter {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.i = 0;
    }

    type() {
        if (this.i < this.text.length) {
            this.element.innerHTML += this.text.charAt(this.i);
            this.i++;
            setTimeout(() => this.type(), this.speed);
        }
    }

    start() {
        this.element.innerHTML = '';
        this.type();
    }
}

// Smooth Scrolling for Navigation
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Skill Bar Animations
class SkillAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        progressBar.style.animationPlayState = 'running';
                    }
                }
            });
        }, {
            threshold: 0.5
        });

        document.querySelectorAll('.skill-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Terminal Command Simulation
class TerminalSimulator {
    constructor() {
        this.commands = [
            'git status',
            'python automation.py',
            'frida -U -f com.app --load script.js',
            'curl -X GET api.endpoint.com/data',
            'docker run -it python:alpine',
            'npm run dev',
            'pip install beautifulsoup4',
            'adb devices'
        ];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        const cursor = document.querySelector('.typing-cursor');
        if (cursor) {
            setInterval(() => {
                this.simulateCommand(cursor);
            }, 5000);
        }
    }

    simulateCommand(cursor) {
        const command = this.commands[this.currentIndex];
        cursor.textContent = '';

        let i = 0;
        const typeInterval = setInterval(() => {
            cursor.textContent += command.charAt(i);
            i++;

            if (i > command.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    cursor.textContent = '█';
                    this.currentIndex = (this.currentIndex + 1) % this.commands.length;
                }, 2000);
            }
        }, 100);
    }
}

// Particle Effects
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '999';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.createParticle();
        });

        this.animate();
    }

    createParticle() {
        if (this.particles.length < 50) {
            this.particles.push({
                x: this.mouse.x,
                y: this.mouse.y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1,
                decay: Math.random() * 0.02 + 0.01
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;

            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = '#00ff41';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }

        requestAnimationFrame(() => this.animate());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

// Glitch Effect for Text
class GlitchEffect {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.section-title').forEach(title => {
            title.addEventListener('mouseenter', () => {
                this.glitch(title);
            });
        });
    }

    glitch(element) {
        const originalText = element.textContent;
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        let glitchText = '';

        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() > 0.8) {
                glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchText += originalText[i];
            }
        }

        element.textContent = glitchText;

        setTimeout(() => {
            element.textContent = originalText;
        }, 100);
    }
}

// Loading Animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        const loader = document.createElement('div');
        loader.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0a0a0a;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                font-family: 'JetBrains Mono', monospace;
                color: #00ff41;
                font-size: 1.5rem;
            ">
                <div>
                    <div style="text-align: center; margin-bottom: 20px;">
                        Loading Saifur's Portfolio...
                    </div>
                    <div style="
                        width: 300px;
                        height: 4px;
                        background: #333;
                        border-radius: 2px;
                        overflow: hidden;
                    ">
                        <div style="
                            width: 0%;
                            height: 100%;
                            background: linear-gradient(90deg, #00ff41, #00d9ff);
                            animation: loadBar 2s ease-in-out forwards;
                        "></div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(loader);

        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 500);
        }, 2000);
    }
}

// Konami Code Easter Egg
class KonamiCode {
    constructor() {
        this.sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        this.userSequence = [];
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            this.userSequence.push(e.keyCode);

            if (this.userSequence.length > this.sequence.length) {
                this.userSequence.shift();
            }

            if (this.arraysEqual(this.userSequence, this.sequence)) {
                this.activate();
            }
        });
    }

    arraysEqual(a, b) {
        return a.length === b.length && a.every((val, i) => val === b[i]);
    }

    activate() {
        document.body.style.animation = 'rainbow 2s infinite';

        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
            document.head.removeChild(style);
        }, 10000);

        console.log('🎉 Konami Code activated! You found the easter egg!');
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Add loading bar CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes loadBar {
            from { width: 0%; }
            to { width: 100%; }
        }
    `;
    document.head.appendChild(style);

    // Initialize all components
    new LoadingAnimation();
    new MatrixEffect();
    new SmoothScroll();
    new SkillAnimations();
    new TerminalSimulator();
    new ParticleSystem();
    new GlitchEffect();
    new KonamiCode();

    // Handle window resize
    window.addEventListener('resize', () => {
        // Re-initialize matrix effect
        const matrixCanvas = document.getElementById('matrix-canvas');
        if (matrixCanvas) {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        }
    });

    // Add floating animation to skill cards
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animation = 'float 6s ease-in-out infinite alternate';
    });

    // Add CSS for floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(floatStyle);
});

// Add some console art
console.log(`
    ███████╗ █████╗ ██╗███████╗██╗   ██╗██████╗
    ██╔════╝██╔══██╗██║██╔════╝██║   ██║██╔══██╗
    ███████╗███████║██║█████╗  ██║   ██║██████╔╝
    ╚════██║██╔══██║██║██╔══╝  ██║   ██║██╔══██╗
    ███████║██║  ██║██║██║     ╚██████╔╝██║  ██║
    ╚══════╝╚═╝  ╚═╝╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝

    Welcome to my portfolio!
    🐍 Python Automation Expert
    🔧 Reverse Engineering Learner
    🤖 AI & Technology Enthusiast

    Try the Konami Code: ↑↑↓↓←→←→BA
`);