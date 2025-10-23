import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ✅ Config Firebase
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

// Form & button
const addBtn = document.getElementById("add-btn");
const productForm = document.getElementById("product-form");

// Adaugă produs
addBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const product = {
    nume: document.getElementById("nume").value,
    pret: parseFloat(document.getElementById("pret").value),
    imageURL: document.getElementById("imageURL").value,
    description: document.getElementById("description").value,
    categorie: document.getElementById("categorie").value,
    subcategorie: document.getElementById("subcategorie").value,
    cantitate: parseInt(document.getElementById("cantitate").value),
  };

  try {
    await addDoc(collection(db, "produse"), product);
    productForm.reset();
    displayProducts();
  } catch (err) {
    console.error("❌ Eroare la adăugarea produsului:", err);
  }
});

// Afișează produse cu ID numeric
async function displayProducts() {
  const tbody = document.querySelector("#products-table tbody");
  tbody.innerHTML = "";

  const snapshot = await getDocs(collection(db, "produse"));
  let index = 1;

  snapshot.forEach((docSnap) => {
    const p = docSnap.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index}</td>
      <td><img src="${p.imageURL}" alt="${p.nume}" width="50"></td>
      <td>${p.nume}</td>
      <td>${p.pret}</td>
      <td>
        <button onclick="editProduct('${docSnap.id}')">Edit</button>
        <button onclick="deleteProduct('${docSnap.id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
    index++;
  });
}

// Șterge produs
window.deleteProduct = async function (id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  await deleteDoc(doc(db, "produse", id));
  displayProducts();
};

// Editează produs
window.editProduct = async function (id) {
  const newName = prompt("Enter new name:");
  if (!newName) return;
  await updateDoc(doc(db, "produse", id), { nume: newName });
  displayProducts();
};

// Load inițial
displayProducts();
