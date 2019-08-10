import { MAKE_APPOINTMENT, MAKE_APPOINTMENT_FAIL } from "../actions/types";

const initialState = {
  isAuthenticated: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MAKE_APPOINTMENT:
      return {
        ...state,
        ...action.payload
      };
    case MAKE_APPOINTMENT_FAIL:
      return {
        ...state
      };

    default:
      return state;
  }
}
