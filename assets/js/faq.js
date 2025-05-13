 document.addEventListener('DOMContentLoaded', function() {
      // FAQ Toggle functionality
      const faqItems = document.querySelectorAll('.faq-item');
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
          // Close other open items
          faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle current item
          item.classList.toggle('active');
        });
      });
      
      // Search functionality
      const searchBox = document.getElementById('faqSearch');
      
      searchBox.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        faqItems.forEach(item => {
          const question = item.querySelector('.faq-question').textContent.toLowerCase();
          const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();
          
          if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
      
      // Category filter functionality removed as per request
      
      // Background blob animation enhancement
      const blobs = document.querySelectorAll('.gradient-blob');
      
      document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
          const factor = (index + 1) * 5;
          const xOffset = (x - 0.5) * factor;
          const yOffset = (y - 0.5) * factor;
          
          blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
      });
    });