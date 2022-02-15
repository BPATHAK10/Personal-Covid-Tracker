import React, { useState } from "react";
import AppBar from "../../components/AppBar";
import { useParams } from "react-router";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import * as contactService from "../../actions/contacts"

function DetailedInfo() {
    const { id } = useParams();
    const contacts = useSelector((state)=> state.contactReducer)
    console.log(contacts)
    console.log(id)

    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(contactService.getAllContacts());
    },[dispatch])

    return (
    <>
      <AppBar />
      <div>DetailedInfo with id = {id}</div>
    </>
  );
}

export default DetailedInfo;
