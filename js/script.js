/**
 * ✨ Valentine's Day Website - Interactive Logic
 * Handles button evasion, page transitions, animations, and enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize common features
    initFloatingHearts();
    initSparkles();
    initMusicPlayer();

    // Page-specific logic
    if (document.getElementById('btn-no')) {
        initProposalPage();
        initConfetti();
        initModal();
    }

    if (document.getElementById('transport-plan')) {
        initTheatrePage();
        initTimeline();
        initCollapsible();
    }

    if (document.getElementById('final-message')) {
        initCafePage();
    }

    // Global transitions & Secret Feature
    initPageTransitions();
    initSecretFeature();
});

/* =========================================
   🎵 MUSIC PLAYER MODULE
   ========================================= */
function initMusicPlayer() {
    const audio = document.getElementById('bg-music');
    if (!audio) return;

    // Create toggle button
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'music-toggle';
    toggleBtn.innerHTML = '🔇'; // Default muted
    toggleBtn.title = "Play Music";
    document.body.appendChild(toggleBtn);

    // Load saved state
    const isPlaying = localStorage.getItem('music_autoplaying') === 'true';
    const currentTime = parseFloat(localStorage.getItem('music_timestamp') || 0);

    if (isPlaying) {
        audio.currentTime = currentTime;
        audio.volume = 0.5;
        // Auto-play might be blocked by browser, so we handle promise
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                toggleBtn.innerHTML = '🔊';
            }).catch(error => {
                console.log("Auto-play prevented by browser policy");
                toggleBtn.innerHTML = '🔇';
                localStorage.setItem('music_autoplaying', 'false');
            });
        }
    }

    // Toggle logic
    toggleBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.volume = 0.5;
            audio.play();
            toggleBtn.innerHTML = '🔊';
            localStorage.setItem('music_autoplaying', 'true');
        } else {
            audio.pause();
            toggleBtn.innerHTML = '🔇';
            localStorage.setItem('music_autoplaying', 'false');
        }
    });

    // Save timestamp periodically
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem('music_timestamp', audio.currentTime);
        }
    }, 1000);
}

/* =========================================
   ✨ ANIMATION MODULES (Sparkles & Confetti)
   ========================================= */
function initSparkles() {
    const container = document.getElementById('sparkle-container');
    if (!container) return;

    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        sparkle.style.left = `${x}%`;
        sparkle.style.top = `${y}%`;

        container.appendChild(sparkle);

        // Remove after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }, 500); // New sparkle every 500ms
}

function initConfetti() {
    // Confetti logic acts on demand (when YES is clicked)
    window.triggerConfetti = () => {
        const container = document.getElementById('confetti-container');
        const colors = ['#ffc0cb', '#ff69b4', '#ffd700', '#ffffff'];

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() + 's';

            container.appendChild(confetti);
        }
    };
}

/* =========================================
   💌 PAGE 1: PROPOSAL LOGIC
   ========================================= */
function initProposalPage() {
    const noBtn = document.getElementById('btn-no');
    const yesBtn = document.getElementById('btn-yes');

    // NO Button Evasion
    if (noBtn) {
        noBtn.addEventListener('mouseover', (e) => moveButtonRandomly(noBtn));
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveButtonRandomly(noBtn);
        });
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moveButtonRandomly(noBtn);
            alert("Nice try! But you have to say YES! 😜");
        });
    }

    // YES Button Handling
    if (yesBtn) {
        yesBtn.addEventListener('click', handleYesClick);
    }
}

function handleYesClick() {
    // 1. Trigger Confetti
    if (typeof window.triggerConfetti === "function") {
        window.triggerConfetti();
    }

    // 2. Show Success Message
    const successMsg = document.getElementById('success-msg');
    if (successMsg) {
        successMsg.classList.add('active');
    }

    // 3. Redirect after 1200ms
    setTimeout(function () {
        window.location.href = "theatre.html";
    }, 1200);
}

