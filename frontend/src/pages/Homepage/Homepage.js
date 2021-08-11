import React, { useState, useEffect } from 'react'
import CovidForm from "./CovidForm";
import PageHeader from "../../components/PageHeader";
import BasicMap from "../../components/BasicMap";

import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Grid } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as contactService from "../../actions/contacts";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '../../components/AppBar';
import MapIcon from '@material-ui/icons/Map';
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
    // { id: 'email', label: 'Email Address (Personal)' },
    // { id: 'mobile', label: 'Mobile Number' },
    { id: 'relation', label: 'Relation' },
    { id: 'status', label: 'Status' },
    {id: 'mobileNumber', label: 'Mobile Number'},
    { id: 'vaccinationStatus', label: 'Vaccination' },
    // { id: 'dateOfInfection', label: 'Date' },
    {id: 'daysFromInfection', label: 'Days'},
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Homepage() {
    

    const classes = useStyles();
    const dispatch = useDispatch()
    const [recordForEdit, setRecordForEdit] = useState(null)
    // const [records, setRecords] = useState(useSelector(state=>state.contactReducer))
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    // const [pageContent, setpageContent] = useState("table")
    const [searchQuery, setsearchQuery] = useState("")
    const [contactOwner, setcontactOwner] = useState("")

    const contacts = useSelector((state)=> state.contactReducer)
    // console.log("contacts of homepage:::", contacts)

    useEffect(() => {
        setcontactOwner(JSON.parse(localStorage.getItem("userInfo")).user._id)
    }, [])
    
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
                return items.filter(x => x.name.toLowerCase().includes(target.value) || x.name.toUpperCase().includes(target.value) || x.name.includes(target.value))
            }
        })
        setsearchQuery(target.value)
    }

    const addOrEdit = (contact, resetForm) => {   
        // console.log("inside add or edit with contact:::",contact)

        const isAdd = contact._id === undefined
        // console.log(isAdd)

        if (isAdd){   // use item.id to decide add or edit
            // console.log("inside add",contact)

            dispatch(contactService.createContact(contact))
        }
        else{
            // console.log("inside edit with data:::",contact)

            dispatch(contactService.updateContact(contact))
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)

        // const contactsAfterAdd = useSelector(state => state.contactReducer)
        // console.log("contaacts after add:::",contactsAfterAdd)
        setRecords(contacts)
    }

    const deleteContact = item => {
        // console.log("in delete contact::", item)
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
        // console.log("inside openInPopup with item::",item)
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const formatDateToDisplay = date => {
        
        return date.substring(0,10)
    }

    const togglePageContent = (e)=>{
        const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
        let data
        if (isChrome){
            data = e.target.outerText    
        }
        else{
            data = e.target.innerText
        }
        // if (data == "Map"){
        //     setpageContent("map")   
        // }
        // else if (data== "Records"){
        //     setpageContent("table")
        // }
    }

    const PageTable = ()=> {
        return (
            <>
            <Toolbar>
            <Controls.Input
                label="Search Contacts"
                className={classes.searchInput}
                value={searchQuery}
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
                            {/* <TableCell>{item.email}</TableCell> */}
                            <TableCell>{item.relation}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.mobileNumber}</TableCell>
                            <TableCell>{item.vaccinationStatus}</TableCell>
                            {/* <TableCell>{formatDateToDisplay(item.dateOfInfection)}</TableCell> */}
                            <TableCell>{item.daysFromInfection}</TableCell>
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
        </>
        )
    }

    return (
        <>
            <AppBar setcontactOwner={setcontactOwner} />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <PageHeader
                        title="Records"
                        onClick={togglePageContent}
                        icon={<DeviceHubIcon fontSize="medium" />}
                    />
                </Grid>
                {/* <Grid item xs={6}>
                    <PageHeader
                        title="Map"
                        onClick={togglePageContent}
                        icon={<MapIcon fontSize="medium" />}
                    />
                </Grid> */}
            </Grid>
            <Paper className={classes.pageContent}>
                {/* { pageContent == "table" ? <PageTable/> : <BasicMap/>} */}
                <PageTable/>
            </Paper> 
            
            <Popup
                title="Contact Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <CovidForm
                    recordForEdit={recordForEdit}
                    contactOwner={contactOwner}
                    addOrEdit={addOrEdit}
                    setRecordForEdit={setRecordForEdit} />
            </Popup>
        </>
    )
}
