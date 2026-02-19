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
            const href = this.getAttribute('href');

            // Special handling for scroll to top (logos or empty hash)
            if (href === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            try {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (err) {
                // Ignore invalid selectors
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

    // Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('mobileMenuToggle');
    const dropdown = document.getElementById('mobileDropdown');

    if (menuToggle && dropdown) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            dropdown.classList.toggle('active');
        });

        // Close menu when clicking links
        dropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                dropdown.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                dropdown.classList.remove('active');
            }
        });
    }
    // Sticky Header Scroll Effect
    // Reverted: Both mobile and desktop now toggle the 'scrolled' class based on the 'schule' section position.
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
