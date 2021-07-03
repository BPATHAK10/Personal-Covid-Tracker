import * as actionType from './actionTypes';


export default (contacts = [], action) => {
    switch (action.type) {
      case actionType.FETCH_ALL:
        return action.payload;
      case actionType.CREATE:
        return [...contacts, action.payload];
      case actionType.UPDATE:
        return contacts.map((contact) => (contact._id === action.payload._id ? action.payload : contact));
      case actionType.DELETE:
        return contacts.filter((contact) => contact._id !== action.payload);
      default:
        return contacts;
    }
};

