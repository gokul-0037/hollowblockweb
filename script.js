// SRIPATHY TRADERS - Interactive Script with Active Section Scroll Tracking

document.addEventListener('DOMContentLoaded', () => {
    // Initial calculation
    calculateBlocks();

    // Mobile Navbar toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });

        // Auto-close menu on link click (mobile UX)
        document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }

    // Scroll Active Section Highlight (IntersectionObserver for smooth scroll navigation)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));

    // Close Lightbox on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightboxModal();
        }
    });
});

// Image Lightbox
function openLightbox(imageSrc, captionText) {
    const modal = document.getElementById('imageLightboxModal');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    if (modal && img) {
        img.src = imageSrc;
        caption.textContent = captionText || 'Sripathy Traders Photo';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightboxModal() {
    const modal = document.getElementById('imageLightboxModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function closeLightbox(event) {
    if (event.target.id === 'imageLightboxModal') {
        closeLightboxModal();
    }
}

// 🧱 Hollow Block Calculation
function calculateBlocks() {
    const lengthInput = document.getElementById('wallLength');
    const heightInput = document.getElementById('wallHeight');
    if (!lengthInput || !heightInput) return;

    const length = parseFloat(lengthInput.value) || 0;
    const height = parseFloat(heightInput.value) || 0;
    const size = document.getElementById('blockSize').value;

    const wallArea = length * height;
    let blocksNeeded = Math.ceil(wallArea * 0.9);
    if (blocksNeeded <= 0) blocksNeeded = 0;

    let pricePerBlock = 45; // 6 inch default
    if (size === '4') pricePerBlock = 36;
    if (size === '8') pricePerBlock = 58;

    const cementBags = Math.ceil(blocksNeeded / 90);
    const totalPrice = blocksNeeded * pricePerBlock;

    document.getElementById('resBlockCount').textContent = `${blocksNeeded.toLocaleString()} Blocks`;
    document.getElementById('resCementBags').textContent = `${cementBags} Bags (1:6 Mortar)`;
    document.getElementById('resBlockPrice').textContent = `₹ ${totalPrice.toLocaleString()} *`;
}

// WhatsApp Calculation Order
function sendBlockCalculationWhatsApp() {
    const length = document.getElementById('wallLength').value;
    const height = document.getElementById('wallHeight').value;
    const size = document.getElementById('blockSize').options[document.getElementById('blockSize').selectedIndex].text;
    const count = document.getElementById('resBlockCount').textContent;
    const estPrice = document.getElementById('resBlockPrice').textContent;

    const msg = `Vanakkam Sripathy Traders! 👋\n\nI calculated wall block requirements on your website:\n- Wall Dimension: ${length}ft x ${height}ft\n- Block Type: ${size}\n- Total Blocks Needed: ${count}\n- Est. Price: ${estPrice}\n\nPlease share price per unit & site delivery details.`;

    window.open(`https://wa.me/919994015673?text=${encodeURIComponent(msg)}`, '_blank');
}

// WhatsApp Product Direct Quote
function selectProductForQuote(productName) {
    const msg = `Vanakkam Sripathy Traders! 👋\n\nI want to get a price quote for: *${productName}*.\nPlease share unit rates & delivery timeline to my site location.`;
    window.open(`https://wa.me/919994015673?text=${encodeURIComponent(msg)}`, '_blank');
}

// General Quote Modal
function openQuoteModal() {
    const msg = `Vanakkam Sripathy Traders! 👋\n\nI want to get a quote for Building Materials / Tipper Rentals.`;
    window.open(`https://wa.me/919994015673?text=${encodeURIComponent(msg)}`, '_blank');
}

// Form Submit
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const material = document.getElementById('custMaterial').value;
    const details = document.getElementById('custMsg').value;

    const msg = `Vanakkam Sripathy Traders! 👋\n\nNew Inquiry:\n- Customer Name: ${name}\n- Phone: ${phone}\n- Material/Service: ${material}\n- Location & Notes: ${details}`;

    window.open(`https://wa.me/919994015673?text=${encodeURIComponent(msg)}`, '_blank');
}
