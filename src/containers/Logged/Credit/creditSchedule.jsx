import {Marginer} from "../../../components/marginer";
import React from "react";
import {Spinner} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import useFetchWithToken from "../../../services/useFetchWithToken";
import config from "../../../services/config";
import {useParams} from "react-router-dom";
import {compareId} from "../../../services/compare";

const CreditSchedule = () => {
    const {id} = useParams();

    const {error, isPending, data: creditScheduleDates} = useFetchWithToken(`${config.API_URL}/api/credit/schedule/${id}`)

    return (
        <>
            <div className="media align-items-center py-3">
                <div className="media-body ml-4">
                    <h4 className="font-weight-bold display-2">Credit Schedule</h4>
                </div>
            </div>
            <Marginer direction="vertical" margin={35}/>
            <Table striped borderless hover responsive>
                <caption>Schedule of credit</caption>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Balance</th>
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
                {creditScheduleDates && creditScheduleDates
                    .sort(compareId)
                    .map(creditScheduleDate => (
                        <tr key={creditScheduleDate.id} className="clickable" onClick="#">
                            <th>{creditScheduleDate.id}</th>
                            <td>{new Date(creditScheduleDate.dateTime).toDateString()}</td>
                            <td>{creditScheduleDate.description}</td>
                            <td>
                                {creditScheduleDate.amount.toFixed(2)}
                            </td>
                            <td>
                                {creditScheduleDate.balance.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>

    )
}

export default CreditSchedule;