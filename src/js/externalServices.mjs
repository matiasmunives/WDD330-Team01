const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getProductsByCategory(category) {

  console.log("getProductsByCategory aaa")

  console.log(`${baseURL}products/search/${category}`)

  const response = await fetch(`${baseURL}products/search/${category}`);
  console.log("RESPONSE", response)
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  console.log("findProductById aaa")
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}
export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}
/*export function getProductsByCategory(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id) {
  const products = await getProductsByCategory();
  return products.find((item) => item.Id === id);
}*/
