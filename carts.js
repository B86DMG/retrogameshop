// Cart functionality for Retro Game Shop
document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  initCartEventListeners();
  updateCartBadge();
});

let cart = [];

// Display cart items
function displayCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-container");
  const emptyMessage = document.getElementById("empty-cart-message");
  const cartSummary = document.querySelector(".cart-summary");
  
  if (!cartContainer) return;

  // Clear container
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.style.display = "none";
    if (emptyMessage) emptyMessage.style.display = "flex";
    if (cartSummary) cartSummary.style.display = "none";
    updateTotalPrice(0);
    return;
  }

  cartContainer.style.display = "grid";
  if (emptyMessage) emptyMessage.style.display = "none";
  if (cartSummary) cartSummary.style.display = "block";

  let total = 0;

  cart.forEach((item, index) => {
    const price = parsePrice(item.price);
    const itemTotal = price * (item.quantity || 1);
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.dataset.index = index;
    
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image || item.imageURL || 'product_img/default.jpg'}" 
             alt="${item.name}" 
             onerror="this.src='product_img/default.jpg'" />
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.name}</h3>
        <div class="cart-item-price-container">
          <p class="cart-item-price">${formatPrice(price)} lei</p>
          ${item.oldPrice ? `<p class="cart-item-old-price">${formatPrice(parsePrice(item.oldPrice))} lei</p>` : ''}
        </div>
      </div>
      <div class="cart-item-quantity">
        <button class="quantity-btn decrease" data-index="${index}" aria-label="Decrease quantity">
          <i class="fas fa-minus"></i>
        </button>
        <span class="quantity-value">${item.quantity || 1}</span>
        <button class="quantity-btn increase" data-index="${index}" aria-label="Increase quantity">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="cart-item-total">
        <span class="item-total-price">${formatPrice(itemTotal)} lei</span>
      </div>
      <button class="cart-item-delete" data-index="${index}" aria-label="Remove item">
        <i class="fas fa-trash"></i>
      </button>
    `;

    cartContainer.appendChild(cartItem);
  });

  updateTotalPrice(total);
  updateCartBadge();
}

// Initialize event listeners
function initCartEventListeners() {
  const cartContainer = document.getElementById("cart-container");
  if (!cartContainer) return;

  // Delegate events for dynamic content
  cartContainer.addEventListener("click", handleCartAction);

  // Clear cart button
  const clearBtn = document.getElementById("clear-cart-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  }

  // Checkout button
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", handleCheckout);
  }
}

// Handle cart actions (increase, decrease, delete)
function handleCartAction(e) {
  const button = e.target.closest("button");
  if (!button) return;

  const index = parseInt(button.dataset.index);
  if (isNaN(index)) return;

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (button.classList.contains("increase")) {
    increaseQuantity(index);
  } else if (button.classList.contains("decrease")) {
    decreaseQuantity(index);
  } else if (button.classList.contains("cart-item-delete")) {
    deleteItem(index);
  }
}

// Increase item quantity
function increaseQuantity(index) {
  if (cart[index]) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
    saveCart();
    displayCart();
  }
}

// Decrease item quantity
function decreaseQuantity(index) {
  if (cart[index] && cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    saveCart();
    displayCart();
  }
}

// Delete item from cart
function deleteItem(index) {
  if (cart[index]) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
  }
}

// Clear entire cart
function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    localStorage.removeItem("cart");
    cart = [];
    displayCart();
    showNotification("Cart cleared!");
  }
}

// Handle checkout
function handleCheckout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!", "error");
    return;
  }
  
  // TODO: Implement checkout logic
  showNotification("Checkout functionality coming soon!", "info");
  console.log("Checkout:", cart);
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

// Update total price display
function updateTotalPrice(total) {
  const totalPriceEl = document.getElementById("total-price");
  if (totalPriceEl) {
    totalPriceEl.textContent = `${formatPrice(total)} lei`;
  }
}

// Parse price from string or number
function parsePrice(price) {
  if (typeof price === "number") {
    return price;
  }
  if (typeof price === "string") {
    // Extract number from string like "299 lei" or "299.99 RON"
    const match = price.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }
  return 0;
}

// Format price with 2 decimal places
function formatPrice(price) {
  return parseFloat(price).toFixed(2);
}

// Update cart badge (shared function)
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartBadges = document.querySelectorAll(".cart-badge");
  cartBadges.forEach((badge) => {
    badge.textContent = totalQuantity;
  });
}

// Show notification (if available from app.js)
function showNotification(message, type = "success") {
  if (typeof window.showNotification === "function") {
    window.showNotification(message, type);
  } else {
    alert(message);
  }
}
