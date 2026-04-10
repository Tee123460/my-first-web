// Puzzle Game System
class PuzzleGame {
    constructor() {
        this.isSolved = false;
        this.attempts = 0;
        this.maxAttempts = 3;
        this.puzzles = [
            {
                question: "ความรักคืออะไร?",
                answers: ["ความรักคือความเข้าใจ", "ความรักคือความเสียสละ", "ความรักคือความใส่ใจ", "ความรักคือความซื่อสัตย์", "ความรักคือความผูกพัน"],
                hint: "ความรักมีหลายความหมาย แต่ทุกคำตอบถูกหมด"
            }
        ];
        this.currentPuzzle = null;
    }

    // เริ่มเกม puzzle
    start() {
        this.attempts = 0;
        this.isSolved = false;
        this.currentPuzzle = this.puzzles[Math.floor(Math.random() * this.puzzles.length)];
        return this.currentPuzzle;
    }

    // ตรวจสอบคำตอบ
    checkAnswer(answer) {
        this.attempts++;
        
        // ตรวจสอบคำตอบ (case-insensitive)
        const normalizedAnswer = answer.toLowerCase().trim();
        const isCorrect = this.currentPuzzle.answers.some(correctAnswer => 
            correctAnswer.toLowerCase() === normalizedAnswer
        );

        if (isCorrect) {
            this.isSolved = true;
            return {
                success: true,
                message: "🎉 ถูกต้อง! คุณผ่านด่านแล้ว",
                attempts: this.attempts
            };
        } else {
            const remainingAttempts = this.maxAttempts - this.attempts;
            if (remainingAttempts > 0) {
                return {
                    success: false,
                    message: `❌ ยังไม่ถูกครับ ลองใหม่อีก ${remainingAttempts} ครั้ง`,
                    hint: this.attempts >= 2 ? this.currentPuzzle.hint : null,
                    attempts: this.attempts
                };
            } else {
                return {
                    success: false,
                    message: "😢 เสียใจด้วยครับ คราวนี้ไม่ผ่าน",
                    gameOver: true,
                    attempts: this.attempts
                };
            }
        }
    }

    // สุ่ม puzzle ใหม่
    getRandomPuzzle() {
        return this.puzzles[Math.floor(Math.random() * this.puzzles.length)];
    }
}

// สร้าง instance ของ PuzzleGame
const puzzleGame = new PuzzleGame();
