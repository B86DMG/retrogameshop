window.addEventListener("DOMContentLoaded", renderTable);

const URL = "https://68e3eecf8e116898997a7c31.mockapi.io/products";

const tableBody = document.querySelector("#products-table tbody");
const addOrEditBtn = document.querySelector("#add-btn");

const numeInput = document.getElementById("nume");
const pretInput = document.getElementById("pret");
const imageURLInput = document.getElementById("imageURL");
const descriptionInput = document.getElementById("description");

let isEditMode = false;
let productID;

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
            <td class="cell-price">${product.pret} Lei</td>
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

addOrEditBtn.addEventListener("click", addOrEditNewProduct);

function addOrEditNewProduct(e) {
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

  const method = isEditMode ? 'PUT' : 'POST';
  const newURL = isEditMode ? `${URL}/${productID}` : URL;


  fetch(newURL, {
    method: method,
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
      resetForm();// Clear the form:
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

function resetForm() {
  numeInput.value = "";
  pretInput.value = "";
  imageURLInput.value = "";
  descriptionInput.value = "";

  if (isEditMode) {
    isEditMode = false;
    addOrEditBtn.innerHTML = "Adauga Produs";
  }
}



tableBody.addEventListener('click', handleActions);

function handleActions(e) {
  const clickedElement = e.target;
  if (clickedElement.parentElement.classList.contains('edit')) {

    productID = getTableRow(clickedElement).dataset.id;
    fetch(`${URL}/${productID}`)
      .then((response) => response.json())
      .then((product) => {
        console.log(product);
        numeInput.value = product.nume;
        pretInput.value = product.pret;
        imageURLInput.value = product.imageURL;
        descriptionInput.value = product.detalii;
      });
    isEditMode = true;
    addOrEditBtn.innerHTML = 'Save';
  }
}

function getTableRow(editIcon) {
  return editIcon.parentElement.parentElement.parentElement.parentElement;
}



//buton de add product, se transforma in add sau save daca aschimbam id-ul
//cream o variabila isModEdit in care stocam true daca editam sau false dac adaugam(default value)
//in momentul in care punem in input datele dintr-un produs care urmeaza sa fie editat, atunci variabila de edit mode se duce la true si i se schimba continutul din add product in save
//metodele si numele de variabile pentru addNewProduct se transforma in ceva care sa ne duca cu gandul ca si editam, ex: addOrEditBtn
//la metoda care facea post trebuie sa adaugam o variabila method care va fi fie POST fie PUT in functie de valoarea lui isEditMode folosing ternary operator