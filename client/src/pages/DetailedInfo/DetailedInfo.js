import React, { useState } from "react";
import AppBar from "../../components/AppBar";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as contactService from "../../actions/contacts";

function DetailedInfo() {
  const { _id } = useParams();
  const contacts = useSelector((state) => state.contactReducer);
  console.log(contacts);
  console.log(_id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactService.getAllContacts());
  }, [dispatch]);

  return (
    <>
      <AppBar />
      <div>
        DetailedInfo with id = {_id}
        {contacts.map((contact) => {
          if (contact['person']._id === _id) {
            return (
              <div>
                <h1>{contact['person'].name}</h1>
                <h2>{contact['person'].mobile_number}</h2>
                <h2>{contact.status}</h2>
              </div>
            );
          }
        }, [])}
      </div>
    </>
  );
}

export default DetailedInfo;
