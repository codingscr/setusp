document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initSearchFunctionality();
    initFilters();
    initAnimations();
    initFormValidation();
    initRestaurantCards();
    initLoadMoreButton();
    initCuisineSlider();
});

// ========== SEARCH FUNCTIONALITY ==========
function initSearchFunctionality() {
    // Header search input
    const headerSearchInput = document.querySelector('.search-wrapper input');
    if (headerSearchInput) {
        headerSearchInput.addEventListener('input', function(e) {
            // Real-time search suggestions would be implemented here
            console.log('Searching for:', e.target.value);
        });
        
        headerSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(e.target.value);
            }
        });
    }
    
    // Hero section location input
    const locationInput = document.querySelector('.location-input input');
    if (locationInput) {
        locationInput.addEventListener('input', function(e) {
            // Location suggestions would be implemented here
            console.log('Location search:', e.target.value);
        });
    }
    
    // Detect location button
    const detectBtn = document.querySelector('.detect-btn');
    if (detectBtn) {
        detectBtn.addEventListener('click', function() {
            detectUserLocation();
        });
    }
    
    // Search button in hero section
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const locationValue = document.querySelector('.location-input input').value;
            performSearch('', locationValue);
        });
    }
}

function performSearch(query, location = '') {
    // This would typically make an API call to fetch restaurants
    console.log(`Performing search for "${query}" in location "${location}"`);
    
    // For demo purposes, we'll just filter the existing restaurants
    const restaurants = document.querySelectorAll('.restaurant-card');
    let foundAny = false;
    
    restaurants.forEach(restaurant => {
        const name = restaurant.querySelector('h3').textContent.toLowerCase();
        const cuisines = restaurant.querySelector('.restaurant-cuisine-cost p').textContent.toLowerCase();
        
        if (query === '' || name.includes(query.toLowerCase()) || cuisines.includes(query.toLowerCase())) {
            restaurant.style.display = 'block';
            foundAny = true;
        } else {
            restaurant.style.display = 'none';
        }
    });
    
    // Show message if no restaurants found
    const noResultsMsg = document.getElementById('no-results-message');
    if (!foundAny) {
        if (!noResultsMsg) {
            const message = document.createElement('div');
            message.id = 'no-results-message';
            message.className = 'no-results';
            message.textContent = 'No restaurants found matching your search criteria.';
            document.querySelector('.restaurant-grid').after(message);
        }
    } else if (noResultsMsg) {
        noResultsMsg.remove();
    }
}

function detectUserLocation() {
    const locationInput = document.querySelector('.location-input input');
    
    if (navigator.geolocation) {
        // Show loading indicator
        locationInput.value = 'Detecting your location...';
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // This would typically make an API call to reverse geocode the coordinates
                console.log('Location detected:', position.coords.latitude, position.coords.longitude);
                
                // For demo purposes, we'll just set a placeholder value
                setTimeout(() => {
                    locationInput.value = 'New York, USA';
                    showToast('Location detected successfully!');
                }, 1500);
            },
            function(error) {
                console.error('Error detecting location:', error);
                locationInput.value = '';
                showToast('Could not detect your location. Please enter it manually.', 'error');
            }
        );
    } else {
        showToast('Geolocation is not supported by your browser', 'error');
    }
}

// ========== FILTERS FUNCTIONALITY ==========
function initFilters() {
    // Sort dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortRestaurants(this.value);
        });
    }
    
    // Filter button
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            toggleFilterPanel();
        });
    }
    
    // Cuisine filter button
    const cuisineBtn = document.querySelector('.cuisine-btn');
    if (cuisineBtn) {
        cuisineBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            filterByCuisine(this.classList.contains('active') ? 'all' : null);
        });
    }
    
    // Rating filter button
    const ratingBtn = document.querySelector('.rating-btn');
    if (ratingBtn) {
        ratingBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            filterByRating(this.classList.contains('active') ? 4.0 : 0);
        });
    }
    
    // Cost filter button
    const costBtn = document.querySelector('.cost-btn');
    if (costBtn) {
        costBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            filterByCost(this.classList.contains('active') ? 'high' : 'all');
        });
    }
}

