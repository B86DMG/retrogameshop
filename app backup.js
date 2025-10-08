window.addEventListener("DOMContentLoaded", displayProducts);

const URL = "https://68e3eecf8e116898997a7c31.mockapi.io/products";
function displayProducts() {
  fetch(URL).then((response) => {
    if (response.ok === false) {
        throw new Error('Network error!');

    }else {
        return response.json();
    }
    
  })
  .then((products) => document.querySelector('box').innerHTML) = products.map(product => `
    <div class="box">
            <span class="discount">-10%</span>
            <div class="image">
              <img src="${product.imageURL}" alt="" />
              <div class="icons">
                <a href="" class="fas fa-heart"></a>
                <a href="" class="cart-btn">adauga in cos</a>
                <a href="" class="fas fa-share"></a>
              </div>
            </div>
            <div class="content">
              <h3>${product.nume}</h3>
              <div class="price"><span>${product.pret}</span></div>
            </div>
    </div>
    `
                )
                .join('');


}
