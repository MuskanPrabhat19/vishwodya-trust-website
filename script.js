document.addEventListener("DOMContentLoaded", function() {
    // Typewriter effect for "We are here for..." section
    const typewriterElement = document.getElementById('typewriter-word');
    const words = ["Youth", "Students", "Farmers", "Startups", "Community"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentText = isDeleting ? currentWord.substring(0, charIndex--) : currentWord.substring(0, charIndex++);
        typewriterElement.textContent = currentText;

        if (!isDeleting && charIndex === currentWord.length + 1) {
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 75 : 150);
        }
    }
    type();

    // Intersection Observer for animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sections = document.querySelectorAll('.slide-in-bottom, .slide-in-left, .slide-in-right, .fade-in-up');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // WhatsApp Form Submission
    function handleSubmit(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const whatsappNumber = '919262269107'; // Replace with your WhatsApp number
        const whatsappMessage = `Hello, I'm ${name}. I have a message from the website. \n\nEmail: ${email}\n\nMessage: ${message}`;
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappURL, '_blank');
    }

    // Assign the handleSubmit function to the form
    document.getElementById('contactForm').addEventListener('submit', handleSubmit);
});