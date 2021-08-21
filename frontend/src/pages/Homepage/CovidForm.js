import React, {  useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as selectOptions from "../../components/selectOptions"


export default function CovidForm(props) {
    const { addOrEdit, recordForEdit, setRecordForEdit } = props

    const isAdd = recordForEdit ===  null

    const initialFValues = {
        name: '',
        relation: '',
        relatedThrough: '',
        owner:`${props.contactOwner}`,
        status: '',
        mobileNumber: '',
        dateOfInfection: new Date(),
        vaccinationStatus: 'unknown',
    }
    // console.log("recordForEdit in form::",recordForEdit)
    

    const validate = (fieldValues = values) => {
        // console.log("inside validate::", fieldValues)
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        // if ('email' in fieldValues)
        //     temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobileNumber' in fieldValues){
            temp.mobile = fieldValues.mobileNumber.length > 9 || fieldValues.mobileNumber.length === 0 ? "" : "Minimum 10 numbers required."
            if(fieldValues.mobileNumber.length !== 0){
                temp.mobile = (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).test(fieldValues.mobileNumber) ? "" : "Invalid format."
            }
        }
        if ('status' in fieldValues)
            temp.status = fieldValues.status.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })
        // console.log(errors)
        // console.log(temp)

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        // console.log("add form data::",values)
        
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }
    useEffect(() => {
        if(recordForEdit !== null) {
            let statuss = selectOptions.status;  // imported from selectOptions.js
            statuss = statuss.filter(element => element.title === recordForEdit?.status)
            const id = statuss[0]?.id

            setRecordForEdit({
                ...recordForEdit,
                status: id ? id : ""
            })
    }
        
    }, [])

    useEffect(() => {
        if (recordForEdit !== null){
            setValues({
                ...recordForEdit
            })
        }

    }, [recordForEdit])



    return (
        <Form onSubmit={handleSubmit}>
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
                    {/* <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    /> */}
                    <Controls.Input
                        label="Mobile"
                        name="mobileNumber"
                        value={values.mobileNumber}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
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
                        // error={errors.locationId}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="status"
                        label="Status"
                        value={values.status}
                        onChange={handleInputChange}
                        options={selectOptions.status}
                        error={errors.status}
                        required={true}

                    />
                    <Controls.DatePicker
                        name="dateOfInfection"
                        label={isAdd ? "Date Of Infection" : "Date of status update"}
                        value={values.dateOfInfection}
                        onChange={handleInputChange}
                    />
                    <Controls.RadioGroup
                        name="vaccinationStatus"
                        label="Vaccination Status"
                        value={values.vaccinationStatus}
                        onChange={handleInputChange}
                        items={selectOptions.vaccinationStatus}
                    />
                    {/* <Controls.Checkbox
                        name="vaccinationStatus"
                        label="Vaccinated"
                        value={values.vaccinationStatus}
                        onChange={handleInputChange}
                    /> */}

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
