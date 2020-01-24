import { combineReducers } from "redux";
import userReducer from "./user";
import counterReducer from "./counter";

const allReducers = combineReducers({
  userReducer, //user: userReducer,
  counterReducer //counter: counterReducer
});

export default allReducers;
