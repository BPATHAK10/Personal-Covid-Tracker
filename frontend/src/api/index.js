import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1/c_tracker' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
  }

  return req;
});

export const fetchContacts = async() => await API.get(`/user/contacts/all/${JSON.parse(localStorage.getItem("userInfo")).user._id}`);
export const createContact = async(newContact) => await API.post('/contact/add', newContact);
export const updateContact = async(updatedContact) => await API.put(`/contact/edit`, updatedContact);
export const deleteContact = async(id) => await API.delete(`/contact/delete/${id}`);

export const signIn = async (formData) =>await API.post('/sign-in', formData);
export const signUp = async(formData) =>await API.post('/sign-up', formData);