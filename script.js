function toggleMobileDropdown() {
    const subMenu = document.getElementById('mobile-proyek-sub');
    const icon = document.getElementById('drop-icon');

    // Toggle Class Hidden
    subMenu.classList.toggle('hidden');

    // Animasi Putar Icon
    if (subMenu.classList.contains('hidden')) {
        icon.style.transform = 'rotate(0deg)';
    } else {
        icon.style.transform = 'rotate(180deg)';
    }
}
// Fungsi untuk toggle dropdown proyek
function toggleMobileDropdown() {
    const subMenu = document.getElementById('mobile-proyek-sub');
    const icon = document.getElementById('drop-icon');
    subMenu.classList.toggle('hidden');
    icon.style.transform = subMenu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

// LOGIKA AUTO-CLOSE MENU HP
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Sembunyikan menu utama setelah klik
        mobileMenu.classList.add('hidden');

        // Reset dropdown proyek agar tertutup saat dibuka kembali nanti
        const subMenu = document.getElementById('mobile-proyek-sub');
        const icon = document.getElementById('drop-icon');
        if (subMenu) subMenu.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
    });
});
// Initialize Icons
lucide.createIcons();

// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Active Link Highlighter on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active-nav');
        }
    });
});
lucide.createIcons();

// Logic Infinite Loop: Duplikasi konten otomatis
const scrollWrapper = document.getElementById('scroll-wrapper');
if (scrollWrapper) {
    scrollWrapper.innerHTML += scrollWrapper.innerHTML;
}
const slider = document.getElementById('project-slider');
const originalSlides = Array.from(slider.children);
const totalOriginal = originalSlides.length;
let currentIndex = 0;
let isTransitioning = true;

// Duplikasi semua slide dan tempel di akhir (Biar loop mulus tanpa jeda)
originalSlides.forEach(slide => {
    const clone = slide.cloneNode(true);
    slider.appendChild(clone);
});

const allSlides = slider.children;
const totalSlides = allSlides.length;

function updateSlider(withTransition = true) {
    if (withTransition) {
        slider.style.transition = 'transform 0.7s ease-in-out';
    } else {
        slider.style.transition = 'none';
    }
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    currentIndex++;
    updateSlider(true);

    // Kalau sudah sampai di ujung duplikat, teleport instan balik ke awal tanpa animasi
    if (currentIndex >= totalOriginal) {
        setTimeout(() => {
            currentIndex = 0;
            updateSlider(false);
        }, 700); // Harus sama dengan durasi transition (0.7s)
    }
}

function prevSlideFunc() {
    if (currentIndex <= 0) {
        currentIndex = totalOriginal;
        updateSlider(false);
        setTimeout(() => {
            currentIndex--;
            updateSlider(true);
        }, 20);
    } else {
        currentIndex--;
        updateSlider(true);
    }
}

// Tombol Manual
document.getElementById('next-btn').addEventListener('click', nextSlide);
document.getElementById('prev-btn').addEventListener('click', prevSlideFunc);