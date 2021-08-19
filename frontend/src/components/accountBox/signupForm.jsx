import React, { useState,useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { 
  Grid,
  makeStyles,
} 
from '@material-ui/core'
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { Link,useHistory } from 'react-router-dom';
import backgroundImg from "../../assets/signin_bg.jpg"
import {useDispatch} from "react-redux"
import { signup } from '../../actions/auth';


const useStyles = makeStyles((theme)=>({
  root:{
      backgroundImage:`url(${backgroundImg})`, 
      backgroundSize:'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: '-1', 
  },
  link:{
    color:'#1831e2'
},
}))

export function SignupForm(props) {
    const { switchToSignin } = useContext(AccountContext);
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const [formData, setformData] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword: ''
    })
    const handleChange= (e)=>{
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(signup(formData,history))
    }

  return (
    <BoxContainer >
      <FormContainer>
        <Input name="username" label='Username' placeholder='Enter user name' onChange={handleChange} fullWidth required/>
        <Input name="email" label='Email' placeholder='Enter Email' fullWidth required onChange={handleChange}/>
        <Input  name="password" label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleChange}/>
        <Input name="confirmPassword" label='Confirm Password' placeholder='Re-Enter password' type='password' fullWidth required onChange={handleChange}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={handleSubmit}>SignUp</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
        <h4>Already have an account?</h4>
        <Link to="/sign-in"  className={classes.link} onClick={switchToSignin}>
          SignIn
        </Link>
    
    </BoxContainer>
  );
}