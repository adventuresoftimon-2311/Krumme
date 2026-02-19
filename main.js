const init = () => {
    console.log('Krumme Klänge Landing Page Loaded');

    const revealElements = document.querySelectorAll('.card, .section-title, .studio-content');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
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
    revealOnScroll();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Toggle details functionality - EVENT DELEGATION FOR ROBUSTNESS
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.toggle-btn')) {
            const btn = e.target;
            const details = btn.nextElementSibling;
            if (details && details.classList.contains('toggle-details')) {
                details.classList.toggle('open');
                if (details.classList.contains('open')) {
                    btn.textContent = 'Weniger anzeigen';
                } else {
                    btn.textContent = 'Mehr erfahren';
                }
            }
        }
    });
    // Sticky Header Scroll Effect (Trigger at Schlagzeugschule section)
    const header = document.querySelector('.sticky-header');
    const schuleSection = document.getElementById('schule');

    if (header && schuleSection) {
        window.addEventListener('scroll', () => {
            const schuleTop = schuleSection.offsetTop;
            // Trigger when the section top reaches the bottom of the header
            if (window.scrollY >= schuleTop - 90) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
