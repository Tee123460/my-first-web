// Love Counter System
class LoveCounter {
    constructor() {
        this.loveCount = 0;
        this.noLoveCount = 0;
        this.totalClicks = 0;
        this.loadStats();
        this.createCounterDisplay();
    }

    // โหลดสถิติจาก localStorage
    loadStats() {
        const saved = localStorage.getItem('loveStats');
        if (saved) {
            const stats = JSON.parse(saved);
            this.loveCount = stats.loveCount || 0;
            this.noLoveCount = stats.noLoveCount || 0;
            this.totalClicks = stats.totalClicks || 0;
        }
    }

    // บันทึกสถิติ
    saveStats() {
        const stats = {
            loveCount: this.loveCount,
            noLoveCount: this.noLoveCount,
            totalClicks: this.totalClicks
        };
        localStorage.setItem('loveStats', JSON.stringify(stats));
    }

    // เพิ่มความรัก
    addLove() {
        this.loveCount++;
        this.totalClicks++;
        this.saveStats();
        this.updateDisplay();
        this.createLoveAnimation();
    }

    // เพิ่นไม่รัก
    addNoLove() {
        this.noLoveCount++;
        this.totalClicks++;
        this.saveStats();
        this.updateDisplay();
        this.createSadAnimation();
    }

    // คำนวณเปอร์เซ็นต์ความรัก
    getLovePercentage() {
        if (this.totalClicks === 0) return 50;
        return Math.round((this.loveCount / this.totalClicks) * 100);
    }

