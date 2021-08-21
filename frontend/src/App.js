import { SignupForm } from './components/accountBox/signupForm.jsx';
import { LoginForm } from './components/accountBox/loginForm.jsx';
import Homepage from "./pages/Homepage/Homepage";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import './App.css';
import React,{useState, useEffect} from "react";
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import {
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Redirect,
     } from "react-router-dom";

import backgroundImg from './assets/signin_bg.jpg'
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

const useStyles = makeStyles((theme)=>({
  root:{
      textAlign: 'center',
      backgroundImage:`url(${backgroundImg})`, 
      position: 'fixed',
      minWidth: '100%',
      minHeight: '100%',
      backgroundSize:'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: '-1', 
  },
}))
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

    

function App(props) {

  const[loading,setLoading]=useState(false);

  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },1000)      // 2 sec load time

  },[])
  const classes = useStyles();

  return (
    <AppContainer >
    
    <ThemeProvider theme={theme}>
            <CssBaseline />
      <Router forceRefresh={true}>
      {/* <Router> */}
      
      
        <div style={{width:"100%"}}>
        
        
          {
           loading ?
           <div className="loader">
          <HashLoader 
          color={'#333996'} 
          loading={loading} 
          size={100} />
          </div>
          :
          
          
          <Switch>
            
            
              <Route exact path="/" render={props=>{
                let user = JSON.parse(localStorage.getItem("userInfo"))
                // console.log("in app",user)
                return user ? <Homepage /> : <Redirect to="/sign-in" />
              }} />
              <AccountBox />
              <Route path="/sign-in" exact strict component={LoginForm} />
              {/* <Route path="/sign-up" exact strict component={SignupForm} /> */}
              

          </Switch>
          
          
}

        </div>
      </Router>
  </ThemeProvider>
  </AppContainer>
  );
}

export default App;