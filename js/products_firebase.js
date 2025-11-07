// ============================================
// PRODUCTS PAGE - FIREBASE
// ============================================

import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDD8sayw_6W4jBxAfwl3VcH4Y0XW5Wh9yE",
  authDomain: "retrogameshop-3d807.firebaseapp.com",
  projectId: "retrogameshop-3d807",
  storageBucket: "retrogameshop-3d807.firebasestorage.app",
  messagingSenderId: "453412511669",
  appId: "1:453412511669:web:4e48e0a819e30224e503fc",
  measurementId: "G-KPMQXNKX8G",
};

// Initialize Firebase
let app, db;

try {
  // Check if Firebase app already exists
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    console.log("✅ Firebase app created");
  } else {
    app = getApp();
    console.log("✅ Using existing Firebase app");
  }
  
  db = getFirestore(app);
  console.log("✅ Firebase Firestore initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
  console.error("Error details:", {
    message: error.message,
    code: error.code,
    name: error.name
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Wait a bit for Firebase to fully initialize
  setTimeout(() => {
    if (db) {
      displayProducts();
    } else {
      console.error("❌ Firebase not initialized!");
      const container = document.querySelector(".product-container");
      if (container) {
        container.innerHTML = `
          <div style='text-align: center; padding: 2rem;'>
            <p style='color: var(--neon-pink); font-size: 1.4rem;'>❌ Firebase not initialized</p>
            <p style='color: var(--text-secondary);'>Please check the browser console for errors.</p>
          </div>`;
      }
    }
  }, 100);
  
  initFilters();
  initUserMenu();
  updateCartBadge();
});

async function displayProducts() {
  const container = document.querySelector(".product-container");
  if (!container) {
    console.error("❌ Could not find .product-container element!");
    return;
  }

  container.innerHTML = "<p style='text-align: center; color: var(--neon-cyan);'>Loading products from Firebase...</p>";

  try {
    if (!db) {
      throw new Error("Firebase database not initialized");
    }

    console.log("🔄 Attempting to fetch products from Firebase...");
    console.log("📂 Collection: produse");
    
    const produseRef = collection(db, "produse");
    const snapshot = await getDocs(produseRef);
    
    console.log("✅ Firebase snapshot received");
    console.log(`📊 Snapshot size: ${snapshot.size}`);
    console.log(`📊 Snapshot empty: ${snapshot.empty}`);
    
    const products = [];

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log("📦 Product:", { id: doc.id, data: data });
        products.push({ id: doc.id, ...data });
      });
    }

    console.log(`📊 Total products found: ${products.length}`);

    if (products.length === 0) {
      container.innerHTML = `
        <div style='text-align: center; padding: 2rem;'>
          <p style='color: var(--text-secondary); margin-bottom: 1rem;'>No products found in Firebase database.</p>
          <p style='color: var(--neon-cyan); font-size: 1.2rem;'>Collection: "produse"</p>
          <p style='color: var(--text-secondary); font-size: 1rem; margin-top: 1rem;'>Add products from the Admin panel to see them here.</p>
        </div>`;
      return;
    }

    container.innerHTML = products
      .map(
        (p) => `
        <div class="product-card">
          <div class="product-image">
              <img src="${p.imageURL || p.image || "product_img/default.jpg"}" alt="${p.nume || p.name || 'Product'}" onerror="this.src='product_img/default.jpg'" />
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
            <h3>${p.nume || p.name || "Unnamed Product"}</h3>
            <div class="product-price">
              <span class="current-price">${p.pret || p.price || 0} lei</span>
              ${p.pret && p.pret !== p.price ? `<span class="old-price">${p.price || ""}</span>` : ""}
            </div>
          </div>
        </div>
      `
      )
      .join("");

    console.log("✅ Products rendered successfully!");

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
  } catch (error) {
    console.error("❌ Error loading products:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    
    const container = document.querySelector(".product-container");
    if (container) {
      container.innerHTML = `
        <div style='text-align: center; padding: 2rem;'>
          <p style='color: var(--neon-pink); margin-bottom: 1rem; font-size: 1.4rem;'>❌ Error loading products from Firebase</p>
          <p style='color: var(--text-secondary); margin-bottom: 0.5rem;'>Error: ${error.message}</p>
          <p style='color: var(--text-secondary); font-size: 1.2rem; margin-top: 1rem;'>Check the browser console for more details.</p>
          <p style='color: var(--neon-cyan); font-size: 1rem; margin-top: 0.5rem;'>Make sure Firebase is properly configured and the collection "produse" exists.</p>
        </div>`;
    }
  }
}

function initFilters() {
  const applyBtn = document.querySelector(".apply-filters");
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
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

