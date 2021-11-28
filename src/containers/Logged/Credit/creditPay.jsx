import React, {useEffect, useState} from "react";
import useFetchWithToken from "../../../services/useFetchWithToken";
import config from "../../../services/config";
import {OverlayTrigger, Spinner, Tooltip} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import {errorToast, infoToast} from "../../../components/toast/makeToast";
import RangeSlider from "react-bootstrap-range-slider";
import {Marginer} from "../../../components/marginer";
import {QuestionCircle} from "react-bootstrap-icons";

const CreditPay = () => {

    const {id} = useParams();
    const {data: credit, errorC, isPendingC} = useFetchWithToken(`${config.API_URL}/api/credit/${id}`);
    const history = useHistory();

    const [maxToPay, setMaxToPay] = useState(0.0);
    const [payValue, setPayValue] = useState(0.0);
    const [payOption, setPayOption] = useState('standard');
    const [isPendingN, setIsPendingN] = useState(false);

    const renderTooltip = props => (
        <Tooltip {...props}>This is only estimation. The final amounts may vary</Tooltip>
    );

    const handleStandardPayChange = (changeEvent) => {
        setPayOption(changeEvent.target.value);
    }

    const displayPayButton = (func) => {
        return (
            <div className="container mt-4 mb-3">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-4 mb-3">
                        <button className="btn btn-lg btn-primary btn-block rounded-pill" onClick={func}>
                            Pay
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const displayStandardPayment = () => {
        if (credit) {
            return (
                <>
                    <div className="card border-primary">
                        <div className="card-body">
                            <h4 className="card-title mb-4">
                                Credit Number: <span className="fw-bold">{credit.creditNumber}</span>
                            </h4>
                            <div className="fs-5">
                                <p>Payment amount: <span className="fw-bold">{credit.nextPayment.toFixed(2)}</span></p>
                                <p>
                                    Balance after payment: <span
                                    className="fw-bold">{(credit.balance - credit.nextPayment).toFixed(2)}</span>
                                </p>
                                <p>Remaining installments: <span className="fw-bold">{credit.installments}</span></p>
                                <p>Payment deadline: <span className="fw-bold">{credit.nextPaymentDate}</span></p>
                            </div>
                        </div>
                    </div>
                    {displayPayButton(handleStandardPayment)}
                </>
            )
        }
    }

    const displayOverpay = () => {
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="mb-3 mt-1">
                            <span className="fs-5 ms-2 pe-3">How much do you want to pay?</span>
                            <div className="row">
                                <div className="col-7 col-lg-9">
                                    <RangeSlider min={0} max={maxToPay} size="lg" step="10" value={payValue}
                                                 onChange={changeEvent => setPayValue(changeEvent.target.value)}/>
                                </div>
                                <div className="col-5 col-lg-3">
                                    <input type="number" min="0" className="form-control" max={maxToPay}
                                           placeholder="1" required value={payValue}
                                           onChange={(e) => setPayValue(e.target.value)}/>
                                </div>
                            </div>

                        </div>
                        <Marginer direction="vertical" margin={8}/>
                    </div>
                </div>
                <div className="card border-primary">
                    <div className="card-header">
                        <span>Estimation </span>
                        <OverlayTrigger placement="bottom" overlay={renderTooltip} key="bottom">
                            <QuestionCircle className="text-muted"/>
                        </OverlayTrigger>
                    </div>

                    <div className="card-body">
                        <h4 className="card-title mb-4">
                            <p>Credit Number: <span className="fw-bold">{credit.creditNumber}</span></p>
                        </h4>
                        <div className="fs-5">
                            <p>Payment amount: <span className="fw-bold">{Number(payValue).toFixed(2)}</span></p>
                            <p>Balance after payment: <span className="fw-bold">{(credit.balance - payValue).toFixed(2)}</span>
                            </p>
                            <p>Monthly payment: <span
                                className="fw-bold">{((credit.balance - payValue) / credit.installments).toFixed(2)}</span></p>
                            <p>Remaining installments: <span className="fw-bold">{credit.installments}</span></p>

                        </div>
                    </div>
                </div>
                {displayPayButton(handleOverpayPayment)}
            </>
        )
    }

    const displayPayOption = () => {
        if (payOption === 'standard') {
            return (
                <div className="container mt-5">
                    <div className="row align-items-start ms-1">
                        <div className="col-12 col-lg-6">
                            {displayStandardPayment()}
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="container mt-5">
                <div className="row align-items-start ms-1">
                    <div className="col-12 col-lg-6">
                        {displayOverpay()}
                    </div>
                </div>
            </div>
        )

    }

    const handleStandardPayment = () => {
        handlePayment(`${config.API_URL}/api/credit/standard/${id}`, credit)
    }

    const handleOverpayPayment = () => {
        handlePayment(`${config.API_URL}/api/credit/overpay/${id}`, payValue)
    }

    const handlePayment = (url, body) => {
        setIsPendingN(true);

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        })
            .then((response) => {
                setIsPendingN(false);
                if (response.ok) {
                    history.push('/user/credit');
                }
                return response;
            })
            .then((response) => {
                setIsPendingN(false);
                if (response.ok) {
                    infoToast('Payment made');
                } else {
                    errorToast('Something went wrong');
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        if (credit) {
            setMaxToPay(credit.balance)
        }
        return () => {
            displayPayOption()
        };
    }, [credit, payOption]);


    return (
        <>
            {isPendingC && isPendingN &&
            <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
            {errorC && <div>{errorC}</div>}
            {credit && (
                <>
                    <div className="media align-items-center py-3">
                        <div className="media-body ml-4">
                            <h4 className="font-weight-bold display-2">Credit Pay</h4>
                        </div>
                    </div>

                    <div className="container mt-5 h4">
                        <div className="row align-items-start ms-1">
                            <div className="col-6 col-lg-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="payOption" value="standard"
                                           checked={payOption === 'standard'} onChange={handleStandardPayChange}/>
                                    <label className="form-check-label">
                                        Standard Payment
                                    </label>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="payOption" value="overpay"
                                           checked={payOption === 'overpay'} onChange={handleStandardPayChange}/>
                                    <label className="form-check-label">
                                        Overpay
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {displayPayOption()}
                </>
            )}
        </>
    );
}

export default CreditPay;