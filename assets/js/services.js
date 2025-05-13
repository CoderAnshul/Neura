document.addEventListener('DOMContentLoaded', function() {
    // Mobile carousel functionality
    const carousel = document.querySelector('.mobile-carousel-inner');
    const indicators = document.querySelectorAll('.mobile-indicator');
    const prevButton = document.querySelector('.mobile-prev');
    const nextButton = document.querySelector('.mobile-next');
    const items = document.querySelectorAll('.mobile-service-item');
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Function to update carousel position
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Event listeners for indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateCarousel();
        });
    });
    
    // Event listeners for navigation buttons
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });
    
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });
    
    // Touch swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50; // minimum distance for swipe
        
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right - go to previous
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        } else if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left - go to next
            currentIndex = (currentIndex + 1) % totalItems;
        }
        
        updateCarousel();
    }
    
    // Initialize carousel
    updateCarousel();
    
    // Parallax effect for bubbles
    document.addEventListener('mousemove', function(e) {
        const bubbles = document.querySelectorAll('.bubble');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        bubbles.forEach((bubble, index) => {
            const speed = 0.03 + (index * 0.01);
            const xPos = (x - 0.5) * speed * 100;
            const yPos = (y - 0.5) * speed * 100;
            
            bubble.style.transform = `translate(${xPos}px, ${yPos}px) scale(${1 + (index * 0.03)})`;
        });
    });
});