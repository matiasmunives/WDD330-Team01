import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
    try {
      // Attempt to get the product details
        product = await findProductById(productId);
      // Render product details and add event listener if product exists
        if (product) {
        renderProductDetails();
        document.getElementById("addToCart").addEventListener("click", addToCart);
        document.getElementById("addToCart").style.display = "block"; // Show add button
        } else {
            throw new Error("Product not found"); // Throw error if product doesn't exist
        }
    } catch (error) {
        console.error(error);
        document.getElementById("addToCart").style.display = "none"; // Hide add button
        // Display error message to user
        document.getElementById("productDetail").innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function addToCart() {
    setLocalStorage("so-cart", product);
}
function renderProductDetails() {
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
    document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}
