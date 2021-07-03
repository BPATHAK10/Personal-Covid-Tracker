import React,{useState} from 'react'
import { 
    Grid,
    Paper,
    Avatar,
    TextField,
    makeStyles,
    Button } 
    from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, useHistory } from 'react-router-dom';
import backgroundImg from "../../assets/signin_bg.jpg"
import {useDispatch} from "react-redux"
import { signin, signup } from '../../actions/auth';


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
}))
const SignUp=()=>{
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
        <Grid className={classes.root}>
            <Paper elevation={10} className={classes.paper}>
                <Grid align="center">
                <Avatar className={classes.icon}><LockOutlinedIcon/></Avatar>
                </Grid>
               <h2>Sign Up </h2>
               <TextField  name="username" label='Username' placeholder='Enter user name' onChange={handleChange} fullWidth required/>
               <TextField  name="email" label='Email' placeholder='Enter Email' fullWidth required onChange={handleChange}/>
               <TextField  name="password" label='Password' placeholder='Enter password' type='password' fullWidth required onChange={handleChange}/>
               <TextField  name="confirmPassword" label='Confirm Password' placeholder='Re-Enter password' type='password' fullWidth required onChange={handleChange}/>

        
                <Button type='submit' className={classes.button} color='primary' variant='contained' fullWidth onClick={handleSubmit}>Sign Up</Button>
                <Link to="/sign-in" className={classes.link}>
                         Back to SignIn Page
                </Link>

            </Paper>
        </Grid>

    )
}    

export default SignUp