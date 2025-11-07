// ============================================
// PRODUCTS PAGE - MOCK API
// ============================================

const PRODUCTS_API_URL = "https://68e3eecf8e116898997a7c31.mockapi.io/products";

document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  initFilters();
  initUserMenu();
  updateCartBadge();
});

function displayProducts() {
  const container = document.querySelector(".product-container");
  if (!container) {
    console.error("❌ Could not find .product-container element!");
    return;
  }

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

      container.innerHTML = products
        .map(
          (p) => `
          <div class="product-card">
            <div class="product-image">
              <img src="${p.imageURL || 'product_img/default.jpg'}" alt="${p.nume || 'Product'}" onerror="this.src='product_img/default.jpg'" />
              <div class="product-actions">
                <button class="action-btn" aria-label="Add to Wishlist">
                  <i class="fas fa-heart"></i>
                </button>
                <button class="action-btn cart-btn" aria-label="Add to Cart">
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
        `
        )
        .join("");

      // Add event listeners to cart buttons
      const cartButtons = document.querySelectorAll(".cart-btn");
      cartButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const productCard = btn.closest(".product-card");
          const productName =
            productCard.querySelector(".product-info h3").textContent;
          const productPrice = productCard.querySelector(".current-price")
            .textContent;

          addToCart({ name: productName, price: productPrice });
        });
      });
    })
    .catch((err) => {
      console.error("Error loading products:", err);
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
  cart.push({
    ...product,
    id: Date.now(),
    quantity: 1,
  });
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart badge on all pages
  updateCartBadge();

  showNotification(`${product.name} added to cart!`);
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartBadges = document.querySelectorAll(".cart-badge");
  cartBadges.forEach((badge) => {
    badge.textContent = cart.length;
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

