// Product data
const products = [
    {
        id: 1,
        name: "Screw Fittings, Screw-In Type Flanges",
        price: "₹1,299.00",
        image: "images/screw-fitting-1.jpg"
    },
    {
        id: 2,
        name: "Hose Fittings",
        price: "₹899.00",
        image: "images/hose-fitting.jpg"
    },
    {
        id: 3,
        name: "Fittings for Stainless Steel Pipes",
        price: "₹1,499.00",
        image: "images/stainless-steel-fitting.jpg"
    },
    {
        id: 4,
        name: "Fittings for Steel Pipes and Copper Pipes",
        price: "₹1,199.00",
        image: "images/steel-copper-fitting.jpg"
    },
    {
        id: 5,
        name: "Weld-On Type Fittings",
        price: "₹999.00",
        image: "images/weld-on-fitting.jpg"
    },
    {
        id: 6,
        name: "Welding Flanges",
        price: "₹1,699.00",
        image: "images/welding-flange.jpg"
    },
    {
        id: 7,
        name: "Rotary / Swivel Joints",
        price: "₹2,199.00",
        image: "images/rotary-joint.jpg"
    }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchBtn = document.querySelector('.search-btn');

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Filter products based on search input
function filterProducts(query) {
    query = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
}

// Create suggestion item HTML
function createSuggestionItem(product) {
    return `
        <div class="suggestion-item" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
            </div>
        </div>
    `;
}

// Update suggestions display
function updateSuggestions(query) {
    if (!query) {
        // Show all products when search is empty
        searchSuggestions.innerHTML = products
            .map(product => createSuggestionItem(product))
            .join('');
        searchSuggestions.classList.add('active');
        return;
    }

    if (query.length < 2) {
        searchSuggestions.classList.remove('active');
        return;
    }

    const filteredProducts = filterProducts(query);
    
    if (filteredProducts.length > 0) {
        searchSuggestions.innerHTML = filteredProducts
            .map(product => createSuggestionItem(product))
            .join('');
        searchSuggestions.classList.add('active');
    } else {
        searchSuggestions.innerHTML = '<div class="suggestion-item">No products found</div>';
        searchSuggestions.classList.add('active');
    }
}

// Handle search input
const debouncedUpdateSuggestions = debounce(updateSuggestions, 300);

searchInput.addEventListener('input', (e) => {
    debouncedUpdateSuggestions(e.target.value);
});

// Handle suggestion click
searchSuggestions.addEventListener('click', (e) => {
    const suggestionItem = e.target.closest('.suggestion-item');
    if (suggestionItem) {
        const productId = suggestionItem.dataset.id;
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            searchInput.value = product.name;
            searchSuggestions.classList.remove('active');
            // You can add additional functionality here, like scrolling to the product
            const productElement = document.querySelector(`[data-id="${productId}"]`);
            if (productElement) {
                productElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Handle search button click
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        const filteredProducts = filterProducts(query);
        if (filteredProducts.length > 0) {
            searchSuggestions.innerHTML = filteredProducts
                .map(product => createSuggestionItem(product))
                .join('');
            searchSuggestions.classList.add('active');
        } else {
            searchSuggestions.innerHTML = '<div class="suggestion-item">No products found</div>';
            searchSuggestions.classList.add('active');
        }
    } else {
        // Show all products when search is empty
        searchSuggestions.innerHTML = products
            .map(product => createSuggestionItem(product))
            .join('');
        searchSuggestions.classList.add('active');
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.classList.remove('active');
    }
});

// Handle Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
}); 