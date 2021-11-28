import React, {useState} from "react";
import TransactionList from "./transactionList";
import Select from "react-select";
import {modalForDates, sortOptions} from "../../../services/historyService";

const Transactions = () => {

    const [whatTransactions, setWhatTransactions] = useState('credit');
    const [sortOption, setSortOption] = useState('credit');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [show, setShow] = useState(false)

    const handleWhatTransactionsChange = (changeEvent) => {
        setWhatTransactions(changeEvent.target.value);
        resetDates();
    }

    const resetDates = () => {
        setStartDate(null);
        setEndDate(null);
    }

    const displayWhatTransactions = () => {
        if (whatTransactions === 'credit') {
            return (
                <TransactionList whatTransactions={'credit'} sortOption={sortOption} startDate={startDate} endDate={endDate}/>)
        }
        return (<TransactionList whatTransactions={'invoice'} sortOption={sortOption} startDate={startDate} endDate={endDate}/>)
    }

    const handleShowDates = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleReset = () => {
        setEndDate(null);
        setStartDate(null);
    }

    return (
        <>
            <div className="media align-items-center py-3">
                <div className="media-body ml-4">
                    <h4 className="font-weight-bold display-2">Transactions</h4>
                </div>
            </div>

            <div className="container mt-5 mb-4 h4">
                <div className="row align-items-start ms-1">
                    <div className="col-6 col-lg-3">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="payOption" value="credit"
                                   checked={whatTransactions === 'credit'} onChange={handleWhatTransactionsChange}/>
                            <label className="form-check-label">Credits</label>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="payOption" value="invoice"
                                   checked={whatTransactions === 'invoice'} onChange={handleWhatTransactionsChange}/>
                            <label className="form-check-label">Invoices</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-sm ">
                <div className="row align-content-center justify-content-end mb-4">
                    <div className="col-4 col-xl-2">
                        Sort by: <Select onChange={(e) => setSortOption(e.value)} options={sortOptions}/>
                    </div>
                    <div className="col-4 col-xl-2 ms-1 pt-3 mt-2">
                        <button className="btn btn-primary rounded-pill" onClick={handleShowDates}>Select dates</button>
                    </div>
                </div>
            </div>

            {displayWhatTransactions()}

            {modalForDates(show, startDate, setStartDate, endDate, setEndDate, handleClose, handleReset)}

        </>

    );
}

export default Transactions;