function sortRestaurants(sortBy) {
    const restaurantGrid = document.querySelector('.restaurant-grid');
    const restaurants = Array.from(restaurantGrid.querySelectorAll('.restaurant-card'));
    
    restaurants.sort((a, b) => {
        switch(sortBy) {
            case 'rating':
                const ratingA = parseFloat(a.querySelector('.rating span').textContent);
                const ratingB = parseFloat(b.querySelector('.rating span').textContent);
                return ratingB - ratingA;
            
            case 'cost-low':
                const costA = parseInt(a.querySelector('.restaurant-cuisine-cost p:last-child').textContent.match(/\d+/)[0]);
                const costB = parseInt(b.querySelector('.restaurant-cuisine-cost p:last-child').textContent.match(/\d+/)[0]);
                return costA - costB;
                
            case 'cost-high':
                const costHighA = parseInt(a.querySelector('.restaurant-cuisine-cost p:last-child').textContent.match(/\d+/)[0]);
                const costHighB = parseInt(b.querySelector('.restaurant-cuisine-cost p:last-child').textContent.match(/\d+/)[0]);
                return costHighB - costHighA;
                
            default: // popularity
                return 0; // Keep original order
        }
    });
    
    // Re-append sorted restaurants
    restaurants.forEach(restaurant => {
        restaurantGrid.appendChild(restaurant);
    });
    
    // Add animation to highlight the change
    restaurants.forEach(restaurant => {
        restaurant.classList.add('sort-animation');
        setTimeout(() => {
            restaurant.classList.remove('sort-animation');
        }, 500);
    });
}

function toggleFilterPanel() {
    // This would typically show/hide an advanced filter panel
    // For demo purposes, we'll just toggle a class on the filter button
    const filterBtn = document.querySelector('.filter-btn');
    filterBtn.classList.toggle('active');
    
    // If we had a filter panel, we would toggle it here
    const filterPanel = document.getElementById('filter-panel');
    if (filterPanel) {
        filterPanel.classList.toggle('show');
    } else {
        showToast('Advanced filters coming soon!');
    }
}

function filterByCuisine(cuisine) {
    if (!cuisine || cuisine === 'all') {
        // Show all restaurants
        document.querySelectorAll('.restaurant-card').forEach(card => {
            card.style.display = 'block';
        });
        return;
    }
    
    // Filter restaurants by cuisine
    document.querySelectorAll('.restaurant-card').forEach(card => {
        const cuisineText = card.querySelector('.restaurant-cuisine-cost p').textContent.toLowerCase();
        if (cuisineText.includes(cuisine.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterByRating(minRating) {
    document.querySelectorAll('.restaurant-card').forEach(card => {
        const rating = parseFloat(card.querySelector('.rating span').textContent);
        if (rating >= minRating) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterByCost(costLevel) {
    document.querySelectorAll('.restaurant-card').forEach(card => {
        const costText = card.querySelector('.restaurant-cuisine-cost p:last-child').textContent;
        const cost = parseInt(costText.match(/\d+/)[0]);
        
        if (costLevel === 'all' || 
            (costLevel === 'low' && cost < 20) || 
            (costLevel === 'medium' && cost >= 20 && cost <= 30) || 
            (costLevel === 'high' && cost > 30)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ========== ANIMATIONS ==========
function initAnimations() {
    // Add scroll animations
    window.addEventListener('scroll', function() {
        animateOnScroll();
    });
    
    // Add hover animations for restaurant cards
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    restaurantCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    });
    
    // Add animation for cuisine items
    const cuisineItems = document.querySelectorAll('.cuisine-item');
    cuisineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animate hero section on page load
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 200);
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.restaurant-card, .app-content, .footer-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// ========== FORM VALIDATION ==========
function initFormValidation() {
    // App download form
    const appForm = document.querySelector('.app-input');
    if (appForm) {
        const appInput = appForm.querySelector('input');
        const appButton = appForm.querySelector('button');
        
        appButton.addEventListener('click', function(e) {
            e.preventDefault();
            validateAppForm(appInput);
        });
        
        // Add enter key support
        appInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                validateAppForm(this);
            }
        });
    }
    
    // Radio button toggle for email/phone
    const radioButtons = document.querySelectorAll('.app-radio input');
    if (radioButtons.length) {
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                const appInput = document.querySelector('.app-input input');
                if (this.nextElementSibling.textContent === 'Email') {
                    appInput.type = 'email';
                    appInput.placeholder = 'Email';
                } else {
                    appInput.type = 'tel';
                    appInput.placeholder = 'Phone Number';
                }
            });
        });
    }
}

function validateAppForm(input) {
    const value = input.value.trim();
    const type = input.type;
    
    // Remove any existing error messages
    const existingError = document.querySelector('.app-input .error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validate based on input type
    if (value === '') {
        showInputError(input, 'This field is required');
        return false;
    }
    
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showInputError(input, 'Please enter a valid email address');
            return false;
        }
    } else if (type === 'tel') {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
            showInputError(input, 'Please enter a valid 10-digit phone number');
            return false;
        }
    }
    
    // If validation passes, show success message
    showToast('App link sent successfully!');
    input.value = '';
    return true;
}

function showInputError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#CB202D';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#CB202D';
    
    // Remove error styling after 3 seconds
    setTimeout(() => {
        input.style.borderColor = '';
        const errorMsg = document.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }, 3000);
}

