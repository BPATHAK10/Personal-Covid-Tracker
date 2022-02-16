import React, { useEffect } from "react";
import { Grid, Stepper } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as selectOptions from "../../components/selectOptions";
import { makeStyles } from "@material-ui/core/styles";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function CovidForm(props) {
  const { addOrEdit, recordForEdit, setRecordForEdit } = props;

  const isAdd = recordForEdit === null;

  const initialFValues = {
    name: "",
    relation: "",
    relatedThrough: "",
    email: "",
    owner: `${props.contactOwner}`,
    status: "",
    mobileNumber: "",
    dateOfInfection: new Date(),
    // vaccinationStatus: "unknown",
    city: "",
    country: "",
    district: "",
    province: "",
    ward: "",

    variant: "",
    dose_name: "",
    vaccination_center: "",
    vaccination_date: new Date(),
  };
  // console.log("recordForEdit in form::",recordForEdit)

  const validate = (fieldValues = values) => {
    // console.log("inside validate::", fieldValues)
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    // if ('email' in fieldValues)
    //     temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    if ("mobileNumber" in fieldValues) {
      temp.mobile =
        fieldValues.mobileNumber.length > 9 ||
        fieldValues.mobileNumber.length === 0
          ? ""
          : "Minimum 10 numbers required.";
      if (fieldValues.mobileNumber.length !== 0) {
        temp.mobile =
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
            fieldValues.mobileNumber
          )
            ? ""
            : "Invalid format.";
      }
    }
    if ("status" in fieldValues)
      temp.status =
        fieldValues.status.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    // console.log(errors)
    // console.log(temp)

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);
  
  // console.log(values)

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("add form data::", values);

    if (validate()) {
        console.log("validated")
      addOrEdit(values, resetForm);
    }
  };
  useEffect(() => {
    if (recordForEdit !== null) {
      let statuss = selectOptions.status; // imported from selectOptions.js
      statuss = statuss.filter(
        (element) => element.title === recordForEdit?.status
      );
      const id = statuss[0]?.id;

      setRecordForEdit({
        ...recordForEdit,
        status: id ? id : "",
      });
    }
  }, []);

  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit,
      });
    }
  }, [recordForEdit]);

  // for stepper
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

  function getSteps() {
    return [
      "Personal Details",
      "Address Details",
      "Covid Details",
      "Vaccine Details",
    ];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Grid container>
            <Grid item xs={6}>
              <Controls.Input
                name="name"
                label="Full Name"
                value={values.name}
                onChange={handleInputChange}
                error={errors.name}
                required={true}
              />
              <Controls.Input
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
              />
              <Controls.Input
                label="Mobile"
                name="mobileNumber"
                value={values.mobileNumber}
                onChange={handleInputChange}
                error={errors.mobile}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                label="Relation"
                name="relation"
                value={values.relation}
                onChange={handleInputChange}
              />

              <Controls.Select
                name="relatedThrough"
                label="Related Through"
                value={values.relatedThrough}
                onChange={handleInputChange}
                options={props.relations}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container>
            <Grid item xs={6}>
              <Controls.Input
                label="city"
                name="city"
                value={values.city}
                onChange={handleInputChange}
              />
              <Controls.Input
                label="country"
                name="country"
                value={values.country}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                label="province"
                name="province"
                value={values.province}
                onChange={handleInputChange}
              />
              <Controls.Input
                label="ward"
                name="ward"
                value={values.ward}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container>
            <Grid item xs={6}>
              <Controls.Input
                name="variant"
                label="variant"
                value={values.variant}
                onChange={handleInputChange}
              />
              <Controls.Select
                name="status"
                label="Status"
                value={values.status}
                onChange={handleInputChange}
                options={selectOptions.status}
                error={errors.status}
                required={true}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.DatePicker
                name="dateOfInfection"
                label={isAdd ? "Date Of Infection" : "Date of status update"}
                value={values.dateOfInfection}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container>
            <Grid item xs={6}>
              <Controls.Input
                name="dose_name"
                label="Dose Name"
                value={values.dose_name}
                onChange={handleInputChange}
              />
              <Controls.Input
                name="vaccination_center"
                label="Vaccination Center"
                value={values.vaccination_center}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.DatePicker
                name="vaccination_date"
                label="Date of vaccination"
                value={values.vaccination_date}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );
      default:
        return "Unknown step";
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    // return step === 1;
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? 
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          : 
            <div className="steps-content">
              {getStepContent(activeStep)}
              <div style={{'display': "flex"}}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>)}
                {activeStep === steps.length - 1 ? 
                  <div>
                    <Controls.Button type="submit" text="Submit" />
                    <Controls.Button
                      text="Reset"
                      color="default"
                      onClick={resetForm}
                    />
                  </div>
                 : 
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                }
              </div>
            </div>
          }
        </div>
      </div>
      );
      {/* <FormStepper /> */}
      {/* <Grid container>
        <Grid item xs={6}>
            <Controls.Input
                name="name"
                label="Full Name"
                value={values.name}
                onChange={handleInputChange}
                error={errors.name}
                required={true}
            />
            {/* <Controls.Input
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
            /> 
            <Controls.Input
                label="Mobile"
                name="mobileNumber"
                value={values.mobileNumber}
                onChange={handleInputChange}
                error={errors.mobile} />
            <Controls.Input
                label="Relation"
                name="relation"
                value={values.relation}
                onChange={handleInputChange} />

            <Controls.Select
                name="relatedThrough"
                label="Related Through"
                value={values.relatedThrough}
                onChange={handleInputChange}
                options={props.relations} />

        </Grid><Grid item xs={6}>
                <Controls.Select
                    name="status"
                    label="Status"
                    value={values.status}
                    onChange={handleInputChange}
                    options={selectOptions.status}
                    error={errors.status}
                    required={true} />
                <Controls.DatePicker
                    name="dateOfInfection"
                    label={isAdd ? "Date Of Infection" : "Date of status update"}
                    value={values.dateOfInfection}
                    onChange={handleInputChange} />
                <Controls.RadioGroup
                    name="vaccinationStatus"
                    label="Vaccination Status"
                    value={values.vaccinationStatus}
                    onChange={handleInputChange}
                    items={selectOptions.vaccinationStatus} />
                {/* <Controls.Checkbox
        name="vaccinationStatus"
        label="Vaccinated"
        value={values.vaccinationStatus}
        onChange={handleInputChange}
    /> 

                <div>
                    <Controls.Button
                        type="submit"
                        text="Submit" />
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={resetForm} />
                </div>
            </Grid></>
            </Grid> */}
    </Form>
  );
}
