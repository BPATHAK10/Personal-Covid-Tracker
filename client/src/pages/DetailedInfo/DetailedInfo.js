import React, { useState } from "react";
import AppBar from "../../components/AppBar";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as contactService from "../../actions/contacts";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  card:{
    paddingTop: 10,
    paddingLeft: 25
  },
  detail:{
    padding: 20
  }
}));

function DetailedInfo() {
  const { _id } = useParams();
  const contacts = useSelector((state) => state.contactReducer);
  const classes = useStyles();
  console.log(contacts);
  console.log(_id);

  const dispatch = useDispatch();
  const formatDateToDisplay = date => {
    return date.substring(0,10)
  }

  useEffect(() => {
    dispatch(contactService.getAllContacts());
  }, [dispatch]);

  return (
    <>
      <AppBar />
        {/* DetailedInfo with id = {_id} */}
        {contacts.map((contact) => {
          if (contact['person']._id === _id) {
            return (
                <Grid item xs={12} className={classes.detail}>
                  <Card sx={{ minWidth: 275}} className={classes.card}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="#214F66"  gutterBottom>
                        < h1>{contact['person'].name}</h1>
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="#A86561" gutterBottom>
                        <h4>Mobile Number : {contact['person'].mobile_number}</h4>
                        <h4>Email : {contact['person'].email}</h4>
                        <h4>Relation : {contact['person'].relation_through}'s {contact['person'].relation_type}</h4>
                        <h4>Address : {contact['address'].city}, {contact['address'].district}, {contact['address'].country}</h4>
                        <h4>Ward : {contact['address'].ward}</h4>
                      </Typography>
                    </CardContent>
                  </Card>
                  <Grid container spacing={5} className={classes.detail}>
                    <Grid item xs={6}>
                      <Card>
                        <CardContent>
                          <Typography sx={{ fontSize: 14 }} color="#214F66" gutterBottom>
                            <h2>Covid Details</h2>
                          </Typography>
                          <Typography sx={{ fontSize: 14 }} color="#A86561" gutterBottom>
                            <h4>Status : {contact['covid'].status}</h4>
                            <h4>Variant : {contact['covid'].variant}</h4>
                            <h4>Date of Infection : {formatDateToDisplay(contact['covid'].infection_date)}</h4>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <Card>
                        <CardContent>
                          <Typography sx={{ fontSize: 14 }} color="#214F66" gutterBottom>
                            <h2>Vaccination Details</h2>
                          </Typography>
                          <Typography sx={{ fontSize: 14 }} color="#A86561" gutterBottom>
                            <h4>Vaccine Type : {contact['vaccine'].dose_name}</h4>
                            <h4>Center : {contact['vaccine'].vaccination_center}</h4>
                            <h4>Date : {formatDateToDisplay(contact['vaccine'].vaccination_date)}</h4>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
            );
          }
        }, [])}
    </>
  );
}

export default DetailedInfo;