// ========== RESTAURANT CARDS INTERACTION ==========
function initRestaurantCards() {
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    
    restaurantCards.forEach(card => {
        card.addEventListener('click', function() {
            const restaurantName = this.querySelector('h3').textContent;
            navigateToRestaurantPage(restaurantName);
        });
    });
}

function navigateToRestaurantPage(restaurantName) {
    // In a real app, this would navigate to the restaurant detail page
    // For demo purposes, we'll just show a toast message
    showToast(`Opening ${restaurantName}...`);
    console.log(`Navigating to restaurant page: ${restaurantName}`);
    
    // For demo, we'll simulate page navigation after a short delay
    setTimeout(() => {
        // This would typically be a window.location change
        // window.location.href = `/restaurant/${restaurantName.toLowerCase().replace(/\s+/g, '-')}`;
        console.log('Navigation simulation complete');
    }, 1000);
}

// ========== LOAD MORE FUNCTIONALITY ==========
function initLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreRestaurants();
        });
    }
}

function loadMoreRestaurants() {
    // In a real app, this would fetch more restaurants from an API
    // For demo purposes, we'll clone existing restaurants
    const restaurantGrid = document.querySelector('.restaurant-grid');
    const restaurants = document.querySelectorAll('.restaurant-card');
    
    // Show loading state
    const loadMoreBtn = document.querySelector('.load-more-btn');
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate API delay
    setTimeout(() => {
        // Clone existing restaurants and append them with slight modifications
        restaurants.forEach((restaurant, index) => {
            if (index < 3) { // Only clone the first 3 to avoid too many duplicates
                const clone = restaurant.cloneNode(true);
                
                // Modify some properties to make it look different
                const rating = (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
                clone.querySelector('.rating span').textContent = rating;
                
                // Add a small delay for each card to create a staggered animation effect
                setTimeout(() => {
                    restaurantGrid.appendChild(clone);
                    clone.classList.add('new-restaurant');
                    setTimeout(() => {
                        clone.classList.remove('new-restaurant');
                    }, 500);
                }, index * 200);
            }
        });
        
        // Reset button state
        loadMoreBtn.textContent = 'Load More';
        loadMoreBtn.disabled = false;
    }, 1500);
}

// ========== CUISINE SLIDER ==========
function initCuisineSlider() {
    const slider = document.querySelector('.cuisine-slider');
    
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Make cuisine items clickable
        const cuisineItems = document.querySelectorAll('.cuisine-item');
        cuisineItems.forEach(item => {
            item.addEventListener('click', function() {
                const cuisine = this.querySelector('span').textContent;
                filterByCuisine(cuisine);
                
                // Highlight selected cuisine
                cuisineItems.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                
                // Update cuisine filter button
                const cuisineBtn = document.querySelector('.cuisine-btn');
                if (cuisineBtn) {
                    cuisineBtn.textContent = cuisine;
                    cuisineBtn.classList.add('active');
                }
            });
        });
    }
}

// ========== UTILITY FUNCTIONS ==========
function showToast(message, type = 'success') {
    // Check if a toast container exists, if not create one
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
        
        // Style the container
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '1000';
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Style the toast
    toast.style.backgroundColor = type === 'error' ? '#CB202D' : '#267E3E';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '4px';
    toast.style.marginTop = '10px';
    toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        
        // Remove from DOM after animation
        setTimeout(() => {
            toast.remove();
            
            // Remove container if empty
            if (toastContainer.children.length === 0) {
                toastContainer.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS for animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .hero-content {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s ease;
        }
        
        .restaurant-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .restaurant-card.hover-effect {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .sort-animation {
            animation: pulse 0.5s ease;
        }
        
        .new-restaurant {
            animation: fadeIn 0.5s ease;
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from { 
                opacity: 0;
                transform: translateY(20px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Call this function to add animation styles
addAnimationStyles();
