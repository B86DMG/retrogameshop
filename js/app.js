// window.addEventListener("DOMContentLoaded", displayProducts);

// const URL = "https://68e3eecf8e116898997a7c31.mockapi.io/products";

// function displayProducts() {
//   fetch(URL)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network error!");
//       }
//       return response.json();
//     })
//     .then((products) => {
//       const container = document.querySelector(".product-container");
//       if (!container) {
//         console.error("❌ Could not find .product-container element!");
//         return;
//       }

//       // Clear container before inserting
//       container.innerHTML = "";

//       // Generate HTML for all products
//       const productHTML = products
//         .map(
//           (product) => `
//           <div class="box">

//             <div class="image">
//               <img src="${product.imageURL}" alt="${product.nume}" />
//               <div class="icons">
//                 <a href="#" class="fas fa-heart"></a>
//                 <a href="#" class="cart-btn">Adaugă în coș</a>
//                 <a href="#" class="fas fa-share"></a>
//               </div>
//             </div>
//             <div class="content">
//               <h3>${product.nume}</h3>
//               <div class="price">${product.pret} lei</div>
//             </div>
//           </div>
//         `
//         )
//         .join("");

//       container.innerHTML = productHTML;
//     })
//     .catch((err) => console.error("Error loading products:", err));
// }

// V2 - DISABLED: This function is now handled by products.js for products.html
// The displayProducts() function in app.js has been disabled to avoid conflicts
// with products.js which handles product display on products.html and products_firebase.html

// Check if we're on a products page - if so, don't run the old displayProducts
const isProductsPage = window.location.pathname.includes('products.html') || 
                       window.location.pathname.includes('products_firebase.html') ||
                       window.PRODUCTS_PAGE_LOADED;

if (!isProductsPage) {
  // Only define displayProducts for non-products pages if needed
  // Currently disabled to avoid conflicts
  console.log("ℹ️ app.js: Skipping displayProducts (handled by products.js on product pages)");
}

document.addEventListener("DOMContentLoaded", () => {
  const userBtn = document.getElementById("user-btn");
  const dropdown = document.getElementById("user-dropdown");

  if (userBtn && dropdown) {
    userBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!userBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("show");
      }
    });
  }
});

// ADMIN
const API_URL = "https://68e3eecf8e116898997a7c31.mockapi.io/products";

// Tabs
const addTab = document.getElementById("add-tab");
const getTab = document.getElementById("get-tab");
const addSection = document.getElementById("add-section");
const getSection = document.getElementById("get-section");

addTab.addEventListener("click", () => {
  addTab.classList.add("active");
  getTab.classList.remove("active");
  addSection.style.display = "block";
  getSection.style.display = "none";
});

getTab.addEventListener("click", () => {
  getTab.classList.add("active");
  addTab.classList.remove("active");
  addSection.style.display = "none";
  getSection.style.display = "block";
  fetchProducts();
});

// Add Product
const addForm = document.getElementById("add-product-form");
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addForm);
  const product = Object.fromEntries(formData.entries());

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Product added successfully!");
      addForm.reset();
    })
    .catch((err) => console.error("Error adding product:", err));
});

// Get Products
function fetchProducts() {
  const list = document.getElementById("products-list");
  list.innerHTML = "Loading...";
  fetch(API_URL)
    .then((res) => res.json())
    .then((products) => {
      list.innerHTML = products
        .map(
          (p) => `
        <div class="product-card-admin">
          <strong>${p.nume}</strong> - ${p.categorie} - ${p.subcategorie} - ${p.stare} - ${p.pret} RON
          <div class="admin-actions">
            <button onclick="editProduct('${p.id}')">Edit</button>
            <button onclick="deleteProduct('${p.id}')">Delete</button>
          </div>
        </div>
      `
        )
        .join("");
    });
}

// Delete Product
function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then(() => fetchProducts())
    .catch((err) => console.error(err));
}

// Edit Product (basic prompt example)
function editProduct(id) {
  const newName = prompt("Enter new name:");
  if (!newName) return;
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nume: newName }),
  })
    .then((res) => res.json())
    .then(() => fetchProducts())
    .catch((err) => console.error(err));
}
