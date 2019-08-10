import axios from "axios";
import {
  USER_LOADING,
  GET_USERS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL
} from "./types";
import { returnErrors } from "./errorActions";
//Check token & Load User

export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Register User

export const register = ({
  fname,
  lname,
  email,
  phone_no,
  password
}) => dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request Body
  const body = JSON.stringify({ fname, lname, email, phone_no, password });

  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//Login User

export const login = ({ email, password }) => dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request Body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//Logout user

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Contact us

export const send = ({ name, email, message }) => dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request Body
  const body = JSON.stringify({ name, email, message });

  axios
    .post("/api/send", body, config)
    .then(res =>
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "SEND_MESSAGE_FAIL"
        )
      );
      dispatch({
        type: SEND_MESSAGE_FAIL
      });
    });
};

//setup config/headers and token

export const tokenConfig = getState => {
  //Get token from local storage
  const token = getState().auth.token;

  //Headers

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //If token, add to headrs
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
