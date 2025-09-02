// Language switching functionality
class LanguageManager {
    constructor() {
        this.currentLang = 'zh-TW';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSavedLanguage();
    }

    bindEvents() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.closest('.lang-btn').dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && savedLang !== this.currentLang) {
            this.switchLanguage(savedLang);
        }
    }

    switchLanguage(lang) {
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });

        // Update all translatable elements
        const translatableElements = document.querySelectorAll('[data-zh-TW], [data-zh-CN], [data-en]');
        translatableElements.forEach(element => {
            // Convert hyphenated attribute names to camelCase for dataset access
            let datasetKey = lang;
            if (lang === 'zh-TW') {
                datasetKey = 'zhTw';
            } else if (lang === 'zh-CN') {
                datasetKey = 'zhCn';
            }
            
            const translation = element.dataset[datasetKey];
            if (translation) {
                element.textContent = translation;
            }
            
            // Handle tooltip attributes separately
            if (element.hasAttribute('data-tooltip')) {
                const tooltipTranslation = element.dataset[datasetKey];
                if (tooltipTranslation) {
                    element.setAttribute('data-tooltip', tooltipTranslation);
                }
            }
        });

        // Update document language
        document.documentElement.lang = lang;
        
        // Update page title
        const titles = {
            'zh-TW': '許智宣 - 資深產品經理 | 10年兩岸互聯網產品經驗',
            'zh-CN': '许智宣 - 资深产品经理 | 10年两岸互联网产品经验',
            'en': 'Xu Zhixuan - Senior Product Manager | 10 Years Cross-strait Internet Product Experience'
        };
        document.title = titles[lang] || titles['zh-TW'];

        // Save preference
        localStorage.setItem('preferred-language', lang);
        this.currentLang = lang;

        // Add animation effect
        this.addSwitchAnimation();
    }

    addSwitchAnimation() {
        const mainContent = document.querySelector('.main');
        const header = document.querySelector('.header');
        
        // Add transition effects
        mainContent.style.transition = 'all 0.4s ease';
        header.style.transition = 'all 0.4s ease';
        
        // Initial animation state
        mainContent.style.opacity = '0.8';
        mainContent.style.transform = 'translateY(10px) scale(0.99)';
        header.style.opacity = '0.9';
        
        // Show language switch feedback
        const activeLangBtn = document.querySelector('.lang-btn.active');
        if (activeLangBtn) {
            activeLangBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                activeLangBtn.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Reset to normal state
        setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0) scale(1)';
            header.style.opacity = '1';
            
            // Add a subtle bounce effect
            setTimeout(() => {
                mainContent.style.transform = 'translateY(-2px) scale(1)';
                setTimeout(() => {
                    mainContent.style.transform = 'translateY(0) scale(1)';
                    // Remove transition after animation
                    setTimeout(() => {
                        mainContent.style.transition = '';
                        header.style.transition = '';
                    }, 400);
                }, 100);
            }, 200);
        }, 150);
    }
}

// Smooth scrolling for navigation links
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Intersection Observer for animations
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe sections for animation
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            observer.observe(section);
        });

        // Observe timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            observer.observe(item);
        });

        // Observe project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            observer.observe(card);
        });

        // Observe skill categories
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach(category => {
            observer.observe(category);
        });

        // Observe contact items
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            observer.observe(item);
        });

        // Observe education items
        const educationItems = document.querySelectorAll('.education-item');
        educationItems.forEach(item => {
            observer.observe(item);
        });

        // Observe achievement items
        const achievementItems = document.querySelectorAll('.achievement-item, .influence-item');
        achievementItems.forEach(item => {
            observer.observe(item);
        });
    }
}

// Active navigation highlighting
class NavigationHighlighter {
    constructor() {
        this.init();
    }

    init() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-20% 0px -70% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all nav links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });

                    // Add active class to corresponding nav link
                    const targetId = entry.target.id;
                    const correspondingLink = document.querySelector(`[href="#${targetId}"]`);
                    if (correspondingLink) {
                        correspondingLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Typing animation for the tagline
class TypingAnimation {
    constructor() {
        this.init();
    }

    init() {
        const tagline = document.querySelector('.tagline');
        if (!tagline) return;

        const originalText = tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid rgba(255, 255, 255, 0.8)';
        tagline.style.animation = 'blink 1s infinite';

        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                tagline.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                tagline.style.borderRight = 'none';
                tagline.style.animation = 'none';
            }
        };

        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Add CSS for typing animation
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: rgba(255, 255, 255, 0.8); }
        51%, 100% { border-color: transparent; }
    }
    
    .nav-link.active {
        color: #3b82f6 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Parallax effect for header
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.header');
            const rate = scrolled * -0.5;
            
            if (header) {
                header.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Skill item hover effects
class SkillEffects {
    constructor() {
        this.init();
    }

    init() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-4px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Contact form validation (if needed in the future)
class ContactValidator {
    constructor() {
        this.init();
    }

    init() {
        // This can be expanded when contact form is added
        console.log('Contact validator initialized');
    }
}

// Initialize all classes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
    new SmoothScroller();
    new AnimationObserver();
    new NavigationHighlighter();
    new TypingAnimation();
    new ParallaxEffect();
    new SkillEffects();
    new ContactValidator();

    // Add loading animation to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        section.classList.add('fade-in-up');
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'translateY(-4px)';
            }, 150);
        });
    });

    // Add statistics counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                let currentNumber = 0;
                const increment = finalNumber / 30;
                
                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        target.textContent = finalNumber + '+';
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentNumber) + '+';
                    }
                }, 50);
                
                numberObserver.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => {
        numberObserver.observe(number);
    });
});

// Add some utility functions
window.addEventListener('load', () => {
    // Preload images if any are added later
    console.log('Portfolio website loaded successfully!');
    
    // Add some console styling for fun
    console.log('%c🎨 Portfolio Website', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with ❤️ for Xu Zhixuan', 'color: #64748b; font-size: 14px;');
});
