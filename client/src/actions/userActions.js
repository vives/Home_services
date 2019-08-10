import { GET_USERS, USERS_LOADING, DELETE_USER } from "./types";
import axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";
// Get User
export const getUsers = () => (dispatch, getState) => {
  dispatch(setUsersLoading());
  axios
    .get("/api/auth/allUser", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteUser = id => (dispatch, getState) => {
  axios
    .delete(`/api/auth/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};
