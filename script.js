document.addEventListener('mousemove', (e) => {
    // 1. Move the Spotlight Mask
    const overlay = document.querySelector('.spotlight-overlay');
    if(overlay) {
        overlay.style.setProperty('--x', `${e.clientX}px`);
        overlay.style.setProperty('--y', `${e.clientY}px`);
    }

    // 2. Eye Tracking Logic for Characters
    const pupils = document.querySelectorAll('.pupil');
    pupils.forEach(pupil => {
        const rect = pupil.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = 5;
        pupil.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
    });
});

// Feature: Dynamic Typing Animation
const textElement = document.querySelector(".typewriter");
const phrases = ["Digital Frontiers.", "High-End UX.", "Fluid Interfaces."];
let pIdx = 0, cIdx = 0, isDel = false;

function type() {
    const curr = phrases[pIdx];
    textElement.textContent = isDel ? curr.substring(0, cIdx - 1) : curr.substring(0, cIdx + 1);
    cIdx = isDel ? cIdx - 1 : cIdx + 1;

    let speed = isDel ? 50 : 150;
    if (!isDel && cIdx === curr.length) { isDel = true; speed = 2500; }
    else if (isDel && cIdx === 0) { isDel = false; pIdx = (pIdx + 1) % phrases.length; speed = 500; }
    setTimeout(type, speed);
}

document.addEventListener("DOMContentLoaded", () => {
    if(textElement) type();
});