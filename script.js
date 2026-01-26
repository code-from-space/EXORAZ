/* EXORAZ FAST MORPH-FLIP ENGINE */

const morphTile = document.getElementById('global-morph-tile');
const scroller = document.getElementById('main-scroller');
const sections = document.querySelectorAll('.snap-section');

function updateMorphTile() {
    let currentFound = false;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        
        // Detection for active section
        if (!currentFound && rect.top >= -window.innerHeight / 2 && rect.top <= window.innerHeight / 2) {
            currentFound = true;
            section.classList.add('active');
            
            const placeholder = section.querySelector('.tile-placeholder');
            const pRect = placeholder.getBoundingClientRect();

            // Trigger Faster Flip
            morphTile.classList.add('flipping');
            
            // Apply New Size/Position immediately
            morphTile.style.width = `${pRect.width}px`;
            morphTile.style.height = `${pRect.height}px`;
            morphTile.style.top = `${pRect.top}px`;
            morphTile.style.left = `${pRect.left}px`;

            if (section.id === 'about') {
                const floatingBoxes = document.querySelectorAll('.floating-box');
                floatingBoxes.forEach(box => {
                    box.classList.add('animate-in');
                });
            }

            // Remove flipping state much faster (200ms)
            setTimeout(() => {
                morphTile.classList.remove('flipping');
            }, 200); 
        } else {
            section.classList.remove('active');
            if (section.id === 'about') {
                const floatingBoxes = document.querySelectorAll('.floating-box');
                floatingBoxes.forEach(box => {
                    box.classList.remove('animate-in');
                });
            }
        }
    });
}

// Mouse tracking
document.addEventListener('mousemove', (e) => {
    const overlay = document.querySelector('.spotlight-overlay');
    if (overlay) {
        overlay.style.setProperty('--x', `${e.clientX}px`);
        overlay.style.setProperty('--y', `${e.clientY}px`);
    }

    const pupils = document.querySelectorAll('.pupil');
    pupils.forEach(pupil => {
        const rect = pupil.getBoundingClientRect();
        const angle = Math.atan2(e.clientY - (rect.top + rect.height/2), e.clientX - (rect.left + rect.width/2));
        pupil.style.transform = `translate(${Math.cos(angle) * 5}px, ${Math.sin(angle) * 5}px)`;
    });

    const floatingBoxes = document.querySelectorAll('.floating-box');
    const x = (e.clientX - window.innerWidth / 2) / 100;
    const y = (e.clientY - window.innerHeight / 2) / 100;

    document.querySelector('.box-top-left').style.transform = `translateX(${x * 2}px) translateY(${y * 2}px)`;
    document.querySelector('.box-top-right').style.transform = `translateX(${x * -2}px) translateY(${y * 2}px)`;
    document.querySelector('.box-bottom-left').style.transform = `translateX(${x * 2}px) translateY(${y * -2}px)`;
    document.querySelector('.box-bottom-right').style.transform = `translateX(${x * -2}px) translateY(${y * -2}px)`;
});

// Typing logic
const phrases = ["Digital Frontiers.", "High-End UX Architecture.", "Fluid Interfaces."];
let pIdx = 0, cIdx = 0, isDel = false;

function type() {
    const textElement = document.querySelector(".typewriter");
    if(!textElement) return;
    const curr = phrases[pIdx];
    textElement.textContent = isDel ? curr.substring(0, cIdx - 1) : curr.substring(0, cIdx + 1);
    cIdx = isDel ? cIdx - 1 : cIdx + 1;
    let speed = isDel ? 40 : 80; // Sped up typing speed as well
    if (!isDel && cIdx === curr.length) { isDel = true; speed = 1500; }
    else if (isDel && cIdx === 0) { isDel = false; pIdx = (pIdx + 1) % phrases.length; speed = 300; }
    setTimeout(type, speed);
}

// Function to initialize advantage cards with parallax and rotating vectors
function initializeAdvantageCards() {
    const advantageCards = document.querySelectorAll('.advantage-card');

    advantageCards.forEach(card => {
        const vectorBg = card.querySelector('.card-vector-bg');

        // Apply random animation delay and duration for vector background
        if (vectorBg) {
            vectorBg.style.animationDelay = `${Math.random() * 5}s`; // 0-5s delay
            vectorBg.style.animationDuration = `${10 + Math.random() * 10}s`; // 10-20s duration
            
            // Randomize starting position and size slightly for variety
            const randomSize = 60 + Math.random() * 40; // 60-100px
            vectorBg.style.width = `${randomSize}px`;
            vectorBg.style.height = `${randomSize}px`;
            vectorBg.style.top = `${20 + Math.random() * 60}%`; // 20-80%
            vectorBg.style.left = `${20 + Math.random() * 60}%`; // 20-80%
        }

        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const centerX = cardRect.left + cardRect.width / 2;
            const centerY = cardRect.top + cardRect.height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const rotateY = (mouseX / cardRect.width) * 20; // Max 20deg rotation
            const rotateX = (mouseY / cardRect.height) * -20; // Max -20deg rotation

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });
}


scroller.addEventListener('scroll', updateMorphTile);
window.addEventListener('load', () => {
    updateMorphTile();
    type();
    initializeAdvantageCards(); // Initialize new advantage card effects
});
