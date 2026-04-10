// เสียงเพลงและ effect เสียง
class SoundManager {
    constructor() {
        this.bgMusic = null;
        this.loveSound = null;
        this.sadSound = null;
        this.isInitialized = false;
    }

    // เริ่มต้นเสียง
    init() {
        if (this.isInitialized) return;
        
        // สร้าง audio elements
        this.bgMusic = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        this.loveSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
        this.sadSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
        
        // ตั้งค่าเพลงพื้นหลัง
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.3;
        this.bgMusic.preload = 'auto';
        
        // ตั้งค่าเสียง effect
        this.loveSound.volume = 0.5;
        this.sadSound.volume = 0.5;
        this.loveSound.preload = 'auto';
        this.sadSound.preload = 'auto';
        
        this.isInitialized = true;
    }

    // เล่นเพลงพื้นหลัง
    playBackgroundMusic() {
        if (!this.isInitialized) this.init();
        
        this.bgMusic.play().catch(e => {
            console.log('ไม่สามารถเล่นเพลงพื้นหลังได้:', e);
        });
    }

    // หยุดเพลงพื้นหลัง
    stopBackgroundMusic() {
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
        }
    }

    // เล่นเสียงรัก
    playLoveSound() {
        if (!this.isInitialized) this.init();
        
        this.loveSound.currentTime = 0;
        this.loveSound.play().catch(e => {
            console.log('ไม่สามารถเล่นเสียงรักได้:', e);
        });
    }

    // เล่นเสียงเศร้า
    playSadSound() {
        if (!this.isInitialized) this.init();
        
        this.sadSound.currentTime = 0;
        this.sadSound.play().catch(e => {
            console.log('ไม่สามารถเล่นเสียงเศร้าได้:', e);
        });
    }

    // ปรับระดับเสียง
    setVolume(bgVolume = 0.3, effectVolume = 0.5) {
        if (this.bgMusic) this.bgMusic.volume = bgVolume;
        if (this.loveSound) this.loveSound.volume = effectVolume;
        if (this.sadSound) this.sadSound.volume = effectVolume;
    }
}

// สร้าง instance ของ SoundManager
const soundManager = new SoundManager();
