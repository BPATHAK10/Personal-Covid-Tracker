import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1/c_tracker' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
  }

  return req;
});

export const fetchContacts = () => API.get(`/user/contacts/all/${JSON.parse(localStorage.getItem("userInfo")).user._id}`);
export const createContact = (newContact) => API.post('/contact/add', newContact);
export const updateContact = (updatedContact) => API.put(`/contact/edit`, updatedContact);
export const deleteContact = (id) => API.delete(`/contact/delete/${id}`);

export const signIn = (formData) => API.post('/sign-in', formData);
export const signUp = (formData) => API.post('/sign-up', formData);