import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { deleteContact } from "../../actions/ContactAction";
import { useDispatch } from "react-redux";
export default function Conatct({ contact, selectAll }) {
  const dispatch = useDispatch();
  const { name, phone, email, id } = contact;
  return (
    <tr>
      <td>
        <div className="custom-control custom-checkbox">
          <input
            checked={selectAll}
            type="checkbox"
            className="custom-control-input"
          />
          <label className="custom-control-label"></label>
        </div>
      </td>
      <td>
        <Avatar className="mr-2" name={name} size="45" round={true} />
        {name}
      </td>
      <td>{phone}</td>
      <td>{email}</td>
      <td className="action">
        <Link to={`/contacts/edit/${id}`} className="material-icons mr-3">
          edit
        </Link>
        <Link
          to=""
          className="material-icons text-danger"
          onClick={() => dispatch(deleteContact(id))}
        >
          remove_circle
        </Link>
      </td>
    </tr>
  );
}
