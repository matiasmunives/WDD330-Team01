import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

// Load header and footer
loadHeaderFooter();

// Initialize checkout process
checkoutProcess.init("so-cart", ".checkout-summary");

// Calculate order total on ZIP code blur event
document.querySelector("#zip").addEventListener("blur", () => {
  checkoutProcess.calculateOrderTotal();
});

// this is how it would look if we listen for the submit on the form
document.forms["checkout-form"].addEventListener("submit", (e) => {

// Handle form submit event
document.forms["checkout-form"].addEventListener("submit", (e) => {

  e.preventDefault();
  checkoutProcess.checkout(e.target);
});

});

