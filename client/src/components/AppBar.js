import React,{ useState } from 'react';
import {withRouter, Link} from "react-router-dom"
import { 
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
 } from "@material-ui/core"
 import { useDispatch } from 'react-redux';
 import * as actionType from "../redux/actionTypes"
 import ExitToAppIcon from '@material-ui/icons/ExitToApp';

 import { useHistory } from 'react-router-dom';

 const useStyles = makeStyles((theme)=>({
   grow: {
     flexGrow: 1
   },
   appBar:{
      boxShadow: "none",
      transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
   },
   userInfoBox: {
      display: "flex",
      alignItems: "center"
   },

  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  appBarTitle: {
    color: "white",
    textDecoration: "none",
  },
  selector:{
    backgroundColor: "white"
  },
  logoutButton:{
    paddingLeft: "15%",
  },
  
 }));

function AppBar_custom(props) {
  const classes = useStyles();
  // const [anchorEl, setanchorEl] = useState(null)
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("userInfo")))

  const dispatch = useDispatch()
  const history = useHistory()


  // const isMenuOpen = Boolean(anchorEl);

  
  // const handleProfileMenuOpen = (event) => {
  //   setanchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setanchorEl(null);
  // };

  const handleLogout = () => {
    dispatch({ type: actionType.LOGOUT });
    
    // close menu
    // setanchorEl(null);

    setuser(null);
    props.setcontactOwner("");
    // props.setloading(true)
    // props.setnotRecentlyUpdatedContacts([])

    history.push('/sign-in');
    // window.location.reload(true)

  };

 
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     keepMounted
  //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem >My account</MenuItem>
  //     <MenuItem onClick={handleLogout}>Log Out</MenuItem>
  //   </Menu>
  // );


  return (
    <React.Fragment>
        <AppBar
          position="fixed"
          color="primary"
          // className={classes.appBar}
        >
          <Toolbar>
                <Typography variant="h5" component="h5">
                  <Link to="/" className={classes.appBarTitle}>
                    Personal Covid Tracker
                  </Link>
                </Typography>
            <div className={classes.grow} />
            <div className={classes.acoountInfo}>
             {user && 
                  <div className={classes.userInfoBox}>
                  <Typography>
                    {user.user.username}
                  </Typography>
                  <div className={classes.logoutButton}>
                      <IconButton
                            edge="end"
                            onClick={handleLogout}
                            color="inherit"
                          >
                            <ExitToAppIcon />
                          </IconButton> 
                    {/* <Button onClick={handleLogout} variant="outlined" color="secondary">
                      LogOut
                    </Button> */}
                  </div>
                </div>
             }
             
             {/* {user ? <IconButton
                            edge="end"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                          >
                            <AccountCircle />
                          </IconButton> 
              :
                          <Button style={{backgroundColor:"#FF9AA2"}} size="medium" variant="contained" component={Link} to="/sign-in">
                            SignIn
                          </Button>
              } */}
            </div>
          </Toolbar>
        </AppBar>
        <Toolbar />
      {/* {renderMenu} */}
    </React.Fragment>
  )
}

export default withRouter(AppBar_custom)