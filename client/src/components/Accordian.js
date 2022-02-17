import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";
import Controls from "./controls/Controls";
import * as selectOptions from "../components/selectOptions"


const useStyles = makeStyles((theme) => ({
  root: {
    width: "-webkit-fill-available"
  },
  filterCategories:{
    display: "flex",
    justifyContent:"space-between",
    alignItems: "center"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  selectFilters:{
    width: "-webkit-fill-available",
    marginLeft: "2%",
    marginRight: "2%"
  }
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 120
  // },
  // selectEmpty: {
  //   marginTop: theme.spacing(2)
  // }
}));

export default function Accordion_filter({initialFilterValues,filterCategories,setfilterCategories,relationsList}) {
  const classes = useStyles();
  // const [accordionExpand, setaccordionExpand] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(e.target)
    setfilterCategories({
        ...filterCategories,
        [name]: value
        })
    // setaccordionExpand(true)
    // console.log(filterCategories)
  };

  const resetFilters = ()=> {
    setfilterCategories(initialFilterValues)
  }

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {/* <div className={classes.filterCategories}>        
          <Controls.Select
                className={classes.selectFilters}
                        name="status"
                        label="Status"
                        value={filterCategories.status}
                        onChange={handleChange}
                        options={selectOptions.status}
                    />
          <Controls.Select
                className={classes.selectFilters}

                        name="vaccinationStatus"
                        label="Vaccination Status"
                        value={filterCategories.vaccinationStatus}
                        onChange={handleChange}
                        options={selectOptions.vaccinationStatus}
                    />
          <Controls.Select
                className={classes.selectFilters}

                        name="daysFromInfection"
                        label="Days From Infection"
                        value={filterCategories.daysFromInfection}
                        onChange={handleChange}
                        options={selectOptions.daysFromInfection}
                    />
                    </div> */}

<form className={classes.root} >
            <div className={classes.filterCategories}>
            <TextField
                        className={classes.selectFilters}
                        name="status"
                        select
                        label="Status"
                        value={filterCategories.status}
                        onChange={handleChange}
                        // helperText="Please select your status"
                        
                    >
                <MenuItem value="">None</MenuItem>
                    {selectOptions.status.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
          ))}
                      
                       </TextField>
          {/* <TextField
                        className={classes.selectFilters}
                         
                        name="vaccinationStatus"
                        select
                        label="Vaccination Status"
                        value={filterCategories.vaccinationStatus}
                        onChange={handleChange}
                        options={selectOptions.vaccinationStatus}
                        // helperText="Please select your vaccination status"
                        >
                <MenuItem value="">None</MenuItem>
                          
                          {selectOptions.vaccinationStatus.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
          ))}
                    </TextField> */}
          <TextField
                       
                        name="daysFromInfection"
                        select
                        className={classes.selectFilters}

                        label="Days From Infection"
                        value={filterCategories.daysFromInfection}
                        onChange={handleChange}
                        options={selectOptions.daysFromInfection}
                        // helperText="Please select your days from infection "
                     >
                <MenuItem value="">None</MenuItem>

                    {selectOptions.daysFromInfection.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
          ))}
                      
                       </TextField>
          <TextField
                       
                        name="relatedThrough"
                        select
                        className={classes.selectFilters}

                        label="Related Through"
                        value={filterCategories.relatedThrough}
                        onChange={handleChange}
                        options={relationsList}
                        // helperText="Please select your days from infection "
                     >
                <MenuItem value="">None</MenuItem>

                    {relationsList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
          ))}
                      
                       </TextField>

          <Controls.Button
                          text="Reset"
                          color="default"
                          onClick={resetFilters} />
                          </div>
                          </form>
                              
           {/* <Controls.Button
                          text="Reset"
                          color="default"
                          onClick={resetFilters} />   */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
