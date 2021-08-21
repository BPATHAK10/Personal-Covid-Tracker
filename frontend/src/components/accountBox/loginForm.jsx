import React, { useState,useContext,useEffect } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { 
  makeStyles, Typography,
} 

from '@material-ui/core'
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { 
  Link, 
  useHistory,
} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

import { signin } from '../../actions/auth';

import backgroundImg from "../../assets/signin_bg.jpg"
import Button from "../controls/Button";


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
  let authState = useSelector((state)=> state.authReducer)

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
        }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(signin(formData,history))

    }

  return (
    <div >
   
    <BoxContainer >
      <FormContainer>
        {authState?.authError && <Typography>{authState?.authError.error}</Typography>}
        <Input name="username" label='Username' placeholder='Enter user name' fullWidth required onChange={handleChange}/>
        <Input  name="password" label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleChange} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmit} fullWidth>SignIn</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
          <Button onClick={switchToSignup}
                  text={"Dont have an account?"}
                  variant="outlined"/>
        {/* <Link to="/sign-up" className={classes.link} onClick={switchToSignup}>
          <h4>Don't have an accoun?{" "}</h4>
        </Link> */}
      
    </BoxContainer>
    </div>
  );
}