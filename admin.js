window.addEventListener("DOMContentLoaded", renderTable);
const URL = "https://68e3eecf8e116898997a7c31.mockapi.io/products";

const tableBody = document.querySelector("#products-table tbody");
const addBtn = document.querySelector("#add-btn");
function renderTable() {
  fetch(URL)
    .then((response) => response.json())
    .then((products) => {
      tableBody.innerHTML = products.map(
        (product, index) =>
          `
           <tr data-id=${index + 1}</td>
            <td class="cell-img">
             <img src=${product.imageURL} /> 
            </td>
            <td class="cell-name">
                ${product.name}
            </td>
            <td class="cell-price">
                ${product.price}
            </td>
            <td>
                <div class="actions">
                    <button class="btn edit" data-action="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn edit" data-action="delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
        `
      );
    });
}
