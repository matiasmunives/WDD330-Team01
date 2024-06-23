import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map(item => ({
    id: item.Id,
    price: parseFloat(item.FinalPrice),
    name: item.Name,
    quantity: parseInt(item.quantity)
  }));
}

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key) || [];
    this.calculateItemSummary();
    this.calculateOrderTotal();
  },
  calculateItemSummary: function () {
    let totalAmount = 0;
    let totalItems = 0;

    for (let item of this.list) {

      if (item.hasOwnProperty("FinalPrice") && item.hasOwnProperty("quantity")) {
        const price = parseFloat(item.FinalPrice);
        const quantity = parseInt(item.quantity);

        if (!isNaN(price) && !isNaN(quantity)) {
          totalAmount += price * quantity;
          totalItems += quantity;
        } else {
          console.error("Invalid price or quantity for item:", item); // Log any invalid values
        }
      } else {
        console.error("Missing price or quantity for item:", item); // Log missing properties
      }
    }

    this.itemTotal = totalAmount;
    document.getElementById("num-items").textContent = totalItems;
    document.getElementById("cartTotal").textContent = "$" + totalAmount.toFixed(2);
  },
  calculateOrderTotal: function () {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    console.log("Calculated shipping:", this.shipping); // Log shipping
    console.log("Calculated tax:", this.tax); // Log tax
    console.log("Calculated order total:", this.orderTotal); // Log order total
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    document.querySelector(this.outputSelector + " #shipping").innerText = "$" + parseFloat(this.shipping).toFixed(2);
    document.querySelector(this.outputSelector + " #tax").innerText = "$" + parseFloat(this.tax).toFixed(2);
    document.querySelector(this.outputSelector + " #orderTotal").innerText = "$" + parseFloat(this.orderTotal).toFixed(2);
  },
  checkout: async function (form) {
    const json = formDataToJSON(form);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    try {
      const res = await checkout(json);
      window.location.href = "../checkout/success.html";
    } catch (err) {
      console.log(err);
    }
  }
};

export default checkoutProcess;