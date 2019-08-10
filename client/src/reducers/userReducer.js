import { GET_USERS, USERS_LOADING, DELETE_USER } from "../actions/types";
const initiaState = {
  users: [],
  loading: false
};

export default function(state = initiaState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
        // users: action.payload,
        // loading: false
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(users => users._id !== action.payload)
      };
    default:
      return state;
  }
}
