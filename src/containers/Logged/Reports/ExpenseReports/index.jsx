import React, {useEffect, useState} from "react";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import DatePicker from "@material-ui/lab/DatePicker";
import TextField from "@material-ui/core/TextField";
import {CloseButton} from "react-bootstrap";
import useFetchWithToken from "../../../../services/useFetchWithToken";
import config from "../../../../services/config";
import {getBenefit, getDrawback, handleResetDates, showSumCredits} from "../../../../services/expenseService";

const ExpenseReports = () => {
    const [whatExpenses, setWhatExpenses] = useState('credit');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numBenefits, setNumBenefits] = useState(0);
    const [numDrawbacks, setNumDrawbacks] = useState(0);
    const [valueBenefit, setValueBenefit] = useState(0);
    const [valueDrawback, setValueDrawback] = useState(0);
    const {data: creditTransactions} = useFetchWithToken(`${config.API_URL}/api/transaction/credit`)
    const {data: invoiceTransactions} = useFetchWithToken(`${config.API_URL}/api/transaction/invoice`)

    const handleWhatExpensesChange = (changeEvent) => {
        setWhatExpenses(changeEvent.target.value);
    }

    const handleResetDates = () => {
        setEndDate(null);
        setStartDate(null);
    }

    const showSums = () => {
        return (
            <>
                <div className="container mt-5 h4">
                    <div className="row align-items-start ms-1">
                        <div className="col-12 col-xl-3 mb-3">
                            <div className="mb-2 fs-5">Benefit ({numBenefits}):</div>
                        </div>
                        <div className="col-12 col-xl-3 mb-3">
                            <div className="mb-2 fs-5"><span
                                className="bg-success p-1 rounded"> {valueBenefit.toFixed(2)} USD </span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="container h4">
                    <div className="row align-items-start ms-1">
                        <div className="col-12 col-xl-3 mb-3">
                            <div className="mb-2 fs-5">Drawback ({numDrawbacks}):</div>
                        </div>
                        <div className="col-12 col-xl-3 mb-3">
                            <div className="mb-2 fs-5"><span
                                className="bg-danger p-1 rounded"> {valueDrawback.toFixed(2)} USD </span>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }

    useEffect(() => {
        if (creditTransactions && whatExpenses === 'credit') {
            getBenefit(startDate, endDate, setValueBenefit, creditTransactions);
            setNumBenefits(creditTransactions.filter(transaction => {
                const {benefit = {}} = transaction;
                return benefit === true
            }).length)
            getDrawback(startDate, endDate, setValueDrawback, creditTransactions);
            setNumDrawbacks(creditTransactions.filter(transaction => {
                const {benefit = {}} = transaction;
                return benefit === false
            }).length)
        } else if (creditTransactions && whatExpenses === 'invoice') {
            getBenefit(startDate, endDate, setValueBenefit, invoiceTransactions);
            setNumBenefits(invoiceTransactions.filter(transaction => {
                const {benefit = {}} = transaction;
                return benefit === true
            }).length)
            getDrawback(startDate, endDate, setValueDrawback, invoiceTransactions);
            setNumDrawbacks(invoiceTransactions.filter(transaction => {
                const {benefit = {}} = transaction;
                return benefit === false
            }).length)
        }
    }, [creditTransactions, invoiceTransactions, startDate, endDate, whatExpenses]);

    const showContent = () => {
        if (whatExpenses === 'credit') {
            return (<>
                {showSums()}
                <div className="container h4">
                    <div className="row align-items-start ms-1">
                        <div className="col-12 col-xl-3 mb-3">
                            <div className="mb-2 fs-5">Summary:</div>
                        </div>
                        <div className="col-12 col-xl-3 mb-3">
                            {showSumCredits(valueBenefit, valueDrawback)}
                        </div>
                    </div>
                </div>
            </>)
        } else {
            return (
                <>

                    {showSums()}
                    <div className="container h4">
                        <div className="row align-items-start ms-1">
                            <div className="col-12 col-xl-3 mb-3">
                                <div className="mb-2 fs-5">Summary:</div>
                            </div>
                            <div className="col-12 col-xl-3 mb-3">
                                {showSumCredits(valueBenefit, valueDrawback)}
                            </div>

                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <div className="media align-items-center py-3">
                <div className="media-body ml-4">
                    <h4 className="font-weight-bold display-2">Expense Report</h4>
                </div>
            </div>

            <div className="container mt-5 h4">
                <div className="row align-items-start ms-1">
                    <div className="col-6 col-lg-3">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="payOption" value="credit"
                                   checked={whatExpenses === 'credit'} onChange={handleWhatExpensesChange}/>
                            <label className="form-check-label">
                                Credits expense
                            </label>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="payOption" value="invoice"
                                   checked={whatExpenses === 'invoice'} onChange={handleWhatExpensesChange}/>
                            <label className="form-check-label">
                                Invoices expense
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5 h4">
                <div className="row align-items-start ms-1">
                    <div className="col-12 col-xl-3 mb-3">
                        <div className="mb-2 fs-5">Start date:</div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker clearable ampm={false}
                                        renderInput={(params) => (<TextField {...params} helperText=""/>)}
                                        value={startDate} onChange={(newDate) => {
                                setStartDate(newDate);
                            }}/>
                        </LocalizationProvider>
                    </div>
                    <div className="col-12 col-xl-3 mb-3">
                        <div className="mb-2 fs-5">End date:</div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker clearable ampm={false} className={"mb-4"}
                                        renderInput={(params) => (<TextField {...params} helperText=""/>)}
                                        value={endDate} onChange={(newDate) => {
                                setEndDate(newDate);
                            }}/>
                        </LocalizationProvider>
                    </div>
                    <CloseButton style={{marginTop: "40px"}} onClick={handleResetDates}/>
                </div>
            </div>

            {showContent()}


        </>

    )
}

export default ExpenseReports;