import ProgressBar from 'react-bootstrap/ProgressBar';
import React, {useEffect, useState} from 'react';
import {Nav, Spinner} from 'react-bootstrap';
import {Marginer} from '../../../components/marginer';
import CreditList from './creditList';
import useGetUsedCredit from "../../../services/creditService";

const Credit = () => {

    const availableCredit = 250000;
    // eslint-disable-next-line no-use-before-define
    const [percentage, setPercentage] = useState(0);
    const [whatCredits, setWhatCredits] = useState('active');
    const handleSelect = (eventKey) => setWhatCredits(eventKey);

    const {usedCredit, error, isPending} = useGetUsedCredit();

    useEffect(() => {
        setPercentage(usedCredit / availableCredit * 100)
    }, [availableCredit, usedCredit])

    const drawFunds = () => {

    }


    return (
        <div>
            {error && <>
                <div className="alert alert-warning fs-3" role="alert">{error} </div>
                <button className="text-decoration-none ms-3 fs-3" ref="" onClick={() => {
                    window.location.href = "/something"
                }}> Click to refresh
                </button>
            </>}
            {isPending &&
            <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
            {usedCredit && (<>
                <div className="bg-light me-3">
                    <div className="container ms-0">
                        <div className="col-12 col-lg-6">
                            <div className="mb-1 mt-3">
                                <span className="display-4 fw-bold mb-2">${usedCredit}</span> of <span
                                className="display-5">${availableCredit}</span>
                                <p className="fs-5 ms-2">Your available credit</p>
                            </div>
                            <ProgressBar now={percentage} animated style={{height: "5px"}}/>
                            <Marginer direction="vertical" margin={20}/>
                        </div>
                    </div>
                </div>

                <div className="container mt-3 me-0">
                    <div className="row">
                        <div className="col-12 align-items-center align-middle">
                            <a href={"/user/credit/create"} className="btn btn-primary rounded-pill btn-lg float-end"
                               onClick={drawFunds}>Draw funds</a>
                        </div>
                    </div>
                </div>

                <div className="container mt-3 m-0">
                    <div className="row">
                        <div className="col-12 col-lg-6 mb-3">
                            <Nav variant="tabs" defaultActiveKey="active" onSelect={handleSelect} className="fs-5">
                                <Nav.Item>
                                    <Nav.Link eventKey="active">Active</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="processing">Processing</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="review">In review</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="funded">Funded</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>
                </div>
                <Marginer direction="vertical" margin={35}/>
                <CreditList className="pe-4 me-5 mt-5" whatCredits={whatCredits}/></>)}
        </div>
    );
}
export default Credit;