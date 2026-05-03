document.addEventListener("DOMContentLoaded", () => {

    // Initialize AOS
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
        });
    }

    // Loader Animation
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Sticky Header
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Search + Filter Functionality
    const searchBar = document.getElementById('search-bar');
    const searchBtn = document.getElementById('search-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.card-gold');

    // Search
    if (searchBtn && searchBar && propertyCards.length > 0) {
        searchBtn.addEventListener('click', () => {
            const searchTerm = searchBar.value.toLowerCase();

            propertyCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.classList.toggle('hidden', !text.includes(searchTerm));
            });
        });

        // Enter key search
        searchBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // Filters
    if (filterBtns.length > 0 && propertyCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {

                // Reset all buttons
                filterBtns.forEach(b => {
                    b.classList.remove('bg-[var(--primary-color)]', 'text-white');
                    b.classList.add('bg-gray-100', 'text-gray-800');
                });

                // Activate clicked button
                btn.classList.remove('bg-gray-100', 'text-gray-800');
                btn.classList.add('bg-[var(--primary-color)]', 'text-white');

                const filter = btn.getAttribute('data-filter');

                propertyCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.classList.remove('hidden');
                        card.classList.add('fade-in');
                    } else {
                        card.classList.add('hidden');
                        card.classList.remove('fade-in');
                    }
                });
            });
        });
    }

    // Initialize Lucide Icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Night Mode Toggle
    const themeToggle = document.getElementById("themeToggle");

function setThemeIcon(isDark) {
    if (!themeToggle) return;

    themeToggle.innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}"></i>`;

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

if (themeToggle) {
    const savedTheme = localStorage.getItem("landlink-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        setThemeIcon(true);
    } else {
        setThemeIcon(false);
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        setThemeIcon(isDark);
        localStorage.setItem("landlink-theme", isDark ? "dark" : "light");
    });
}
});