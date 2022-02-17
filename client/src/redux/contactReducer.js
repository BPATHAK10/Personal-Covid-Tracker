import * as actionType from './actionTypes';


const contactReducer = (contacts = [], action) => {
    switch (action.type) {
      case actionType.FETCH_ALL:
        return action.payload;
      case actionType.CREATE:
        return [...contacts, action.payload];
      case actionType.UPDATE:
        return contacts.map((contact) => (contact['person']._id === action.payload['person']._id ? action.payload : contact));
      case actionType.DELETE:
        console.log("in delete")
        console.log(contacts.filter((contact) => contact['person']._id !== action.payload));
        return contacts.filter((contact) => contact['person']._id !== action.payload);
      default:
        return contacts;
    }
};

export default contactReducer
