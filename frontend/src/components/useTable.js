import React, { useState, useEffect } from 'react'
import { Table, TableHead, TableRow, TableCell, makeStyles, TablePagination, TableSortLabel } from '@material-ui/core'
import { useSelector } from 'react-redux';
import { FilterNoneSharp } from '@material-ui/icons';
import * as selectOptions from "../components/selectOptions"

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
    },
}))

export default function useTable(headCells,filterFn, filters, initialFilterValues) {

    const classes = useStyles();

    const [records, setRecords] = useState([])
    // console.log("records:::",records)
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()
    const [recordsLength, setrecordsLength] = useState(records.length)

    const contacts = useSelector((state)=> state.contactReducer)
    // console.log("contacts in useTable", contacts)
    // console.log("filters in useTable", filters)

    useEffect(() => {
        // console.log("inside useeffect of useTable")
        setRecords(contacts)

    }, [contacts])


    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = props => {

        const handleSortRequest = cellId => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId)
        }

        return (<TableHead>
            <TableRow>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}>
                            {headCell.disableSorting || props.disableSorting ? headCell.label :
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={() => { handleSortRequest(headCell.id) }}>
                                    {headCell.label}
                                </TableSortLabel>
                            }
                        </TableCell>))
                }
            </TableRow>
        </TableHead>)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    const TblPagination = () => (<TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={recordsLength}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />)

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function refactorDate(date){
        const dateOfInfection = date
        // console.log("item ko date ::",dateOfInfection )
        const today = new Date()
        // console.log("today:::",today)
        // To calculate the time difference of two dates
        var Difference_In_Time = today.getTime() - dateOfInfection.getTime() 

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);   

        // console.log(Difference_In_Days)

        const daysStr = Difference_In_Days.toFixed(0) + " days"
        // console.log(daysStr) 

        return daysStr
    }

    function filterCategories(records,filters){
        var filtered = []
        var filteredBasedOnStatus = []
        var filteredBasedOnVaccination = []

        if(filters == initialFilterValues)
            return records

        else {

            filtered = records.filter(contact=>{
                for(var key in filters){
                    if(key == "status" && filters.status != initialFilterValues.status){
                        if(contact.status != selectOptions.status[filters.status-1]?.title)
                            return false
                    }
                    if(key == "vaccinationStatus" && filters.vaccinationStatus != initialFilterValues.vaccinationStatus){
                        if(contact.vaccinationStatus != filters.vaccinationStatus)
                            return false
                    }
                    if(key == "daysFromInfection" && filters.daysFromInfection != initialFilterValues.daysFromInfection){
                        var length = contact.daysFromInfection.length - 5
                        const days = contact.daysFromInfection.substr(0,length)
                        // console.log(days)
                        const lowerBound = selectOptions.daysFromInfection[filters.daysFromInfection].array[0]
                        const upperBound = selectOptions.daysFromInfection[filters.daysFromInfection].array[1]
                        // console.log(lowerBound,upperBound)

                        // check for >= lowerBound and < upperBound
                        if(days < lowerBound || days >= upperBound)
                           return false
                    }
                }
                return true
            })
        }

        return filtered
    }

    const recordsAfterPagingAndSorting = () => {
        const afterDateRefactor = records.map(item=>({
            ...item,
            daysFromInfection: refactorDate(item.daysFromInfection)
        })
        )
        // console.log("after date refactor::",afterDateRefactor)
        
        const afterFiltering = filterCategories(afterDateRefactor,filters)
        setrecordsLength(afterFiltering.length)
        // console.log("after filtering::",afterFiltering)
        
        const afterPaginationAndSorting = stableSort(filterFn.fn(afterFiltering), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)


        
        return afterPaginationAndSorting
    }

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        setRecords,
        refactorDate,
    }
}
