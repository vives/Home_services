import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import makeAppointReducer from "./makeAppointReducer";

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  users: userReducer,
  makeAppoint: makeAppointReducer
});
