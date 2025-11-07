// ============================================
// ADMIN PAGE - FIREBASE
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let isEditMode = false;
let productID;
let addBtn, productForm;

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  addBtn = document.getElementById("add-btn");
  productForm = document.getElementById("product-form");
  
  if (addBtn) {
    addBtn.addEventListener("click", handleAddOrEditProduct);
  }
  
  displayProducts();
});

async function handleAddOrEditProduct(e) {
  e.preventDefault();

  if (!productForm) {
    console.error("❌ Product form not found!");
    return;
  }

  const product = {
    nume: document.getElementById("nume").value,
    pret: parseFloat(document.getElementById("pret").value),
    imageURL: document.getElementById("imageURL").value,
    description: document.getElementById("description").value,
    categorie: document.getElementById("categorie").value,
    subcategorie: document.getElementById("subcategorie").value,
    cantitate: parseInt(document.getElementById("cantitate").value),
    state: parseInt(document.getElementById("stare").value),
  };

  try {
    if (isEditMode) {
      await updateDoc(doc(db, "produse", productID), product);
    } else {
      await addDoc(collection(db, "produse"), product);
    }
    productForm.reset();
    displayProducts();
    resetForm();
  } catch (err) {
    console.error("❌ Error adding/editing product:", err);
    alert("Error adding/editing product. Please try again.");
  }
}

// Display products
async function displayProducts() {
  const tbody = document.querySelector("#products-table tbody");
  if (!tbody) {
    console.error("❌ Could not find #products-table tbody element!");
    return;
  }
  
  tbody.innerHTML = "<tr><td colspan='7' style='text-align: center; padding: 2rem; color: var(--neon-cyan);'>Loading products...</td></tr>";

  try {
    const snapshot = await getDocs(collection(db, "produse"));
    let index = 1;

    snapshot.forEach((docSnap) => {
      const p = docSnap.data();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index}</td>
        <td><img src="${p.imageURL || ""}" alt="${p.nume}" width="50" /></td>
        <td>${p.nume || ""}</td>
        <td>${p.pret || 0}</td>
        <td>${p.description || ""}</td>
        <td>${p.state || 0}</td>
        <td>
          <div class="actions">
            <button class="btn edit" onclick="editProduct('${docSnap.id}')">
              <i class="fas fa-pen-to-square"></i> Edit
            </button>
            <button class="btn delete" onclick="deleteProduct('${docSnap.id}')">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
      index++;
    });
  } catch (err) {
    console.error("❌ Error loading products:", err);
    tbody.innerHTML = `<tr><td colspan="7" style='text-align: center; padding: 2rem; color: var(--neon-pink);'>Error loading products: ${err.message}. Please check your Firebase configuration.</td></tr>`;
  }
}

// Delete product
window.deleteProduct = async function (id) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    await deleteDoc(doc(db, "produse", id));
    displayProducts();
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    alert("Error deleting product. Please try again.");
  }
};

// Edit product
window.editProduct = async function (id) {
  try {
    const docRef = doc(db, "produse", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const productData = docSnap.data();
      
      document.getElementById("nume").value = productData.nume || "";
      document.getElementById("pret").value = productData.pret || "";
      document.getElementById("imageURL").value = productData.imageURL || "";
      document.getElementById("description").value = productData.description || "";
      document.getElementById("categorie").value = productData.categorie || "";
      document.getElementById("subcategorie").value = productData.subcategorie || "";
      document.getElementById("cantitate").value = productData.cantitate || "";
      document.getElementById("stare").value = productData.state || "";

      isEditMode = true;
      productID = id;
      addBtn.textContent = "Save Product";
      addBtn.classList.add("btn-secondary");
    } else {
      alert("Product not found!");
    }
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    alert("Error loading product. Please try again.");
  }
};

function resetForm() {
  if (isEditMode) {
    isEditMode = false;
    productID = null;
    addBtn.textContent = "Add Product";
    addBtn.classList.remove("btn-secondary");
  }
}

