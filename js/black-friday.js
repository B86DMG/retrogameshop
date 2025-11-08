// Black Friday products functionality
document.addEventListener("DOMContentLoaded", () => {
  initBlackFridayProducts();
});

function initBlackFridayProducts() {
  // Get all cart buttons from Black Friday section
  const blackFridaySection = document.querySelector("#products");
  if (!blackFridaySection) return;

  const cartButtons = blackFridaySection.querySelectorAll(".cart-btn");
  
  cartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const productCard = btn.closest(".product-card");
      if (!productCard) return;

      // Get product data
      const productName = productCard.querySelector(".product-info h3")?.textContent?.trim() || "";
      const currentPriceEl = productCard.querySelector(".current-price");
      const oldPriceEl = productCard.querySelector(".old-price");
      const productImage = productCard.querySelector(".product-image img");
      
      if (!productName || !currentPriceEl) return;

      // Parse prices
      const currentPrice = currentPriceEl.textContent.trim();
      const oldPrice = oldPriceEl ? oldPriceEl.textContent.trim() : null;
      const imageSrc = productImage ? productImage.src : "product_img/default.jpg";

      // Create product object
      const productData = {
        name: productName,
        price: currentPrice,
        oldPrice: oldPrice,
        image: imageSrc,
        id: `black-friday-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };

      // Add to cart using the function from products.js or products_firebase.js
      if (typeof addToCart === "function") {
        addToCart(productData);
      } else {
        // Fallback: use localStorage directly
        addToCartFallback(productData);
      }
    });
  });
}

// Fallback function if addToCart is not available
function addToCartFallback(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Parse price to number
  const price = typeof product.price === 'string' 
    ? parseFloat(product.price.replace(/[^\d.-]/g, '')) || 0
    : (typeof product.price === 'number' ? product.price : 0);
  
  // Parse old price if available
  const oldPrice = product.oldPrice 
    ? (typeof product.oldPrice === 'string' 
        ? parseFloat(product.oldPrice.replace(/[^\d.-]/g, '')) || null
        : (typeof product.oldPrice === 'number' ? product.oldPrice : null))
    : null;
  
  // Check if product already exists
  const existingItemIndex = cart.findIndex(
    item => item.name === product.name || item.id === product.id
  );
  
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
  } else {
    const cartItem = {
      name: product.name,
      price: price,
      image: product.image || 'product_img/default.jpg',
      id: product.id || Date.now(),
      quantity: 1,
    };
    
    if (oldPrice) {
      cartItem.oldPrice = oldPrice;
    }
    
    cart.push(cartItem);
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  
  // Update cart badge
  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartBadges = document.querySelectorAll(".cart-badge");
  cartBadges.forEach((badge) => {
    badge.textContent = totalQuantity;
  });
  
  // Show notification
  if (typeof showNotification === "function") {
    showNotification(`${product.name} added to cart!`);
  } else {
    alert(`${product.name} added to cart!`);
  }
}

