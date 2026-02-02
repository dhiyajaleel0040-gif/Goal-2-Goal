// Goal 2 Goal - Core Application Logic

// --- Mock Database ---
const products = [
    {
        id: 1,
        name: "Manchester City Home 24/25",
        price: 899,
        image: "assets/images/mancity_home.png", // Placeholder path
        category: "Premier League",
        isTrending: true
    },
    {
        id: 2,
        name: "Real Madrid Home 24/25",
        price: 999,
        image: "assets/images/real_home.png",
        category: "La Liga",
        isTrending: true
    },
    {
        id: 3,
        name: "Arsenal Away 24/25",
        price: 899,
        image: "assets/images/arsenal_away.png",
        category: "Premier League",
        isTrending: true
    },
    {
        id: 4,
        name: "Brazil Home 2024",
        price: 1199,
        image: "assets/images/brazil_home.png",
        category: "International",
        isTrending: false
    }
];

// --- State Management ---
let cart = JSON.parse(localStorage.getItem('g2g_cart')) || [];

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
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = 'var(--shadow-main)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.85)';
            header.style.boxShadow = 'none';
        }
    });
}

// --- Feature: Mobile Menu ---
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    // Simple alert for now, can expand to a real drawer later
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('Mobile menu coming soon!');
        });
    }
}

// --- Feature: Cart Logic ---
function addToCart(productId, customization = null) {
    const product = products.find(p => p.id === productId);
    if (!product && !customization) return; // Custom items might not be in product DB directly

    const cartItem = {
        id: Date.now(), // Unique ID for cart entry
        productId: productId,
        name: customization ? `Custom: ${customization.name}` : product.name,
        price: customization ? customization.price : product.price,
        image: product ? product.image : 'assets/images/custom_jersey.png',
        details: customization || null,
        quantity: 1
    };

    cart.push(cartItem);
    saveCart();
    showNotification('Item added to cart!');
}

function saveCart() {
    localStorage.setItem('g2g_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => {
        el.innerText = cart.length;
        // Animation pop
        el.classList.add('pop');
        setTimeout(() => el.classList.remove('pop'), 200);
    });
}

function showNotification(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerText = message;

    // Styles for toast (injected here for simplicity or add to CSS)
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
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
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
                <i class="fa-solid fa-shirt" style="font-size: 4rem;"></i>
                <div class="product-overlay">
                    <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}" style="padding: 8px 15px; font-size: 0.8rem;">Add to Cart</button>
                    <a href="customize.html" class="btn btn-outline" style="padding: 8px 15px; font-size: 0.8rem;">Customize</a>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">₹${product.price}</div>
            </div>
        </div>
    `).join('');
}
