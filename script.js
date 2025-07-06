

document.addEventListener('DOMContentLoaded', function() {
    console.log('Kevin Cheteka Portfolio - Static Version loaded successfully!');

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Navbar background on scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(31, 41, 55, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(31, 41, 55, 0.95)';
        }
    }

    // Scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.timeline-item, .skill-category, .cert-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-on-scroll', 'visible');
            }
        });
    }

    // Skills animation on scroll
    function animateSkills() {
        const skillTags = document.querySelectorAll('.skill-tags .badge');
        
        skillTags.forEach((tag, index) => {
            const tagTop = tag.getBoundingClientRect().top;
            
            if (tagTop < window.innerHeight - 100 && !tag.classList.contains('animate')) {
                setTimeout(() => {
                    tag.classList.add('animate');
                }, index * 100);
            }
        });
    }

    // Event listeners
    window.addEventListener('scroll', function() {
        updateActiveNav();
        updateNavbarBackground();
        animateOnScroll();
        animateSkills();
    });

    // Initialize animations
    animateOnScroll();
    animateSkills();

    // Contact form handling (static version)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (since this is static)
            setTimeout(() => {
                // Create mailto link with form data
                const mailtoLink = `mailto:kevincheteka07@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                )}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Reset form
                this.reset();
                
                // Show success message
                showMessage('Email client opened! Please send the message from your email app.', 'success');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Show message function
    function showMessage(message, type) {
        const flashContainer = document.getElementById('flash-messages');
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        flashContainer.appendChild(alertDiv);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.classList.remove('show');
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.remove();
                    }
                }, 150);
            }
        }, 5000);
    }

    // Typing animation for hero section
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing animation for hero subtitle
    const heroSubtitle = document.querySelector('.hero-section .h3');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 1000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection && scrolled < heroSection.offsetHeight) {
            const speed = 0.5;
            heroSection.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });

    // Copy email to clipboard functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.getAttribute('href').replace('mailto:', '');
            
            // Try to copy to clipboard
            if (navigator.clipboard) {
                e.preventDefault();
                navigator.clipboard.writeText(email).then(() => {
                    showTooltip(this, 'Email copied to clipboard!');
                    setTimeout(() => {
                        window.location.href = this.getAttribute('href');
                    }, 1500);
                }).catch(() => {
                    // Fallback to opening email client
                    window.location.href = this.getAttribute('href');
                });
            }
        });
    });

    // Show tooltip function
    function showTooltip(element, message) {
        const tooltip = document.createElement('div');
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #10b981;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 9999;
            font-size: 14px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.remove();
        }, 1500);
    }

    // Mobile menu auto-close on link click
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Download CV tracking
    const cvDownloadLink = document.querySelector('a[href*="KEVIN M CHETEKA CV.pdf"]');
    if (cvDownloadLink) {
        cvDownloadLink.addEventListener('click', function() {
            console.log('CV download initiated');
            showMessage('CV download started!', 'success');
        });
    }

    // Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe timeline items and skill categories
    document.querySelectorAll('.timeline-item, .skill-category, .cert-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Page load animation
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });

    // Print styles
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('print-mode');
    });

    window.addEventListener('afterprint', function() {
        document.body.classList.remove('print-mode');
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or dropdowns
            const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });

    // Performance optimization - reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-motion');
    }
});

// Service worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('SW registered: ', registration);
        }).catch(function(registrationError) {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
<script>
  function openModal(src, type) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const video = document.getElementById('lightbox-video');
    
    if (type === 'image') {
      img.src = src;
      img.style.display = 'block';
      video.style.display = 'none';
    } else if (type === 'video') {
      video.src = src;
      video.style.display = 'block';
      img.style.display = 'none';
    }
    modal.style.display = 'block';
  }

  function closeModal() {
    const modal = document.getElementById('lightbox-modal');
    modal.style.display = 'none';
    document.getElementById('lightbox-img').src = '';
    const video = document.getElementById('lightbox-video');
    video.pause();
    video.src = '';
  }
</script>
// Lightbox modal for images and videos