import React, { useState, useEffect } from 'react'
import CovidForm from "./CovidForm";
import PageHeader from "../../components/PageHeader";
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Typography } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as contactService from "../../actions/contacts";
import * as relationsService from "../../actions/relations";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '../../components/AppBar';
import FilterAccordian from '../../components/Accordian';
import { useDispatch,useSelector } from 'react-redux';

// import notFoundImg from "../../assets/notFound.jpg"
import notFoundImg from "../../assets/no_result.gif"
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        overflowX: 'auto',
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },

    secondaryTableTop: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
    },
    noRecordsFound:{
        width: "100%",
    }
}))


const headCells = [
    { id: 'name', label: 'Contact Name' },
    // { id: 'email', label: 'Email Address (Personal)' },
    // { id: 'mobile', label: 'Mobile Number' },
    { id: 'relatedThrough', label: 'Related Through' },
    { id: 'relation', label: 'Relation' },
    { id: 'status', label: 'Status' },
    {id: 'mobileNumber', label: 'Mobile Number', disableSorting: true},
    { id: 'vaccinationStatus', label: 'Vaccination' },
    // { id: 'dateOfInfection', label: 'Date' },
    {id: 'daysFromInfection', label: 'Days since last update', disableSorting: true},
    { id: 'actions', label: 'Actions', disableSorting: true }
]

const initialFilterValues = {
        status: '', 
        vaccinationStatus: '',
        daysFromInfection: '',
        relatedThrough: '',
    }

