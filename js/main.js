document.addEventListener("DOMContentLoaded", () => {
    
    // Mobile Menu Toggle
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other accordions
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.nextElementSibling.style.maxHeight = null;
            });

            // Toggle current accordion
            if (!isActive) {
                item.classList.add('active');
                const answer = item.nextElementSibling;
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Booking Form WhatsApp Integration
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default page reload
            
            const inputs = bookingForm.querySelectorAll('input');
            const select = bookingForm.querySelector('select');
            
            const name = inputs[0].value;
            const phone = inputs[1].value;
            const service = select.options[select.selectedIndex].text;
            const date = inputs[2].value;
            const time = inputs[3].value;

            // APNA WHATSAPP NUMBER YAHAN DAALEIN (Country code ke saath, bina + ke)
            // Example for India: 919876543210
            const whatsappNumber = "918949853554"; 
            
            const message = `Hello Juju Beauty Parlour! I want to book an appointment:%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Service:* ${service}%0A*Date:* ${date}%0A*Time:* ${time}`;
            
            // Open WhatsApp link in a new tab
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            
            // Reset the form after sending
            bookingForm.reset();
            alert('Redirecting to WhatsApp to confirm your booking!');
        });
    }

    // 3. GSAP Animations
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Entry Animation
    const tl = gsap.timeline();
    tl.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .from(".hero-buttons", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4")
    .from(".hero-visual-content", {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8");

    // Scroll Reveal for Sections
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { 
                y: 50, 
                opacity: 0 
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // Triggers when the top of the element hits 85% of the viewport height
                    toggleActions: "play none none none" 
                }
            }
        );
    });

    // Refresh ScrollTrigger when images are loaded (fixes height issues)
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // Slight floating motion for service cards
    gsap.to(".service-card", {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2
    });

    // 5. Gallery Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hide');
                    gsap.fromTo(item, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });
                } else {
                    item.classList.add('hide');
                }
            });

            // Refresh ScrollTrigger to account for hidden elements
            ScrollTrigger.refresh();
        });
    });

});
