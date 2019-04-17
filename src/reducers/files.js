import { GET_FILES, SEND_FILE } from "../actions/types";

const initalState = {
  loading: false,
  files: []
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        loading: false,
        files: action.payload
      };

    case SEND_FILE:
      return {
        ...state,
        files: [...state.files, action.payload]
      };

    default:
      return state;
  }
};
