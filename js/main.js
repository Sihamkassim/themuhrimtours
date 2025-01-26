// Theme Toggle and Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen (if exists)
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.main-content');
    if (loadingScreen && mainContent) {
        const loadingText = document.querySelector('.loading-text');
        // Add animation delay to each letter
        loadingText.querySelectorAll('span').forEach((span, index) => {
            span.style.setProperty('--i', index);
        });

        // Hide loading screen after content is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                mainContent.classList.add('visible');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 2000); // Show loading screen for 2 seconds
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    const html = document.documentElement;
    
    // Set default theme to dark if no theme is saved
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
        html.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-sun';
    } else {
        const currentTheme = localStorage.getItem('theme');
        html.setAttribute('data-theme', currentTheme);
        icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Mobile Navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            const icon = mobileNavToggle.querySelector('i');
            const isOpen = navLinks.classList.toggle('active');
            
            // Update icon
            icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        });

        // Close menu when clicking a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileNavToggle.querySelector('i').className = 'fas fa-bars';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileNavToggle.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileNavToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    }
});
