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
    // Spotlight Logic
    const overlay = document.querySelector('.spotlight-overlay');
    if (overlay) {
        overlay.style.setProperty('--x', `${e.clientX}px`);
        overlay.style.setProperty('--y', `${e.clientY}px`);
    }

    // Eye Tracking
    const pupils = document.querySelectorAll('.pupil');
    pupils.forEach(pupil => {
        const rect = pupil.getBoundingClientRect();
        const angle = Math.atan2(e.clientY - (rect.top + rect.height/2), e.clientX - (rect.left + rect.width/2));
        pupil.style.transform = `translate(${Math.cos(angle) * 5}px, ${Math.sin(angle) * 5}px)`;
    });

    // Precise Fix: Only animate boxes if we are in the About section
    const aboutSection = document.getElementById('about');
    if (aboutSection && aboutSection.classList.contains('active')) {
        const x = (e.clientX - window.innerWidth / 2) / 100;
        const y = (e.clientY - window.innerHeight / 2) / 100;
        document.querySelector('.box-top-left').style.transform = `translate(${x * 2}px, ${y * 2}px)`;
        document.querySelector('.box-top-right').style.transform = `translate(${x * -2}px, ${y * 2}px)`;
        document.querySelector('.box-bottom-left').style.transform = `translate(${x * 2}px, ${y * -2}px)`;
        document.querySelector('.box-bottom-right').style.transform = `translate(${x * -2}px, ${y * -2}px)`;
    }
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
    const tiltElements = document.querySelectorAll('.advantage-card, #method-card');

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


/* METHODOLOGY CLICK-FLIP SYSTEM */

const methodologySteps = [
    {
        num: "01",
        title: "Understanding Your Vision",
        desc: "We begin by learning about your business, goals, target audience, and design preferences. Every successful website starts with clarity."
    },
    {
        num: "02",
        title: "Planning & Design",
        desc: "Our team creates a structured layout and modern UI design that matches your brand identity. We ensure the design is both attractive and user-friendly."
    },
    {
        num: "03",
        title: "Development & Implementation",
        desc: "Once the design is approved, we turn it into a fast, responsive, and functional website using the latest technologies and best coding practices."
    },
    {
        num: "04",
        title: "Testing & Optimization",
        desc: "We thoroughly test the website across devices and browsers to ensure smooth performance, strong security, and fast loading speed."
    },
    {
        num: "05",
        title: "Launch & Deployment",
        desc: "After final approval, we launch your website with proper domain setup, hosting support, and SEO-ready configurations."
    }
];

let currentStep = 0;

function flipMethodology() {
    const card = document.getElementById('method-card');
    const heading = document.getElementById('method-heading');
    const description = document.getElementById('method-description');
    const stepNum = document.querySelector('.method-step-number');

    // Start rapid 3-flip animation
    card.classList.add('rapid-flip');

    // Change content halfway through the animation (400ms)
    setTimeout(() => {
        currentStep = (currentStep + 1) % methodologySteps.length;
        
        stepNum.textContent = methodologySteps[currentStep].num;
        heading.textContent = methodologySteps[currentStep].title;
        description.textContent = methodologySteps[currentStep].desc;
    }, 400);

    // Remove class so it can be clicked again
    setTimeout(() => {
        card.classList.remove('rapid-flip');
    }, 800);
}



/* LINEAR PROJECT CYCLE SYSTEM */

const projectList = [
    { label: "E-commerce", img: "images/ecommerce.jpg" },
    { label: "Business/Corporate", img: "images/business.jpg" },
    { label: "Portfolio", img: "images/portfolio.jpg" },
    { label: "Educational", img: "images/educational.jpg" },
    { label: "Blog", img: "images/blog.jpg" }
];

let currentProject = 0;

function rollProject() {
    const card = document.getElementById('project-card');
    const img = document.getElementById('project-img');
    const label = document.getElementById('project-label');

    if (card.classList.contains('slot-machine-roll')) return;

    card.classList.add('slot-machine-roll');

    // Content Swaps right as the 'Deceleration' phase begins
    setTimeout(() => {
        currentProject = (currentProject + 1) % projectList.length;
        img.src = projectList[currentProject].img;
        label.textContent = projectList[currentProject].label;
        
        // Update the color to your brand's cyan immediately upon swap
        label.style.color = "var(--accent-cyan)";
    }, 450);

    // Matches the 1.5s CSS duration
    setTimeout(() => {
        card.classList.remove('slot-machine-roll');
    }, 1500); 
}



/* PROJECT INFINITE REEL ENGINE */

/* PROJECT INFINITE REEL ENGINE - STUCK-PROOF VERSION */

let currentPos = 0;
const totalUniqueProjects = 5;
const frameH = 320; 

function startReel() {
    const strip = document.getElementById('project-reel-strip');
    
    // Prevent multiple clicks during the animation
    if (strip.style.pointerEvents === 'none') return;
    strip.style.pointerEvents = 'none';

    // 1. Roll forward
    currentPos += 3;
    strip.style.transition = "transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)";
    strip.style.transform = `translateY(-${currentPos * frameH}px)`;

    // 2. The Invisible Reset Logic
    setTimeout(() => {
        // If we've passed the first set of projects, reset instantly
        if (currentPos >= totalUniqueProjects) {
            strip.style.transition = "none"; // Disable animation
            currentPos = currentPos % totalUniqueProjects; // Calculate top position
            strip.style.transform = `translateY(-${currentPos * frameH}px)`;
            
            // This 'force reflow' is the secret to stop it from getting stuck
            void strip.offsetHeight; 
        }
        
        // Re-enable clicking
        strip.style.pointerEvents = 'auto';
    }, 1200); // Matches the 1.2s animation time
}





// Optimized Resize Listener
window.addEventListener('resize', () => {
    // 1. Recalculate Morph Tile
    updateMorphTile();
    
    // 2. Fix Reel Alignment (Force reset to prevent half-cut images)
    const strip = document.getElementById('project-reel-strip');
    if(strip) {
        // Snap to the nearest valid frame
        const currentOffset = currentPos * frameH;
        strip.style.transition = 'none';
        strip.style.transform = `translateY(-${currentOffset}px)`;
    }
});




