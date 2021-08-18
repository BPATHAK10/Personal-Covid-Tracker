import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../redux/actionTypes';
import * as api from '../api/index.js';
import np from "../assets/np.json"
import * as selectOptions from "../components/selectOptions"


const KEYS = {
    userInfo: 'userInfo',
    contacts: 'contacts',
    contactId: 'contactId'
}

// export function getAllLocalContacts() {
//     // if (localStorage.getItem(KEYS.userInfo) == null)
//     //     localStorage.setItem(KEYS.contacts, JSON.stringify([]))
//     let contacts = JSON.parse(localStorage.getItem(KEYS.userInfo)).user.contacts;
//     //map statusID to status title
//     let statuss = selectOptions.status;

//     console.log(contacts)

//     // const user = JSON.parse(localStorage.getItem("userInfo")).user._id
//     // console.log(user)

//     return contacts.map(contact => ({
//         ...contact,
//         status: statuss[contact.status - 1].title
//     }))

// }

export const getAllContacts = () => async (dispatch) => {
  try {
    let { data } = await api.fetchContacts();
    // console.log("before   in getallcontacats::",data)
    let statuss = selectOptions.status;

    data = data.map(dt => ({
      ...dt,
      relatedThrough: (dt.relatedThrough ===undefined || dt.relatedThrough==="")? "self" : dt.relatedThrough,
      status: statuss[dt.status - 1].title,
      daysFromInfection: new Date(dt.dateOfInfection)
    }))
    
    // console.log("after  in getallcontacats::",data)

    //refactor date
    
    dispatch({ type: FETCH_ALL, payload: data });

} catch (error) {
    console.log(error);
}}

export const createContact = (contact) => async (dispatch) => {
  try {
    // console.log("in create contact", contact)
    let { data } = await api.createContact(contact);
    let statuss = selectOptions.status;
    data = {
        ...data,
        status: statuss[data.status - 1].title,
      daysFromInfection: new Date(data.dateOfInfection)
    }
    // console.log(data)

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateContact = (contact) => async (dispatch) => {
  try {
    let { data } = await api.updateContact(contact);
    let statuss = selectOptions.status;
    // console.log("in update ::", data)

    data = {
        ...data,
        status: statuss[data.status - 1].title,
      daysFromInfection: new Date(data.dateOfInfection)
    }

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const deleteContact = (id) => async (dispatch) => {
  try {
    await api.deleteContact(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};



// export const getLocation = () => {
//   // const cityOptions = []
//   const cityOptions = np.map((city,idx)=>({
//     title: city.city,
//     id: idx.toString(),
//     lat: city.lat,
//     lng: city.lng
//   })
//   )
//   return cityOptions
// }

export function generateContactId() {
    if (localStorage.getItem(KEYS.contactId) == null)
        localStorage.setItem(KEYS.contactId, '0')
    var id = parseInt(localStorage.getItem(KEYS.contactId))
    localStorage.setItem(KEYS.contactId, (++id).toString())
    return id;
}

