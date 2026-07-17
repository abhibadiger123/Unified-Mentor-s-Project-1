// src/utils/helpers.js


// ============================
// Token Helpers
// ============================

export const getToken = () => {

  return localStorage.getItem(
    "token"
  );

};



export const setToken = (token) => {

  localStorage.setItem(
    "token",
    token
  );

};



export const removeToken = () => {

  localStorage.removeItem(
    "token"
  );

};



// ============================
// User Storage Helpers
// ============================

export const getStoredUser = () => {

  const user =
    localStorage.getItem("user");


  return user
    ? JSON.parse(user)
    : null;

};



export const setStoredUser = (user) => {

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

};



export const removeStoredUser = () => {

  localStorage.removeItem(
    "user"
  );

};



// ============================
// Date Formatting
// ============================

export const formatDate = (
  date
) => {

  if (!date) return "N/A";


  return new Date(date)
    .toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

};



// ============================
// Currency Formatting
// ============================

export const formatCurrency = (
  amount
) => {

  if (
    amount === undefined ||
    amount === null
  ) {

    return "₹0";

  }


  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(amount);

};



// ============================
// Capitalize Text
// ============================

export const capitalize = (
  text
) => {

  if (!text) return "";


  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );

};



// ============================
// Role Checking
// ============================

export const hasRole = (
  user,
  roles
) => {


  if (!user) return false;


  if (!Array.isArray(roles)) {

    roles = [roles];

  }


  return roles.includes(
    user.role
  );

};



// ============================
// Empty Object Checking
// ============================

export const isEmpty = (
  value
) => {


  if (!value) return true;


  return Object.keys(value)
    .length === 0;

};



// ============================
// Form Validation
// ============================

export const validateEmail = (
  email
) => {

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  return regex.test(email);

};



// ============================
// Password Validation
// ============================

export const validatePassword = (
  password
) => {


  return (
    password &&
    password.length >= 6
  );

};



// ============================
// API Error Handler
// ============================

export const getErrorMessage = (
  error
) => {


  if (
    error?.response?.data?.message
  ) {

    return error.response.data.message;

  }


  if(error?.message){

    return error.message;

  }


  return "Something went wrong.";

};



// ============================
// Delay Function
// ============================

export const delay = (
  milliseconds
) => {


  return new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        milliseconds
      )
  );

};



// ============================
// Generate Random ID
// ============================

export const generateId = () => {


  return Date.now()
    .toString(36)
    +
    Math.random()
      .toString(36)
      .substring(2);

};



// ============================
// Sort Array
// ============================

export const sortByField = (
  array,
  field,
  order = "asc"
) => {


  return [...array].sort(
    (a,b)=>{


      if(
        order === "asc"
      ){

        return a[field] > b[field]
          ? 1
          : -1;

      }


      return a[field] < b[field]
        ? 1
        : -1;


    }
  );

};