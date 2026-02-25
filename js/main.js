/* ========================================
   PJ Quirk Portfolio — Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Reveal ---
    const revealElements = () => {
        const cards = document.querySelectorAll(
            '.about-card, .skill-category, .project-card, .section-title, .contact-link'
        );

        cards.forEach((el, i) => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
                // Add staggered delay within groups
                const delayClass = `reveal-delay-${(i % 4) + 1}`;
                el.classList.add(delayClass);
            }
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };

    revealElements();

    // --- Navbar background on scroll ---
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(13, 2, 33, 0.95)';
            navbar.style.borderBottomColor = 'rgba(185, 103, 255, 0.3)';
        } else {
            navbar.style.background = 'rgba(13, 2, 33, 0.85)';
            navbar.style.borderBottomColor = 'rgba(185, 103, 255, 0.15)';
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // --- Smooth scroll for nav links ---
    document.querySelectorAll('.nav-links a, .cta-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // --- Parallax sun on mouse move ---
    const sun = document.querySelector('.sun');
    if (sun) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            sun.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
        }, { passive: true });
    }

    // --- Skill tag sparkle on hover ---
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.textShadow = '0 0 8px rgba(1, 205, 254, 0.5)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.textShadow = 'none';
        });
    });

});
