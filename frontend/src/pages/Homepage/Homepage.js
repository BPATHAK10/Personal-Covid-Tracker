import React, { useState, useEffect } from 'react'
import CovidForm from "./CovidForm";
import PageHeader from "../../components/PageHeader";
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as contactService from "../../actions/contacts";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '../../components/AppBar';
import { useDispatch,useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'name', label: 'Contact Name' },
    { id: 'email', label: 'Email Address (Personal)' },
    { id: 'mobile', label: 'Mobile Number' },
    { id: 'relation', label: 'Relation' },
    { id: 'status', label: 'Status' },
    { id: 'vaccinationStatus', label: 'Vaccination' },
    { id: 'dateOfInfection', label: 'Date' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Homepage() {

    const classes = useStyles();
    const dispatch = useDispatch()
    const [recordForEdit, setRecordForEdit] = useState(null)
    // const [records, setRecords] = useState(useSelector(state=>state.contactReducer))
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)

    const contacts = useSelector((state)=> state.contactReducer)
    console.log("contacts of homepage:::", contacts)
    
    useEffect(() => {
        dispatch(contactService.getAllContacts())

    }, [dispatch])

    // console.log(records)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        setRecords
    } = useTable(headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value) || x.fullName.toUpperCase().includes(target.value) || x.fullName.includes(target.value))
            }
        })
    }

    const addOrEdit = (contact, resetForm) => {
        console.log("inside add or edit")
        // if (contact.id == 0)
       dispatch(contactService.createContact(contact))
        // else
            // contactService.updateContact(contact)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)

        // const contactsAfterAdd = useSelector(state => state.contactReducer)
        // console.log("contaacts after add:::",contactsAfterAdd)
        setRecords(contacts)
    }

    const deleteContact = item => {
        console.log("in delete contact::", item)
        const deleteData = {
            owner:item.owner,
            id: item._id
        }
        // console.log(deleteData)

        dispatch(contactService.deleteContact(deleteData.id))

        // contactService.deleteContactId(item)
        setRecords(contacts)
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
        <>
            <AppBar />
            <PageHeader
                title="Personal covid Tracker"
                subTitle="Directory"
                icon={<DeviceHubIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Contacts"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.relation}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.vaccinationStatus==true?"Yes":"No"}</TableCell>
                                    <TableCell>{item.dateOfInfection}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick = {() => { deleteContact(item) }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Contact Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <CovidForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    )
}
