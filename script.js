// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-link');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Mobile Menu Toggle
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('active', isMenuOpen);
    
    if (isMenuOpen) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        mobileMenuBtn.style.transform = 'rotate(90deg)';
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        mobileMenuBtn.style.transform = 'rotate(0deg)';
    }
}

// Close mobile menu when clicking on links
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        mobileMenuBtn.style.transform = 'rotate(0deg)';
    });
});

// Smooth Scrolling for Navigation Links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add click event listeners to all navigation links
[...navLinks, ...mobileLinks].forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScroll(target);
    });
});

// Scroll indicator click
scrollIndicator.addEventListener('click', () => {
    smoothScroll('#about');
});

// Navbar scroll effect and active link highlighting
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Navbar background change on scroll
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Circular Progress Animation
function animateProgress() {
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    progressCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const percentDeg = (percent / 100) * 360;
        
        // Set CSS custom property for the conic-gradient
        circle.style.setProperty('--percent', `${percentDeg}deg`);
        
        // Animate the progress
        circle.style.background = `conic-gradient(from 0deg, #60a5fa 0%, #60a5fa ${percentDeg}deg, rgba(255, 255, 255, 0.1) ${percentDeg}deg, rgba(255, 255, 255, 0.1) 360deg)`;
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation when stats section is visible
            if (entry.target.classList.contains('stats-section')) {
                animateCounters();
            }
            
            // Trigger progress animation when skills section is visible
            if (entry.target.classList.contains('skills-section')) {
                animateProgress();
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Observe stats and skills sections
document.querySelectorAll('.stats-section, .skills-section').forEach(el => {
    observer.observe(el);
});

// Typing animation for hero subtitle
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    const text = 'Frontend Engineer';
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            typingElement.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(() => {
                index = 0;
                typingElement.textContent = '';
                setTimeout(typeText, 500);
            }, 2000);
        }
    }
    
    typeText();
}

// Particle system for background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 3 + 's';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container);
        }
    }, 3000);
}

// Smooth reveal animations for cards
function initCardAnimations() {
    const cards = document.querySelectorAll('.card, .project-card, .experience-item, .education-item');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Enhanced scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card, .project-card, .experience-item, .skill-card, .education-item');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        animationObserver.observe(el);
    });
}

// Skills hover effects
function initSkillsInteractions() {
    const skillItems = document.querySelectorAll('.skill-list li');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px) scale(1.05)';
            item.style.color = '#60a5fa';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
            item.style.color = '#d1d5db';
        });
    });
}

// Project card 3D effect
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Avatar interaction
function initAvatarInteraction() {
    const avatar = document.querySelector('.avatar');
    
    avatar.addEventListener('click', () => {
        avatar.style.animation = 'none';
        avatar.offsetHeight; // Trigger reflow
        avatar.style.animation = 'avatarPulse 1s ease-in-out';
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(96, 165, 250, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '200px';
        ripple.style.height = '200px';
        ripple.style.marginLeft = '-100px';
        ripple.style.marginTop = '-100px';
        ripple.style.pointerEvents = 'none';
        
        avatar.style.position = 'relative';
        avatar.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Enhanced scroll to section function
function scrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const offsetTop = target.offsetTop - 70;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Add a highlight effect to the target section
        target.style.animation = 'sectionHighlight 2s ease';
        setTimeout(() => {
            target.style.animation = '';
        }, 2000);
    }
}

// Navbar background blur effect
function initNavbarEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        
        if (scrolled > 100) {
            navbar.style.background = `rgba(15, 23, 42, ${Math.min(0.95, scrolled / 200)})`;
            navbar.style.backdropFilter = `blur(${Math.min(20, scrolled / 10)}px)`;
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Preloader
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="loader"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    const preloaderStyles = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .preloader-content {
            text-align: center;
        }
        
        .loader {
            width: 60px;
            height: 60px;
            border: 3px solid rgba(96, 165, 250, 0.2);
            border-top: 3px solid #60a5fa;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        .preloader p {
            color: #60a5fa;
            font-size: 1.1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes sectionHighlight {
            0%, 100% { background: transparent; }
            50% { background: rgba(96, 165, 250, 0.1); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = preloaderStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(preloader);
    
    // Hide preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
                styleSheet.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize all animations and interactions
function init() {
    initPreloader();
    initTypingAnimation();
    initCardAnimations();
    initScrollAnimations();
    initSkillsInteractions();
    initProjectInteractions();
    initAvatarInteraction();
    initNavbarEffects();
    createParticles();
    
    // Add custom cursor effect
    initCustomCursor();
    
    // Add parallax effect to floating shapes
    initParallaxEffect();
    
    // Add smooth page transitions
    initPageTransitions();
}

// Custom cursor effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const cursorStyles = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(96, 165, 250, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
        }
        
        .custom-cursor.hover {
            width: 40px;
            height: 40px;
            background: rgba(96, 165, 250, 0.2);
            border: 2px solid #60a5fa;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = cursorStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .project-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Parallax effect for floating shapes
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Page transition effects
function initPageTransitions() {
    // Add smooth reveal on page load
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    });
    
    // Add loading states for navigation
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            
            // Add loading effect
            link.style.opacity = '0.7';
            link.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                scrollToSection(target);
                link.style.opacity = '1';
                link.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Email functionality enhancement
function initEmailHandling() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Add visual feedback
            const originalText = link.innerHTML;
            link.innerHTML = '<i class="fas fa-check"></i> Email Client Opening...';
            
            setTimeout(() => {
                link.innerHTML = originalText;
            }, 2000);
        });
    });
}

