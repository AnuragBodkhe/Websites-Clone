// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
});

class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        // Initialize cart count on page load
        this.updateCartCount();
        
        // Add event listeners for add to cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleAddToCart(e));
        });

        // If we're on the cart page, initialize cart display
        if (window.location.pathname.includes('cart.html')) {
            this.initializeCartPage();
        }
    }

    handleAddToCart(e) {
        e.preventDefault();
        const button = e.target;
        const productItem = button.closest('.product-item');
        
        const product = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            quantity: 1,
            image: productItem.querySelector('img').src
        };

        this.addItem(product);
        this.showNotification('Item added to cart successfully!');
    }

    initializeCartPage() {
        this.updateCartDisplay();
        
        // Add event listeners for cart page elements
        const cartItems = document.getElementById('cart-items');
        if (cartItems) {
            // Handle quantity changes and remove buttons
            cartItems.addEventListener('click', (e) => {
                const target = e.target;
                const row = target.closest('tr');
                
                if (!row) return;
                
                const productId = row.dataset.id;
                
                if (target.classList.contains('quantity-btn')) {
                    const input = row.querySelector('.quantity-input');
                    const currentQty = parseInt(input.value);
                    
                    if (target.textContent === '+') {
                        this.updateQuantity(productId, currentQty + 1);
                    } else if (target.textContent === '-') {
                        if (currentQty > 1) {
                            this.updateQuantity(productId, currentQty - 1);
                        }
                    }
                }
                
                if (target.classList.contains('remove-item')) {
                    this.removeItem(productId);
                }
            });

            // Handle direct quantity input
            cartItems.addEventListener('change', (e) => {
                if (e.target.classList.contains('quantity-input')) {
                    const row = e.target.closest('tr');
                    const productId = row.dataset.id;
                    let quantity = parseInt(e.target.value);
                    
                    // Ensure quantity is at least 1
                    quantity = Math.max(1, quantity);
                    this.updateQuantity(productId, quantity);
                }
            });
        }

        // Handle checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.handleCheckout());
        }
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push(product);
        }
        this.saveCart();
        this.updateCartCount();
        this.updateCartDisplay();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.updateCartDisplay();
        this.showNotification('Item removed from cart');
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, parseInt(quantity) || 1);
            this.saveCart();
            this.updateCartCount();
            this.updateCartDisplay();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count.toString();
            // Make cart count visible only if there are items
            cartCount.style.display = count > 0 ? 'block' : 'none';
        }
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const cartEmptyMessage = document.getElementById('cart-empty-message');
        const cartContainer = document.querySelector('.cart-container');

        if (!cartItems) return; // Not on cart page

        if (this.items.length === 0) {
            if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
            if (cartContainer) cartContainer.style.display = 'none';
            return;
        }

        if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
        if (cartContainer) cartContainer.style.display = 'grid';

        cartItems.innerHTML = this.items.map(item => `
            <tr data-id="${item.id}">
                <td>
                    <div class="product-info">
                        <img src="${item.image || `images/${item.id}.jpg`}" alt="${item.name}">
                        <span>${item.name}</span>
                    </div>
                </td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>
                    <div class="quantity-control">
                        <button class="quantity-btn" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                        <button class="quantity-btn">+</button>
                    </div>
                </td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="remove-item" title="Remove item">×</button>
                </td>
            </tr>
        `).join('');

        this.updateSummary();
    }

    updateSummary() {
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 100 : 0;
        const total = subtotal + shipping;

        const subtotalElem = document.getElementById('subtotal');
        const shippingElem = document.getElementById('shipping');
        const totalElem = document.getElementById('total');

        if (subtotalElem) subtotalElem.textContent = `₹${subtotal.toFixed(2)}`;
        if (shippingElem) shippingElem.textContent = `₹${shipping.toFixed(2)}`;
        if (totalElem) totalElem.textContent = `₹${total.toFixed(2)}`;
    }

    handleCheckout() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty!');
            return;
        }
        
        // Here you would typically redirect to a checkout page
        alert('Proceeding to checkout with ' + this.items.length + ' items...');
        // You can add your checkout logic here
    }

    showNotification(message) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.style.display = 'block';
            notification.style.opacity = '1';
        }, 100);

        // Hide and remove notification
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
} 