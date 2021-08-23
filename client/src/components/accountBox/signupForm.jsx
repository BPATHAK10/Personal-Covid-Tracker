import React, { useState,useContext } from "react";
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
} from "./common";
import { 
  makeStyles,
  Typography,
} 
from '@material-ui/core'
import Button from "../controls/Button";

import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useHistory } from 'react-router-dom';
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
  invalid:{
    color:"red",
    fontSize: 12,
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
    // const [passwordMismatch, setpasswordMismatch] = useState(null)

    const [errors, seterrors] = useState({})
    
    const handleChange= (e)=>{
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })

        validate({[e.target.name]:e.target.value})
    }

    const validate = (fieldValues=formData)=>{
      // console.log("in validate with fieldValues = ",fieldValues)
      // console.log("in validate with formData::", formData)
      let temp = {...errors}

      if('username' in fieldValues){
        temp.username = fieldValues.username ? "" : "This field is required."
      }
      if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        
      if('password' in fieldValues){
        temp.password = fieldValues.password ? "" : "This field is required."
      }
      if('confirmPassword' in fieldValues){
        temp.confirmPassword = formData.password === fieldValues.confirmPassword ? "" : "Password doent match"
      }

      // console.log("temp after check::",temp)

      seterrors({
        ...temp
      })


      if (fieldValues === formData)
            return Object.values(temp).every(x => x === "")

    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        if(validate()){

          dispatch(signup(formData,history)) 
        }
  
    }

  return (
    <BoxContainer >
      <FormContainer>
        <Input name="username" label='Username' placeholder='Enter user name' onChange={handleChange} fullWidth required/>
        <Typography className={classes.invalid}>{errors.username}</Typography>

        <Input name="email" label='Email' placeholder='Enter Email' fullWidth onChange={handleChange}/>
        <Typography className={classes.invalid}>{errors.email}</Typography>
        
        <Input name="password" label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleChange}/>
        <Typography className={classes.invalid}>{errors.password}</Typography>
        
        <Input name="confirmPassword" label='Confirm Password' placeholder='Re-Enter password' type='password' fullWidth required onChange={handleChange}/>
        <Typography className={classes.invalid}>{errors.confirmPassword}</Typography>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={handleSubmit}>SignUp</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <Button onClick={switchToSignin}
              text={"Already have an account?"}
              variant="outlined"
              size="small"
              color="inherit" />
        
        {/* <Link to="/sign-in"  className={classes.link} onClick={switchToSignin}>
        <h4>Already have an account?</h4>
        </Link> */}
    
    </BoxContainer>
  );
}