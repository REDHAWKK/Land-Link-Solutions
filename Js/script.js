        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
        });

        // Loader Animation
        window.addEventListener('load', () => {
            const loader = document.querySelector('.loader');
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Sticky Header
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Search Functionality
        const searchBar = document.getElementById('search-bar');
        const searchBtn = document.getElementById('search-btn');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const propertyCards = document.querySelectorAll('.card-gold');

        // Search functionality
        searchBtn.addEventListener('click', () => {
            const searchTerm = searchBar.value.toLowerCase();
            
            propertyCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });

        // Enter key search
        searchBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });

        // Filter functionality
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => {
                    b.classList.remove('active:bg-[var(--primary-color)]', 'active:text-white');
                    b.classList.remove('bg-[var(--primary-color)]', 'text-white');
                    b.classList.add('bg-gray-100', 'text-gray-800');
                });

                // Add active class to clicked button
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

        // Form Submission
        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const button = e.target.querySelector('button');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i data-lucide="loader" class="w-5 h-5 animate-spin mr-2"></i> Sending...';
            
            setTimeout(() => {
                button.innerHTML = '<i data-lucide="check-circle" class="w-5 h-5 mr-2"></i> Message Sent!';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    e.target.reset();
                    
                    // Show success message
                    alert('Thank you for contacting Land Link Solutions! Our team will get back to you shortly.');
                }, 2000);
            }, 1500);
        });

        // Initialize Lucide Icons
        lucide.createIcons();
