import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Contact from "./Contact";
import {
  selectAllContact,
  clearAllContact,
  deleteAllContact,
} from "../../actions/ContactAction";

const Contacts = () => {
  const [selectAll, setselectAll] = useState(false);
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contacts);
  const selectedContacts = useSelector(
    (state) => state.contact.selectedContacts
  );
  useEffect(() => {
    if (selectAll) {
      dispatch(selectAllContact(contacts.map((contact) => contact.id)));
    } else {
      dispatch(clearAllContact());
    }
  }, [selectAll]);
  return (
    <div>
      {selectedContacts != "" ? (
        <button
          className="btn btn-danger mb-3"
          onClick={() => dispatch(deleteAllContact())}
        >
          Clear All
        </button>
      ) : null}
      <h1>Hello Contacts</h1>
      <table className="table table-shadow">
        <thead className="bg-danger ">
          <tr>
            <th>
              <div className="custom-control custom-checkbox">
                <input
                  id="selectAll"
                  type="checkbox"
                  className="custom-control-input"
                  value={selectAll}
                  onClick={() => setselectAll(!selectAll)}
                />
                <label
                  htmlFor="selectAll"
                  className="custom-control-label"
                ></label>
              </div>
            </th>
            <th>Name</th>
            <th>Phone</th>
            <th>E-Mail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <Contact contact={contact} key={contact.id} selectAll={selectAll} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
