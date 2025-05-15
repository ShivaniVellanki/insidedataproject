// Store analytics data
const analytics = {
    cart: [],
    searchHistory: [],
    viewedProducts: [],
    lastUpdated: new Date().toISOString()
};

// Make analytics globally accessible
window.analytics = analytics;

// Make getAnalytics globally accessible
window.getAnalytics = function() {
    return analytics;
};

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const checkoutButton = document.getElementById('checkoutButton');

// Initialize the store
function initStore() {
    displayProducts(products);
    updateCartDisplay();
}

// Display products in the grid
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
        
        // Track viewed products
        if (!analytics.viewedProducts.includes(product.id)) {
            analytics.viewedProducts.push(product.id);
        }
    });
    updateAnalytics();
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    
    card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product));
    return card;
}

// Add product to cart
function addToCart(product) {
    const existingItem = analytics.cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        analytics.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    updateAnalytics();
}

// Update cart display
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;
    
    analytics.cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        count += item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        
        cartItem.querySelector('.remove-item').addEventListener('click', () => removeFromCart(item.id));
        cartItems.appendChild(cartItem);
    });
    
    cartCount.textContent = count;
    cartTotal.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(productId) {
    analytics.cart = analytics.cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateAnalytics();
}

// Search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm) {
        analytics.searchHistory.push({
            term: searchTerm,
            timestamp: new Date().toISOString()
        });
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        
        displayProducts(filteredProducts);
    } else {
        displayProducts(products);
    }
    
    updateAnalytics();
}

/**
 * Send analytics data to any destination.
 * @param {function} destinationFn - A function that receives the analytics object (e.g., API call, bot handler, etc.)
 * Usage: sendAnalytics(yourFunction)
 */
function sendAnalytics(destinationFn) {
    if (typeof destinationFn === 'function') {
        destinationFn(analytics);
    } else {
        console.warn('sendAnalytics: destinationFn is not a function');
    }
}

// Update analytics data
function updateAnalytics() {
    analytics.lastUpdated = new Date().toISOString();
    console.log('Current Analytics:', analytics);
    // In a real application, you would send this data to a server
    // For now, we'll just store it in the console
    // KoreChatSDK.chatConfig.botOptions.botInfo.customData = { analytics };
}

// Event Listeners
searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

checkoutButton.addEventListener('click', () => {
    if (analytics.cart.length > 0) {
        alert('Thank you for your purchase!');
        analytics.cart = [];
        updateCartDisplay();
        updateAnalytics();
    } else {
        alert('Your cart is empty!');
    }
});

// Initialize the store when the page loads
document.addEventListener('DOMContentLoaded', initStore); 