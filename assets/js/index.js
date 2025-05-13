document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Floating shapes animation enhancer
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach(shape => {
        shape.addEventListener('mouseover', () => {
            shape.style.animationPlayState = 'paused';
        });
        
        shape.addEventListener('mouseout', () => {
            shape.style.animationPlayState = 'running';
        });
    });
    
    // Domain input animation
    const domainInput = document.querySelector('.test-box input');
    const testButton = document.querySelector('.test-box button');
    
    domainInput.addEventListener('focus', () => {
        document.querySelector('.test-box').style.boxShadow = '0 0 0 2px rgba(156, 39, 176, 0.5)';
    });
    
    domainInput.addEventListener('blur', () => {
        document.querySelector('.test-box').style.boxShadow = 'none';
    });
    
    testButton.addEventListener('click', () => {
        if (domainInput.value.trim() !== '') {
            testButton.innerHTML = 'Testing...';
            setTimeout(() => {
                testButton.innerHTML = 'Results Ready!';
                setTimeout(() => {
                    testButton.innerHTML = 'Faster!';
                }, 2000);
            }, 1500);
        }
    });
});



// Add this JavaScript to make the hamburger menu functional
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if (mobileMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });
    
    // Close menu when clicking on overlay
    overlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = 'auto';
    });
    
    // Close menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-links a, .mobile-auth a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });
});

