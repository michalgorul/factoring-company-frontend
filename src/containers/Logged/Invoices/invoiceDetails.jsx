import {useHistory, useParams} from "react-router-dom";
import {Button, Modal, Spinner} from 'react-bootstrap';
import {useState} from "react";
import {errorToast, infoToast} from "../../../components/toast/makeToast";
import useFetchWithTokenInvoice from "../../../services/invoiceService";
import config from "../../../services/config";
import axios from 'axios'
import {ifTokenCannotBeTrusted} from "../../../services/authenticationService";

const InvoiceDetails = () => {
    const {id} = useParams();
    const {
        invoice, errorI, isPendingI,
        customer, errorC, isPendingC,
        paymentType, errorP, isPendingP,
        currency, errorCu, isPendingCu
    } = useFetchWithTokenInvoice(id);

    const history = useHistory();

    const [show, setShow] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handleDeleteRequest = () => {
        fetch(`${config.API_URL}/api/invoice/${invoice.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    history.push('/user/invoices');
                } else {
                    handleClose();
                }
                return response;
            })
            .then((response) => {
                if (response.ok) {
                    infoToast('Invoice was deleted');

                } else {
                    errorToast('Invoice was not deleted');
                }

            })
    }

    const handlePayForInvoice = () => {
        fetch(`${config.API_URL}/api/invoice/pay/${invoice.id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    history.push('/user/invoices');
                } else {
                    handleClose();
                }
                return response;
            })
            .then((response) => {
                if (response.ok) {
                    infoToast('Invoice was paid');

                } else {
                    errorToast('Invoice was not paid');
                }
            })
    }

    const handleDelete = () => {
        setShow(true);
    }

    const showButtons = () => {
        if (invoice && invoice.status === 'unfunded') {
            return (
                <>
                    <div className="col-12 col-lg-6">
                        <div className="container mb-4 ms-0 p-0">
                            <div className="row align-items-start justify-content-center">
                                <div className="mt-3 col-12 col-lg-4 text-center">
                                    {!isPending &&
                                    <button type="button" className="btn btn-lg btn-block btn-primary rounded-pill float-center"
                                            onClick={handleShowPdf}>Generate PDF</button>}
                                    {isPending &&
                                    <button type="button" className="btn btn-lg btn-block btn-primary rounded-pill float-center"
                                            disabled
                                            onClick={handleShowPdf}>Generating...</button>}
                                </div>

                                <div className="mt-3 col-12 col-lg-4 text-center">
                                    <button type="button" className="btn btn-lg btn-block btn-primary rounded-pill float-center"
                                            onClick={handlePayForInvoice}>Pay
                                    </button>
                                </div>

                                <div className="mt-3 col-12 col-lg-4 text-center">
                                    <button type="button" className="btn btn-lg btn-block btn-primary rounded-pill float-center"
                                            onClick={handleDelete}>Delete Invoice
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            )
        } else {
            return (
                <>
                    <div className="col-12 col-lg-6">
                        <div className="container mb-4 ms-0">
                            <div className="row align-items-start justify-content-center">
                                <div className="mt-3 col-12 col-lg-5 text-center">
                                    {!isPending &&
                                    <button type="button" className="btn btn-lg btn-block btn-primary rounded-pill float-center"
                                            onClick={handleShowPdf}>Generate PDF</button>}
                                    {isPending &&
                                    <button type="button" className="btn btn-lg btn-block btn-primary rounded-pill float-center"
                                            disabled
                                            onClick={handleShowPdf}>Generating...</button>}
                                </div>

                                <div className="mt-3 col-12 col-lg-5 text-center">
                                    <button type="button" className="btn btn-lg btn-block btn-primary rounded-pill float-center"
                                            onClick={handleDelete}>Delete Invoice
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )
        }
    }

    const handleShowPdf = () => {
        setIsPending(true);

        try {
            axios
                .get(config.API_URL + `/api/invoice/pdf/${id}`, {
                    responseType: "blob",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then((response) => {
                    ifTokenCannotBeTrusted(response.data);
                    //Create a Blob from the PDF Stream
                    const file = new Blob([response.data], {type: "application/pdf"});
                    //Build a URL from the file
                    const fileURL = URL.createObjectURL(file);
                    //Open the URL on new Window
                    const pdfWindow = window.open();
                    pdfWindow.location.href = fileURL;
                    setIsPending(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            return {error};
        }
    }
    const handleClose = () => setShow(false);

    return (
        <div className="">
            {isPendingI && isPendingC && isPendingCu && isPendingP && isPending &&
            <div style={{padding: "70px 0", textAlign: "center"}}><Spinner animation="grow" variant="primary"/></div>}
            {errorI && <div>{errorI}</div>}
            {errorC && <div>{errorC}</div>}
            {errorCu && <div>{errorCu}</div>}
            {errorP && <div>{errorP}</div>}
            {invoice && customer && paymentType && currency && (
                <article className="mt-2 ms-3 container">
                    <div className="media align-items-center py-1">
                        <div className="media-body ml-4">
                            <h4 className="display-3">Invoice details</h4>
                        </div>
                    </div>
                    <h5 className="mt-4 mb-3">General</h5>
                    <div className="container ms-0">
                        <div className="row align-items-start ms-2">
                            <div className="col-6 col-lg-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action fw-bold">Invoice number:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Creation date:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Sale date:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Payment deadline:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">To pay:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Paid:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Status:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Remarks:</li>
                                </ul>
                            </div>
                            <div className="col-6 col-lg-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action">{invoice.invoiceNumber}</li>
                                    <li className="list-group-item list-group-item-action">{new Date(invoice.creationDate).toDateString()}</li>
                                    <li className="list-group-item list-group-item-action">{new Date(invoice.saleDate).toDateString()}</li>
                                    <li className="list-group-item list-group-item-action">{new Date(invoice.paymentDeadline).toDateString()}</li>
                                    <li className="list-group-item list-group-item-action">{Number(invoice.toPay).toFixed(2)}</li>
                                    <li className="list-group-item list-group-item-action">{Number(invoice.paidByUser).toFixed(2)}</li>
                                    <li className="list-group-item list-group-item-action">{invoice.status}</li>
                                    <li className="list-group-item list-group-item-action">{invoice.remarks}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex mb-4 col-12 col-lg-6 mt-3">
                        <a href={"edit/general-info/" + id} className="text-decoration-none ml-auto h6">Edit general info</a>
                    </div>

                    <h5 className="mt-4 mb-3">Customer Information</h5>
                    <div className="container ms-0">
                        <div className="row align-items-start ms-2">
                            <div className="col-6 col-lg-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action fw-bold">Customer name:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Company name:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Country:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">City:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Street:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Postal code:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Phone number:</li>
                                </ul>
                            </div>
                            <div className="col-6 col-lg-3">
                                <ul className="list-group list-group-flush mb-3">
                                    <li className="list-group-item list-group-item-action">{customer.firstName + ' ' + customer.lastName}</li>
                                    <li className="list-group-item list-group-item-action">{customer.companyName}</li>
                                    <li className="list-group-item list-group-item-action">{customer.country}</li>
                                    <li className="list-group-item list-group-item-action">{customer.city}</li>
                                    <li className="list-group-item list-group-item-action">{customer.street}</li>
                                    <li className="list-group-item list-group-item-action">{customer.postalCode}</li>
                                    <li className="list-group-item list-group-item-action">{customer.phone}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex mb-4 col-12 col-lg-6 mt-3">
                        <a href={"/user/customers/edit/" + customer.id} className="text-decoration-none ml-auto h6">Edit customer
                            info</a>
                    </div>

                    <h5 className="mt-4 mb-3">Payment Information</h5>
                    <div className="container ms-0">
                        <div className="row align-items-start">
                            <div className="col-6 col-lg-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item list-group-item-action fw-bold">Currency name:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">currency code:</li>
                                    <li className="list-group-item list-group-item-action fw-bold">Payment type:</li>
                                </ul>
                            </div>
                            <div className="col-6 col-lg-3">
                                <ul className="list-group list-group-flush mb-3">
                                    <li className="list-group-item list-group-item-action">{currency.name}</li>
                                    <li className="list-group-item list-group-item-action">{currency.code}</li>
                                    <li className="list-group-item list-group-item-action">{paymentType.paymentTypeName}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex mb-4 col-12 col-lg-6 mt-3">
                        <a href={"edit/payment-info/" + id} className="text-decoration-none ml-auto h6">Edit payment info</a>
                    </div>


                    {showButtons()}


                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Invoice deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to remove {<span
                            className="fw-bold">{invoice.invoiceNumber}</span>} from your invoice list?</Modal.Body>
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

export default InvoiceDetails;