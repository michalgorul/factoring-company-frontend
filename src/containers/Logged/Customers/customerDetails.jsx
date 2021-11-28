import {useHistory, useParams} from "react-router-dom";
import {Button, Modal, Spinner} from 'react-bootstrap';
import {useEffect, useState} from "react";
import config from "../../../services/config";
import {infoToast} from "../../../components/toast/makeToast";
import useFetchWithToken from "../../../services/useFetchWithToken";

const CustomerDetails = () => {
    const {id} = useParams();

    const {data: customer, error: errorC, isPending: isPendingC} = useFetchWithToken(`${config.API_URL}/api/customer/${id}`);

    const [company, setCompany] = useState(null);
    const [canBankEditBeDisplayed, setCanBankEditBeDisplayed] = useState(false);
    const [bank, setBank] = useState(null);
    const [companyId, setCompanyId] = useState(0);

    useEffect(() => {
        if (customer) {
            const {companyId = {}} = customer;
            fetch(`${config.API_URL}/api/company/${companyId}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setCompany(data);
                    setCompanyId(data.id);
                })
                .then(() => {
                    fetch(`${config.API_URL}/api/bank-account/company/${company.id}`, {
                        method: 'GET',
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                        .then(res => {
                            return res.json();
                        })
                        .then(data => {
                            setBank(data);
                            setCanBankEditBeDisplayed(true);
                        })
                        .catch(err => {
                            if (err.name === "AbortError") {
                                console.log('fetch aborted');
                            }
                        })
                })
                .catch(err => {
                    if (err.name === "AbortError") {
                        console.log('fetch aborted');
                    }
                })
        }

    }, [customer, companyId])

    const history = useHistory();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleDeleteRequest = () => {
        fetch(`${config.API_URL}/api/customer/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(() => {
                history.push('/user/customers');
            })
            .then(() => {
                infoToast('Customer was deleted')
            })
    }

    const showEditCompany = (company) => {
        if (company != null) {
            return (

                <div className="d-flex mb-4 col-12 col-lg-7 mt-3">
                    <a href={`/user/profile/company/edit/${companyId}`} className="text-decoration-none ml-auto h6">Edit
                        company</a>
                </div>
            )
        } else if (company == null) {
            return (

                <div className="d-flex mb-4 col-12 col-lg-7 mt-3">
                    <a href={"/user/customers/company/create/" + customer.id} className="text-decoration-none ml-auto h6">Add
                        company</a>
                </div>
            )
        }
    }

    const showEditBankAccount = (bank, companyId) => {
        if (canBankEditBeDisplayed && bank != null && companyId != null) {
            return (
                <a href={"/user/bank-account/edit/" + bank.id} className="text-decoration-none ml-auto h6">Edit customer's bank
                    account</a>
            )
        } else if (bank == null && companyId != null) {
            return (
                <a href={"/user/customers/bank/create/" + customer.id} className="text-decoration-none ml-auto h6">Add customer's
                    bank account</a>
            )
        }
    }

    const handleDelete = () => {
        setShow(true);
    }

    const showCompanyDetails = (company) => {
        if (company != null) {
            return (
                <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item list-group-item-action">{company.companyName}</li>
                    <li className="list-group-item list-group-item-action">{company.country}</li>
                    <li className="list-group-item list-group-item-action">{company.city}</li>
                    <li className="list-group-item list-group-item-action">{company.street}</li>
                    <li className="list-group-item list-group-item-action">{company.postalCode}</li>
                    <li className="list-group-item list-group-item-action">{company.nip}</li>
                    <li className="list-group-item list-group-item-action">{company.regon}</li>
                </ul>)
        } else {
            return (
                <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                </ul>)
        }

    };

    const showBankAccountDetails = (bank) => {
        if (bank != null) {
            return (
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action">{bank.bankName}</li>
                    <li className="list-group-item list-group-item-action">{bank.bankAccountNumber}</li>
                    <li className="list-group-item list-group-item-action">{bank.bankSwift}</li>
                </ul>
            );
        } else {
            return (
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                    <li className="list-group-item list-group-item-action"> -</li>
                </ul>
            )
        }
    }
    return (
        <div className="">
            {isPendingC &&
            <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
            {errorC && <div>{errorC}</div>}
            {customer && (
                <article className="container mt-5 ms-3">
                    <div className="media align-items-center py-3">
                        <div className="media-body ml-4">
                            <h4 className="display-3">{customer.firstName + ' ' + customer.lastName}</h4>
                        </div>
                    </div>
                    <h5 className="mt-4 mb-3">Details</h5>
                    <div className="container ms-0">
                        <div className="row align-items-start ms-2">
                            <div className="col-5 col-lg-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action fw-bold">Email:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Country:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">City:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Street:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Postal code:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Phone number:</li>
                                </ul>
                            </div>
                            <div className="col-7 col-lg-4">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action">{customer.email}</li>
                                    <li className="list-group-item list-group-item-action">{customer.country}</li>
                                    <li className="list-group-item list-group-item-action">{customer.city}</li>
                                    <li className="list-group-item list-group-item-action">{customer.street}</li>
                                    <li className="list-group-item list-group-item-action">{customer.postalCode}</li>
                                    <li className="list-group-item list-group-item-action">{customer.phone}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex mb-4 col-12 col-lg-7 mt-3">
                        <a href={"/user/customers/edit/" + id} className="text-decoration-none ml-auto h6">Edit customer</a>
                    </div>

                    <h5 className="mt-4 mb-3">Company</h5>
                    <div className="container ms-0">
                        <div className="row align-items-start ms-2">
                            <div className="col-5 col-lg-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action fw-bold">Company name:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Country:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">City:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Street:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Postal code:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">NIP:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">REGON:</li>
                                </ul>
                            </div>
                            <div className="col-7 col-lg-4">
                                {showCompanyDetails(company)}
                            </div>
                        </div>
                    </div>
                    {showEditCompany(company)}

                    <h5 className="mt-4 mb-3">Bank account</h5>
                    <div className="container ms-0">
                        <div className="row align-items-start ms-3">
                            <div className="col-5 col-lg-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action fw-bold">Bank name:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Bank account number:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">SWIFT:</li>
                                </ul>
                            </div>
                            <div className="col-7 col-lg-4">
                                {showBankAccountDetails(bank)}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex mb-4 col-12 col-lg-7 mt-3">
                        {showEditBankAccount(bank, companyId)}
                    </div>


                    <div className="alert clearfix mt-2">
                        <button type="button" className="btn btn-lg me-3 mb-3 btn-primary rounded-pill float-center"
                                onClick={handleDelete}>Delete customer
                        </button>
                    </div>


                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Customer deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to remove {<span
                            className="fw-bold">{customer.firstName + ' ' + customer.lastName}</span>} from your customer
                            list?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleDeleteRequest}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </article>
            )}
        </div>
    );

}

export default CustomerDetails;