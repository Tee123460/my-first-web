// Memory Box System
class MemoryBox {
    constructor() {
        this.memories = [];
        this.loveCount = 0;
        this.noLoveCount = 0;
        this.totalClicks = 0;
        this.loadMemories();
        this.loadStats();
        this.createMemoryBoxDisplay();
    }

    // โหลดความทรงจำจาก localStorage
    loadMemories() {
        const saved = localStorage.getItem('loveMemories');
        if (saved) {
            this.memories = JSON.parse(saved);
        }
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
    }

    // เพิ่มไม่รัก
    addNoLove() {
        this.noLoveCount++;
        this.totalClicks++;
        this.saveStats();
        this.updateDisplay();
    }

    // คำนวณเปอร์เซ็นต์ความรัก
    getLovePercentage() {
        if (this.totalClicks === 0) return 50;
        return Math.round((this.loveCount / this.totalClicks) * 100);
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

    // รีเซ็ตสถิติ
    resetStats() {
        this.loveCount = 0;
        this.noLoveCount = 0;
        this.totalClicks = 0;
        this.saveStats();
        this.updateDisplay();
    }

    // บันทึกความทรงจำ
    saveMemories() {
        localStorage.setItem('loveMemories', JSON.stringify(this.memories));
    }

    // เพิ่มความทรงจำใหม่
    addMemory(type, imageUrl, caption) {
        const memory = {
            id: Date.now(),
            type: type, // 'love' หรือ 'noLove'
            imageUrl: imageUrl,
            caption: caption,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('th-TH'),
            time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
        };

        this.memories.unshift(memory); // เพิ่มไว้ข้างหน้าสุด
        
        // จำกัดจำนวนความทรงจำ (เก็บไว้แค่ 20 อันล่าสุด)
        if (this.memories.length > 20) {
            this.memories = this.memories.slice(0, 20);
        }

        this.saveMemories();
        this.updateDisplay();
    }

    // สร้างหน้าแสดง Memory Box
    createMemoryBoxDisplay() {
        const memoryBox = document.createElement('div');
        memoryBox.className = 'memory-box-display';
        memoryBox.innerHTML = `
            <div class="memory-header">
                <h3>💝 กล่องความทรงจำ</h3>
                <button class="memory-toggle">📖</button>
            </div>
            <div class="memory-content" style="display: none;">
                <!-- Love Stats Section -->
                <div class="love-stats-section">
                    <h4>💕 สถิติความรัก</h4>
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
                </div>
                
                <!-- Memory Stats Section -->
                <div class="memory-stats">
                    <span class="total-memories">ทั้งหมด: <span id="memory-count">${this.memories.length}</span> ความทรงจำ</span>
                </div>
                <div class="memory-timeline" id="memory-timeline">
                    <!-- Memories will be added here -->
                </div>
                <div class="action-buttons">
                    <button class="clear-memories-btn" id="clear-memories">🗑️ ล้างความทรงจำ</button>
                    <button class="reset-stats-btn" id="reset-stats">🔄 เริ่มสถิติใหม่</button>
                </div>
            </div>
        `;

        // เพิ่ม CSS
        const style = document.createElement('style');
        style.textContent = `
            .memory-box-display {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.95);
                border-radius: 20px;
                padding: 15px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                z-index: 998;
                min-width: 350px;
                max-width: 450px;
                max-height: 600px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .memory-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .memory-header h3 {
                margin: 0;
                color: #764ba2;
                font-size: 1.1rem;
                font-weight: 600;
            }
            
            .memory-toggle {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            
            .memory-toggle:hover {
                transform: scale(1.1);
            }
            
            .memory-content {
                animation: slideUp 0.3s ease;
                max-height: 500px;
                overflow-y: auto;
            }
            
            /* Love Stats Section */
            .love-stats-section {
                margin-bottom: 20px;
                padding: 15px;
                background: linear-gradient(135deg, #fff3cd, #ffeaa7);
                border-radius: 15px;
                border: 2px solid #ffc107;
            }
            
            .love-stats-section h4 {
                margin: 0 0 15px 0;
                text-align: center;
                color: #856404;
                font-size: 1rem;
                font-weight: 600;
            }
            
            .love-stats {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 8px;
                margin-bottom: 12px;
            }
            
            .stat-item {
                text-align: center;
                padding: 8px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 8px;
            }
            
            .stat-label {
                display: block;
                font-size: 0.7rem;
                color: #6c757d;
                margin-bottom: 3px;
            }
            
            .stat-value {
                display: block;
                font-size: 1rem;
                font-weight: 700;
                color: #495057;
            }
            
            .love-percentage {
                margin-bottom: 12px;
            }
            
            .percentage-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 6px;
            }
            
            .percentage-header span:first-child {
                color: #856404;
                font-weight: 600;
                font-size: 0.85rem;
            }
            
            .percentage-header span:last-child {
                color: #ff4757;
                font-weight: 700;
                font-size: 0.95rem;
            }
            
            .progress-bar {
                width: 100%;
                height: 10px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 5px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #ff6b6b, #ff4757);
                border-radius: 5px;
                transition: width 0.5s ease;
            }
            
            .love-message {
                text-align: center;
                padding: 8px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 8px;
                font-style: italic;
                color: #856404;
                font-weight: 500;
                font-size: 0.8rem;
            }
            
            .action-buttons {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
            
            .clear-memories-btn, .reset-stats-btn {
                flex: 1;
                padding: 8px;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
                font-size: 0.85rem;
            }
            
            .clear-memories-btn {
                background: linear-gradient(45deg, #dc3545, #c82333);
                color: white;
            }
            
            .clear-memories-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
            }
            
            .reset-stats-btn {
                background: linear-gradient(45deg, #6c757d, #495057);
                color: white;
            }
            
            .reset-stats-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(108, 117, 125, 0.3);
            }
            
            .memory-stats {
                text-align: center;
                padding: 10px;
                background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                border-radius: 10px;
                margin-bottom: 15px;
            }
            
            .total-memories {
                color: #495057;
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .memory-timeline {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 15px;
            }
            
            .memory-item {
                display: flex;
                align-items: center;
                padding: 12px;
                background: linear-gradient(135deg, #fff, #f8f9fa);
                border-radius: 12px;
                border-left: 4px solid #764ba2;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .memory-item:hover {
                transform: translateX(-5px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .memory-item.love {
                border-left-color: #ff4757;
            }
            
            .memory-item.noLove {
                border-left-color: #6c757d;
            }
            
            .memory-image {
                width: 50px;
                height: 50px;
                border-radius: 8px;
                object-fit: cover;
                margin-right: 12px;
                border: 2px solid #e9ecef;
            }
            
            .memory-info {
                flex: 1;
                min-width: 0;
            }
            
            .memory-type {
                font-size: 0.8rem;
                font-weight: 600;
                margin-bottom: 4px;
            }
            
            .memory-type.love {
                color: #ff4757;
            }
            
            .memory-type.noLove {
                color: #6c757d;
            }
            
            .memory-caption {
                font-size: 0.9rem;
                color: #495057;
                margin-bottom: 4px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .memory-time {
                font-size: 0.75rem;
                color: #6c757d;
            }
            
            .clear-memories-btn {
                width: 100%;
                padding: 10px;
                border: none;
                border-radius: 10px;
                background: linear-gradient(45deg, #dc3545, #c82333);
                color: white;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .clear-memories-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
            }
            
            .empty-memories {
                text-align: center;
                padding: 40px 20px;
                color: #6c757d;
                font-style: italic;
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            /* Scrollbar styling */
            .memory-content::-webkit-scrollbar {
                width: 6px;
            }
            
            .memory-content::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 3px;
            }
            
            .memory-content::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 3px;
            }
            
            .memory-content::-webkit-scrollbar-thumb:hover {
                background: #555;
            }
            
            @media (max-width: 768px) {
                .memory-box-display {
                    bottom: 10px;
                    right: 10px;
                    left: 10px;
                    min-width: auto;
                    max-width: none;
                    max-height: 70vh;
                }
                
                .memory-content {
                    max-height: 60vh;
                }
                
                .love-stats {
                    grid-template-columns: 1fr;
                    gap: 6px;
                }
                
                .stat-item {
                    padding: 6px;
                }
                
                .love-stats-section {
                    padding: 10px;
                    margin-bottom: 15px;
                }
                
                .action-buttons {
                    flex-direction: column;
                    gap: 8px;
                }
                
                .memory-item {
                    padding: 10px;
                }
                
                .memory-image {
                    width: 40px;
                    height: 40px;
                }
                
                .memory-header h3 {
                    font-size: 1rem;
                }
                
                .love-stats-section h4 {
                    font-size: 0.9rem;
                }
            }
            
            @media (max-width: 480px) {
                .memory-box-display {
                    bottom: 5px;
                    right: 5px;
                    left: 5px;
                    padding: 10px;
                    max-height: 75vh;
                }
                
                .memory-content {
                    max-height: 65vh;
                }
                
                .love-stats-section {
                    padding: 8px;
                }
                
                .stat-item {
                    padding: 5px;
                }
                
                .memory-item {
                    padding: 8px;
                }
                
                .memory-image {
                    width: 35px;
                    height: 35px;
                }
                
                .memory-caption {
                    font-size: 0.8rem;
                }
                
                .memory-time {
                    font-size: 0.7rem;
                }
            }
        `;
        document.head.appendChild(style);

        // Event listeners
        const toggle = memoryBox.querySelector('.memory-toggle');
        const content = memoryBox.querySelector('.memory-content');
        const clearBtn = memoryBox.querySelector('#clear-memories');
        const resetBtn = memoryBox.querySelector('#reset-stats');

        toggle.addEventListener('click', () => {
            if (content.style.display === 'none') {
                content.style.display = 'block';
                toggle.textContent = '📕';
            } else {
                content.style.display = 'none';
                toggle.textContent = '📖';
            }
        });

        clearBtn.addEventListener('click', () => {
            if (confirm('คุณแน่ใจหรือไม่ที่จะล้างความทรงจำทั้งหมด?')) {
                this.clearMemories();
            }
        });
        
        resetBtn.addEventListener('click', () => {
            if (confirm('คุณแน่ใจหรือไม่ที่จะเริ่มนับสถิติใหม่?')) {
                this.resetStats();
            }
        });

        document.body.appendChild(memoryBox);
        this.updateDisplay();
    }

    // อัพเดทการแสดงผล
    updateDisplay() {
        const timeline = document.getElementById('memory-timeline');
        const countEl = document.getElementById('memory-count');
        const loveCountEl = document.getElementById('love-count');
        const noLoveCountEl = document.getElementById('no-love-count');
        const totalCountEl = document.getElementById('total-count');
        const percentageEl = document.getElementById('love-percentage');
        const progressEl = document.getElementById('progress-fill');
        const messageEl = document.getElementById('love-message');
        
        if (!timeline) return;

        // Update memory count
        if (countEl) {
            countEl.textContent = this.memories.length;
        }
        
        // Update love stats
        if (loveCountEl) loveCountEl.textContent = this.loveCount;
        if (noLoveCountEl) noLoveCountEl.textContent = this.noLoveCount;
        if (totalCountEl) totalCountEl.textContent = this.totalClicks;
        if (percentageEl) percentageEl.textContent = this.getLovePercentage() + '%';
        if (progressEl) progressEl.style.width = this.getLovePercentage() + '%';
        if (messageEl) messageEl.textContent = this.getLoveMessage();

        if (this.memories.length === 0) {
            timeline.innerHTML = '<div class="empty-memories">ยังไม่มีความทรงจำ... เริ่มสร้างความทรงจำแรกกัน!</div>';
            return;
        }

        timeline.innerHTML = this.memories.map(memory => `
            <div class="memory-item ${memory.type}" data-id="${memory.id}">
                <img src="${memory.imageUrl}" alt="Memory" class="memory-image" onerror="this.src='img/Tee.jpg'">
                <div class="memory-info">
                    <div class="memory-type ${memory.type}">
                        ${memory.type === 'love' ? '❤️ รัก' : '💔 ไม่รัก'}
                    </div>
                    <div class="memory-caption">${memory.caption}</div>
                    <div class="memory-time">${memory.date} ${memory.time}</div>
                </div>
            </div>
        `).join('');

        // เพิ่ม event listener สำหรับคลิก memory item
        timeline.querySelectorAll('.memory-item').forEach(item => {
            item.addEventListener('click', () => {
                const memoryId = parseInt(item.getAttribute('data-id'));
                this.showMemoryDetail(memoryId);
            });
        });
    }

    // แสดงรายละเอียดความทรงจำ
    showMemoryDetail(memoryId) {
        const memory = this.memories.find(m => m.id === memoryId);
        if (!memory) return;

        // สร้าง modal แสดงรายละเอียด
        const modal = document.createElement('div');
        modal.className = 'memory-detail-modal';
        modal.innerHTML = `
            <div class="memory-detail-content">
                <span class="memory-detail-close">&times;</span>
                <h3>${memory.type === 'love' ? '❤️ ความรัก' : '💔 ความทรงจำ'}</h3>
                <img src="${memory.imageUrl}" alt="Memory" class="memory-detail-image" onerror="this.src='img/Tee.jpg'">
                <p class="memory-detail-caption">${memory.caption}</p>
                <div class="memory-detail-time">
                    <div>${memory.date}</div>
                    <div>${memory.time}</div>
                </div>
            </div>
        `;

        // เพิ่ม CSS สำหรับ modal
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .memory-detail-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
                animation: fadeIn 0.3s ease;
            }
            
            .memory-detail-content {
                background: white;
                padding: 30px;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                position: relative;
                animation: slideIn 0.3s ease;
            }
            
            .memory-detail-close {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 28px;
                cursor: pointer;
                color: #aaa;
            }
            
            .memory-detail-close:hover {
                color: #000;
            }
            
            .memory-detail-image {
                width: 100%;
                max-width: 300px;
                height: auto;
                border-radius: 15px;
                margin: 20px 0;
                border: 3px solid #e9ecef;
            }
            
            .memory-detail-caption {
                font-size: 1.1rem;
                color: #333;
                margin: 15px 0;
                font-style: italic;
            }
            
            .memory-detail-time {
                color: #6c757d;
                font-size: 0.9rem;
                display: flex;
                justify-content: center;
                gap: 15px;
            }
        `;
        document.head.appendChild(modalStyle);

        document.body.appendChild(modal);

        // Event listeners
        const closeBtn = modal.querySelector('.memory-detail-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            modalStyle.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                modalStyle.remove();
            }
        });
    }

    // ล้างความทรงจำ
    clearMemories() {
        this.memories = [];
        this.saveMemories();
        this.updateDisplay();
    }
}

// สร้าง instance
const memoryBox = new MemoryBox();
