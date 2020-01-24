export const increment = () => {
  return {
    type: "INCREMENT"
    //if you want to return some data/payload just type as below
    //payload:something
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT"
  };
};

export const reset = () => {
  return {
    type: "RESET"
  };
};

export const addUser = data => {
  return {
    type: "ADD_USER",
    payload: data
  };
};

export const removeUser = index => {
  return {
    type: "REMOVE_USER",
    payload: index
  };
};
