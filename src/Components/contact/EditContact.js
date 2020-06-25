import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContact, updateContact } from "../../actions/ContactAction";
import { useHistory, useParams } from "react-router-dom";

export default function EditContact() {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contact.contact);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const onFormUpdate = (e) => {
    e.preventDefault();
    const update_Contact = Object.assign(contact, {
      name: name,
      email: email,
      phone: phone,
    });
    console.log(updateContact);
    dispatch(updateContact(update_Contact));
    history.push("/");
  };

  useEffect(() => {
    if (contact != null) {
      setName(contact.name);
      setPhone(contact.phone);
      setEmail(contact.email);
    }
    dispatch(getContact(id));
  }, [contact]);

  return (
    <div className="card border-0 shadow">
      <div className="card-header bg-danger text-white">Add a contact</div>
      <div className="card-body">
        <form onSubmit={(e) => onFormUpdate(e)}>
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
          <button className="btn btn-warning" type="submit">
            Update Contact
          </button>
        </form>
      </div>
    </div>
  );
}
