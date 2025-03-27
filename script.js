// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initializeNavigation();
    initializeSearch();
    initializeLanguageSelector();
    initializePaymentMethods();
    initializeFeedback();
});

/**
 * Initialize click handlers for all category list items
 * Logs the selected category to the console
 */
function initializeCategoryHandlers() {
    document.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function() {
            console.log('Category selected:', this.textContent);
        });
    });
}

function initializeNavigation() {
    // Main menu navigation
    document.querySelectorAll('.main-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.textContent.replace('HOT', '').trim();
            console.log(`Navigating to category: ${category}`);
            // Add actual navigation logic here
        });
    });

    // Breadcrumb navigation
    document.querySelectorAll('.breadcrumb a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Navigating to: ${this.textContent}`);
            // Add actual navigation logic here
        });
    });

    // Footer navigation
    document.querySelectorAll('.footer-column a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Navigating to: ${this.textContent}`);
            // Add actual navigation logic here
            handleFooterNavigation(this.textContent);
        });
    });
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const quoteBtn = document.querySelector('.quote-btn');

    // Search functionality
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log(`Searching for: ${searchTerm}`);
            // Add actual search logic here
        } else {
            alert('Please enter a keyword or part number');
        }
    });

    // Enter key in search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // Quote/Order functionality
    quoteBtn.addEventListener('click', function() {
        if (!isLoggedIn()) {
            window.location.href = 'login.html';
        } else {
            console.log('Opening quote/order form');
            // Add actual quote/order logic here
        }
    });
}

function initializeLanguageSelector() {
    const languageSelector = document.querySelector('.language-selector');
    
    languageSelector.addEventListener('click', function(e) {
        const language = e.target.textContent;
        if (language !== document.querySelector('.selected').textContent) {
            console.log(`Changing language to: ${language}`);
            // Add actual language change logic here
            updateLanguageSelection(language);
        }
    });
}

function initializePaymentMethods() {
    // Payment method selection
    document.querySelectorAll('.payment-icons img').forEach(icon => {
        icon.addEventListener('click', function() {
            console.log(`Selected payment method: ${this.alt}`);
            // Add actual payment method selection logic here
        });
    });

    // QR code functionality
    const qrCode = document.querySelector('.qr-code img');
    if (qrCode) {
        qrCode.addEventListener('click', function() {
            console.log('Opening QR code scanner');
            // Add actual QR code scanning logic here
        });
    }
}

function initializeFeedback() {
    // Feedback form
    const feedbackSection = document.querySelector('.feedback');
    feedbackSection.addEventListener('click', function() {
        console.log('Opening feedback form');
        showFeedbackForm();
    });
}

// Helper functions
function isLoggedIn() {
    // Check if user is logged in
    return localStorage.getItem('isLoggedIn') === 'true';
}

function updateLanguageSelection(language) {
    const selected = document.querySelector('.language-selector .selected');
    const previousLanguage = selected.textContent;
    
    // Update selected language
    selected.textContent = language;
    
    // Update content language
    document.documentElement.lang = language === 'English' ? 'en' : 'hi';
    
    // Refresh content in new language
    // Add actual content translation logic here
}

function handleFooterNavigation(destination) {
    switch(destination) {
        case 'Register':
            window.location.href = 'login.html';
            break;
        case 'How to Use':
            showHelpGuide();
            break;
        case 'Request a Quote':
            if (isLoggedIn()) {
                showQuoteForm();
            } else {
                window.location.href = 'login.html';
            }
            break;
        case 'Cart':
            if (isLoggedIn()) {
                window.location.href = 'cart.html';
            } else {
                window.location.href = 'login.html';
            }
            break;
        // Add more cases as needed
    }
}

function showFeedbackForm() {
    // Create and show feedback modal
    const modal = document.createElement('div');
    modal.className = 'feedback-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>How can we improve?</h3>
            <textarea placeholder="Your feedback"></textarea>
            <button onclick="submitFeedback()">Submit</button>
            <button onclick="closeFeedbackModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function showHelpGuide() {
    // Create and show help guide modal
    const modal = document.createElement('div');
    modal.className = 'help-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>How to Use MISUMI</h3>
            <div class="help-content">
                <h4>Quick Start Guide</h4>
                <ol>
                    <li>Search for products using the search bar</li>
                    <li>Browse categories using the main menu</li>
                    <li>Add items to your cart</li>
                    <li>Request quotes for bulk orders</li>
                </ol>
            </div>
            <button onclick="closeHelpModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function showQuoteForm() {
    // Create and show quote request modal
    const modal = document.createElement('div');
    modal.className = 'quote-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Request a Quote</h3>
            <form id="quoteForm">
                <input type="text" placeholder="Product Name/Number" required>
                <input type="number" placeholder="Quantity" required>
                <textarea placeholder="Additional Requirements"></textarea>
                <button type="submit">Submit Quote Request</button>
                <button type="button" onclick="closeQuoteModal()">Cancel</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

// Social media links
document.querySelectorAll('.social-icons a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.querySelector('img').alt;
        const socialLinks = {
            'Facebook': 'https://facebook.com/misumi',
            'WhatsApp': 'https://wa.me/yourwhatsappnumber',
            'YouTube': 'https://youtube.com/misumi',
            'Twitter': 'https://twitter.com/misumi',
            'Instagram': 'https://instagram.com/misumi'
        };
        window.open(socialLinks[platform], '_blank');
    });
}); 