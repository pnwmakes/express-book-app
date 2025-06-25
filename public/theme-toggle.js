document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;

    if (localStorage.theme === 'dark') {
        root.classList.add('dark');
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            root.classList.toggle('dark');
            localStorage.theme = root.classList.contains('dark')
                ? 'dark'
                : 'light';
        });
    }
});
console.log('✅ theme-toggle.js loaded');
