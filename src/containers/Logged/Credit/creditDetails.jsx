import {useHistory, useParams} from "react-router-dom";
import {Spinner} from 'react-bootstrap';
import config from "../../../services/config";
import useFetchWithToken from "../../../services/useFetchWithToken";
import axios from "axios";
import {infoToast} from "../../../components/toast/makeToast";
import {useState} from "react";

const CreditDetails = () => {
    const {id} = useParams();
    const {data: credit, errorC, isPendingC} = useFetchWithToken(`${config.API_URL}/api/credit/${id}`);
    const {data: user, error: errorU, isPending: isPendingU} = useFetchWithToken(`${config.API_URL}/api/user/current`);
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const handleSigning = () => {
        const {creditNumber = {}} = credit;
        let tempCreditNumber = creditNumber.replaceAll('/', ',');
        setIsPending(true);
        axios
            .get(config.API_URL + `/api/credit/document/${tempCreditNumber}`, {
                responseType: "blob",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                const file = new Blob([response.data], {type: 'application/pdf'});
                const fileURL = URL.createObjectURL(file);
                let a = document.createElement('a');
                a.href = fileURL;
                a.download = user.firstName + '_' + user.lastName + '_' + creditNumber;
                setIsPending(false);
                a.click();
            });
    }

    const handleRemoving = () => {
        fetch(`${config.API_URL}/api/credit/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(() => {
                history.push('/user/credit');
            })
            .then(() => {
                infoToast('Credit was removed')
            })
    }

    const nextPaymentDateStr = () => {
        if (credit) {
            const {nextPaymentDate = {}, status = {}} = credit;
            if (status === 'funded') {
                return ' - ';
            }
            return new Date(nextPaymentDate).toDateString();
        }
    }

    const displayButtons = (credit) => {
        if (credit && credit.status === 'processing') {
            return (
                <>
                    {!isPending &&
                    <button className="btn btn-lg btn-primary rounded-pill" onClick={handleSigning}>Sign document</button>}
                    {isPending && <button className="btn btn-lg btn-primary rounded-pill" disabled onClick={handleSigning}>
                        Generating...
                    </button>}
                </>

            )
        } else if (credit && credit.status === 'funded') {
            return (
                <>
                    <div className="container mt-3 ms-0">
                        <div className="row justify-content-between">
                            <div className="col-12 col-lg-5 mb-3">
                                <button className="btn btn-lg btn-primary btn-block rounded-pill" onClick={handleRemoving}>
                                    Remove credit
                                </button>
                            </div>
                            <div className="col-12 col-lg-5 mb-3">
                                <a className="btn btn-lg btn-primary btn-block rounded-pill"
                                   href={'/user/credit/history/' + credit.id}>
                                    History
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else if (credit && credit.status === 'active') {
            return (
                <>
                    <div className="container ms-0">
                        <div className="row">
                            <div className="col-12 col-lg-4 mb-3">
                                <a className="btn btn-lg btn-primary btn-block rounded-pill"
                                   href={'/user/credit/history/' + credit.id}>
                                    History
                                </a>
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <a className="btn btn-lg btn-primary btn-block rounded-pill"
                                   href={'/user/credit/overpay/' + credit.id}>
                                    Pay
                                </a>
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                <a className="btn btn-lg btn-primary btn-block rounded-pill"
                                   href={'/user/credit/schedule/' + credit.id}>
                                    Schedule
                                </a>
                            </div>
                        </div>
                    </div>

                </>


            )
        }

    }

    return (
        <div className="">
            {isPendingC && isPendingU &&
            <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
            {errorC && <div>{errorC}</div>}
            {errorU && <div>{errorU}</div>}
            {credit && user && (
                <article className="mt-2 ms-3">
                    <div className="media align-items-center py-3">
                        <div className="media-body ml-4">
                            <h4 className="font-weight-bold display-2">Credit Details</h4>
                        </div>
                    </div>
                    <h5 className="mt-4 mb-3">General</h5>
                    <div className="container ms-0">
                        <div className="row align-items-start ms-2">
                            <div className="col-6 col-lg-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action fw-bold">Remaining to be paid:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Loan amount:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Next payment:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Remaining installments:</li>
                                </ul>
                            </div>
                            <div className="col-6 col-lg-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action">{credit.balance.toFixed(2)}</li>
                                    <li className="list-group-item list-group-item-action">{credit.amount.toFixed(2)}</li>
                                    <li className="list-group-item list-group-item-action">{credit.nextPayment}</li>
                                    <li className="list-group-item list-group-item-action">{credit.installments}</li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <h5 className="mt-4 mb-3">Other</h5>
                    <div className="container ms-0">
                        <div className="row align-items-start ms-2">
                            <div className="col-6 col-lg-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action fw-bold">Rate of interest:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Next payment date:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Creation Date:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Last installment Date:</li>
                                </ul>
                            </div>
                            <div className="col-6 col-lg-3">
                                <ul className="list-group list-group-flush mb-3">
                                    <li className="list-group-item list-group-item-action">{credit.rateOfInterest + '%'}</li>
                                    <li className="list-group-item list-group-item-action">{nextPaymentDateStr()}</li>
                                    <li className="list-group-item list-group-item-action">{new Date(credit.creationDate).toDateString()}</li>
                                    <li className="list-group-item list-group-item-action">{new Date(credit.lastInstallmentDate).toDateString()}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container ms-0">
                        <div className="row align-items-start">
                            <div className="mt-3 col-12 col-lg-6 text-center">
                                {displayButtons(credit)}
                            </div>
                        </div>
                    </div>

                </article>
            )}
        </div>
    );
}

export default CreditDetails;