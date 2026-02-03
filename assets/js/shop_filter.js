
// --- Feature: Shop Page Filtering ---
function initShopFilters() {
    const checkboxes = document.querySelectorAll('.filter-list input[type="checkbox"]');
    const products = document.querySelectorAll('.shop-products .product-card');

    if (checkboxes.length === 0 || products.length === 0) return;

    checkboxes.forEach(cb => {
        cb.addEventListener('change', filterProducts);
    });

    function filterProducts() {
        const activeCategories = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.parentElement.innerText.trim());

        products.forEach(card => {
            // In a real app, we'd use data attributes. 
            // For this static version, I'll assume we map titles or add data-attributes.
            // I added data-category to the new card, let's add logic to infer for others or just use text content for now.

            // To make this robust without editing all HTML, let's infer category from title matching or explicit data attribute.
            // But I only added data-attribute to the new one.
            // Let's rely on simple text matching for now for the demo.

            const title = card.querySelector('.product-title').innerText;
            const cardCategory = card.getAttribute('data-category');

            let match = false;

            // Map titles to categories roughly
            let inferredCat = "";
            if (title.includes("Dark")) inferredCat = "Dark Chocolate";
            else if (title.includes("Milk")) inferredCat = "Milk Chocolate";
            else if (title.includes("White")) inferredCat = "White Chocolate";
            else if (title.includes("Truffles")) inferredCat = "Truffles & Pralines";
            else if (title.includes("Gift") || title.includes("Heart")) inferredCat = "Gift Hampers";
            else if (title.includes("Almond")) inferredCat = "Nuts & Crunch";

            const category = cardCategory || inferredCat;

            if (activeCategories.length === 0 || activeCategories.includes(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Call initShopFilters on load
if (window.location.pathname.endsWith('shop.html')) {
    initShopFilters();
}
