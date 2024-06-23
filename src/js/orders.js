/* eslint-disable no-console */
// orders.js
import { checkLogin, retrieveOrders } from "./auth.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // Check if the user is logged in
  checkLogin();
  
  try {
    const orders = await retrieveOrders();
    displayOrders(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    alert("Failed to retrieve orders. Please try again later.");
  }
});

function displayOrders(orders) {
  const ordersContainer = document.getElementById("orders-container");
  
  if (!orders || orders.length === 0) {
    ordersContainer.innerHTML = "<p>No orders found.</p>";
    return;
  }

  const orderList = document.createElement("ul");
  orderList.classList.add("order-list");

  orders.forEach(order => {
    const orderItem = document.createElement("li");
    orderItem.classList.add("order-item");

    const orderId = document.createElement("p");
    orderId.textContent = `Order ID: ${order.id}`;
    
    const customerName = document.createElement("p");
    customerName.textContent = `Customer: ${order.customerName}`;
    
    const orderDate = document.createElement("p");
    orderDate.textContent = `Order Date: ${new Date(order.orderDate).toLocaleDateString()}`;
    
    const orderTotal = document.createElement("p");
    orderTotal.textContent = `Total: $${order.total.toFixed(2)}`;
    
    const itemsList = document.createElement("ul");
    itemsList.classList.add("items-list");
    
    order.items.forEach(item => {
      const itemElement = document.createElement("li");
      itemElement.textContent = `${item.quantity} x ${item.productName}`;
      itemsList.appendChild(itemElement);
    });

    orderItem.appendChild(orderId);
    orderItem.appendChild(customerName);
    orderItem.appendChild(orderDate);
    orderItem.appendChild(orderTotal);
    orderItem.appendChild(itemsList);
    
    orderList.appendChild(orderItem);
  });

  ordersContainer.appendChild(orderList);
}
