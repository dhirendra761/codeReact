import {
  CREATE_CONTACT,
  GET_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SELECT_CONTACT,
  CLEAR_CONTACT,
  DELETE_SELECTED_CONTACT,
} from "../constants/type";

//action
export const addContacts = (contact) => {
  return {
    type: CREATE_CONTACT,
    payload: contact,
  };
};
export const getContact = (id) => ({
  type: GET_CONTACT,
  payload: id,
});
export const updateContact = (payload) => ({
  type: UPDATE_CONTACT,
  payload: payload,
});
export const deleteContact = (id) => ({
  type: DELETE_CONTACT,
  payload: id,
});
export const selectAllContact = (id) => ({
  type: SELECT_CONTACT,
  payload: id,
});
export const clearAllContact = () => ({
  type: CLEAR_CONTACT,
});
export const deleteAllContact = (payload) => ({
  type: DELETE_SELECTED_CONTACT,
});
