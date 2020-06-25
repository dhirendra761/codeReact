import React, { useState } from "react";
import { addContacts } from "../../actions/ContactAction";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import shortid from "shortid";

export default function AddContact() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const onFormSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
    };
    dispatch(addContacts(newContact));
    history.push("/");
  };
  return (
    <div className="card border-0 shadow">
      <div className="card-header bg-danger text-white">Add a contact</div>
      <div className="card-body">
        <form onSubmit={(e) => onFormSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Create Contact
          </button>
        </form>
      </div>
    </div>
  );
}
