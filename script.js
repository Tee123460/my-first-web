// ข้อความความในใจที่สามารถเปลี่ยนได้
const messages = [
    `น้องเองน่ารักมาก ตอนปล่อยผมม`,
    
    `คุยเเล้วรู้สึกดีมาก เเต่ซักวันพี่่อาจจะเบื่อ<br>
    น้องก็ได้ เเต่จะจําไว้ว่าเคยมีน้องน่ารักขนาดนี้`,
    
    `ถ้าอยู่ใกล้กัน พี่จับน้องตอกล่ะ รับรอง<br>
    ไม่ท้องก่อนวัย🥺 `,
    
    `พี่่เห็นรูปน้องล่ะพี่่เงี่่ยน มีบ้าง🥺`,
    
    `โดยปกติพี่ไม่ชอบรักทางไกล มันขาด<br>
    การสัมผัส ขอให้เข้าใจนะคนดี🥺`
];

// รูปภาพสำหรับแสดง (placeholder images)
const loveImages = [
    {
        url: 'img/download.png', // เปลี่ยนรูปภาพรักที่นี่
        caption: 'คนสวย🥺🥺🥺!'
    },
    {
        url: 'img/D1.jpg', // เปลี่ยนรูปภาพรักที่นี่
        caption: 'บี๋ ข๋าาาาาาา🥺'
    },
    {
        url: 'img/D2.jpg', // เปลี่ยนรูปภาพรักที่นี่
        caption: 'เธอคือทุกอย่างของฉัน💖'
    },
    {
        url: 'img/D3.jpg', // เปลี่ยนรูปภาพรักที่นี่
        caption: 'ความรักของเราสวยงาม💝'
    },
    {
        url: 'img/D4.jpg', // เปลี่ยนรูปภาพรักที่นี่
        caption: 'อยากอยู่กับเธอตลอดไป💗'
    }
];

const noLoveImages = [
    {
        url: 'img/m1.jpg', // เปลี่ยนรูปภาพไม่รักที่นี่
        caption: '💔 ขอโทษที่ทำให้เสียใจ'
    },
    {
        url: 'img/m2.jpg', // เปลี่ยนรูปภาพไม่รักที่นี่
        caption: 'เเล้วเราจะกลับมาพบกันในวันที่คิดถึงมากพอ😢'
    },
    {
        url: 'img/m3.jpg', // เปลี่ยนรูปภาพไม่รักที่นี่
        caption: 'เวลาไม่อาจรักษาทุกสิ่งเเต่การยอมรับความจิงจะรักษาทุกอย่าง😔'
    },
    {
        url: 'img/m4.jpg', // เปลี่ยนรูปภาพไม่รักที่นี่
        caption: 'ฉันเต็มที่เเล้วเเต่่ฉันไม่ดีพอ😿'
    },
    {
        url: 'img/m5.jpg', // เปลี่ยนรูปภาพไม่รักที่นี่
        caption: 'ฉันนี่เเย่จังเนาะ👋'
    }
];

let currentMessageIndex = 0;
let currentLoveIndex = 0;
let currentNoLoveIndex = 0;

// สร้างหิมะตก
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    
    document.querySelector('.snow-container').appendChild(snowflake);
    
    // ลบหิมะเมื่อตกลงถึงด้านล่าง
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

// เริ่มทำหิมะตก
function startSnowfall() {
    setInterval(createSnowflake, 300);
}

// เปลี่ยนข้อความ
function changeMessage() {
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    const messageText = document.getElementById('message-text');
    
    // เพิ่ม animation
    messageText.style.opacity = '0';
    messageText.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        messageText.innerHTML = messages[currentMessageIndex];
        messageText.style.opacity = '1';
        messageText.style.transform = 'translateY(0)';
    }, 300);
}

// เปิด modal รูปภาพ
function openImageModal() {
    const modal = document.getElementById('imageModal');
    const puzzleSection = document.getElementById('puzzle-section');
    const imageSection = document.getElementById('image-section');
    
    // แสดง puzzle section ซ่อนไว้ก่อน
    puzzleSection.style.display = 'block';
    imageSection.style.display = 'none';
    
    modal.style.display = 'block';
    
    // เริ่มเกม puzzle
    startPuzzleGame();
    
    // เล่นเพลงพื้นหลังเมื่อเปิด modal
    soundManager.playBackgroundMusic();
}

// เริ่มเกม puzzle
function startPuzzleGame() {
    const puzzle = puzzleGame.start();
    const questionElement = document.getElementById('puzzle-question');
    const messageElement = document.getElementById('puzzle-message');
    const hintElement = document.getElementById('puzzle-hint');
    const attemptElement = document.getElementById('attempt-count');
    
    // แสดงคำถาม
    questionElement.textContent = puzzle.question;
    
    // ล้างข้อความเก่า
    messageElement.textContent = '';
    messageElement.className = 'puzzle-message';
    hintElement.textContent = '';
    attemptElement.textContent = '0';
}

