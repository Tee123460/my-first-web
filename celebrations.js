// Confetti & Celebrations System
class CelebrationEffects {
    constructor() {
        this.container = document.body;
    }

    // สร้าง Confetti ระเบิด
    createConfetti(x, y) {
        const colors = ['#ff6b6b', '#ff4757', '#f093fb', '#667eea', '#764ba2', '#ffeaa7', '#74b9ff'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${x}px;
                top: ${y}px;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 10000;
                animation: confettiFall 3s ease-out forwards;
            `;
            
            // สุ่มทิศทาง
            const angle = (Math.PI * 2 * i) / confettiCount;
            const velocity = 5 + Math.random() * 10;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 10;
            
            confetti.style.setProperty('--vx', vx + 'px');
            confetti.style.setProperty('--vy', vy + 'px');
            
            this.container.appendChild(confetti);
            
            // ลบหลังจาก animation เสร็จ
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    // สร้างพลุสวยงาม
    createFirework() {
        const colors = ['#ff6b6b', '#f093fb', '#74b9ff', '#ffeaa7'];
        const positions = [
            { x: 20, y: 30 },
            { x: 80, y: 20 },
            { x: 50, y: 40 }
        ];
        
        positions.forEach((pos, index) => {
            setTimeout(() => {
                this.createFireworkBurst(pos.x, pos.y, colors);
            }, index * 500);
        });
    }

    createFireworkBurst(xPercent, yPercent, colors) {
        const x = (window.innerWidth * xPercent) / 100;
        const y = (window.innerHeight * yPercent) / 100;
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 10000;
                animation: fireworkBurst 2s ease-out forwards;
                box-shadow: 0 0 10px currentColor;
            `;
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 8 + Math.random() * 4;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--vx', vx + 'px');
            particle.style.setProperty('--vy', vy + 'px');
            
            this.container.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        }
    }

    // สร้าง Heart Rain
    createHeartRain() {
        const heartCount = 20;
        const hearts = ['❤️', '💕', '💖', '💗', '💝', '💞'];
        
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart-rain';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.cssText = `
                    position: fixed;
                    font-size: ${20 + Math.random() * 20}px;
                    left: ${Math.random() * 100}%;
                    top: -50px;
                    pointer-events: none;
                    z-index: 9999;
                    animation: heartFall 3s ease-in forwards;
                    opacity: 0.8;
                `;
                
                this.container.appendChild(heart);
                setTimeout(() => heart.remove(), 3000);
            }, i * 100);
        }
    }

    // สร้าง Sparkle Effects
    createSparkles(targetElement) {
        const sparkleCount = 15;
        const rect = targetElement.getBoundingClientRect();
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * rect.width}px;
                top: ${Math.random() * rect.height}px;
                pointer-events: none;
                z-index: 1000;
                animation: sparkle 1.5s ease-out forwards;
                box-shadow: 0 0 10px white;
            `;
            
            targetElement.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1500);
        }
    }
}

// สร้าง instance
const celebrationEffects = new CelebrationEffects();

// เพิ่ม CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) translate(var(--vx), calc(var(--vy) + 300px)) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes fireworkBurst {
        0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) translate(var(--vx), var(--vy)) scale(1.5);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) translate(var(--vx), calc(var(--vy) + 100px)) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes heartFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(calc(100vh + 50px)) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
