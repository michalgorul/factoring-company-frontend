import ProgressBar from 'react-bootstrap/ProgressBar'
import React, {useEffect, useState} from 'react';
import {Nav} from 'react-bootstrap';
import {Marginer} from '../../../components/marginer';
import InvoiceList from './invoiceList';
import config from '../../../services/config';
import {ifTokenCannotBeTrusted} from '../../../services/authenticationService';

const Invoices = () => {

    const [availableCredit] = useState(5000000);
    const [usedCredit, setUsedCredit] = useState('0.0');
    const [percentage, setPercentage] = useState(usedCredit / availableCredit * 100);
    const [whatInvoices, setWhatInvoices] = useState('active');
    const handleSelect = (eventKey) => setWhatInvoices(eventKey);

    useEffect(() => {
        getPaid();
        setPercentage(usedCredit / availableCredit * 100)
    }, [availableCredit, usedCredit])

    const getPaid = () => {
        fetch(`${config.API_URL}/api/invoice/paid`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error("could not fetch the data for that resource");
                }
                return response.text();
            })
            .then(data => {
                if (!ifTokenCannotBeTrusted(data)) {
                    setUsedCredit(data);
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <>
            <div className="bg-light me-3">
                <div className="container">
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

            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 col-lg-6 mb-3">
                        <Nav variant="tabs" defaultActiveKey="active" onSelect={handleSelect} className="fs-5">
                            <Nav.Item>
                                <Nav.Link eventKey="active">In process</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="unfunded">Unfunded</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="funded">Funded</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className="col-12 col-lg-6 align-items-end justify-content-between">
                        <a href={"/user/invoices/create"} className="btn btn-lg btn-primary rounded-pill float-end text-white">Add
                            new invoice
                        </a>
                    </div>
                </div>
            </div>
            <Marginer direction="vertical" margin={35}/>
            <InvoiceList className="pe-4 me-5 mt-5" whatInvoices={whatInvoices}/>


        </>
    );
}

export default Invoices;