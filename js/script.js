document.addEventListener("DOMContentLoaded", function () {
    // --- Hamburger Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function () {
            menu.classList.toggle('active'); // Matches CSS for mobile menu visibility
        });
    }

    // --- Dropdown Submenu Handling (Mouseover/Mouseout) ---
    const menuItems = document.querySelectorAll(".menu > li"); // Target direct children li of .menu
    menuItems.forEach((item) => {
        const submenu = item.querySelector(".submenu");
        if (submenu) {
            item.addEventListener("mouseover", () => {
                // Ensure other submenus are closed if any were left open by mistake
                // This is an optional enhancement for better UX
                // document.querySelectorAll('.menu .submenu').forEach(sm => {
                //     if (sm !== submenu) sm.style.display = 'none';
                // });
                submenu.style.display = "block";
            });
            item.addEventListener("mouseout", () => {
                submenu.style.display = "none";
            });
        }
    });

    // --- Image Slider ---
    const slides = document.querySelectorAll(".slider-image");
    let currentSlide = 0;

    function showSlide(index) {
        if (slides.length === 0) return; // Don't run if no slides
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    }

    // Make nextSlide and prevSlide globally accessible if called by onclick attributes in HTML
    window.nextSlide = function () {
        if (slides.length === 0) return;
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    window.prevSlide = function () {
        if (slides.length === 0) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (slides.length > 0) {
        showSlide(currentSlide); // Show the first slide initially
        setInterval(window.nextSlide, 5000); // Automatic slide change every 5 seconds
    }

    // --- Personalized Greeting Message (Time and Language) ---
    function showGreeting() {
        const greetingElement = document.querySelector(".hero-title");
        if (!greetingElement) {
            console.warn("Greeting element (.hero-title) not found.");
            return;
        }

        const now = new Date();
        const hour = now.getHours();
        // Detect browser language, fall back to 'en' if undefined
        const lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';

        let greetingText = '';

        if (lang === "es") {
            if (hour < 12) {
                greetingText = "¡Buenos días! Atrévete a probar la gastronomía japonesa.";
            } else if (hour < 18) {
                greetingText = "¡Buenas tardes! Explora los sabores de Japón.";
            } else {
                greetingText = "¡Buenas noches! Disfruta de lo mejor de la gastronomía japonesa.";
            }
        } else { // Default to English for other languages or if 'en'
            if (hour < 12) {
                greetingText = "Good morning! Dare to try Japanese gastronomy.";
            } else if (hour < 18) {
                greetingText = "Good afternoon! Explore the flavors of Japan.";
            } else {
                greetingText = "Good evening! Enjoy the best of Japanese cuisine.";
            }
        }
        greetingElement.textContent = greetingText;
    }

    showGreeting(); // Execute the greeting function
});