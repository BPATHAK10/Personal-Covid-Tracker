import React from "react";
import { Provider } from 'react-redux'
import store from "./redux/store"
import {
    BrowserRouter as Router, 
    Switch, 
    Route, 
     } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";
import SignIn from './pages/signIn/SignIn'
import SignUp from './pages/signUp/SignUp'
import './App.css';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/sign-in" exact strict component={SignIn} />
              <Route path="/sign-up" exact strict component={SignUp} />
          </Switch> 
        </div>
      </Router>
    </Provider>
  );
}

export default App;