// Performance optimization
function initPerformanceOptimizations() {
    // Lazy load animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.willChange = 'transform, opacity';
            } else {
                entry.target.style.willChange = 'auto';
            }
        });
    });
    
    document.querySelectorAll('.card, .project-card, .experience-item').forEach(el => {
        animationObserver.observe(el);
    });
    
    // Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Your scroll logic here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// Accessibility enhancements
function initAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMobileMenu();
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, [tabindex]');
    
    focusableElements.forEach(el => {
        el.addEventListener('focus', () => {
            el.style.outline = '2px solid #60a5fa';
            el.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', () => {
            el.style.outline = 'none';
        });
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    
    const skipLinkStyles = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #60a5fa;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.2s ease;
        }
        
        .skip-link:focus {
            top: 6px;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = skipLinkStyles;
    document.head.appendChild(styleSheet);
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    initEmailHandling();
    initPerformanceOptimizations();
    initAccessibility();
});

// Add some Easter eggs
function initEasterEggs() {
    let clickCount = 0;
    const logo = document.querySelector('.logo');
    
    logo.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 5) {
            // Trigger confetti effect
            createConfetti();
            clickCount = 0;
        }
    });
    
    // Konami code Easter egg
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            triggerMatrixEffect();
            konamiCode = [];
        }
    });
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = `hsl(${Math.random() * 360}, 50%, 50%)`;
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '10000';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `confettiFall ${Math.random() * 2 + 1}s linear`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
    
    // Add confetti animation
    const confettiStyles = `
        @keyframes confettiFall {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = confettiStyles;
    document.head.appendChild(styleSheet);
    
    setTimeout(() => {
        styleSheet.remove();
    }, 3000);
}

function triggerMatrixEffect() {
    const matrix = document.createElement('div');
    matrix.style.position = 'fixed';
    matrix.style.top = '0';
    matrix.style.left = '0';
    matrix.style.width = '100%';
    matrix.style.height = '100%';
    matrix.style.background = 'rgba(0, 0, 0, 0.9)';
    matrix.style.zIndex = '10000';
    matrix.style.pointerEvents = 'none';
    matrix.innerHTML = '<div style="color: #00ff00; font-family: monospace; font-size: 20px; text-align: center; margin-top: 50vh; transform: translateY(-50%);">MATRIX MODE ACTIVATED!</div>';
    
    document.body.appendChild(matrix);
    
    setTimeout(() => {
        matrix.remove();
    }, 3000);
}

// Initialize Easter eggs
document.addEventListener('DOMContentLoaded', initEasterEggs);