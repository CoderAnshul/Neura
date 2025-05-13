  // Create floating particles in background
  function createParticles() {
    const particleCount = 30;
    const container = document.querySelector('.container');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random animation
        const duration = Math.random() * 50 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        
        container.appendChild(particle);
    }
}

// Function to animate stats when in view
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'countUp 1.5s forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Function to create typing effect on heading
function typeEffect() {
    const heading = document.querySelector('h1');
    const text = heading.textContent;
    heading.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            heading.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 50);
}

// Animation for satellites
function animateSatellites() {
    const satellites = document.querySelectorAll('.satellite');
    
    satellites.forEach((satellite, index) => {
        const angle = (index * 120) * (Math.PI / 180);
        const radius = 225;
        
        function updatePosition(time) {
            const currentAngle = angle + (time / 3000);
            const x = Math.cos(currentAngle) * radius;
            const y = Math.sin(currentAngle) * radius;
            
            satellite.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(updatePosition);
        }
        
        requestAnimationFrame(updatePosition);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateStats();
    animateSatellites();
    
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const planet = document.querySelector('.planet');
        const satellites = document.querySelectorAll('.satellite');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        planet.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        
        satellites.forEach(satellite => {
            const factor = Math.random() * 30 + 10;
            satellite.style.marginLeft = `${mouseX * factor}px`;
            satellite.style.marginTop = `${mouseY * factor}px`;
        });
    });
});