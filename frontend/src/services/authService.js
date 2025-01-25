const HOST = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

export const login = async (email, password) => {
  const response = await fetch(`${HOST}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const res = await response.json();
  return res?.data;
};

export const register = async (userData) => {
  const response = await fetch(`${HOST}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const res = await response.json();
  return res?.data;
};
