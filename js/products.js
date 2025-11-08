// ============================================
// PRODUCTS PAGE - MOCK API
// ============================================

// Prevent app.js from interfering - set flag immediately
window.PRODUCTS_PAGE_LOADED = true;

console.log("✅ products.js loaded successfully!");
console.log("📍 Current page:", window.location.pathname);

const PRODUCTS_API_URL = "https://68e3eecf8e116898997a7c31.mockapi.io/products";

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM Content Loaded - Initializing products page...");
  console.log("📦 Products container:", document.querySelector(".product-container"));
  
  displayProducts();
  initFilters();
  initUserMenu();
  updateCartBadge();
});

function displayProducts() {
  console.log("🔄 displayProducts() called");
  const container = document.querySelector(".product-container");
  if (!container) {
    console.error("❌ Could not find .product-container element!");
    console.error("❌ Available containers:", document.querySelectorAll("[class*='product']"));
    return;
  }
  console.log("✅ Found product container:", container);

  container.innerHTML = "<p style='text-align: center; color: var(--neon-cyan);'>Loading products...</p>";

  fetch(PRODUCTS_API_URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((products) => {
      if (!products || products.length === 0) {
        container.innerHTML = "<p style='text-align: center; color: var(--text-secondary);'>No products found.</p>";
        return;
      }

      // Store products array for later use
      window.productsData = products;

      container.innerHTML = products
        .map(
          (p, index) => {
            const productData = {
              name: p.nume || 'Unnamed Product',
              price: p.pret || 0,
              image: p.imageURL || 'product_img/default.jpg',
              id: p.id || `mock-${index}`
            };
            return `
          <div class="product-card" data-product-index="${index}">
            <div class="product-image">
              <img src="${p.imageURL || 'product_img/default.jpg'}" alt="${p.nume || 'Product'}" onerror="this.src='product_img/default.jpg'" />
              <div class="product-actions">
                <button class="action-btn" aria-label="Add to Wishlist">
                  <i class="fas fa-heart"></i>
                </button>
                <button class="action-btn cart-btn" aria-label="Add to Cart" data-product-index="${index}">
                  <i class="fas fa-shopping-cart"></i>
                </button>
                <button class="action-btn" aria-label="Share">
                  <i class="fas fa-share"></i>
                </button>
              </div>
            </div>
            <div class="product-info">
              <h3>${p.nume || 'Unnamed Product'}</h3>
              <div class="product-price">
                <span class="current-price">${p.pret || 0} lei</span>
              </div>
            </div>
          </div>
        `;
          }
        )
        .join("");

      // Add event listeners to cart buttons
      const cartButtons = document.querySelectorAll(".cart-btn");
      console.log(`✅ Found ${cartButtons.length} cart buttons`);
      
      // Add event listeners to all action buttons
      const actionButtons = document.querySelectorAll(".action-btn");
      console.log(`✅ Found ${actionButtons.length} action buttons`);
      
      cartButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const index = parseInt(btn.dataset.productIndex);
          if (window.productsData && window.productsData[index]) {
            const p = window.productsData[index];
            const productData = {
              name: p.nume || 'Unnamed Product',
              price: p.pret || 0,
              image: p.imageURL || 'product_img/default.jpg',
              id: p.id || `mock-${index}`
            };
            console.log("🛒 Adding to cart:", productData);
            addToCart(productData);
          }
        });
      });
      
      // Add event listeners for wishlist buttons
      const wishlistButtons = document.querySelectorAll(".action-btn:not(.cart-btn)");
      wishlistButtons.forEach((btn, idx) => {
        if (!btn.classList.contains("cart-btn") && btn.querySelector(".fa-heart")) {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("❤️ Wishlist button clicked");
            // TODO: Implement wishlist functionality
          });
        }
      });
      
      console.log("✅ All event listeners attached");
      
      // Verify actions are in DOM
      setTimeout(() => {
        const actionsCheck = document.querySelectorAll(".product-actions");
        const buttonsCheck = document.querySelectorAll(".action-btn");
        console.log(`🔍 Verification: Found ${actionsCheck.length} product-actions containers`);
        console.log(`🔍 Verification: Found ${buttonsCheck.length} action buttons in DOM`);
        
        if (actionsCheck.length === 0) {
          console.error("❌ ERROR: No .product-actions found in DOM!");
          console.error("❌ Generated HTML sample:", container.innerHTML.substring(0, 500));
        }
        
        // Check CSS visibility
        actionsCheck.forEach((action, idx) => {
          const style = window.getComputedStyle(action);
          console.log(`🔍 Action ${idx}:`, {
            display: style.display,
            opacity: style.opacity,
            visibility: style.visibility,
            zIndex: style.zIndex,
            position: style.position
          });
        });
      }, 100);
    })
    .catch((err) => {
      console.error("❌ Error loading products:", err);
      console.error("❌ Error details:", err.stack);
      container.innerHTML = `<p style='text-align: center; color: var(--neon-pink); padding: 2rem;'>Error loading products: ${err.message}. Please check your internet connection and try again.</p>`;
    });
}

function initFilters() {
  const applyBtn = document.querySelector(".apply-filters");
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      // Filter logic here
      console.log("Filters applied");
    });
  }
}

function initUserMenu() {
  const userBtn = document.getElementById("user-btn");
  const dropdown = document.getElementById("user-dropdown");

  if (userBtn && dropdown) {
    userBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (
        !userBtn.contains(e.target) &&
        !dropdown.contains(e.target) &&
        dropdown.classList.contains("show")
      ) {
        dropdown.classList.remove("show");
      }
    });
  }
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Parse price to number if it's a string (use current price if available, otherwise price)
  const price = typeof product.price === 'string' 
    ? parseFloat(product.price.replace(/[^\d.-]/g, '')) || 0
    : (typeof product.price === 'number' ? product.price : 0);
  
  // Parse old price if available (for discounted products)
  const oldPrice = product.oldPrice 
    ? (typeof product.oldPrice === 'string' 
        ? parseFloat(product.oldPrice.replace(/[^\d.-]/g, '')) || null
        : (typeof product.oldPrice === 'number' ? product.oldPrice : null))
    : null;
  
  // Check if product already exists in cart (by name or id)
  const existingItemIndex = cart.findIndex(
    item => item.name === product.name || item.id === product.id
  );
  
  if (existingItemIndex !== -1) {
    // Product exists, increase quantity
    cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    showNotification(`${product.name} quantity increased!`);
  } else {
    // New product, add to cart
    const cartItem = {
      name: product.name,
      price: price,
      image: product.image || product.imageURL || 'product_img/default.jpg',
      id: product.id || Date.now(),
      quantity: 1,
    };
    
    // Add old price if available (for displaying discount)
    if (oldPrice) {
      cartItem.oldPrice = oldPrice;
    }
    
    cart.push(cartItem);
    showNotification(`${product.name} added to cart!`);
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart badge on all pages
  updateCartBadge();
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartBadges = document.querySelectorAll(".cart-badge");
  cartBadges.forEach((badge) => {
    badge.textContent = totalQuantity;
  });
}


function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: rgba(255, 0, 255, 0.9);
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    border: 2px solid #00ffff;
    box-shadow: 0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Add notification animations
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

