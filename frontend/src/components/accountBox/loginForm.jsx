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
  makeStyles,
} 
from '@material-ui/core'
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { 
  Link, 
  useHistory,
} from 'react-router-dom';
import {useDispatch} from 'react-redux'

import { signin } from '../../actions/auth';

import backgroundImg from "../../assets/signin_bg.jpg"


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
  link:{
    color:'#1831e2'
},
}))


export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const [formData, setformData] = useState({
        username:'',
        password:'',
    })
    const handleChange= (e)=>{
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
        // console.log(formData)
        }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(signin(formData,history))
        // console.log("ergerg")

    }


  return (
    <BoxContainer >
      <FormContainer>
        <Input name="username" label='Username' placeholder='Enter user name' fullWidth required onChange={handleChange}/>
        <Input  name="password" label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleChange} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmit} fullWidth>SignIn</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
        <h4>Don't have an accoun?{" "}</h4>
        <Link to="/sign-up" className={classes.link} onClick={switchToSignup}>
          SignUp
        </Link>
      
    </BoxContainer>
  );
}