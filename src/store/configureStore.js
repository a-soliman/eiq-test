import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import filesReducer from "../reducers/files";
import errorReducer from "../reducers/error";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      files: filesReducer,
      errors: errorReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
