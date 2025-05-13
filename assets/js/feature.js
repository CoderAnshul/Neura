
      document.addEventListener('DOMContentLoaded', function() {
        // Initialize the shine effect for feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            const shineEffect = card.querySelector('.shine-effect');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                shineEffect.style.left = `${x}px`;
                shineEffect.style.top = `${y}px`;
            });
        });
        
        // Initialize brightness control
        initBrightnessControl();
    });

    function initBrightnessControl() {
        const brightnessControl = document.querySelector('.brightness-control');
        const brightnessHandle = document.getElementById('brightness-handle');
        const brightnessIndicator = document.querySelector('.brightness-indicator');
        
        if (!brightnessControl || !brightnessHandle) return;
        
        let isDragging = false;
        let startX, startY;
        let initialPosition = { x: 0, y: 0 };
        
        // Load saved brightness or set default
        const savedBrightness = localStorage.getItem('siteBrightness');
        if (savedBrightness) {
            document.documentElement.style.setProperty('--brightness', savedBrightness);
            // Position the handle accordingly
            positionHandleFromBrightness(savedBrightness);
        }
        
        // Handle touch events for mobile
        brightnessControl.addEventListener('touchstart', handleStart, { passive: false });
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleEnd);
        
        // Handle mouse events
        brightnessControl.addEventListener('mousedown', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        
        function handleStart(e) {
            isDragging = true;
            e.preventDefault(); // Prevent any default behavior
            
            // Get the initial position for better dragging experience
            const controlRect = brightnessControl.getBoundingClientRect();
            const centerX = controlRect.width / 2;
            const centerY = controlRect.height / 2;
            
            initialPosition = {
                x: centerX,
                y: centerY
            };
            
            // If it's a touch event
            if (e.type === 'touchstart') {
                startX = e.touches[0].clientX - controlRect.left;
                startY = e.touches[0].clientY - controlRect.top;
            } else {
                startX = e.clientX - controlRect.left;
                startY = e.clientY - controlRect.top;
            }
            
            // Update position immediately
            updatePosition(startX, startY);
        }
        
        function handleMove(e) {
            if (!isDragging) return;
            e.preventDefault(); // Prevent scrolling during drag
            
            const controlRect = brightnessControl.getBoundingClientRect();
            let moveX, moveY;
            
            // If it's a touch event
            if (e.type === 'touchmove') {
                moveX = e.touches[0].clientX - controlRect.left;
                moveY = e.touches[0].clientY - controlRect.top;
            } else {
                moveX = e.clientX - controlRect.left;
                moveY = e.clientY - controlRect.top;
            }
            
            updatePosition(moveX, moveY);
        }
        
        function handleEnd() {
            isDragging = false;
        }
        
        function updatePosition(x, y) {
            // Calculate center of control
            const controlRect = brightnessControl.getBoundingClientRect();
            const centerX = controlRect.width / 2;
            const centerY = controlRect.height / 2;
            
            // Calculate vector from center to mouse/touch position
            const deltaX = x - centerX;
            const deltaY = y - centerY;
            
            // Calculate distance from center (0-1)
            const maxRadius = controlRect.width / 2 - 10; // Adjust for handle size
            let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            distance = Math.min(distance, maxRadius) / maxRadius;
            
            // Calculate angle
            const angle = Math.atan2(deltaY, deltaX);
            
            // Convert distance to brightness (1 at center, 0.3 at edge)
            const brightness = 1 - (distance * 0.7);
            
            // Calculate new position for handle (constrained within control)
            const handleX = centerX + Math.cos(angle) * distance * maxRadius;
            const handleY = centerY + Math.sin(angle) * distance * maxRadius;
            
            // Position handle
            brightnessHandle.style.left = `${handleX}px`;
            brightnessHandle.style.top = `${handleY}px`;
            
            // Update brightness
            document.documentElement.style.setProperty('--brightness', brightness);
            
            // Save preference
            localStorage.setItem('siteBrightness', brightness);
        }
        
        function positionHandleFromBrightness(brightness) {
            // Convert brightness value (0.3-1) to distance (1-0)
            const distance = (1 - brightness) / 0.7;
            
            // Default to right side position (angle = 0)
            const angle = 0;
            
            // Calculate center
            const controlRect = brightnessControl.getBoundingClientRect();
            const centerX = controlRect.width / 2;
            const centerY = controlRect.height / 2;
            
            // Calculate max radius
            const maxRadius = controlRect.width / 2 - 10;
            
            // Calculate position
            const handleX = centerX + Math.cos(angle) * distance * maxRadius;
            const handleY = centerY + Math.sin(angle) * distance * maxRadius;
            
            // Position handle
            brightnessHandle.style.left = `${handleX}px`;
            brightnessHandle.style.top = `${handleY}px`;
        }
    }