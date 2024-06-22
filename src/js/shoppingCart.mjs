import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";


export default function ShoppingCart() {
  const outputEl = document.querySelector(".product-list");

  outputEl.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("quantity-btn")) {
      const action = target.dataset.action;
      const parent = target.closest(".cart-card");
      const quantityEl = parent.querySelector(".cart-card__quantity");
      let quantity = parseInt(quantityEl.textContent);
      const itemIndex = parseInt(parent.dataset.index);
      const cartItems = getLocalStorage("so-cart");

      if (action === "increase") {
        quantity++;
        cartItems[itemIndex].quantity = quantity;
      } else if (action === "decrease" && quantity > 1) {
        quantity--;
        cartItems[itemIndex].quantity = quantity;
      }

      quantityEl.textContent = quantity;
      setLocalStorage("so-cart", cartItems);
      updateCart();
    }
  });

  // Function to update cart total
  function updateCart() {
    const cartItems = getLocalStorage("so-cart");
    const total = calculateCartTotal(cartItems);
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

  // Function to calculate cart total
  function calculateCartTotal(cartItems) {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.FinalPrice * item.quantity;
    });
    return total;
  }

  // Function to update cart total in the UI
  function updateCartTotal(total) {
    const cartTotalElement = document.querySelector(".cart-total");
    cartTotalElement.textContent = `Total: $${total}`;
  }

  // Cart item template
  function cartItemTemplate(item, index) {
    return `<li class="cart-card divider" data-index="${index}">
      <a href="#" class="cart-card__image">
        <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" /> 
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <div class="quantity-controls">
        <button class="quantity-btn" data-action="decrease">-</button>
        <p class="cart-card__quantity">${item.quantity}</p>
        <button class="quantity-btn" data-action="increase">+</button>
      </div>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
  }

  // Initial update
  updateCart();
}
