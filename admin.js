window.addEventListener("DOMContentLoaded", renderTable);

const URL = "https://68e3eecf8e116898997a7c31.mockapi.io/products";
const tableBody = document.querySelector("#products-table tbody");
const addBtn = document.querySelector("#add-btn");

function renderTable() {
  fetch(URL)
    .then((response) => response.json())
    .then((products) => {
      tableBody.innerHTML = products.map(
        (product) =>
          `
          <tr data-id="${product.id}">
            <td class="cell-id">${product.id}</td>
            <td class="cell-img">
              <img src="${product.imageURL}" alt="${product.name}" />
            </td>
            <td class="cell-name">${product.name}</td>
            <td class="cell-price">$${product.price}</td>
            <td>
              <div class="actions">
                <button class="btn edit" data-action="edit">
                  <i class="fas fa-pen-to-square"></i>
                </button>
                <button class="btn delete" data-action="delete">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
          `
      ).join("");
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      tableBody.innerHTML = `<tr><td colspan="5">Failed to load products.</td></tr>`;
    });
}


addBtn.addEventListener('click', addNewProduct);

function addNewProduct(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const imageURL = document.getElementById('imageURL').value;
  const description = document.getElementById('description').value;

  const newProduct = {
    name: name,
    price: price,
    imageURL: imageURL,
    details: description,
  };

  fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      return response.json();
    })
    .then(() => {
      renderTable(); // Refresh the product list
      // Optionally clear the form:
      document.getElementById('name').value = '';
      document.getElementById('price').value = '';
      document.getElementById('imageURL').value = '';
      document.getElementById('description').value = '';
    })
    .catch((error) => {
      console.error("Error adding product:", error);
    });
}
