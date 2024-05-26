import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  const total = calculateCartTotal(cartItems);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  outputEl.innerHTML = htmlItems.join("");

  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems.length > 0) {
    cartFooter.classList.add("cart-has-items");
    updateCartTotal(total);
  } else {
    cartFooter.classList.remove("cart-has-items");
    updateCartTotal(0);
  }
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
}


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function calculateCartTotal(cartItems) {
  let total = 0;

  cartItems.forEach((item) => {
    total += item.FinalPrice * item.quantity;
  });

  return total;
}

function updateCartTotal(total) {
  const cartTotalElement = document.querySelector(".cart-total");

  cartTotalElement.textContent = `Total: $${total}`;
}
