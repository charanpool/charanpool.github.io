/* ============================================
   CHARAN KOPPURAVURI - PORTFOLIO SCRIPTS
   ============================================ */

// -------------------- DOM Ready --------------------
document.addEventListener('DOMContentLoaded', () => {
    initSnowEffect();
    initThemeToggle();
    initMobileNav();
    initScrollAnimations();
    initStatCounters();
    initActiveNavLinks();
    initSmoothScroll();
});

// -------------------- Snow Effect --------------------
function initSnowEffect() {
    const canvas = document.getElementById('snow-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let snowflakes = [];
    let animationId;
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Create snowflake
    function createSnowflake() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            radius: Math.random() * 2 + 1,
            speed: Math.random() * 1 + 0.5,
            wind: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.3
        };
    }
    
    // Initialize snowflakes
    function initSnowflakes() {
        const count = Math.floor(window.innerWidth / 15); // Subtle density
        snowflakes = [];
        for (let i = 0; i < count; i++) {
            const flake = createSnowflake();
            flake.y = Math.random() * canvas.height; // Distribute across screen
            snowflakes.push(flake);
        }
    }
    
    // Draw snowflakes
    function drawSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get theme for color
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        
        snowflakes.forEach(flake => {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark 
                ? `rgba(255, 255, 255, ${flake.opacity * 0.6})` 
                : `rgba(100, 100, 120, ${flake.opacity * 0.4})`;
            ctx.fill();
        });
    }
    
    // Update snowflakes position
    function updateSnowflakes() {
        snowflakes.forEach(flake => {
            flake.y += flake.speed;
            flake.x += flake.wind;
            flake.x += Math.sin(flake.y * 0.01) * 0.3; // Gentle sway
            
            // Reset when off screen
            if (flake.y > canvas.height + 10) {
                flake.y = -10;
                flake.x = Math.random() * canvas.width;
            }
            if (flake.x > canvas.width + 10) {
                flake.x = -10;
            }
            if (flake.x < -10) {
                flake.x = canvas.width + 10;
            }
        });
    }
    
    // Animation loop
    function animate() {
        updateSnowflakes();
        drawSnowflakes();
        animationId = requestAnimationFrame(animate);
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initSnowflakes();
    });
    
    // Initialize
    resizeCanvas();
    initSnowflakes();
    animate();
    
    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// -------------------- Theme Toggle --------------------
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (!systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add transition class for smooth change
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// -------------------- Mobile Navigation --------------------
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// -------------------- Scroll Animations --------------------
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Stagger children animations
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('active');
                });
            }
        });
    }, observerOptions);
    
    // Observe sections and elements
    const animateElements = document.querySelectorAll(
        '.section-header, .timeline-item, .skill-category, .project-card, ' +
        '.achievement-card, .highlight-item, .education-card, .contact-card, ' +
        '.interest-item, .interests-section'
    );
    
    animateElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// -------------------- Stat Counters --------------------
function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateStats = () => {
        if (hasAnimated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCount();
        });
        
        hasAnimated = true;
    };
    
    // Trigger when hero section is visible
    const heroSection = document.querySelector('.hero-stats');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(heroSection);
    }
}

// -------------------- Active Navigation Links --------------------
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightNav = () => {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav(); // Initial check
}

// -------------------- Smooth Scroll --------------------
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// -------------------- Parallax Effect on Scroll --------------------
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Subtle parallax for hero content
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
}, { passive: true });

// -------------------- Navbar Background on Scroll --------------------
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'light'
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'light'
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(10, 10, 15, 0.8)';
    }
}, { passive: true });

// -------------------- Typing Effect for Subtitle --------------------
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const roles = [
        'Senior Backend Engineer',
        'AI Systems Architect',
        'Distributed Systems Expert',
        'Python Developer'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            subtitle.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start after initial animation
    setTimeout(type, 3000);
}

// Optional: Uncomment to enable typing effect
// initTypingEffect();

// -------------------- Console Easter Egg --------------------
console.log(`
%c👋 Hey there, fellow developer!
%c
Thanks for checking out my portfolio!
Built with ❤️ using vanilla HTML, CSS, and JavaScript.

Want to connect? 
→ GitHub: https://github.com/charanpool
→ LinkedIn: linkedin.com/in/charan-koppuravuri
→ Email: saicharan.koppuravuri99@gmail.com
`,
'color: #f59e0b; font-size: 18px; font-weight: bold;',
'color: #a0a0b0; font-size: 12px;'
);

