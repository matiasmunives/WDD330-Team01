// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export default async function productDetails(productId, selector) {
    getElementById("addToCart")
  // once we have the product details we can render out the HTML
  // add a listener to Add to Cart button
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true){
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  let htmlString;

  if (Array.isArray(data)) {
    
    htmlString = data.map(templateFn).join("");
  } else {
    htmlString = templateFn(data);
  }
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}