function initModal() {
    const modal = document.getElementById('why-modal');
    const link = document.getElementById('why-link');
    const close = document.getElementById('close-modal');

    if (link && modal && close) {
        link.addEventListener('click', () => modal.classList.add('active'));
        close.addEventListener('click', () => modal.classList.remove('active'));

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
}

function moveButtonRandomly(btn) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnRect = btn.getBoundingClientRect();

    const maxLeft = viewportWidth - btnRect.width - 20;
    const maxTop = viewportHeight - btnRect.height - 20;

    const newLeft = Math.max(20, Math.random() * maxLeft);
    const newTop = Math.max(20, Math.random() * maxTop);

    btn.style.position = 'fixed';
    btn.style.left = `${newLeft}px`;
    btn.style.top = `${newTop}px`;
    btn.style.zIndex = '1000';
}

/* =========================================
   🎭 PAGE 2: THEATRE & TIMELINE logic
   ========================================= */
function initTheatrePage() {
    const textarea = document.getElementById('transport-plan');
    if (textarea) {
        const savedPlan = localStorage.getItem('valentine_transport_plan');
        if (savedPlan) textarea.value = savedPlan;

        textarea.addEventListener('input', (e) => {
            localStorage.setItem('valentine_transport_plan', e.target.value);
        });
    }
}

function initTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
}

function initCollapsible() {
    const btn = document.getElementById('note-toggle');
    const content = document.querySelector('.collapsible-content');

    if (btn && content) {
        btn.addEventListener('click', () => {
            const isOpen = content.classList.contains('open');
            if (isOpen) {
                content.classList.remove('open');
                btn.classList.remove('active');
            } else {
                content.classList.add('open');
                btn.classList.add('active');
            }
        });
    }
}

/* =========================================
   ☕ PAGE 3: CAFE & ANIMATIONS
   ========================================= */
function initCafePage() {
    initRotatingText();
    initTypewriter();
}

function initRotatingText() {
    const texts = document.querySelectorAll('.rotate-text');
    let currentIndex = 0;

    if (texts.length === 0) return;

    setInterval(() => {
        texts[currentIndex].classList.remove('active');
        texts[currentIndex].classList.add('exit');

        let prevIndex = currentIndex;
        currentIndex = (currentIndex + 1) % texts.length;

        // Reset exit class after animation
        setTimeout(() => {
            texts[prevIndex].classList.remove('exit');
        }, 500);

        texts[currentIndex].classList.add('active');

    }, 4000); // Change every 4 seconds
}

function initTypewriter() {
    const container = document.getElementById('final-message');
    const text = "Thank you for choosing me. Always.";
    let index = 0;

    function type() {
        if (index < text.length) {
            container.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 100); // Typing speed
        }
    }

    // Start typing after a short delay
    setTimeout(type, 1000);
}

/* =========================================
   🔒 SECRET FEATURE (L-O-V-E)
   ========================================= */
function initSecretFeature() {
    let keySequence = [];
    const secretCode = ['l', 'o', 'v', 'e'];

    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();

        // Check if key matches next expected key
        if (key === secretCode[keySequence.length]) {
            keySequence.push(key);

            // Check success
            if (keySequence.length === secretCode.length) {
                window.location.href = 'letter.html';
                keySequence = []; // Reset
            }
        } else {
            keySequence = []; // Reset on wrong key
            // Also check if this wrong key starts the sequence
            if (key === secretCode[0]) keySequence.push(key);
        }
    });
}

/* =========================================
   🚀 GLOBAL UTILITIES
   ========================================= */
function initPageTransitions() {
    // Intercept generic links for smooth transition
    const links = document.querySelectorAll('a[href^="theatre.html"], a[href^="cafe.html"], a[href^="letter.html"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            const card = document.querySelector('.card, .paper-container');

            if (card) card.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });
    });
}

function initFloatingHearts() {
    const container = document.getElementById('bg-hearts');
    if (!container) return;

    const heartCount = 15;
    const symbols = ['❤', '💖', '💕', '💗', '✨'];

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];

        const leftPos = Math.random() * 100;
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 10;
        const size = 1 + Math.random() * 2;

        heart.style.left = `${leftPos}%`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `-${delay}s`;
        heart.style.fontSize = `${size}rem`;

        container.appendChild(heart);
    }
}
