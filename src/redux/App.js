import React, { Component, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, addUser, removeUser } from "./actions";

const App = () => {
  const count = useSelector(state => state.counterReducer);
  const users = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const userRef = useRef(null);
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addUser(userRef.current.value));
    userRef.current.value = "";
  };
  return (
    <div>
      <h1>Counter</h1>
      <button
        onClick={() => dispatch(increment())}
        className="btn btn-primary btn-small"
      >
        +
      </button>
      {count}
      <button
        onClick={() => dispatch(decrement())}
        className="btn btn-secondary btn-small"
      >
        -
      </button>
      <br />
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={userRef} placeholder="username" />
      </form>
      <ul>
        {users.map((item, index) => (
          <li key={index}>
            {item.name}
            <button onClick={() => dispatch(removeUser(index))}>&times;</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