    // สร้างหน้าแสดง counter
    createCounterDisplay() {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'love-counter-display';
        counterDiv.innerHTML = `
            <div class="counter-header">
                <h3>💕 สถิติความรัก</h3>
                <button class="counter-toggle">📊</button>
            </div>
            <div class="counter-content" style="display: none;">
                <div class="love-stats">
                    <div class="stat-item">
                        <span class="stat-label">❤️ รัก</span>
                        <span class="stat-value" id="love-count">${this.loveCount}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">💔 ไม่รัก</span>
                        <span class="stat-value" id="no-love-count">${this.noLoveCount}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">📊 ทั้งหมด</span>
                        <span class="stat-value" id="total-count">${this.totalClicks}</span>
                    </div>
                </div>
                <div class="love-percentage">
                    <div class="percentage-header">
                        <span>ความรักของเรา</span>
                        <span id="love-percentage">${this.getLovePercentage()}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-fill" style="width: ${this.getLovePercentage()}%"></div>
                    </div>
                </div>
                <div class="love-message" id="love-message">${this.getLoveMessage()}</div>
                <button class="reset-btn" id="reset-stats">🔄 เริ่มใหม่</button>
            </div>
        `;

        // เพิ่ม CSS
        const style = document.createElement('style');
        style.textContent = `
            .love-counter-display {
                position: fixed;
                top: 20px;
                left: 20px;
                background: rgba(255, 255, 255, 0.95);
                border-radius: 20px;
                padding: 15px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                z-index: 999;
                min-width: 280px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .counter-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .counter-header h3 {
                margin: 0;
                color: #764ba2;
                font-size: 1.1rem;
                font-weight: 600;
            }
            
            .counter-toggle {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            
            .counter-toggle:hover {
                transform: scale(1.1);
            }
            
            .counter-content {
                animation: slideDown 0.3s ease;
            }
            
            .love-stats {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 10px;
                margin-bottom: 15px;
            }
            
            .stat-item {
                text-align: center;
                padding: 10px;
                background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                border-radius: 10px;
            }
            
            .stat-label {
                display: block;
                font-size: 0.8rem;
                color: #6c757d;
                margin-bottom: 5px;
            }
            
            .stat-value {
                display: block;
                font-size: 1.2rem;
                font-weight: 700;
                color: #495057;
            }
            
            .love-percentage {
                margin-bottom: 15px;
            }
            
            .percentage-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }
            
            .percentage-header span:first-child {
                color: #495057;
                font-weight: 600;
            }
            
            .percentage-header span:last-child {
                color: #ff4757;
                font-weight: 700;
                font-size: 1.1rem;
            }
            
            .progress-bar {
                width: 100%;
                height: 12px;
                background: #e9ecef;
                border-radius: 6px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #ff6b6b, #ff4757);
                border-radius: 6px;
                transition: width 0.5s ease;
            }
            
            .love-message {
                text-align: center;
                padding: 10px;
                background: linear-gradient(135deg, #fff3cd, #ffeaa7);
                border-radius: 10px;
                margin-bottom: 15px;
                font-style: italic;
                color: #856404;
                font-weight: 500;
            }
            
            .reset-btn {
                width: 100%;
                padding: 8px;
                border: none;
                border-radius: 10px;
                background: linear-gradient(45deg, #6c757d, #495057);
                color: white;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .reset-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(108, 117, 125, 0.3);
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .love-animation {
                position: fixed;
                pointer-events: none;
                z-index: 10000;
                font-size: 2rem;
                animation: floatUp 2s ease-out forwards;
            }
            
            @keyframes floatUp {
                0% {
                    transform: translateY(0) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-30px) scale(1.2);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-60px) scale(0.8);
                    opacity: 0;
                }
            }
            
            @media (max-width: 768px) {
                .love-counter-display {
                    top: 10px;
                    left: 10px;
                    right: 10px;
                    min-width: auto;
                }
                
                .love-stats {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);

        // Event listeners
        const toggle = counterDiv.querySelector('.counter-toggle');
        const content = counterDiv.querySelector('.counter-content');
        const resetBtn = counterDiv.querySelector('#reset-stats');

        toggle.addEventListener('click', () => {
            if (content.style.display === 'none') {
                content.style.display = 'block';
                toggle.textContent = '📉';
            } else {
                content.style.display = 'none';
                toggle.textContent = '📊';
            }
        });

        resetBtn.addEventListener('click', () => {
            if (confirm('คุณแน่ใจหรือไม่ที่จะเริ่มนับใหม่?')) {
                this.resetStats();
            }
        });

        document.body.appendChild(counterDiv);
        this.updateDisplay();
    }

    // อัพเดทการแสดงผล
    updateDisplay() {
        const loveCountEl = document.getElementById('love-count');
        const noLoveCountEl = document.getElementById('no-love-count');
        const totalCountEl = document.getElementById('total-count');
        const percentageEl = document.getElementById('love-percentage');
        const progressEl = document.getElementById('progress-fill');
        const messageEl = document.getElementById('love-message');

        if (loveCountEl) loveCountEl.textContent = this.loveCount;
        if (noLoveCountEl) noLoveCountEl.textContent = this.noLoveCount;
        if (totalCountEl) totalCountEl.textContent = this.totalClicks;
        if (percentageEl) percentageEl.textContent = this.getLovePercentage() + '%';
        if (progressEl) progressEl.style.width = this.getLovePercentage() + '%';
        if (messageEl) messageEl.textContent = this.getLoveMessage();
    }

    // คำนวณข้อความความรัก
    getLoveMessage() {
        const percentage = this.getLovePercentage();
        if (percentage === 100) return '💕 ความรักสมบูรณ์แบบ! เหมือนเทพนิรมิตร!';
        if (percentage >= 80) return '💖 ความรักอุ่นหนาฝืดปราศรัย!';
        if (percentage >= 60) return '💗 ความรักที่กำลังเติบโต!';
        if (percentage >= 40) return '💝 ความรักที่ต้องดูแล!';
        if (percentage >= 20) return '💔 ความรักที่ยังไม่แน่นอน...';
        return '😢 ความรักที่ต้องพยายามมาก!';
    }

    // สร้าง animation ความรัก
    createLoveAnimation() {
        const hearts = ['❤️', '💕', '💖', '💗', '💝'];
        const heart = document.createElement('div');
        heart.className = 'love-animation';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = '20px';
        heart.style.top = '100px';
        heart.style.color = '#ff4757';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }

    // สร้าง animation เศร้า
    createSadAnimation() {
        const tears = ['💔', '😢', '😔', '💧'];
        const tear = document.createElement('div');
        tear.className = 'love-animation';
        tear.textContent = tears[Math.floor(Math.random() * tears.length)];
        tear.style.left = '20px';
        tear.style.top = '100px';
        tear.style.color = '#6c757d';
        document.body.appendChild(tear);
        setTimeout(() => tear.remove(), 2000);
    }

    // รีเซ็ตสถิติ
    resetStats() {
        this.loveCount = 0;
        this.noLoveCount = 0;
        this.totalClicks = 0;
        this.saveStats();
        this.updateDisplay();
    }
}

// สร้าง instance
const loveCounter = new LoveCounter();
