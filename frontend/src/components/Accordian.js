import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import Select from "./controls/Select";
import Controls from "./controls/Controls";
import * as selectOptions from "../components/selectOptions"


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
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

export default function Accordion_filter({initialFilterValues,filterCategories,setfilterCategories}) {
  const classes = useStyles();
  // const [accordionExpand, setaccordionExpand] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
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
          {/* <FormControl variant="outlined" className={classes.formControl}>
            <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
            label="Age"
            >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl> */}
          {/* <Controls.Select
                        name="status"
                        label="Status"
                        value={filterCategories.status}
                        onChange={handleChange}
                        options={selectOptions.status}
                    />
          <Controls.Select
                        name="vaccinationStatus"
                        label="Vaccination Status"
                        value={filterCategories.vaccinationStatus}
                        onChange={handleChange}
                        options={selectOptions.vaccinationStatus}
                    />
          <Controls.Select
                        name="daysFromInfection"
                        label="Days From Infection"
                        value={filterCategories.daysFromInfection}
                        onChange={handleChange}
                        options={selectOptions.daysFromInfection}
                    />
          {/* <Controls.RadioGroup
                        name="daysFromInfection"
                        label="Days From Infection"
                        value={filterCategories.daysFromInfection}
                        onChange={handleChange}
                        items={selectOptions.daysFromInfection}
                    /> */}

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
                    {selectOptions.status.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
          ))}
                      
                       </TextField>
          <TextField
                        className={classes.selectFilters}
                         
                        name="vaccinationStatus"
                        select
                        label="Vaccination Status"
                        value={filterCategories.vaccinationStatus}
                        onChange={handleChange}
                        options={selectOptions.vaccinationStatus}
                        // helperText="Please select your vaccination status"
                        >
                          {selectOptions.vaccinationStatus.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
          ))}
                    </TextField>
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
                    {selectOptions.daysFromInfection.map((option) => (
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
                          onClick={resetFilters} />  */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
