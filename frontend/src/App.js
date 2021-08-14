import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import Homepage from "./pages/Homepage/Homepage";

import './App.css';
import React,{useState, useEffect} from "react";
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import {
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Redirect,
    useLocation
     } from "react-router-dom";
import { add } from 'date-fns';

  const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})
    

function App(props) {

  return (
    <ThemeProvider theme={theme}>
            <CssBaseline />
      <Router>
        <div className="App">
          <Switch>
              <Route exact path="/" render={props=>{
                let user = JSON.parse(localStorage.getItem("userInfo"))
                console.log("in app",user)
                return user ? <Homepage user={user} /> : <Redirect to="/sign-in" />
              }} />
              <Route path="/sign-in" exact strict component={SignIn} />
              <Route path="/sign-up" exact strict component={SignUp} />
          </Switch> 
        </div>
      </Router>
  </ThemeProvider>
  );
}

export default App;