    // Services to display in each marquee
    const primaryServices = [
        "SHARED HOSTING",
        "VPS HOSTING", 
        "DEDICATED SERVER HOSTING",
        "CLOUD HOSTING",
        "MANAGED WORDPRESS HOSTING",
        "RESELLER HOSTING",
        "DOMAIN REGISTRATION",
        "DOMAIN TRANSFER",
        "WEBSITE BUILDER",
        "FREE/PAID SSL CERTIFICATES",
        "MALWARE SCANNING & REMOVAL",
        "AUTOMATIC BACKUPS (DAILY, WEEKLY)",
        "CDN INTEGRATION",
        "SSD/NVME STORAGE",
        "HTTP/3 SUPPORT",
        "WHITE-LABEL HOSTING FOR RESELLERS"
      ];
      
      const secondaryServices = [
        "EMAIL HOSTING",
        "WOOCOMMERCE HOSTING",
        "CUSTOMER SERVICE",
        "WINDOWS HOSTING",
        "LINUX HOSTING",
        "COLOCATION HOSTING",
        "DRAG & DROP PAGE BUILDER",
        "DDOS PROTECTION",
        "DISASTER RECOVERY SOLUTIONS",
        "2-FACTOR AUTHENTICATION",
        "CACHING SOLUTIONS",
        "LITESPEED OR NGINX SERVERS",
        "AFFILIATE PROGRAM",
        "PROFESSIONAL EMAIL SOLUTIONS"
      ];
      
      // Function to create and repeat marquee content to ensure coverage
      function setupMarquee(elementId, services) {
        const marquee = document.getElementById(elementId);
        let content = '';
        
        // Create base content
        for (let i = 0; i < services.length; i++) {
          content += `<div class="marquee-item">${services[i]}</div>`;
          if (i < services.length - 1) {
            content += `<div class="separator">•</div>`;
          }
        }
        
        // Calculate how many times we need to repeat the content
        // First, add the content to measure its width
        marquee.innerHTML = content;
        const contentWidth = marquee.offsetWidth;
        const windowWidth = window.innerWidth;
        
        // Clear the content to rebuild it with proper repetition
        marquee.innerHTML = '';
        
        // Determine how many repetitions needed (at least 4 for safety)
        const repetitions = Math.max(4, Math.ceil((windowWidth * 3) / contentWidth));
        
        // Generate the final content with enough repetitions
        let fullContent = '';
        for (let j = 0; j < repetitions; j++) {
          for (let i = 0; i < services.length; i++) {
            fullContent += `<div class="marquee-item">${services[i]}</div>`;
            if (i < services.length - 1 || j < repetitions - 1) {
              fullContent += `<div class="separator">•</div>`;
            }
          }
        }
        
        marquee.innerHTML = fullContent;
        
        // Make a duplicate of the content to ensure seamless looping
        const contentToRepeat = marquee.innerHTML;
        marquee.innerHTML += contentToRepeat;
        
        return { element: marquee, width: marquee.offsetWidth / 2 };
      }
      
      // Initialize marquees and adjust animation speed
      function initMarquees() {
        const primary = setupMarquee('primary-marquee', primaryServices);
        const secondary = setupMarquee('secondary-marquee', secondaryServices);
        
        // Set animation durations based on content width
        const primaryDuration = primary.width / 80;
        const secondaryDuration = secondary.width / 60;
        
        primary.element.style.animationDuration = primaryDuration + 's';
        secondary.element.style.animationDuration = secondaryDuration + 's';
      }
      
      // Initialize on load and when resizing
      window.addEventListener('DOMContentLoaded', initMarquees);
      window.addEventListener('resize', initMarquees);
      