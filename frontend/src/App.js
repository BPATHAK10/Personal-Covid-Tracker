import React,{useState, useEffect} from "react";
import { Provider } from 'react-redux'
import store from "./redux/store"
import {
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Redirect,
    useLocation
     } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";
import SignIn from './pages/signIn/SignIn'
import SignUp from './pages/signUp/SignUp'
import './App.css';


function App(props) {

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
              <Route exact path="/" render={props=>{
                let user = JSON.parse(localStorage.getItem("userInfo"))
                return user ? <Homepage /> : <Redirect to="/sign-in" />
              }} />
              <Route path="/sign-in" exact strict component={SignIn} />
              <Route path="/sign-up" exact strict component={SignUp} />
          </Switch> 
        </div>
      </Router>
    </Provider>
  );
}

export default App;