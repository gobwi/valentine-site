/**
 * ✨ Valentine's Day Website - Interactive Logic
 * Handles button evasion, page transitions, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize common features
    initFloatingHearts();
    
    // Page-specific logic
    if (document.getElementById('btn-no')) {
        initProposalPage();
    }
    
    if (document.getElementById('transport-plan')) {
        initTheatrePage();
    }

    // Global transitions
    initPageTransitions();
});

/**
 * 💌 Page 1: Proposal Logic (NO button evasion)
 */
function initProposalPage() {
    const noBtn = document.getElementById('btn-no');
    const yesBtn = document.getElementById('btn-yes');
    
    if (!noBtn || !yesBtn) return;

    // Desktop: Mouse hover evasion
    noBtn.addEventListener('mouseover', (e) => {
        moveButtonRandomly(noBtn);
    });

    // Mobile: Touch start evasion
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click
        moveButtonRandomly(noBtn);
    });
    
    // Just in case they manage to click it
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButtonRandomly(noBtn);
        alert("Nice try! But you have to say YES! 😜");
    });

    // YES Button handling
    yesBtn.addEventListener('click', () => {
        const card = document.querySelector('.card');
        card.classList.add('fade-out');
        
        // Confetti effect could go here
        
        setTimeout(() => {
            window.location.href = 'theatre.html';
        }, 500);
    });
}

/**
 * 🤪 Move button to a random position within viewport
 */
function moveButtonRandomly(btn) {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get button dimensions
    const btnRect = btn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    // Calculate safe area (keep within 10% - 90% of screen)
    // We use 'fixed' positioning to move it relative to viewport
    const maxLeft = viewportWidth - btnWidth - 20;
    const maxTop = viewportHeight - btnHeight - 20;
    
    const newLeft = Math.max(20, Math.random() * maxLeft);
    const newTop = Math.max(20, Math.random() * maxTop);
    
    // Apply new position
    btn.style.position = 'fixed';
    btn.style.left = `${newLeft}px`;
    btn.style.top = `${newTop}px`;
    btn.style.zIndex = '1000'; // Ensure it stays on top
    
    // Add "scared" shake effect
    btn.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(-5deg)' },
        { transform: 'rotate(5deg)' },
        { transform: 'rotate(0deg)' }
    ], {
        duration: 200,
        iterations: 1
    });
}

/**
 * 🎭 Page 2: Theatre Page Logic
 */
function initTheatrePage() {
    const textarea = document.getElementById('transport-plan');
    
    // Save their sweet message to local storage (optional fun feature)
    if (textarea) {
        // Load saved text
        const savedPlan = localStorage.getItem('valentine_transport_plan');
        if (savedPlan) textarea.value = savedPlan;
        
        // Save on input
        textarea.addEventListener('input', (e) => {
            localStorage.setItem('valentine_transport_plan', e.target.value);
        });
    }
}

/**
 * 🚀 Smooth Page Transitions
 */
function initPageTransitions() {
    // Intercept generic links for smooth transition
    const links = document.querySelectorAll('a[href^="theatre.html"], a[href^="cafe.html"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            const card = document.querySelector('.card');
            
            card.classList.add('fade-out');
            
            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });
    });
}

/**
 * 💖 Background Floating Hearts
 */
function initFloatingHearts() {
    const container = document.getElementById('bg-hearts');
    if (!container) return;
    
    const heartCount = 15; // Number of floating hearts
    const symbols = ['❤', '💖', '💕', '💗', '✨'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Randomize starting position and animation duration
        const leftPos = Math.random() * 100;
        const duration = 10 + Math.random() * 20; // 10-30s
        const delay = Math.random() * 10;
        const size = 1 + Math.random() * 2; // 1-3rem
        
        heart.style.left = `${leftPos}%`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `-${delay}s`; // start mid-animation
        heart.style.fontSize = `${size}rem`;
        
        container.appendChild(heart);
    }
}
