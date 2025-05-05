document.addEventListener('DOMContentLoaded', function() {
    // Set body opacity to 1 when content is loaded
    document.body.style.opacity = '1';

    // Initialize background slideshow if elements exist
    const slideshow = document.querySelector('.background-slideshow');
    if (slideshow) {
        const slides = slideshow.querySelectorAll('.background-slide');
        let currentSlide = 0;

        // Function to show next slide
        function showNextSlide() {
            slides.forEach(slide => slide.style.opacity = '0');
            slides[currentSlide].style.opacity = '1';
            currentSlide = (currentSlide + 1) % slides.length;
        }

        // Show first slide immediately
        if (slides.length > 0) {
            showNextSlide();
            // Rotate slides every 5 seconds
            setInterval(showNextSlide, 5000);
        }
    }
});