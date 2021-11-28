import {
    compareBenefit, compareBenefitAsc,
    compareId,
    compareIdAsc,
    compareName,
    compareNameAsc,
    compareTransactionDate, compareTransactionDateAsc,
    compareValue, compareValueAsc
} from "./compare";
import {ArrowDownShort, ArrowUpShort} from "react-bootstrap-icons";
import React from "react";
import {Button, Modal} from "react-bootstrap";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import DatePicker from "@material-ui/lab/DatePicker";
import TextField from "@material-ui/core/TextField";

const whatSorting = (sortOption) => {
    switch (sortOption) {
        case 'idDesc':
            return compareId;
        case 'nameDesc':
            return compareName;
        case 'benefitDesc':
            return compareBenefit;
        case 'amountDesc':
            return compareValue;
        case 'dateDesc':
            return compareTransactionDate;
        case 'idAsc':
            return compareIdAsc;
        case 'nameAsc':
            return compareNameAsc;
        case 'benefitAsc':
            return compareBenefitAsc;
        case 'amountAsc':
            return compareValueAsc;
        case 'dateAsc':
            return compareTransactionDateAsc;
        default:
            return compareId;
    }
}

const handleFilterTransactionsDates = (transaction, startDate, endDate) => {
    const {transactionDate = {}} = transaction;
    let date = new Date(transactionDate);

    if (startDate !== null && endDate !== null) {
        return date >= startDate && date <= endDate;

    } else if (startDate !== null && endDate === null) {
        return date >= startDate;

    } else if (startDate === null && endDate !== null) {
        return date <= endDate;

    } else {
        return transaction;

    }
}

const handleShowArrow = (creditTransaction) => {
    if (creditTransaction) {
        const {benefit = {}} = creditTransaction;
        if (benefit === true) {
            return (
                <ArrowUpShort className="text-success fs-5"/>
            )
        }
        return <ArrowDownShort className="text-danger fs-5"/>
    }
}

const sortOptions = [
    {value: 'idDesc', label: 'ID 🠕'},
    {value: 'dateDesc', label: 'Date 🠕'},
    {value: 'nameDesc', label: 'Name 🠕'},
    {value: 'amountDesc', label: 'Amount 🠕'},
    {value: 'benefitDesc', label: 'Benefit 🠕'},
    {value: 'idAsc', label: 'ID 🠗'},
    {value: 'dateAsc', label: 'Date 🠗'},
    {value: 'nameAsc', label: 'Name 🠗'},
    {value: 'amountAsc', label: 'Amount 🠗'},
    {value: 'benefitAsc', label: 'Benefit 🠗'},
]
const modalForDates = (show, startDate, setStartDate, endDate, setEndDate, handleClose, handleReset) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Dates Selection</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"text-center"}>
                <div className="mb-2 fs-5">Start date:</div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker clearable ampm={false}
                                renderInput={(params) => (<TextField {...params} helperText=""/>)}
                                value={startDate} onChange={(newDate) => {
                        setStartDate(newDate);
                    }}/>
                </LocalizationProvider>

                <div className="mb-2 mt-4 fs-5">End date:</div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker clearable ampm={false} className={"mb-4"}
                                renderInput={(params) => (<TextField {...params} helperText=""/>)}
                                value={endDate} onChange={(newDate) => {
                        setEndDate(newDate);
                    }}/>
                </LocalizationProvider>
                <div className="row justify-content-center">
                    <div className="col-5 mt-4 mb-2">
                        <Button className={"btn btn-lg rounded-pill btn-block"} onClick={handleReset}>Reset</Button>
                    </div>
                    <div className="col-5 mt-4 mb-2">
                        <Button className={"btn btn-lg rounded-pill btn-block"} onClick={handleClose}>Close</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )


}

export {whatSorting, handleFilterTransactionsDates, handleShowArrow, sortOptions, modalForDates}