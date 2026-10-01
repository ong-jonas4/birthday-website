const openBtn = document.getElementById("sparkle-btn");
const hero = document.querySelector(".hero");
const message = document.getElementById("message");
const titleElement = document.querySelector('h1, .title, .header, [class*="birthday page"]');
const giftButton = document.querySelector('button, [class*="sparkle-btn"], [class*="sparkle-btn"]');

// For reveal sections - change to match your structure:
const revealSection = document.querySelector('[class*="reveal"], [class*="gift-content"]');
// ============================================
// ROMANTIC BIRTHDAY WEBSITE - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // 1. PAGE LOAD ANIMATION
  // ============================================
  
  function initPageLoad() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.8s ease-in-out';
    
    
    setTimeout(() => {
      body.style.opacity = '1';
    }, 100);
  }
  

  function animateTitle() {
    const titleElement = document.querySelector('h1, .title, .header, [class*="happy"]');
    
    if (!titleElement) return;
    
    titleElement.style.opacity = '0';
    titleElement.style.transform = 'translateY(-20px)';
    titleElement.style.transition = 'all 0.8s ease-out 0.5s';
    
    setTimeout(() => {
      titleElement.style.opacity = '1';
      titleElement.style.transform = 'translateY(0)';
    }, 100);
  }
  

  function revealTextByCharacter(element, speed = 50) {
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let index = 0;
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }
    type();
  }
  
  // ============================================
  // 3. FLOATING HEARTS & CONFETTI
  // ============================================
  
  function createFloatingHearts() {
    const container = document.body;
    const heartSymbols = ['❤️', '💕', '💖', '✨'];
    
    function createHeart() {
      const heart = document.createElement('div');
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      heart.style.position = 'fixed';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.top = '-30px';
      heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
      heart.style.opacity = Math.random() * 0.5 + 0.5;
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '1';
      heart.style.animation = 'float-up 6s ease-in forwards';
      heart.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      
      container.appendChild(heart);
      
      setTimeout(() => heart.remove(), 6000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 1500);
    
    // Initial burst of hearts
    for (let i = 0; i < 5; i++) {
      setTimeout(createHeart, i * 300);
    }
  }
  
  // ============================================
  // 4. CLICK/TAP HEART ANIMATIONS
  // ============================================
  
  function setupClickHearts() {
    document.addEventListener('click', function(e) {
      createClickHeart(e.clientX, e.clientY);
    });
    
    // Touch support for mobile
    document.addEventListener('touchend', function(e) {
      if (e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        createClickHeart(touch.clientX, touch.clientY);
      }
    });
  }
  
  function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'pop-up 1s ease-out forwards';
    heart.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }
  
  // ============================================
  // 5. GIFT BUTTON INTERACTION
  // ============================================
  
  function setupGiftButton() {
    const giftButton = document.querySelector('button, [class*="gift"], [class*="button"]');
    
    if (!giftButton) return;
    
    // Add hover animations
    giftButton.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.08)';
      this.style.boxShadow = '0 10px 30px rgba(255, 105, 180, 0.4)';
    });
    
    giftButton.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 4px 15px rgba(255, 105, 180, 0.2)';
    });
    
    // Active state for touch/click
    giftButton.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    giftButton.addEventListener('mouseup', function() {
      this.style.transform = 'scale(1.08)';
    });
    
    // Click handler
    giftButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Ripple effect
      createRipple(e, this);
      
      // Button reaction
      this.style.animation = 'button-pop 0.6s ease-out';
      
      // Burst of hearts
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          createClickHeart(
            this.getBoundingClientRect().left + this.offsetWidth / 2,
            this.getBoundingClientRect().top + this.offsetHeight / 2
          );
        }, i * 50);
      }
      
      // Reveal next section
      revealNextSection();
      
      // Disable button after click
      this.disabled = true;
      this.style.opacity = '0.7';
    });
  }
  
  function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple-animation 0.8s ease-out';
    ripple.style.transform = 'scale(0)';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
  }
  
  // ============================================
  // 6. REVEAL NEXT SECTION
  // ============================================
  
  function revealNextSection() {
    // Look for hidden sections or content to reveal
    const hiddenSections = document.querySelectorAll('[style*="display: none"], .hidden, [class*="hidden"]');
    const revealSection = document.querySelector('[class*="reveal"], [class*="gift-content"], [class*="message"]');
    
    if (revealSection) {
      revealSection.style.display = 'block';
      revealSection.style.opacity = '0';
      revealSection.style.transform = 'scale(0.8) translateY(20px)';
      revealSection.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      
      setTimeout(() => {
        revealSection.style.opacity = '1';
        revealSection.style.transform = 'scale(1) translateY(0)';
      }, 50);
      
      // Animate text in revealed section
      const textElements = revealSection.querySelectorAll('p, h2, h3');
      textElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transition = `opacity 0.6s ease-out ${0.2 + index * 0.15}s`;
        setTimeout(() => {
          el.style.opacity = '1';
        }, 50);
      });
    }
  }
  
  // ============================================
  // 7. MESSAGE TEXT REVEAL EFFECT
  // ============================================
  
  function setupMessageReveal() {
    const messageElements = document.querySelectorAll('[class*="message"], [class*="text"], p');
    
    messageElements.forEach(element => {
      // Only animate on first meaningful paragraph
      if (element.textContent.length > 20 && !element.classList.contains('no-animate')) {
        revealTextByCharacter(element, 40);
      }
    });
  }
  
  // ============================================
  // 8. SMOOTH SCROLL & TRANSITIONS
  // ============================================
  
  function setupSmoothTransitions() {
    const elements = document.querySelectorAll('*');
    
    elements.forEach(el => {
      if (!el.style.transition) {
        el.style.transition = 'all 0.3s ease';
      }
    });
  }
  
  // ============================================
  // 9. FINAL SURPRISE MESSAGE
  // ============================================
  
  function setupSurpriseMessage() {
    let interactionCount = 0;
    
    document.addEventListener('click', function() {
      interactionCount++;
      
      // Show surprise after multiple interactions
      if (interactionCount === 7) {
        showSurprise();
      }
    });
  }
  
  function showSurprise() {
    const surprise = document.createElement('div');
    surprise.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: rgba(255, 192, 203, 0.95);
      color: #d63384;
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      z-index: 10000;
      max-width: 80%;
      backdrop-filter: blur(10px);
      animation: surprise-pop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      box-shadow: 0 20px 60px rgba(255, 105, 180, 0.4);
    `;
    
    surprise.textContent = '✨ You make every day a celebration! ✨';
    document.body.appendChild(surprise);
    
    // Burst of hearts around the message
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        createClickHeart(
          window.innerWidth / 2 + (Math.random() - 0.5) * 200,
          window.innerHeight / 2 + (Math.random() - 0.5) * 200
        );
      }, i * 60);
    }
    
    setTimeout(() => {
      surprise.style.animation = 'surprise-pop-out 0.6s ease-in forwards';
    }, 3000);
    
    setTimeout(() => surprise.remove(), 3600);
  }
  
  // ============================================
  // 10. CSS ANIMATIONS (Add to your stylesheet)
  // ============================================
  
  function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-up {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
      
      @keyframes pop-up {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -150px) scale(0);
          opacity: 0;
        }
      }
      
      @keyframes button-pop {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      
      @keyframes ripple-animation {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(2);
          opacity: 0;
        }
      }
      
      @keyframes surprise-pop {
        0% {
          transform: translate(-50%, -50%) scale(0) rotateZ(-10deg);
          opacity: 0;
        }
        60% {
          transform: translate(-50%, -50%) scale(1.1) rotateZ(5deg);
        }
        100% {
          transform: translate(-50%, -50%) scale(1) rotateZ(0);
          opacity: 1;
        }
      }
      
      @keyframes surprise-pop-out {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }
      }
      
      /* Mobile responsive animations */
      @media (max-width: 768px) {
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-80vh) rotate(360deg);
            opacity: 0;
          }
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // ============================================
  // 11. MOBILE OPTIMIZATIONS
  // ============================================
  
  function optimizeForMobile() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Reduce animation frequency on mobile
      document.body.style.willChange = 'transform';
      
      // Touch feedback
      document.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.classList.contains('button')) {
          e.target.style.opacity = '0.8';
        }
      });
      
      document.addEventListener('touchend', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.classList.contains('button')) {
          e.target.style.opacity = '1';
        }
      });
    }
  }
  
  // ============================================
  // 12. INITIALIZE ALL FUNCTIONS
  // ============================================
  
  // Add animation styles first
  addAnimationStyles();
  
  // Run all initialization functions
  initPageLoad();
  setTimeout(animateTitle, 300);
  setTimeout(() => setupMessageReveal(), 800);
  setupGiftButton();
  setupClickHearts();
  createFloatingHearts();
  setupSmoothTransitions();
  setupSurpriseMessage();
  optimizeForMobile();
  
  // ============================================
  // 13. BUTTON HOVER STYLES (CSS fallback)
  // ============================================
  
  const giftButton = document.querySelector('button, [class*="gift"], [class*="button"]');
  if (giftButton) {
    giftButton.style.cursor = 'pointer';
    giftButton.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }
});
openBtn.addEventListener("click", function ()  {

    hero.classList.add("hidden");
    message.classList.remove("hidden");
    
});