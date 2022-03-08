import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, id } = e.target;
    // console.log("input change", name, value, id);

   
    if (String(id) === "person") {
      setValues({
        ...values,
        person: {
          ...values.person,
          [name]: value,
        },
      });
    } else if (String(id) === "covid") {
      setValues({
        ...values,
        covid: {
          ...values.covid,
          [name]: value,
        },
      });
    } else if (String(id) === "address") {
      setValues({
        ...values,
        address: {
          ...values.address,
          [name]: value,
        },
      });
    } else if (String(id) === "vaccine") {
      setValues({
        ...values,
        vaccine: {
          ...values.vaccine,
          [name]: value,
        },
      });
    }

    if (name === "relation_through") {
      setValues({
        ...values,
        person: {
          ...values.person,
          relation_through: value,
        },
      });
    }
     if (name === "vaccination_date") {
      setValues({
        ...values,
        vaccine: {
          ...values.vaccine,
          vaccination_date: value,
        },
      });
    }
    if (name === "second_dose_date") {
      setValues({
        ...values,
        vaccine: {
          ...values.vaccine,
          second_dose_date: value,
        },
      });
    }
    if (name === "infection_date") {
      setValues({
        ...values,
        covid: {
          ...values.covid,
          infection_date: value,
        },
      });
    }

    if (name === "status") {
      setValues({
        ...values,
        covid: {
          ...values.covid,
          status: value,
        },
      });
    }
    // console.log("after input change", values);

    if (validateOnChange) validate({ [name]: value });
  };
  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
