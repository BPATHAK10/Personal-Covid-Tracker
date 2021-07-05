import React,{useState,useEffect} from 'react'
import { 
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography,
    makeStyles,
 } 
from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { 
    Link, 
    useHistory,
 } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {GoogleLogin} from "react-google-login"
import Icon from './Icon';
import {AUTH} from "../../redux/actionTypes"
import { signin} from '../../actions/auth';

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
    paper:{
        padding :20, 
        height:'70vh',
        width:280,
        margin:'50px auto' ,
        backgroundColor:'rgb(247 247 247)'
    },

    icon:{
        backgroundColor:'#2f3c88'
    },
    button:{
        margin:'9px 0'
    },
    link:{
        color:'#1831e2'
    },
    googleButton: {
        marginBottom: theme.spacing(2),
    },
}))

const SignIn=()=>{
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



    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
    
        try {
          dispatch({ type: AUTH, data: { result, token } });
    
          history.push('/');
        } catch (error) {
          console.log(error);
        }
      };
    
    const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

    return (
        <Grid className={classes.root}>
            <Paper elevation={10} className={classes.paper}>
                <Grid align="center">
                <Avatar classname={classes.icon}><LockOutlinedIcon/></Avatar>
                </Grid>
               <h2>Sign In </h2>
               <TextField  name="username" label='Username' placeholder='Enter user name' fullWidth required onChange={handleChange} />
               <TextField  name="password" label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleChange} />
               <FormControlLabel
                    control={
                    <Checkbox
                        
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                />
                <Button type='submit' className={classes.button} color='primary' variant='contained' onClick={handleSubmit} fullWidth>Sign in</Button>
                
                <GoogleLogin
                    clientId="272320939949-3ck8prt1jlrkabkua3rn8eqnjdvans36.apps.googleusercontent.com"
                    render={(renderProps) => (
                    <Button 
                        className={classes.googleButton} 
                        color="primary" 
                        fullWidth 
                        onClick={renderProps.onClick} 
                        //disabled={renderProps.disabled} 
                        startIcon={<Icon />} 
                        variant="contained">
                            Google Sign In
                    </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                />

                <Link to="#" className={classes.link} >
                    Forgot Password
                </Link>
              
               
                <Typography >New here?
                    <Link to="/sign-up" className={classes.link}>
                         Sign Up
                    </Link>
                </Typography>
                       
            </Paper>
        </Grid>

    )
}    

export default SignIn