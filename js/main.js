document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeThemeToggle();
    initializeScrollAnimations();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeTypingAnimation();
    initializeCounterAnimation();
    initializeParallaxEffects();
    initializeScrollToTop(); // Add this
    initializeLanguageSelector(); // Add this
    initializeTestimonialSlider(); // Add this
    initializeFAQ(); // Add this
    initializeKeyboardNavigation(); // Add this
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animatedElements = document.querySelectorAll('.feature-card, .audience-card, .pricing-card, .platform-card, .testimonial-card');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('slide-in-left');
        observer.observe(heroContent);
    }

    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.classList.add('slide-in-right');
        observer.observe(heroVisual);
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (validateForm(data)) {
                // Simulate form submission
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
            }
        });
    }

    function validateForm(data) {
        const { name, email, subject, message } = data;
        
        if (!name.trim()) {
            showNotification('Please enter your name.', 'error');
            return false;
        }
        
        if (!email.trim() || !isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return false;
        }
        
        if (!subject.trim()) {
            showNotification('Please select a subject.', 'error');
            return false;
        }
        
        if (!message.trim()) {
            showNotification('Please enter your message.', 'error');
            return false;
        }
        
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing animation for hero title
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const originalText = heroTitle.innerHTML;
    const highlightElement = heroTitle.querySelector('.highlight');
    
    if (highlightElement) {
        const highlightText = highlightElement.textContent;
        let currentText = '';
        let index = 0;
        let isDeleting = false;
        let isTypingHighlight = false;
        
        // Simple typing effect for the highlight text
        function typeEffect() {
            if (!isTypingHighlight) {
                isTypingHighlight = true;
                highlightElement.textContent = '';
                
                function typeHighlight() {
                    if (index < highlightText.length) {
                        highlightElement.textContent += highlightText.charAt(index);
                        index++;
                        setTimeout(typeHighlight, 100);
                    }
                }
                
                setTimeout(typeHighlight, 1000);
            }
        }
        
        // Start typing animation when element is visible
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeEffect();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(heroTitle);
    }
}

// Counter animation for statistics
function initializeCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
    
    function animateCounter(element) {
        const target = element.textContent;
        const isNumber = /^\d+/.test(target);
        
        if (isNumber) {
            const endValue = parseInt(target.replace(/\D/g, ''));
            const suffix = target.replace(/[\d,]/g, '');
            let current = 0;
            const increment = endValue / 50;
            const duration = 2000;
            const stepTime = duration / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= endValue) {
                    current = endValue;
                    clearInterval(timer);
                }
                
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }, stepTime);
        }
    }
}

// Parallax effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.app-window');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.1;
        
        parallaxElements.forEach(element => {
            element.style.transform = `rotateY(-5deg) rotateX(5deg) translateY(${parallax}px)`;
        });
    });
}

// Scroll to top button functionality
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize language selector (placeholder for future multi-language support)
function initializeLanguageSelector() {
    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'it', name: 'Italiano', flag: '🇮🇹' },
        { code: 'pt', name: 'Português', flag: '🇵🇹' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'zh', name: '中文', flag: '🇨🇳' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'ko', name: '한국어', flag: '🇰🇷' },
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
    ];

    // Store available languages for future use
    window.availableLanguages = languages;
}

// Initialize testimonial slider
function initializeTestimonialSlider() {
    const testimonialGrid = document.querySelector('.testimonials-grid');
    if (!testimonialGrid) return;

    let currentSlide = 0;
    const testimonials = testimonialGrid.querySelectorAll('.testimonial-card');
    
    if (testimonials.length <= 1) return;

    // Add navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    dotsContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-top: 32px;
    `;

    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'testimonial-dot';
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: none;
            background-color: ${index === 0 ? 'var(--primary-color)' : 'var(--border-color)'};
            cursor: pointer;
            transition: background-color 0.3s ease;
        `;
        
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    testimonialGrid.parentNode.appendChild(dotsContainer);

    function goToSlide(index) {
        currentSlide = index;
        
        // Update testimonials visibility
        testimonials.forEach((testimonial, i) => {
            testimonial.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
        });

        // Update dots
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, i) => {
            dot.style.backgroundColor = i === currentSlide ? 'var(--primary-color)' : 'var(--border-color)';
        });
    }

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        goToSlide(currentSlide);
    }, 5000);
}

// Initialize FAQ section (expandable)
function initializeFAQ() {
    const faqData = [
        {
            question: "How many bookmarks can I store with the free plan?",
            answer: "The free plan allows you to store up to 1,000 bookmarks with basic categorization features."
        },
        {
            question: "Is my data secure with Kutu?",
            answer: "Yes! We use end-to-end encryption for all your data. Your bookmarks are encrypted both in transit and at rest."
        },
        {
            question: "Can I import bookmarks from other browsers?",
            answer: "Absolutely! Kutu supports importing bookmarks from Chrome, Firefox, Safari, Edge, and many other browsers."
        },
        {
            question: "How does cross-platform sync work?",
            answer: "With a premium account, your bookmarks automatically sync across all your devices in real-time using secure cloud storage."
        }
    ];

    // This would create an FAQ section if needed
    window.faqData = faqData;
}

// Add keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('[class*="modal"]');
            modals.forEach(modal => {
                if (modal.style.opacity === '1') {
                    const closeButton = modal.querySelector('.close-modal, [data-dismiss]');
                    if (closeButton) closeButton.click();
                }
            });
        }

        // Arrow keys for testimonial navigation
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const testimonialSection = document.querySelector('.testimonials');
            if (isElementInViewport(testimonialSection)) {
                // Handle testimonial navigation
                e.preventDefault();
            }
        }
    });
}

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
        max-width: 400px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        font-weight: bold;
        margin-left: 12px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    closeButton.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    notification.appendChild(closeButton);
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Pricing button functionality
document.addEventListener('DOMContentLoaded', function() {
    const pricingButtons = document.querySelectorAll('.pricing-card .btn');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const plan = this.closest('.pricing-card').querySelector('h3').textContent;
            
            if (button.textContent.includes('Free')) {
                showNotification('Free plan activated! Start organizing your bookmarks.', 'success');
            } else if (button.textContent.includes('Trial')) {
                showNotification('Premium trial started! Enjoy all features for 14 days.', 'success');
            } else {
                showNotification('Contact form will open for Enterprise plan.', 'info');
            }
        });
    });
});

// Demo video functionality
document.addEventListener('DOMContentLoaded', function() {
    const demoButton = document.querySelector('.btn-secondary');
    
    if (demoButton && demoButton.textContent.includes('Demo')) {
        demoButton.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Demo video will play shortly!', 'info');
            
            // Create modal for demo video (placeholder)
            createDemoModal();
        });
    }
});

function createDemoModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 800px;
        width: 90%;
        text-align: center;
        position: relative;
    `;
    
    content.innerHTML = `
        <h3 style="margin-bottom: 16px; color: #1e293b;">Kutu Demo Video</h3>
        <div style="width: 100%; height: 400px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <i class="fas fa-play" style="font-size: 48px; color: #3b82f6;"></i>
        </div>
        <p style="color: #64748b; margin-bottom: 24px;">Demo video would play here showing all the amazing features of Kutu!</p>
        <button class="close-modal" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-weight: 500;">Close</button>
    `;
    
    const closeButton = content.querySelector('.close-modal');
    closeButton.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeButton.click();
        }
    });
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 100);
}

// Easter egg - Konami code
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiSequence.push(e.code);
    konamiSequence = konamiSequence.slice(-konamiCode.length);
    
    if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
        showNotification('🎉 Konami Code activated! You found our secret!', 'success');
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
