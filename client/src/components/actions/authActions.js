export const login = () => ({
  type: "LOGIN",
});

export const logout = () => ({
  type: "LOGOUT",
});
export const setUserData = (userData) => ({
  type: "SET_USER_DATA",
  payload: userData,
});
