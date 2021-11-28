import {useParams} from "react-router-dom";
import useFetchWithToken from "../../../services/useFetchWithToken";
import config from "../../../services/config";
import {Marginer} from "../../../components/marginer";
import Table from "react-bootstrap/Table";
import {Spinner} from "react-bootstrap";
import React, {useState} from "react";
import Select from "react-select";
import {
    handleFilterTransactionsDates,
    handleShowArrow,
    modalForDates,
    sortOptions,
    whatSorting
} from "../../../services/historyService";

const CreditHistory = () => {
    const {id} = useParams();
    const {error, isPending, data: creditTransactions} = useFetchWithToken(`${config.API_URL}/api/transaction/credit/${id}`)

    const [sortOption, setSortOption] = useState('credit');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [show, setShow] = useState(false)
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
                    <h4 className="font-weight-bold display-2">Credit History</h4>
                </div>
            </div>
            <Marginer direction="vertical" margin={35}/>
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
            <Table striped borderless hover responsive>
                <caption>History of credit</caption>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Name</th>
                    <th className="text-center">Amount</th>
                    <th className="text-center">Benefit</th>
                </tr>
                </thead>
                <tbody>
                {error && <>
                    <div className="alert alert-warning fs-3" role="alert">{error} </div>
                    <button className="text-decoration-none ms-3 fs-3" onClick={() => {
                        window.location.href = "/something"
                    }}> Click to refresh
                    </button>
                </>}
                {isPending &&
                <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
                {creditTransactions && creditTransactions
                    .sort(whatSorting(sortOption))
                    .filter(transaction => handleFilterTransactionsDates(transaction, startDate, endDate))
                    .map(creditTransaction => (
                        <tr key={creditTransaction.id} className="clickable" onClick="#">
                            <th>{creditTransaction.id}</th>
                            <td>{new Date(creditTransaction.transactionDate).toDateString()}</td>
                            <td>{creditTransaction.name}</td>
                            <td className="text-center">
                                {creditTransaction.value.toFixed(2)}
                            </td>
                            <td className="text-center">
                                {handleShowArrow(creditTransaction)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {modalForDates(show, startDate, setStartDate, endDate, setEndDate, handleClose, handleReset)}

        </>

    )
}

export default CreditHistory;