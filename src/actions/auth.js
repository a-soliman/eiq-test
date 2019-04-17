import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, LOGOUT } from "./types";
import { history } from "../routers/AppRouter";
import setAuthToken from "../utils/setAuthToken";

export const googleLogin = token => dispatch => {
  // Restructure the token
  token = token.slice(7);
  token = token.replace(/%20/, " ");
  // Save to localStorage
  localStorage.setItem("jwtToken", token);
  // Set token to auth header
  setAuthToken(token);

  const decoded = jwt_decode(token);
  // Set current user
  dispatch(setCurrentUser(decoded));
  history.push("/dashboard");
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logout = () => {
  // remove token from  localStorage
  localStorage.removeItem("jwtToken");
  // remove token from auth header
  setAuthToken();
  history.push("/");
  return {
    type: LOGOUT
  };
};
