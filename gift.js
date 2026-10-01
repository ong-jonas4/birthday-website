class SequenceController {
    constructor() {
        this.currentStep = 0;
        this.isPlaying = false;
    }
    
    start() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        
        setTimeout(() => this.step1Fireworks(), 500);
        setTimeout(() => this.step2Flower(), 2500);
        setTimeout(() => this.step3Photos(), 7000);
        setTimeout(() => this.step4Message(), 8500);
    }
    
    step1Fireworks() {
        console.log('Fireworks starting...');
        const container = document.getElementById('fireworksContainer');
        
        for (let burst = 0; burst < 6; burst++) {
            setTimeout(() => {
                this.createFireworkBurst(container);
            }, burst * 300);
        }
    }
    
    createFireworkBurst(container) {
        const burstX = Math.random() * window.innerWidth;
        const burstY = Math.random() * (window.innerHeight * 0.6) + 100;
        const colors = ['#ff69b4', '#ffb3d9', '#ffd700', '#ff1493', '#fff0f5'];
        
        for (let i = 0; i < 30; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = Math.random() * 8 + 4;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            firework.style.background = color;
            firework.style.left = burstX + 'px';
            firework.style.top = burstY + 'px';
            firework.style.boxShadow = `0 0 10px ${color}`;
            
            container.appendChild(firework);
            
            let x = burstX;
            let y = burstY;
            let vx = Math.cos(angle) * velocity;
            let vy = Math.sin(angle) * velocity;
            let life = 1;
            
            const animate = () => {
                life -= 0.02;
                x += vx;
                y += vy;
                vy += 0.1;
                
                firework.style.left = x + 'px';
                firework.style.top = y + 'px';
                firework.style.opacity = life;
                
                if (life > 0) {
                    requestAnimationFrame(animate);
                } else {
                    firework.remove();
                }
            };
            
            animate();
        }
    }
    
    step2Flower() {
        console.log('Flowers growing...');
        const flowerSection = document.getElementById('flowerSection');
        flowerSection.classList.add('show');
    }
    
    step3Photos() {
        console.log('Photos appearing...');
        const gallerySection = document.getElementById('gallerySection');
        gallerySection.classList.add('show');
        
        const photoItems = document.querySelectorAll('.photo-item');
        photoItems.forEach(item => {
            item.classList.add('show');
        });
    }
    
    step4Message() {
        console.log('Message appearing...');
        const messageSection = document.getElementById('messageSection');
        messageSection.classList.add('show');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const sequence = new SequenceController();
    setTimeout(() => {
        sequence.start();
    }, 500);
});