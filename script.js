// ========== SMOOTH SCROLL NAVIGATION ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== ACTIVE NAV HIGHLIGHTING ==========
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== HAMBURGER MENU (Mobile) ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// ========== ANIMATED COUNTERS ==========
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Intersection Observer for counters
const observeCounters = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateCounter(entry.target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number, .impact-number').forEach(counter => {
    observeCounters.observe(counter);
});

// ========== ACCORDION ==========
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const targetId = header.getAttribute('data-target');
        const content = document.getElementById(targetId);
        const isActive = header.classList.contains('active');
        
        // Close all accordions
        document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
        document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));
        
        // Open clicked accordion if it wasn't active
        if (!isActive) {
            header.classList.add('active');
            content.classList.add('active');
        }
    });
});

// ========== TABS ==========
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active class from all tabs and buttons
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ========== FINANCIAL CALCULATOR ==========
const umkmSlider = document.getElementById('umkm-slider');
const umkmValue = document.getElementById('umkm-value');
const revenueResult = document.getElementById('revenue-result');
const breakevenResult = document.getElementById('breakeven-result');

// Revenue calculation formula
const avgRevenuePerUMKM = 9.6; // Rp 9.6 juta per UMKM per year (480M / 50)
const baseRevenue = 480; // Base revenue with 50 UMKM

function calculateRevenue(umkmCount) {
    const revenue = (umkmCount * avgRevenuePerUMKM);
    return revenue;
}

function calculateBreakeven(revenue) {
    // Simplified formula: if revenue >= 480M, break-even at 24 months
    // If lower, add proportional delay
    if (revenue >= 480) return 24;
    const ratio = revenue / 480;
    return Math.round(24 / ratio);
}

function formatCurrency(value) {
    if (value >= 1000) {
        return `Rp ${(value / 1000).toFixed(1)} Miliar`;
    }
    return `Rp ${value} Juta`;
}

if (umkmSlider) {
    umkmSlider.addEventListener('input', (e) => {
        const umkmCount = parseInt(e.target.value);
        umkmValue.textContent = umkmCount;
        
        const revenue = calculateRevenue(umkmCount);
        const breakeven = calculateBreakeven(revenue);
        
        revenueResult.textContent = formatCurrency(revenue);
        breakevenResult.textContent = `${breakeven} Months`;
    });
}

// ========== SCROLL ANIMATIONS ==========
const observeElements = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Apply fade-in animation to cards and sections
document.querySelectorAll('.opportunity-card, .ecosystem-card, .partner-card, .impact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observeElements.observe(el);
});

// ========== NAVBAR BACKGROUND ON SCROLL ==========
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
    }
});

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Mini Factory Interactive Website Loaded ✅');
    
    // Set initial calculator values
    if (umkmSlider) {
        umkmSlider.dispatchEvent(new Event('input'));
    }
});
