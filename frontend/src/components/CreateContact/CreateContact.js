import React, {useState} from 'react'
import { 
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    makeStyles,
 } 
from '@material-ui/core'
import ContactsIcon from '@material-ui/icons/Contacts';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import DeleteIcon from '@material-ui/icons/Delete';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  

const useStyles = makeStyles((theme)=>({
    root:{
        textAlign: 'center',
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
        height:'56vh',
        width:'30vw',
        margin:'50px auto' ,
        backgroundColor:'rgb(247 247 247)'
    },

    icon:{
        backgroundColor:'#2f3c88'
    },
    buttons:{
        margin:'9px 0'
    },
    form:{
      margin:'10px auto',
    },
    link:{
        color:'#1831e2'
    },
}))

const Todo=()=>{
    const classes = useStyles();
    const [inputContact,setinputContact]=useState('');
    const [contacts,setContacts]=useState([]);

    const addContact = () => {
        if(!inputContact)
        {

        }
        else
        {
             setContacts([...contacts,inputContact]);
            setinputContact('')
        }
      
    }

    return (
        
            <Paper elevation={10} className={classes.paper}>
                <Grid align="center">
                <Avatar classname={classes.icon}><ContactsIcon/></Avatar>
                </Grid>
               <h2>Add your contacts </h2>
               <TextField  label='Username' placeholder='Enter name' fullWidth required
               
                    value={inputContact}  
                    onChange={(e)=>setinputContact(e.target.value)}             
               
               />
               <TextField  label='Relation' placeholder='Relationship' fullWidth required/>

               <FormControl component="fieldset" className={classes.form}>
                <FormLabel component="legend">Covid Status</FormLabel>
                <RadioGroup aria-label="gender" name="gender1">
                    <FormControlLabel value="1" control={<Radio />} label="Recovering" />
                    <FormControlLabel value="2" control={<Radio />} label="Isolating" />
                    <FormControlLabel value="3" control={<Radio />} label="Death" />
                
                </RadioGroup>
                </FormControl>

                <FormControl component="fieldset" className={classes.form}>
                <FormLabel component="legend">Vaccine Status</FormLabel>
                <RadioGroup aria-label="gender" name="gender1">
                    <FormControlLabel value="1" control={<Radio />} label="1 dose" />
                    <FormControlLabel value="2" control={<Radio />} label="2 dose" />
                
                </RadioGroup>
                </FormControl>
               
               
                <Button type='submit' className={classes.buttons} onClick={addContact} color='primary' variant='contained' fullWidth>Add Contacts</Button>
               
                <div className="showContact">
                                {

                                    contacts.map((elem,ind) =>
                                    {
                                        return (
                                            <TableContainer component={Paper}>
                                              <Table className={classes.table} size="small" aria-label="a dense table">
                                                <TableHead>
                                                  <TableRow>
                                                    <TableCell>Dessert (100g serving)</TableCell>
                                                    <TableCell align="right">Calories</TableCell>
                                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                                  </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                  {rows.map((row) => (
                                                    <TableRow key={row.name}>
                                                      <TableCell component="th" scope="row">
                                                        {row.name}
                                                      </TableCell>
                                                      <TableCell align="right">{row.calories}</TableCell>
                                                      <TableCell align="right">{row.fat}</TableCell>
                                                      <TableCell align="right">{row.carbs}</TableCell>
                                                      <TableCell align="right">{row.protein}</TableCell>
                                                    </TableRow>
                                                  ))}
                                                </TableBody>
                                              </Table>
                                            </TableContainer>
                                          );
                                    }
                                    )}
                    </div>  
            
                    </Paper>
      

)
} 
export default Todo