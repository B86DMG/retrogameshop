window.addEventListener("DOMContentLoaded", displayProducts);

const URL = "https://68e3eecf8e116898997a7c31.mockapi.io/products";

function displayProducts() {
  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error!");
      }
      return response.json();
    })
    .then((products) => {
      const container = document.querySelector(".box-container");
      if (!container) {
        console.error("❌ Could not find .box-container element!");
        return;
      }

      // Clear container before inserting
      container.innerHTML = "";

      // Generate HTML for all products
      const productHTML = products
        .map(
          (product) => `
          <div class="box">
            <span class="discount">-10%</span>
            <div class="image">
              <img src="${product.imageURL}" alt="${product.nume}" />
              <div class="icons">
                <a href="#" class="fas fa-heart"></a>
                <a href="#" class="cart-btn">Adaugă în coș</a>
                <a href="#" class="fas fa-share"></a>
              </div>
            </div>
            <div class="content">
              <h3>${product.nume}</h3>
              <div class="price">${product.pret} lei</div>
            </div>
          </div>
        `
        )
        .join("");

      container.innerHTML = productHTML;
    })
    .catch((err) => console.error("Error loading products:", err));
}
