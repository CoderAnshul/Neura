document.addEventListener('DOMContentLoaded', function() {
    // This script will apply animations when the page loads
    // For real scroll detection, you would use:
    
    /*
    window.addEventListener('scroll', function() {
        const footer = document.querySelector('.footer-container');
        const footerPosition = footer.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if(footerPosition < screenPosition) {
            footer.style.animation = 'fadeIn 1s forwards';
        }
    });
    */
    
    // Enhanced subscribe button interactions
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const emailInput = document.querySelector('.email-input');
    
    subscribeBtn.addEventListener('click', function() {
        if(emailInput.value.trim() !== '') {
            this.innerHTML = 'Subscribed!';
            this.style.backgroundColor = '#4CAF50';
            emailInput.value = '';
            
            setTimeout(() => {
                this.innerHTML = 'Subscribe';
                this.style.backgroundColor = '#7952FF';
            }, 2000);
        }
    });
    
    // Add ripple effect to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            ripple.style.cssText = `position: absolute; background: rgba(255,255,255,0.3); 
                                  border-radius: 50%; transform: scale(0); animation: ripple 0.6s linear;
                                  left: ${x}px; top: ${y}px;`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add styles for the ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});