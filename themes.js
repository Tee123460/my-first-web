// Theme System
class ThemeManager {
    constructor() {
        this.currentTheme = 'default';
        this.themes = {
            default: {
                name: 'Default',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                snowColor: '#ffffff',
                messageBoxBg: 'rgba(255, 255, 255, 0.95)',
                buttonPrimary: 'linear-gradient(45deg, #667eea, #764ba2)',
                buttonSecondary: 'linear-gradient(45deg, #f093fb, #f5576c)',
                textColor: '#333333',
                headerColor: '#764ba2'
            },
            pink: {
                name: '💕 ความรัก',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ff4757 50%, #f093fb 100%)',
                snowColor: '#ff6b6b',
                messageBoxBg: 'rgba(255, 255, 255, 0.95)',
                buttonPrimary: 'linear-gradient(45deg, #ff6b6b, #ff4757)',
                buttonSecondary: 'linear-gradient(45deg, #f093fb, #ff4757)',
                textColor: '#333333',
                headerColor: '#ff4757'
            },
            blue: {
                name: '💙 ความสุข',
                background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #00cec9 100%)',
                snowColor: '#74b9ff',
                messageBoxBg: 'rgba(255, 255, 255, 0.95)',
                buttonPrimary: 'linear-gradient(45deg, #74b9ff, #0984e3)',
                buttonSecondary: 'linear-gradient(45deg, #00cec9, #74b9ff)',
                textColor: '#333333',
                headerColor: '#0984e3'
            },
            purple: {
                name: '💜 ความลึกลับ',
                background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 50%, #fd79a8 100%)',
                snowColor: '#a29bfe',
                messageBoxBg: 'rgba(255, 255, 255, 0.95)',
                buttonPrimary: 'linear-gradient(45deg, #6c5ce7, #a29bfe)',
                buttonSecondary: 'linear-gradient(45deg, #fd79a8, #6c5ce7)',
                textColor: '#333333',
                headerColor: '#6c5ce7'
            },
            dark: {
                name: '🌙 โรแมนติก',
                background: 'linear-gradient(135deg, #2d3436 0%, #636e72 50%, #2d3436 100%)',
                snowColor: '#dfe6e9',
                messageBoxBg: 'rgba(45, 52, 54, 0.95)',
                buttonPrimary: 'linear-gradient(45deg, #636e72, #2d3436)',
                buttonSecondary: 'linear-gradient(45deg, #b2bec3, #636e72)',
                textColor: '#dfe6e9',
                headerColor: '#dfe6e9'
            }
        };
    }

    // เปลี่ยนธีม
    changeTheme(themeName) {
        if (!this.themes[themeName]) return;
        
        const theme = this.themes[themeName];
        const root = document.documentElement;
        
        // เปลี่ยนสีพื้นหลัง
        document.body.style.background = theme.background;
        
        // เปลี่ยนสีหิมะ
        const snowflakes = document.querySelectorAll('.snowflake');
        snowflakes.forEach(snowflake => {
            snowflake.style.color = theme.snowColor;
        });
        
        // เปลี่ยนสีกล่องข้อความ
        const messageBox = document.querySelector('.message-box');
        if (messageBox) {
            messageBox.style.background = theme.messageBoxBg;
        }
        
        // เปลี่ยนสีปุ่ม
        const primaryButtons = document.querySelectorAll('.btn-primary');
        primaryButtons.forEach(btn => {
            btn.style.background = theme.buttonPrimary;
        });
        
        const secondaryButtons = document.querySelectorAll('.btn-secondary');
        secondaryButtons.forEach(btn => {
            btn.style.background = theme.buttonSecondary;
        });
        
        // เปลี่ยนสีข้อความ
        const textElements = document.querySelectorAll('#message-text, .puzzle-question, #imageCaption');
        textElements.forEach(elem => {
            elem.style.color = theme.textColor;
        });
        
        // เปลี่ยนสี header
        const header = document.querySelector('header h1');
        if (header) {
            header.style.color = theme.headerColor;
            header.style.textShadow = themeName === 'dark' ? '2px 2px 4px rgba(0,0,0,0.8)' : '2px 2px 4px rgba(255,255,255,0.3)';
        }
        
        // เปลี่ยนสี header p
        const headerP = document.querySelector('header p');
        if (headerP) {
            headerP.style.color = theme.headerColor;
            headerP.style.textShadow = themeName === 'dark' ? '1px 1px 2px rgba(0,0,0,0.8)' : '1px 1px 2px rgba(255,255,255,0.3)';
        }
        
        // เปลี่ยนสี h2 ใน message box
        const messageH2 = document.querySelector('.message-content h2');
        if (messageH2) {
            messageH2.style.color = theme.headerColor;
            messageH2.style.textShadow = themeName === 'dark' ? '1px 1px 2px rgba(0,0,0,0.8)' : '1px 1px 2px rgba(255,255,255,0.3)';
        }
        
        // Dark mode special adjustments
        if (themeName === 'dark') {
            document.body.classList.add('dark-theme');
            // เปลี่ยนสี modal
            const modalContent = document.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.background = 'rgba(45, 52, 54, 0.95)';
                modalContent.style.color = '#dfe6e9';
            }
        } else {
            document.body.classList.remove('dark-theme');
            const modalContent = document.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.background = 'white';
                modalContent.style.color = '#333333';
            }
        }
        
        this.currentTheme = themeName;
        
        // บันทึกธีมปัจจุบัน
        localStorage.setItem('selectedTheme', themeName);
    }

    // โหลดธีมที่บันทึกไว้
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme && this.themes[savedTheme]) {
            this.changeTheme(savedTheme);
        }
    }
}

// สร้าง instance
const themeManager = new ThemeManager();