// ตรวจสอบคำตอบ puzzle (จากปุ่ม choice)
function checkPuzzleAnswer(answer) {
    const messageElement = document.getElementById('puzzle-message');
    const hintElement = document.getElementById('puzzle-hint');
    const attemptElement = document.getElementById('attempt-count');
    
    const result = puzzleGame.checkAnswer(answer);
    
    // อัพเดทข้อความ
    messageElement.textContent = result.message;
    if (result.success) {
        messageElement.className = 'puzzle-message success';
        
        // แสดงรูปภาพหลังจากผ่าน puzzle
        setTimeout(() => {
            showImageSection();
        }, 1500);
    } else {
        messageElement.className = 'puzzle-message';
        
        // แสดง hint ถ้ามี
        if (result.hint) {
            hintElement.textContent = `💡 เคล็ด: ${result.hint}`;
        }
    }
    
    // อัพเดทจำนวนครั้ง
    attemptElement.textContent = result.attempts.toString();
}

// แสดงส่วนรูปภาพหลังผ่าน puzzle
function showImageSection() {
    const puzzleSection = document.getElementById('puzzle-section');
    const imageSection = document.getElementById('image-section');
    const modalImage = document.getElementById('modalImage');
    const imageCaption = document.getElementById('imageCaption');
    
    // ซ่อน puzzle แสดงรูปภาพ
    puzzleSection.style.display = 'none';
    imageSection.style.display = 'block';
    
    // แสดงรูปภาพ placeholder เริ่มต้น
    modalImage.src = 'img/Tee.jpg';
    imageCaption.textContent = 'เลือกคำตอบของคุณ...';
    
    // เพิ่ม animation ให้รูปภาพ
    modalImage.style.opacity = '0';
    setTimeout(() => {
        modalImage.style.opacity = '1';
        modalImage.style.transition = 'opacity 0.5s ease';
    }, 100);
    
    // เล่นเสียงสำเร็จ
    soundManager.playLoveSound();
    
    // สร้างพลุสวยงามตอนผ่าน puzzle
    celebrationEffects.createFirework();
}

// แสดงรูปภาพเมื่อเลือกรัก
function showLoveImage() {
    const modalImage = document.getElementById('modalImage');
    const imageCaption = document.getElementById('imageCaption');
    
    // เพิ่มดัชนีทุกครั้งที่กดเพื่อให้แน่ใจว่าเปลี่ยนรูป
    currentLoveIndex = (currentLoveIndex + 1) % loveImages.length;
    const selectedImage = loveImages[currentLoveIndex];
    
    modalImage.style.opacity = '0';
    setTimeout(() => {
        modalImage.src = selectedImage.url;
        imageCaption.textContent = selectedImage.caption;
        modalImage.style.opacity = '1';
        
        // เล่นเสียงรัก
        soundManager.playLoveSound();
        
        // สร้าง Confetti ระเบิดตอนเลือกรัก
        const rect = modalImage.getBoundingClientRect();
        celebrationEffects.createConfetti(rect.left + rect.width/2, rect.top + rect.height/2);
        
        // สร้าง Heart Rain
        celebrationEffects.createHeartRain();
        
        // เพิ่ม heart effect
        createMultipleHearts();
        
        // เพิ่ม love counter
        memoryBox.addLove();
        
        // เพิ่ม memory
        memoryBox.addMemory('love', selectedImage.url, selectedImage.caption);
    }, 300);
}

// แสดงรูปภาพเมื่อเลือกไม่รัก
function showNoLoveImage() {
    const modalImage = document.getElementById('modalImage');
    const imageCaption = document.getElementById('imageCaption');
    
    // เพิ่มดัชนีทุกครั้งที่กดเพื่อให้แน่ใจว่าเปลี่ยนรูป
    currentNoLoveIndex = (currentNoLoveIndex + 1) % noLoveImages.length;
    const selectedImage = noLoveImages[currentNoLoveIndex];
    
    modalImage.style.opacity = '0';
    setTimeout(() => {
        modalImage.src = selectedImage.url;
        imageCaption.textContent = selectedImage.caption;
        modalImage.style.opacity = '1';
        
        // เล่นเสียงเศร้า
        soundManager.playSadSound();
        
        // เพิ่ม sad effect
        createSadEffect();
        
        // เพิ่ม no love counter
        memoryBox.addNoLove();
        
        // เพิ่ม memory
        memoryBox.addMemory('noLove', selectedImage.url, selectedImage.caption);
    }, 300);
}

// สร้างหัวใจหลายอัน
function createMultipleHearts() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '2000';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.animation = 'heartFloat 3s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
    }
}

