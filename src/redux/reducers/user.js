import { ADD_USER, REMOVE_USER } from "../constants/action_type";
const userReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, { name: action.payload }];
    case REMOVE_USER:
      return state.filter((item, index) => action.payload !== index);
    default:
      return state;
  }
};
export default userReducer;
