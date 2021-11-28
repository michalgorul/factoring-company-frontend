import RangeSlider from "react-bootstrap-range-slider";
import {Marginer} from "../../../components/marginer";
import React, {useEffect, useState} from "react";
import useGetUsedCredit from "../../../services/creditService";
import {errorToast, infoToast} from "../../../components/toast/makeToast";
import config from "../../../services/config";
import {useHistory} from "react-router-dom";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {QuestionCircle} from "react-bootstrap-icons";

const CreditCreate = () => {

    const interest = 7.77 / 100.00;
    const availableCredit = 250000;
    const [drawValue, setDrawValue] = useState(1);
    const [monthsAmount, setMonthsAmount] = useState(1);
    const [monthDay, setMonthDay] = useState(1);
    const [maxToDraw, setMaxToDraw] = useState(0);
    const [monthlyInstallment, setMonthlyInstallment] = useState(0);
    const [monthlyInsurance, setMonthlyInsurance] = useState(0);
    const [oneTimeCommission, setOneTimeCommission] = useState('0.00 USD');
    const [insurance, setInsurance] = useState('credited');
    const [commission, setCommission] = useState('noProtection');
    const [isPendingN, setIsPendingN] = useState(false);
    const history = useHistory();
    const {usedCredit} = useGetUsedCredit();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updatePayments = () => {
        let total;
        if (commission === 'credited') {
            total = Number(drawValue) + Number(drawValue * interest);
            setOneTimeCommission('0.00 USD');
        } else {
            total = Number(drawValue);
            setOneTimeCommission(Number(drawValue * interest).toFixed(2) + ' USD');

        }
        setMonthlyInstallment((total / monthsAmount).toFixed(2) + ' USD');
        setMonthlyInsurance((total * 0.005).toFixed(2) + ' USD');
    }

    const handleInsuranceChange = (changeEvent) => {
        setInsurance(changeEvent.target.value);
    }
    const handleCommissionChange = (changeEvent) => {
        setCommission(changeEvent.target.value);
    }

    useEffect(() => {
        if (usedCredit) {
            setMaxToDraw(availableCredit - usedCredit);
        }
        updatePayments();
    }, [updatePayments, usedCredit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let total, currentRateOfInterest;
        if (commission === 'credited') {
            total = Number(drawValue) + Number(drawValue * interest);
            currentRateOfInterest = config.RATE_OF_INTEREST;
        } else {
            total = Number(drawValue);
            currentRateOfInterest = 0.00;
        }
        const credit = {
            amount: total.toFixed(2),
            nextPayment: (total / monthsAmount).toFixed(2),
            installments: monthsAmount,
            rateOfInterest: currentRateOfInterest,
            status: 'processing',
            commission: commission,
            paymentDay: monthDay,
            insurance: insurance,
            oneTimeCommission: Number(oneTimeCommission.replace(' USD', ''))
        };

        console.log(credit);

        setIsPendingN(true);

        fetch(`${config.API_URL}/api/credit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(credit)
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
                    infoToast('Credit created');
                } else {
                    errorToast('Some of inputs were incorrect');
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    const renderTooltip = props => (
        <Tooltip {...props}>This is only estimation. The final amounts may vary</Tooltip>
    );

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="media align-items-center py-2">
                    <div className="media-body ml-4">
                        <h4 className="font-weight-bold display-2">Money Loan Application</h4>
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        <div className={"col-12 col-xl-8"}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-3 mt-1">
                                        <span className="fs-5 ms-2 pe-3">How much do you want to draw?</span>
                                        <div className="row">
                                            <div className="col-7 col-lg-9">
                                                <RangeSlider min={0} max={maxToDraw} size="lg" step="10" value={drawValue}
                                                             onChange={changeEvent => setDrawValue(changeEvent.target.value)}/>
                                            </div>
                                            <div className="col-5 col-lg-3">
                                                <input type="number" min="0" className="form-control" max={maxToDraw}
                                                       placeholder="1" required value={drawValue}
                                                       onChange={(e) => setDrawValue(e.target.value)}/>
                                            </div>
                                        </div>
                                    </div>
                                    <Marginer direction="vertical" margin={8}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-3 mt-1">
                                        <span className="fs-5 ms-2 pe-3">Number of months (instalments)</span>
                                        <div className="row">
                                            <div className="col-7 col-lg-9">
                                                <RangeSlider min={1} max={120} size="lg" step="1" value={monthsAmount}
                                                             onChange={changeEvent => setMonthsAmount(changeEvent.target.value)}/>
                                            </div>
                                            <div className="col-5 col-lg-3">
                                                <input type="number" min="1" max={120} className="form-control"
                                                       placeholder="1" required value={monthsAmount}
                                                       onChange={(e) => setMonthsAmount(e.target.value)}/>
                                            </div>
                                        </div>

                                    </div>
                                    <Marginer direction="vertical" margin={8}/>
                                </div>
                            </div>
                        </div>


                        <div className="col-4 d-none d-xl-inline">
                            <div className="card border-primary">
                                <div className="card-header">
                                    <span>Estimation </span>
                                    <OverlayTrigger placement="bottom" overlay={renderTooltip} key="bottom">
                                        <QuestionCircle className="text-muted"/>
                                    </OverlayTrigger>
                                </div>
                                <div className="card-body">
                                    <p>Monthly instalment:<span className="fw-bold"> {monthlyInstallment}</span></p>
                                    <p>Monthly insurance: <span className="fw-bold">{monthlyInsurance}</span></p>
                                    <p>One-time commission:<span className="fw-bold"> {oneTimeCommission}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <p className="fs-5 ms-2 pe-3">Commission</p>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="commission" value="credited"
                               checked={commission === 'credited'} onChange={handleCommissionChange}/>
                        <label className="form-check-label">
                            Added to the loan amount (credited)
                        </label>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="radio" name="commission" value="automatic"
                               checked={commission === 'automatic'} onChange={handleCommissionChange}/>
                        <label className="form-check-label">
                            Charged from your account automatically upon receipt of the loan
                        </label>
                    </div>


                    <p className="fs-5 ms-2 pe-3">Insurance</p>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="insurance" value="noProtection"
                               checked={insurance === 'noProtection'} onChange={handleInsuranceChange}/>
                        <label className="form-check-label">
                            No repayment protection
                        </label>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="radio" name="insurance" value="protection"
                               checked={insurance === 'protection'} onChange={handleInsuranceChange}/>
                        <label className="form-check-label">
                            Repayment protection
                        </label>
                    </div>

                    <p className="fs-5 ms-2 pe-3">Payment day</p>
                    <div className="col-12 col-sm-4 mb-4">
                        <input type="number" min="1" max={31} className="form-control"
                               placeholder="0" required value={monthDay}
                               onChange={(e) => setMonthDay(e.target.value)}/>
                    </div>
                    <div className="container mb-2">
                        <div className="row">
                            <div className="col-12 d-xl-none">
                                <div className="card border-primary">
                                    <div className="card-header">
                                        <span>Estimation </span>
                                        <OverlayTrigger placement="bottom" overlay={renderTooltip} key="bottom">
                                            <QuestionCircle className="text-muted"/>
                                        </OverlayTrigger>
                                    </div>
                                    <div className="card-body">
                                        <p>Monthly instalment: <br/><span className="fw-bold">{monthlyInstallment}</span></p>
                                        <p>Monthly insurance payment: <br/><span className="fw-bold">{monthlyInsurance}</span></p>
                                        <p>One-time commission: <br/> <span className="fw-bold">{oneTimeCommission}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-3">
                        {!isPendingN && <button type="submit" className="btn btn-lg btn-primary rounded-pill w-50">Apply</button>}
                        {isPendingN &&
                        <button type="submit" className="btn btn-lg btn-primary rounded-pill w-50">Applying...</button>}
                    </div>
                </div>
            </form>

        </>
    );
}

export default CreditCreate;