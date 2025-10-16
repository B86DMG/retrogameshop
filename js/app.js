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

// V2
window.addEventListener("DOMContentLoaded", displayProducts);

const URL = "https://68e3eecf8e116898997a7c31.mockapi.io/products";

function displayProducts() {
  fetch(URL)
    .then((res) => {
      if (!res.ok) throw new Error("Network error!");
      return res.json();
    })
    .then((products) => {
      const container = document.querySelector(".product-container");
      if (!container) {
        console.error("❌ Could not find .product-container element!");
        return;
      }

      container.innerHTML = products
        .map(
          (p) => `
          <div class="product-card">
            <div class="product-image">
              <img src="${p.imageURL}" alt="${p.nume}">
              <div class="product-icons">
                <a href="#" class="icon-btn"><i class="fas fa-heart"></i></a>
                <a href="#" class="icon-btn cart-btn">🛒</a>
                <a href="#" class="icon-btn"><i class="fas fa-share"></i></a>
              </div>
            </div>
            <div class="product-info">
              <h3>${p.nume}</h3>
              <p class="price">${p.pret} lei</p>
            </div>
          </div>
        `
        )
        .join("");
    })
    .catch((err) => console.error("Error loading products:", err));
}
