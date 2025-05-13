document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButtons = document.querySelectorAll('.nav-button.prev');
    const nextButtons = document.querySelectorAll('.nav-button.next');
    let currentSlide = 1; // Start with the second slide (index 1) as shown in the image

    // Initially hide all slides except the second one
    slides.forEach((slide, index) => {
        if (index !== 1) {
            slide.classList.remove('active');
        } else {
            slide.classList.add('active');
        }
    });

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show the selected slide
        slides[index].classList.add('active');
        currentSlide = index;
    }

    // Add event listeners to all prev buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) {
                newIndex = slides.length - 1;
            }
            showSlide(newIndex);
        });
    });

    // Add event listeners to all next buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        });
    });

    // Auto-scroll functionality
    let autoScrollInterval = setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }, 8000); // Change slide every 8 seconds

    // Pause auto-scroll when interacting with navigation
    document.querySelector('.testimonial-slider').addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    // Resume auto-scroll when not interacting
    document.querySelector('.testimonial-slider').addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        }, 8000);
    });
});