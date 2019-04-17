import { SET_CURRENT_USER, LOGOUT } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initalState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
};
