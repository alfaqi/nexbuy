import CryptoJS from "crypto-js";

export const hashPassword = (password) => {
  // Hash the password using SHA-256 (or any other secure hashing algorithm)
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
};