export default function Homepage() {
    
    const classes = useStyles();
    const dispatch = useDispatch()
    const [recordForEdit, setRecordForEdit] = useState(null)
    // const [records, setRecords] = useState(useSelector(state=>state.contactReducer))
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [openNotifyPopup, setOpenNotifyPopup] = useState(false)
    // const [pageContent, setpageContent] = useState("table")
    const [searchQuery, setsearchQuery] = useState("")
    const [contactOwner, setcontactOwner] = useState("")
    const [loading, setloading] = useState(true)
    const [showNotUpdatedTable, setshowNotUpdatedTable] = useState(true)
    // console.log("loading is:::", loading)

    const contacts = useSelector((state)=> state.contactReducer)
    // console.log("contacts in homepage::", contacts)
    const relations = useSelector((state)=> state.relationReducer)
    // console.log("relations in homepage::",relations)
    const [notRecentlyUpdatedContacts, setnotRecentlyUpdatedContacts] = useState([])
    
    const [filters, setfilters] = useState(initialFilterValues)
    // console.log(filters)
    
    // useEffect(() => {
        //     console.log("filters changed")
        // }, [filters])
        
    useEffect(() => {
        // console.log("in use effect on mount")
        // console.log("contacts::", contacts)
        // console.log("not updated contacts::", notRecentlyUpdatedContacts)
        setcontactOwner(JSON.parse(localStorage.getItem("userInfo")).user?._id)
    }, [])
    
    useEffect(() => {
        // console.log("in use effect on dispatch")
        // console.log("contacts::", contacts)
        // console.log("not updated contacts::", notRecentlyUpdatedContacts)

        dispatch(contactService.getAllContacts())

    }, [dispatch])

    useEffect(() => {
        dispatch(relationsService.getAllRelations())
    }, [dispatch,contacts])

    useEffect(() => {
        // console.log("in use effect on contacts")
        // console.log("contacts::", contacts)
        // console.log("not updated contacts::", notRecentlyUpdatedContacts)
        
        if(contacts.length !== 0 && loading){
            setloading(false)
        }
            const afterManagingRelationThrough = contacts.map(item=>({
                ...item,
                relatedThrough: (item.relatedThrough ===undefined || item.relatedThrough==="")? "self" : item.relatedThrough,
            }))

            // fllter our the not updated records
            const afterDateRefactor = afterManagingRelationThrough.map(item=>({
                ...item,
                daysFromInfection: refactorDate(item.daysFromInfection)
            }))
            // console.log("after date refactor::",afterDateRefactor)
            
            let notRecentlyUpdated = afterDateRefactor.filter(contact=> {
                
                var length = contact.daysFromInfection.length - 5
                const days = contact.daysFromInfection.substr(0,length)
                // console.log(days)
    
                if(days > 14){
                    return true
                }
                return false
    
            })
            // console.log("not updates contacts::", notRecentlyUpdated)
            // console.log("not updated state::", notRecentlyUpdatedContacts)
            setnotRecentlyUpdatedContacts(notRecentlyUpdated)
            if(notRecentlyUpdated.length !== 0 && loading){
                setOpenNotifyPopup(true)
                // console.log("pop up opened")
            }
        
    }, [contacts])
    
    // useEffect(() => {
    //     console.log("in not recently use effect::")
    //     console.log("contacts::", contacts)
    //     console.log("not updated contacts::", notRecentlyUpdatedContacts)

    //     if(notRecentlyUpdatedContacts.length != 0){
    //         setOpenNotifyPopup(true)
    //     }
        
    // }, [props.user])

    // console.log(records)
    

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        setRecords,
        refactorDate
    } = useTable(headCells, filterFn, filters, initialFilterValues);

    function handleSearch(e) {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
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
            const relation = contact.relation.toLowerCase()
            contact = {...contact, relation: relation }
            
            // console.log("inside add",contact)
            // console.log("relations list::",relations)

            let updateRelationsDatabase = true

            relations.forEach(element => {
                if(element.id === contact.relation){
                    updateRelationsDatabase = false
                }
            });

            if(updateRelationsDatabase){
                // console.log("dispatch relations post")
                dispatch(relationsService.createRelation({relationName:contact.relation}))
            }

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

    // const formatDateToDisplay = date => {
        
    //     return date.substring(0,10)
    // }

    const handleCloseTable = ()=>{
        setshowNotUpdatedTable(false)
    }

    // const togglePageContent = (e)=>{
    //     const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    //     let data
    //     if (isChrome){
    //         data = e.target.outerText    
    //     }
    //     else{
    //         data = e.target.innerText
    //     }
    //     // if (data == "Map"){
    //     //     setpageContent("map")   
    //     // }
    //     // else if (data== "Records"){
    //     //     setpageContent("table")
    //     // }
    // }

    const MainTable = ()=>{
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
                onChange={(e)=>handleSearch(e)}
            />
            <Controls.Button
                text="Add New"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
            />
            {/* add filter accordian */}
        </Toolbar>
            <FilterAccordian 
                initialFilterValues={initialFilterValues}
                filterCategories={filters}
                setfilterCategories={setfilters} 
                relationsList={relations}
            />
        <TblContainer>
            {recordsAfterPagingAndSorting().length !== 0 && <TblHead />}
            <TableBody>
                {
                    recordsAfterPagingAndSorting().length === 0 ?<TableRow><TableCell><img className={classes.noRecordsFound} src={notFoundImg} alt="records not found" /></TableCell></TableRow> 
                                    : recordsAfterPagingAndSorting().map(item =>
                        (<Link to={`/detailed-info/${item['person']._id}`}><TableRow key={item['person']._id}>
                            <TableCell>{item.name}</TableCell>
                            {/* <TableCell>{item.email}</TableCell> */}
                            <TableCell>{item.relatedThrough}</TableCell>
                            <TableCell>{item.relation}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.mobileNumber}</TableCell>
                            <TableCell>{item.vaccinationStatus}</TableCell>
                            {/* <TableCell>{formatDateToDisplay(item.dateOfInfection)}</TableCell> */}
                            <TableCell>{item.daysFromInfection}</TableCell>
                            <TableCell>
                                <Controls.ActionButton
                                    color="primary"
                                    onClick={() => { openInPopup(item) }}
                                    >
                                    <EditOutlinedIcon fontSize="small" />
                                </Controls.ActionButton>
                                <Controls.ActionButton
                                    color="secondary"
                                    onClick = {() => { deleteContact(item) }}
                                    >
                                    <CloseIcon fontSize="small" />
                                </Controls.ActionButton>
                            </TableCell>
                        </TableRow></Link>)
                    )
                }
            </TableBody>
        </TblContainer>
        <TblPagination />
        </>
        )
    }
    const NotUpdatedTable = ()=>{
        
        return (
            <>
        <TblContainer>
            <TblHead disableSorting={true} />
            <TableBody>
                {
                     notRecentlyUpdatedContacts.map(item =>
                        (<TableRow key={item._id}>
                            <TableCell>{item.name}</TableCell>
                            {/* <TableCell>{item.email}</TableCell> */}
                            <TableCell>{item.relatedThrough}</TableCell>
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
        </>
        )
    }

    return (
        <>
            <Popup
                title="Need Attention"
                openPopup={openNotifyPopup}
                setOpenPopup={setOpenNotifyPopup} 
            >
                <Typography>
                    You have records that need attention
                </Typography>   
            </Popup>
            <AppBar setcontactOwner={setcontactOwner} 
                    setloading={setloading} 
                    setnotRecentlyUpdatedContacts={setnotRecentlyUpdatedContacts}/>
            <PageHeader
                title="Records"
                icon={<DeviceHubIcon fontSize="small" />}
            />
            {(notRecentlyUpdatedContacts.length !== 0 && showNotUpdatedTable) && 
                <Paper className={classes.pageContent}>
                   {/* <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        > */}
                        {/* <Grid item xs={6}> */}
                        <div className={classes.secondaryTableTop}>
                            <Typography>Need Attention!!!</Typography>
                        {/* ></Grid> */}
                        {/* <Grid item xs={6}> */}
                            <Controls.ActionButton
                                color="primary"
                                onClick={handleCloseTable}>
                                <CloseIcon fontSize="small" />
                            </Controls.ActionButton>
                        </div>
                        {/* </Grid> */}
                    {/* </Grid> */}
                    <NotUpdatedTable />
                </Paper>}    
            <Paper className={classes.pageContent}>
                {/* { pageContent == "table" ? <PageTable/> : <BasicMap/>} */}
                <MainTable />
            </Paper> 
            
            <Popup
                title="Contact Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <CovidForm
                    relations={relations}
                    recordForEdit={recordForEdit}
                    contactOwner={contactOwner}
                    addOrEdit={addOrEdit}
                    setRecordForEdit={setRecordForEdit} />
            </Popup>
        </>
    )
}