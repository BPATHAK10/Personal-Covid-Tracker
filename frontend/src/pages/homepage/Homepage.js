import {React, useState, useEffect} from 'react'
import { Grid, makeStyles } from "@material-ui/core"
import AppBar_custom from '../../components/AppBar/AppBar'
import CreateContact from '../../components/CreateContact/CreateContact'

const useStyles = makeStyles((theme)=>({
    homepage:{
        backgroundColor: "#EEEEEE",
    },
    infoBoxGrid:{
        padding:25,
    }
}));

function Homepage() {
    const classes = useStyles();
    
    return (
        <div className={classes.homepage}>
            <AppBar_custom />
            <CreateContact />
        </div>
    )
}

export default Homepage
