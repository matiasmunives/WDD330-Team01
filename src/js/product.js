import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";  // revisar uso


const productId = getParam("product");
productDetails(productId);
loadHeaderFooter();   // revisar uso
