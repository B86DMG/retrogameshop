window.addEventListener("DOMContentLoaded", renderTable);

const URL = "https://68e3eecf8e116898997a7c31.mockapi.io/products";

const tableBody = document.querySelector("#products-table tbody");
const addBtn = document.querySelector("#add-btn");

function renderTable() {
  fetch(URL)
    .then((response) => response.json())
    .then((products) => {
      tableBody.innerHTML = products
        .map(
          (product) =>
            `
          <tr data-id="${product.id}">
            <td class="cell-id">${product.id}</td>
            <td class="cell-img">
              <img src="${product.imageURL}" alt="${product.nume}" />
            </td>
            <td class="cell-name">${product.nume}</td>
            <td class="cell-price">$${product.pret}</td>
            <td>
              <div class="actions">
                <button class="btn edit" data-action="edit">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btn delete" data-action="delete">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
          `
        )
        .join("");
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      tableBody.innerHTML = `<tr><td colspan="5">Failed to load products.</td></tr>`;
    });
}

addBtn.addEventListener("click", addNewProduct);

function addNewProduct(e) {
  e.preventDefault();

  const nume = document.getElementById("nume").value;
  const pret = parseFloat(document.getElementById("pret").value);
  const imageURL = document.getElementById("imageURL").value;
  const detalii = document.getElementById("description").value;
  const categorie = document.getElementById("categorie").value;
  const subcategorie = document.getElementById("subcategorie").value;
  const cantitate = parseInt(document.getElementById("cantitate").value, 10);

  const newProduct = {
    nume,
    categorie,
    detalii,
    pret,
    stare: false, // or true if you want to toggle it
    imageURL,
    subcategorie,
    cantitate,
  };

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      return response.json();
    })
    .then(() => {
      renderTable(); // Refresh the product list
      // Clear the form:
      document.getElementById("nume").value = "";
      document.getElementById("pret").value = "";
      document.getElementById("imageURL").value = "";
      document.getElementById("description").value = "";
      document.getElementById("categorie").value = "";
      document.getElementById("subcategorie").value = "";
      document.getElementById("cantitate").value = "";
    })
    .catch((error) => {
      console.error("Error adding product:", error);
    });
}
