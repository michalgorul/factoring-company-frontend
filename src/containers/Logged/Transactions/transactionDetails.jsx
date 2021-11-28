import React, {useEffect, useState} from "react";
import useFetchWithToken from "../../../services/useFetchWithToken";
import config from "../../../services/config";
import {Spinner} from "react-bootstrap";
import {ifTokenCannotBeTrusted} from "../../../services/authenticationService";
import {useParams} from "react-router-dom";

const TransactionDetails = () => {
    const {id} = useParams();

    const {data: transaction, errorT, isPendingT} = useFetchWithToken(`${config.API_URL}/api/transaction/${id}`);
    const [currency, setCurrency] = useState(null);
    const [errorCu, setErrorCu] = useState(null);
    const [isPendingCu, setIsPendingCu] = useState(false);

    useEffect(() => {
        if (transaction) {
            fetch(`${config.API_URL}/api/currency/${transaction.currencyId}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    if (!res.ok) {
                        throw Error("could not fetch the data for that resource");
                    }
                    return res.json();

                })
                .then(data => {
                    ifTokenCannotBeTrusted(data);
                    setCurrency(data);
                    setIsPendingCu(false);
                    setErrorCu(null);

                })
                .catch(err => {
                    setIsPendingCu(false);
                    setErrorCu(err.message);
                });


        }
    }, [transaction]);

    return (
        <>
            {isPendingCu && isPendingT &&
            <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
            {errorCu && <div>{errorCu}</div>}
            {errorT && <div>{errorT}</div>}
            {transaction && currency && (<>
                <div className="media align-items-center py-3">
                    <div className="media-body ml-4">
                        <h4 className="font-weight-bold display-2">Transaction Details</h4>
                    </div>
                </div>
                <h5 className="mt-4 mb-3">General</h5>
                <div className="container ms-0">
                    <div className="row align-items-start ms-2">
                        <div className="col-6 col-lg-3">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item list-group-item-action fw-bold">Transaction date:</li>
                                <li className="list-group-item list-group-item-action fw-bold">Transaction amount:</li>
                                <li className="list-group-item list-group-item-action fw-bold">Transaction Name:</li>
                                <li className="list-group-item list-group-item-action fw-bold">Benefit:</li>
                            </ul>
                        </div>
                        <div className="col-6 col-lg-3">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item list-group-item-action">{new Date(transaction.transactionDate).toDateString()}</li>
                                <li className="list-group-item list-group-item-action">{Number(transaction.value).toFixed(2)}</li>
                                <li className="list-group-item list-group-item-action">{transaction.name}</li>
                                <li className="list-group-item list-group-item-action">{transaction.benefit.toString()}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <h5 className="mt-4 mb-3">Currency Information</h5>
                <div className="container ms-0">
                    <div className="row align-items-start ms-2">
                        <div className="col-6 col-lg-3">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item list-group-item-action fw-bold">Currency name:</li>
                                <li className="list-group-item list-group-item-action fw-bold">currency code:</li>
                            </ul>
                        </div>
                        <div className="col-6 col-lg-3">
                            <ul className="list-group list-group-flush mb-3">
                                <li className="list-group-item list-group-item-action">{currency.name}</li>
                                <li className="list-group-item list-group-item-action">{currency.code}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>)}
        </>
    )

}

export default TransactionDetails;