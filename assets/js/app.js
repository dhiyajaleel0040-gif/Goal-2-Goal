// Goal 2 Goal -> ChocoFerris Core Logic

// --- Mock Database ---
const products = [
    {
        id: 1,
        name: "Belgian Dark Truffles",
        price: 750,
        image: "assets/images/dark_truffles.png",
        category: "Dark Chocolate",
        isTrending: true
    },
    {
        id: 2,
        name: "Swiss Milk Caramel",
        price: 650,
        image: "assets/images/milk_caramel.png",
        category: "Milk Chocolate",
        isTrending: true
    },
    {
        id: 3,
        name: "White Raspberry Delight",
        price: 800,
        image: "assets/images/white_raspberry.png",
        category: "White Chocolate",
        isTrending: true
    },
    {
        id: 4,
        name: "Luxury Gift Hamper",
        price: 2500,
        image: "assets/images/hamper_lux.png",
        category: "Gifting",
        isTrending: false
    }
];

// --- State Management ---
let cart = JSON.parse(localStorage.getItem('choco_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    updateCartCount();

    // Page Specific Initializers
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        renderTrendingProducts();
    }

    // Global Event Listeners for "Add to Cart" (delegation)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });
});

// --- Feature: Header Scroll ---
function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(62, 39, 35, 0.95)';
            header.style.boxShadow = 'var(--shadow-main)';
        } else {
            header.style.background = 'rgba(62, 39, 35, 0.85)';
            header.style.boxShadow = 'var(--shadow-main)';
        }
    });
}

// --- Feature: Mobile Menu ---
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('Mobile menu coming soon!');
        });
    }
}

// --- Feature: Cart Logic ---
function addToCart(productId, customization = null) {
    const product = products.find(p => p.id === productId);
    if (!product && !customization) return;

    const cartItem = {
        id: Date.now(),
        productId: productId,
        name: customization ? `Custom: ${customization.name}` : product.name,
        price: customization ? customization.price : product.price,
        image: product ? product.image : 'assets/images/custom_choco.png',
        details: customization || null,
        quantity: 1
    };

    cart.push(cartItem);
    saveCart();
    showNotification('Sweet treat added to cart!');
}

function saveCart() {
    localStorage.setItem('choco_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => {
        el.innerText = cart.length;
        el.classList.add('pop');
        setTimeout(() => el.classList.remove('pop'), 200);
    });
}

function showNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerText = message;

    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'var(--color-primary)',
        color: 'var(--color-secondary)',
        padding: '12px 24px',
        borderRadius: '8px',
        fontWeight: '600',
        zIndex: '9999',
        boxShadow: '0 5px 15px rgba(62, 39, 35, 0.3)',
        animation: 'slideIn 0.3s ease-out'
    });

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Feature: Trending Products Render ---
function renderTrendingProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const trending = products.filter(p => p.isTrending);

    container.innerHTML = trending.map(product => `
        <div class="product-card">
            <div class="product-image">
                <!-- Fallback icon if image fails or for now -->
                <i class="fa-solid fa-cookie-bite" style="font-size: 4rem; color: #5D4037;"></i>
                <div class="product-overlay">
                    <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}" style="padding: 8px 15px; font-size: 0.8rem;">Add to Cart</button>
                    <a href="customize.html" class="btn btn-outline" style="padding: 8px 15px; font-size: 0.8rem;">Details</a>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">₹${product.price}</div>
            </div>
        </div>
    `).join('');
}
