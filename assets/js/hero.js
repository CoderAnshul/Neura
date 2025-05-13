        document.addEventListener('DOMContentLoaded', () => {
            // Get the h1 element
            const headingElement = document.querySelector('.hero h1');
            
            // Define our hosting-related sentences
            const sentences = [
                "Blazingly Fast Hosting We're Serious About It!",
                "Enterprise-Grade Hardware At Small Business Prices",
                "24/7 Expert Support With Rapid Response Times",
                "99.99% Uptime Guarantee Or Your Money Back"
            ];
            
            // Clear the content to start fresh
            headingElement.textContent = '';
            
            // Add a span for the cursor
            const cursorSpan = document.createElement('span');
            cursorSpan.textContent = '|';
            cursorSpan.style.animation = 'blink 1s step-end infinite';
            
            // Define the blink animation
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                @keyframes blink {
                    from, to { opacity: 1; }
                    50% { opacity: 0; }
                }
            `;
            document.head.appendChild(styleSheet);
            
            // Typing variables
            let sentenceIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingDelay = 100;
            
            function typeEffect() {
                const currentSentence = sentences[sentenceIndex];
                
                if (isDeleting) {
                    // Deleting characters
                    headingElement.textContent = currentSentence.substring(0, charIndex - 1);
                    headingElement.appendChild(cursorSpan);
                    charIndex--;
                    typingDelay = 50; // Delete faster than typing
                } else {
                    // Adding characters
                    headingElement.textContent = currentSentence.substring(0, charIndex + 1);
                    headingElement.appendChild(cursorSpan);
                    charIndex++;
                    typingDelay = 100; // Normal typing speed
                }
                
                // Handle sentence completion or deletion
                if (!isDeleting && charIndex === currentSentence.length) {
                    // Finished typing current sentence - pause before deleting
                    isDeleting = true;
                    typingDelay = 2000; // Wait 2 seconds before starting to delete
                } else if (isDeleting && charIndex === 0) {
                    // Finished deleting current sentence - move to next sentence
                    isDeleting = false;
                    sentenceIndex = (sentenceIndex + 1) % sentences.length;
                    typingDelay = 500; // Pause briefly before starting new sentence
                }
                
                setTimeout(typeEffect, typingDelay);
            }
            
            // Override fade-in animation with our typewriter effect
            headingElement.style.opacity = 1;
            headingElement.classList.remove('fade-in');
            
            // Start typing after a short delay
            setTimeout(typeEffect, 500);
        });
