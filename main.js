document.addEventListener('DOMContentLoaded', () => {
    console.log('Krumme Klänge Landing Page Loaded');

    const revealElements = document.querySelectorAll('.card, .section-title, .studio-content, .info-strip');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                // Optional: remove class to re-animate on scroll up
                // element.classList.remove('active'); 
            }
        });
    };

    // Initial setup for reveal styling
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // Smooth scroll for anchor links (if not supported natively)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    // Toggle details functionality
    const toggleBtns = document.querySelectorAll('.toggle-btn');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const details = btn.nextElementSibling;
            details.classList.toggle('open');

            if (details.classList.contains('open')) {
                btn.textContent = 'Weniger anzeigen';
            } else {
                btn.textContent = 'Mehr erfahren';
            }
        });
    });
});
