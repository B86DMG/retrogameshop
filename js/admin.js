// ============================================
// ADMIN PAGE - MOCK API
// ============================================

const URL = "https://68e3eecf8e116898997a7c31.mockapi.io/products";

const tableBody = document.querySelector("#products-table tbody");
const addOrEditBtn = document.querySelector("#add-btn");
const productForm = document.getElementById("product-form");

const numeInput = document.getElementById("nume");
const pretInput = document.getElementById("pret");
const imageURLInput = document.getElementById("imageURL");
const descriptionInput = document.getElementById("description");
const categorieInput = document.getElementById("categorie");
const subcategorieInput = document.getElementById("subcategorie");
const cantitateInput = document.getElementById("cantitate");

let isEditMode = false;
let productID;

window.addEventListener("DOMContentLoaded", renderTable);

addOrEditBtn.addEventListener("click", addOrEditNewProduct);

function renderTable() {
  fetch(URL)
    .then((response) => response.json())
    .then((products) => {
      tableBody.innerHTML = products
        .map(
          (product) => `
          <tr data-id="${product.id}">
            <td class="cell-id">${product.id}</td>
            <td class="cell-img">
              <img src="${product.imageURL}" alt="${product.nume}" />
            </td>
            <td class="cell-name">${product.nume}</td>
            <td class="cell-price">${product.pret} Lei</td>
            <td>
              <div class="actions">
                <button class="btn edit" data-action="edit" data-id="${product.id}">
                  <i class="fas fa-pen-to-square"></i> Edit
                </button>
                <button class="btn delete" data-action="delete" data-id="${product.id}">
                  <i class="fas fa-trash"></i> Delete
                </button>
              </div>
            </td>
          </tr>
        `
        )
        .join("");

      // Add event listeners
      tableBody.querySelectorAll(".edit").forEach((btn) => {
        btn.addEventListener("click", handleEdit);
      });

      tableBody.querySelectorAll(".delete").forEach((btn) => {
        btn.addEventListener("click", handleDelete);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      tableBody.innerHTML = `<tr><td colspan="5">Failed to load products.</td></tr>`;
    });
}

function addOrEditNewProduct(e) {
  e.preventDefault();

  const nume = numeInput.value;
  const pret = parseFloat(pretInput.value);
  const imageURL = imageURLInput.value;
  const description = descriptionInput.value;
  const categorie = categorieInput.value;
  const subcategorie = subcategorieInput.value;
  const cantitate = parseInt(cantitateInput.value, 10);

  const newProduct = {
    nume,
    categorie,
    detalii: description,
    pret,
    stare: false,
    imageURL,
    subcategorie,
    cantitate,
  };

  const method = isEditMode ? "PUT" : "POST";
  const newURL = isEditMode ? `${URL}/${productID}` : URL;

  fetch(newURL, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add/edit product");
      }
      return response.json();
    })
    .then(() => {
      renderTable();
      resetForm();
    })
    .catch((error) => {
      console.error("Error adding/editing product:", error);
      alert("Error adding/editing product. Please try again.");
    });
}

function handleEdit(e) {
  const id = e.target.closest("button").getAttribute("data-id");
  productID = id;

  fetch(`${URL}/${id}`)
    .then((response) => response.json())
    .then((product) => {
      numeInput.value = product.nume || "";
      pretInput.value = product.pret || "";
      imageURLInput.value = product.imageURL || "";
      descriptionInput.value = product.detalii || product.description || "";
      categorieInput.value = product.categorie || "";
      subcategorieInput.value = product.subcategorie || "";
      cantitateInput.value = product.cantitate || "";

      isEditMode = true;
      addOrEditBtn.textContent = "Save Product";
      addOrEditBtn.classList.add("btn-secondary");
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
    });
}

function handleDelete(e) {
  const id = e.target.closest("button").getAttribute("data-id");

  if (!confirm("Are you sure you want to delete this product?")) return;

  fetch(`${URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      return response.json();
    })
    .then(() => {
      renderTable();
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    });
}

function resetForm() {
  numeInput.value = "";
  pretInput.value = "";
  imageURLInput.value = "";
  descriptionInput.value = "";
  categorieInput.value = "";
  subcategorieInput.value = "";
  cantitateInput.value = "";

  if (isEditMode) {
    isEditMode = false;
    productID = null;
    addOrEditBtn.textContent = "Add Product";
    addOrEditBtn.classList.remove("btn-secondary");
  }
}

