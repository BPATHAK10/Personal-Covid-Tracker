import React, { useState, useEffect } from 'react'
import { Grid,Input } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as contactService from "../../actions/contacts";
import { getStatusCollection } from '../../actions/contacts';
import { TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';


// const genderItems = [
//     { id: 'male', title: 'Male' },
//     { id: 'female', title: 'Female' },
//     { id: 'other', title: 'Other' },
// ]

const vaccinationStatusItems = [
    { id: 'vaccinated', title: 'Vaccinated'},
    { id: 'not Vaccinated', title: 'Not Vaccinated'},
    { id: 'unknown', title: 'unknown'},
]


export default function ContactForm(props) {
    const { addOrEdit, recordForEdit, setRecordForEdit } = props

    const initialFValues = {
        name: '',
        relation: '',
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
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 || fieldValues.mobile.length == 0 ? "" : "Minimum 10 numbers required."
        if ('status' in fieldValues)
            temp.status = fieldValues.status.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })
        // console.log(errors)
        // console.log(temp)

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
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
        if(recordForEdit != null) {
            let statuss = getStatusCollection();
            statuss = statuss.filter(element => element.title == recordForEdit?.status)
            const id = statuss[0]?.id

            setRecordForEdit({
                ...recordForEdit,
                status: id ? id : ""
            })
    }
        
    }, [])

    useEffect(() => {
        if (recordForEdit != null){
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
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.Input
                        label="Relation"
                        name="relation"
                        value={values.relation}
                        onChange={handleInputChange}
                    />
{/* 
                    <Controls.Select
                        name="location"
                        label="Location"
                        value={values.location}
                        onChange={handleInputChange}
                        options={contactService.getLocation()}
                        error={errors.locationId}
                    /> */}

                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="status"
                        label="Status"
                        value={values.status}
                        onChange={handleInputChange}
                        options={contactService.getStatusCollection()}
                        error={errors.status}
                    />
                    <Controls.DatePicker
                        name="dateOfInfection"
                        label="Date Of Infection"
                        value={values.dateOfInfection}
                        onChange={handleInputChange}
                    />
                    <Controls.RadioGroup
                        name="vaccinationStatus"
                        label="Vaccination Status"
                        value={values.vaccinationStatus}
                        onChange={handleInputChange}
                        items={vaccinationStatusItems}
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
