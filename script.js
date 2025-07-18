// Enhanced JavaScript for Digiverse Solutions Multi-page Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initAnalytics();
    initPerformanceOptimizations();
    initAccessibility();
    initImageHandling();
});

// Image handling and fallbacks
function initImageHandling() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Create a new image to test loading
                const testImg = new Image();
                testImg.onload = function() {
                    img.src = this.src;
                    img.classList.add('loaded');
                };
                
                testImg.onerror = function() {
                    // Create placeholder if image fails to load
                    createImagePlaceholder(img);
                };
                
                testImg.src = img.src;
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Handle images that are already loaded
    const loadedImages = document.querySelectorAll('img:not([loading="lazy"])');
    loadedImages.forEach(img => {
        img.onerror = function() {
            createImagePlaceholder(this);
        };
    });
}

function createImagePlaceholder(img) {
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder ' + img.className;
    placeholder.style.width = img.style.width || '100%';
    placeholder.style.height = img.style.height || 'auto';
    
    // Add appropriate placeholder content
    if (img.alt.includes('founder') || img.alt.includes('Nikhitha')) {
        placeholder.innerHTML = '<i class="bi bi-person-circle" style="font-size: 3rem;"></i>';
        placeholder.classList.add('founder-image');
    } else if (img.alt.includes('workspace') || img.alt.includes('office')) {
        placeholder.innerHTML = '<i class="bi bi-building" style="font-size: 3rem;"></i><br>Workspace Image';
    } else {
        placeholder.innerHTML = '<i class="bi bi-image" style="font-size: 3rem;"></i><br>Image Loading...';
    }
    
    img.parentNode.replaceChild(placeholder, img);
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Active navigation link highlighting for single page sections
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const navbarHeight = navbar.offsetHeight;
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbarHeight - 100;
                if (window.pageYOffset >= sectionTop) {
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

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links on the same page
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile menu auto-close
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Track scroll events for analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll', {
                        'event_category': 'Engagement',
                        'event_label': entry.target.className
                    });
                }
            }
        });
    }, observerOptions);

    // Add scroll animation to various elements
    const animatedElements = document.querySelectorAll(`
        .value-card, .service-card, .service-preview-card, 
        .feature-card, .process-step, .pricing-card,
        .contact-info-card, .expertise-card, .mission-vision-card
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // Parallax effect for hero sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image, .page-header');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            if (element.style) {
                element.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    });

    // Scroll indicator visibility
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// Animation enhancements
function initAnimations() {
    // Enhanced hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card, .service-preview-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced hover effects for value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing effect for hero title (if present)
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle && window.location.pathname.includes('index.html')) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 800);
    }

    // Button click animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Enhanced contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    if (!contactForm) return;

    // Form validation
    const validateForm = (formData) => {
        const errors = [];
        
        // Required field validation
        const requiredFields = ['firstName', 'lastName', 'email', 'service', 'subject', 'message'];
        requiredFields.forEach(field => {
            if (!formData[field] || formData[field].trim() === '') {
                errors.push(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
            }
        });

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailPattern.test(formData.email)) {
            errors.push('Please enter a valid email address');
        }

        // Phone validation (if provided)
        if (formData.phone && formData.phone.trim() !== '') {
            const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phonePattern.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
                errors.push('Please enter a valid phone number');
            }
        }

        return errors;
    };

    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            budget: document.getElementById('budget').value,
            timeline: document.getElementById('timeline').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter') ? document.getElementById('newsletter').checked : false
        };

        // Validate form
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            alert('Please fix the following errors:\n\n' + errors.join('\n'));
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Track form submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': formData.service,
                    'value': 1
                });
            }

            // Track specific service interest
            if (typeof trackFormSubmission === 'function') {
                trackFormSubmission();
            }

            // Hide form and show thank you message
            contactForm.style.display = 'none';
            thankYouMessage.classList.remove('d-none');
            
            // Scroll to thank you message
            thankYouMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Store form data in localStorage for analytics
            localStorage.setItem('lastFormSubmission', JSON.stringify({
                timestamp: new Date().toISOString(),
                service: formData.service,
                budget: formData.budget,
                timeline: formData.timeline
            }));
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.style.display = 'block';
                thankYouMessage.classList.add('d-none');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            }, 5000);
        }, 1500);
    });

    // Real-time form validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.id;
        
        // Remove existing error styling
        field.classList.remove('is-invalid');
        
        // Check if required field is empty
        if (field.hasAttribute('required') && value === '') {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (fieldName === 'email' && value !== '') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }

    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function clearFieldError(field) {
        field.classList.remove('is-invalid');
        const errorMessage = field.parentNode.querySelector('.invalid-feedback');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
}

// Analytics and tracking
function initAnalytics() {
    // Track page views
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }

    // Track button clicks
    const trackableButtons = document.querySelectorAll('.btn[href], .btn[data-track]');
    trackableButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonHref = this.getAttribute('href') || '';
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Button',
                    'event_label': buttonText,
                    'value': buttonHref
                });
            }
        });
    });

    // Track service card interactions
    const serviceCards = document.querySelectorAll('.service-card, .service-preview-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h5').textContent;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'service_interest', {
                    'event_category': 'Services',
                    'event_label': serviceName
                });
            }
        });
    });
    
    // Track founder carousel interactions
    const foundersCarousel = document.getElementById('foundersCarousel');
    if (foundersCarousel) {
        foundersCarousel.addEventListener('slide.bs.carousel', function(e) {
            const founderName = e.relatedTarget.querySelector('h3').textContent;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'founder_view', {
                    'event_category': 'About',
                    'event_label': founderName
                });
            }
        });
    }

    // Track time on page
    let startTime = Date.now();
    let maxScroll = 0;
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        maxScroll = Math.max(maxScroll, scrollPercent);
    });

    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_engagement', {
                'event_category': 'Engagement',
                'event_label': 'Time on Page',
                'value': timeOnPage,
                'custom_parameters': {
                    'max_scroll_percentage': maxScroll
                }
            });
        }
    });

    // Track external link clicks
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"]), a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'External Link',
                    'event_label': this.href,
                    'transport_type': 'beacon'
                });
            }
        });
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
        'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css'
    ];

    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });

    // Service Worker registration (if available)
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
}

// Accessibility enhancements
function initAccessibility() {
    // Skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content landmark
    const mainContent = document.querySelector('main') || document.querySelector('.hero-section, .page-header').parentElement;
    if (mainContent) {
        mainContent.id = 'main-content';
    }

    // Enhanced keyboard navigation
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.tagName === 'A') {
                this.click();
            }
        });
    });

    // ARIA labels for interactive elements
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });

    // Form accessibility enhancements
    const formLabels = document.querySelectorAll('label');
    formLabels.forEach(label => {
        const input = document.getElementById(label.getAttribute('for'));
        if (input && label.textContent.includes('*')) {
            input.setAttribute('aria-required', 'true');
        }
    });

    // Announce dynamic content changes
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);

    // Function to announce messages to screen readers
    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

// Utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = element.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

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

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error.toString(),
            'fatal': false
        });
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    setTimeout(function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        
        if (typeof gtag !== 'undefined' && perfData) {
            gtag('event', 'timing_complete', {
                'name': 'load',
                'value': Math.round(perfData.loadEventEnd - perfData.loadEventStart)
            });
        }
    }, 0);
});

// CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loading {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .invalid-feedback {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875em;
        color: #dc3545;
    }
`;
document.head.appendChild(style);