// auth.mjs

import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import jwt_decode from "jwt-decode";

const tokenKey = "so-token";

function isTokenValid(token) {
  // Check if a token was passed in
  if (token) {
    
    const decoded = jwt_decode(token);
    // Get the date
    let currentDate = new Date();
    // JWT expiration
    if (decoded.exp * 1000 < currentDate.getTime()) {
      // Token expiration done
      console.log("Token expired.");
      return false;
    } else {
      // Token !expired
      console.log("Valid token");
      return true;
    }
  } else {
    // No token detected
    return false;
  }
}

//checklogin
export function checkLogin() {
  // token from localStorage
  const token = getLocalStorage(tokenKey);
  
  const valid = isTokenValid(token);
  // if the token is not valid then
  if (!valid) {
    // Remove token
    localStorage.removeItem(tokenKey);
    
    const location = window.location;
    
    console.log(location);
    
    window.location = `/login/index.html?redirect=${location.pathname}`;
  } else {
    
    return token;
  }
}

export async function login(creds, redirect = "/") {
  try {
    const token = await loginRequest(creds);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
  } catch (err) {
    alertMessage(err.message);
  }
}

//retrieve Stretch
export async function retrieveOrders() {
    try {
      const token = checkLogin();
      if (token) {
        const orders = await getOrders(token);
        console.log(orders);
        return orders;
      }
    } catch (err) {
      alertMessage(err.message);
    }
  }
