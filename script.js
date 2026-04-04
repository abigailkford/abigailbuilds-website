// ========================================
// ANIMATED COUNTER FOR STATS
// ========================================
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        // Add suffix based on which stat it is
                        if (index === 1) {
                            stat.textContent = target + '+'; // Projects Delivered
                        } else if (index === 2) {
                            stat.textContent = target + '%'; // On Time & On Budget
                        } else {
                            stat.textContent = target;
                        }
                    }
                };
                
                updateCounter();
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-row');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ========================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
const animatedElements = document.querySelectorAll(
    '.service-card, .project-card, .process-step, .testimonial-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// ADD ACTIVE STATE TO NAV LINKS
// ========================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ========================================
// FORM HANDLING
// ========================================
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const project = formData.get('project');
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Project Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject Details:\n${project}`);
        const mailtoLink = `mailto:hello@abigailbuilds.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show confirmation message
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Opening your email client...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// ========================================
// PRELOAD ANIMATIONS
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// EMAIL OBFUSCATION (anti-spam)
// ========================================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    // This is already visible, but you could add additional protection
    // For example, building the email dynamically
    link.addEventListener('click', (e) => {
        // Optional: Track email clicks for analytics
        console.log('Email link clicked');
    });
});

// ========================================
// PARTICLE EFFECT FOR HERO SECTION
// ========================================
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Create particles on load
window.addEventListener('load', createParticles);

// ========================================
// TYPING ANIMATION - REMOVED FOR ACCESSIBILITY
// ========================================
// Typing animation removed - it interferes with screen readers
// and adds unnecessary complexity

// ========================================
// PARALLAX EFFECT FOR HERO ICON
// ========================================
window.addEventListener('scroll', () => {
    const heroIcon = document.querySelector('.hero-icon');
    if (heroIcon) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3;
        heroIcon.style.transform = `translateY(${scrolled * parallaxSpeed}px) rotate(${scrolled * 0.05}deg)`;
    }
});

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});



// ========================================
// DYNAMIC GRADIENT BACKGROUND
// ========================================
function updateGradient() {
    const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    const hue = Math.floor(scrollPercent * 20 + 175); // Shift through teal/blue range
    document.documentElement.style.setProperty('--gradient-hue', hue);
}

window.addEventListener('scroll', updateGradient);

// ========================================
// STAGGERED FADE-IN FOR SERVICE CARDS
// ========================================
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// ========================================
// 3D TILT EFFECT FOR CARDS - DISABLED
// ========================================
// Tilt effect removed to keep hover animations cleaner
// Cards will use CSS hover effects only (grow + glow)

// ========================================
// CONSOLE MESSAGE (optional branding)
// ========================================
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #0F5F5C;');
console.log('%cLooking for a developer? Let\'s talk: hello@abigailbuilds.com', 'font-size: 14px; color: #6b7280;');