// สร้าง sad effect
function createSadEffect() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const tear = document.createElement('div');
            tear.innerHTML = '💧';
            tear.style.position = 'fixed';
            tear.style.fontSize = '20px';
            tear.style.pointerEvents = 'none';
            tear.style.zIndex = '2000';
            tear.style.left = Math.random() * window.innerWidth + 'px';
            tear.style.top = '0px';
            tear.style.animation = 'tearFall 2s ease-in forwards';
            
            document.body.appendChild(tear);
            
            setTimeout(() => {
                tear.remove();
            }, 2000);
        }, i * 200);
    }
}

// ปิด modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // หยุดเพลงพื้นหลังเมื่อปิด modal
    soundManager.stopBackgroundMusic();
}

// อัพเดทข้อความจาก input
function updateMessage() {
    const customMessage = document.getElementById('customMessage').value.trim();
    const messageText = document.getElementById('message-text');
    
    if (customMessage) {
        // เพิ่ม animation
        messageText.style.opacity = '0';
        messageText.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            // แปลง newline เป็น <br>
            const formattedMessage = customMessage.replace(/\n/g, '<br>');
            messageText.innerHTML = formattedMessage;
            messageText.style.opacity = '1';
            messageText.style.transform = 'translateY(0)';
        }, 300);
        
        // เคลียร์ input
        document.getElementById('customMessage').value = '';
        
        // เพิ่ม effect ให้กล่องข้อความ
        const messageBox = document.querySelector('.message-box');
        messageBox.style.transform = 'scale(1.05)';
        setTimeout(() => {
            messageBox.style.transform = 'scale(1)';
        }, 200);
    }
}

// เพิ่ม CSS transitions แบบ dynamic
function addDynamicStyles() {
    const messageText = document.getElementById('message-text');
    messageText.style.transition = 'all 0.3s ease';
    
    const messageBox = document.querySelector('.message-box');
    messageBox.style.transition = 'transform 0.2s ease';
}

// สร้าง heart effect เมื่อคลิกปุ่ม
function createHeartEffect(element) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'heartFloat 2s ease-out forwards';
    
    const rect = element.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 - 10 + 'px';
    heart.style.top = rect.top + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// เพิ่ม CSS สำหรับ heart animation
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    
    // เริ่มทำหิมะตก
    startSnowfall();
    
    // ปุ่มเปิดรูปภาพ
    document.getElementById('reveal-btn').addEventListener('click', function() {
        openImageModal();
        createHeartEffect(this);
    });
    
    // ปุ่มเปลี่ยนข้อความ
    document.getElementById('change-btn').addEventListener('click', function() {
        changeMessage();
        // เพิ่ม sparkle effects
        celebrationEffects.createSparkles(this);
    });
    
    // ปุ่มเลือกรัก
    document.getElementById('love-btn').addEventListener('click', function() {
        showLoveImage();
        createHeartEffect(this);
    });
    
    // ปุ่มเลือกไม่รัก
    document.getElementById('no-love-btn').addEventListener('click', function() {
        showNoLoveImage();
        createSadEffect();
    });
    
    // ปุ่ม choice สำหรับ puzzle
    document.querySelectorAll('.btn-choice').forEach(button => {
        button.addEventListener('click', function() {
            const answer = this.getAttribute('data-answer');
            checkPuzzleAnswer(answer);
            // เพิ่ม sparkle effects
            celebrationEffects.createSparkles(this);
        });
    });
    
    // ปุ่มควบคุมเสียง
    document.getElementById('mute-btn').addEventListener('click', function() {
        const btn = this;
        if (btn.classList.contains('muted')) {
            // เปิดเสียง
            soundManager.setVolume(0.3, 0.5);
            btn.classList.remove('muted');
            btn.textContent = '🔊 เสียง';
        } else {
            // ปิดเสียง
            soundManager.setVolume(0, 0);
            btn.classList.add('muted');
            btn.textContent = '🔇 ปิดเสียง';
        }
    });
    
    // ปุ่มปิด modal
    document.querySelector('.close').addEventListener('click', closeImageModal);
    
    // คลิกนอก modal เพื่อปิด
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('imageModal');
        if (event.target === modal) {
            closeImageModal();
        }
    });
    
    // เพิ่ม hover effect ให้ปุ่มต่างๆ
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // เพิ่ม sparkle effect ให้กล่องข้อความเมื่อ hover
    const messageBox = document.querySelector('.message-box');
    messageBox.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 25px 50px rgba(118,75,162,0.2), 0 0 30px rgba(118,75,162,0.1)';
    });
    
    messageBox.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    });
});

// เพิ่ม CSS สำหรับ additional animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes tearFall {
        0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(calc(100vh + 100px)) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(additionalStyles);
